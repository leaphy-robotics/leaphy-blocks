import * as Blockly from "blockly/core";
import { listManager } from "../categories/lists";
import { Block, BlockSvg, Connection, Workspace } from "blockly/core";

const xmlUtils = Blockly.utils.xml;

const LIST_SELECT_EXTENSION = function (this: Block) {
    const input = this.getInput("LIST");
    if (!input) return;

    input.appendField(
        new Blockly.FieldDropdown(() => {
            return listManager.getLists().map((list) => {
                return [list.name, list.id];
            });
        }) as Blockly.Field,
        "LIST",
    );
};

const APPEND_STATEMENT_INPUT_STACK = function (this: Block) {
    this.appendStatementInput("STACK");
};

type IfExtraState = {
    elseIfCount?: number;
    hasElse?: boolean;
};

interface ClauseBlock extends Block {
    valueConnection_?: Connection | null;
    statementConnection_?: Connection | null;
}

const CONTROLS_IF_MUTATOR_MIXIN = {
    elseifCount_: 0,
    elseCount_: 0,

    mutationToDom: function (this: IfBlock) {
        if (!this.elseifCount_ && !this.elseCount_) {
            return null;
        }
        const container = xmlUtils.createElement("mutation");
        if (this.elseifCount_) {
            container.setAttribute("elseif", String(this.elseifCount_));
        }
        if (this.elseCount_) {
            container.setAttribute("else", "1");
        }
        return container;
    },

    domToMutation: function (this: IfBlock, xmlElement: Element) {
        this.elseifCount_ =
            parseInt(xmlElement.getAttribute("elseif")!, 10) || 0;
        this.elseCount_ = parseInt(xmlElement.getAttribute("else")!, 10) || 0;
        this.rebuildShape_();
    },

    saveExtraState: function (this: IfBlock): IfExtraState | null {
        if (!this.elseifCount_ && !this.elseCount_) {
            return null;
        }
        const state = Object.create(null);
        if (this.elseifCount_) {
            state["elseIfCount"] = this.elseifCount_;
        }
        if (this.elseCount_) {
            state["hasElse"] = true;
        }
        return state;
    },

    loadExtraState: function (this: IfBlock, state: IfExtraState) {
        this.elseifCount_ = state["elseIfCount"] || 0;
        this.elseCount_ = state["hasElse"] ? 1 : 0;
        this.updateShape_();
    },

    decompose: function (this: IfBlock, workspace: Workspace): Block {
        const containerBlock = workspace.newBlock("controls_if_if");
        (containerBlock as BlockSvg).initSvg();
        let connection = containerBlock.nextConnection!;
        for (let i = 1; i <= this.elseifCount_; i++) {
            const elseifBlock = workspace.newBlock("controls_if_elseif");
            (containerBlock as BlockSvg).initSvg();
            connection.connect(elseifBlock.previousConnection!);
            connection = elseifBlock.nextConnection!;
        }
        if (this.elseCount_) {
            const elseBlock = workspace.newBlock("controls_if_else");
            (elseBlock as BlockSvg).initSvg();
            connection.connect(elseBlock.previousConnection!);
        }
        return containerBlock;
    },

    compose: function (this: IfBlock, containerBlock: Block) {
        let clauseBlock =
            containerBlock.nextConnection!.targetBlock() as ClauseBlock | null;
        // Count number of inputs.
        this.elseifCount_ = 0;
        this.elseCount_ = 0;
        const valueConnections: Array<Connection | null> = [null];
        const statementConnections: Array<Connection | null> = [null];
        let elseStatementConnection: Connection | null = null;
        while (clauseBlock) {
            if (clauseBlock.isInsertionMarker()) {
                clauseBlock = clauseBlock.getNextBlock();
                continue;
            }
            switch (clauseBlock.type) {
                case "controls_if_elseif":
                    this.elseifCount_++;
                    valueConnections.push(
                        clauseBlock.valueConnection_ as Connection | null,
                    );
                    statementConnections.push(
                        clauseBlock.statementConnection_ as Connection | null,
                    );
                    break;
                case "controls_if_else":
                    this.elseCount_++;
                    elseStatementConnection =
                        clauseBlock.statementConnection_ as Connection | null;
                    break;
                default:
                    throw TypeError("Unknown block type: " + clauseBlock.type);
            }
            clauseBlock = clauseBlock.getNextBlock();
        }
        this.updateShape_();
        // Reconnect any child blocks.
        this.reconnectChildBlocks_(
            valueConnections,
            statementConnections,
            elseStatementConnection,
        );
    },

    saveConnections: function (this: IfBlock, containerBlock: Block) {
        let clauseBlock =
            containerBlock!.nextConnection!.targetBlock() as ClauseBlock | null;
        let i = 1;
        while (clauseBlock) {
            if (clauseBlock.isInsertionMarker()) {
                clauseBlock = clauseBlock.getNextBlock();
                continue;
            }
            switch (clauseBlock.type) {
                case "controls_if_elseif": {
                    const inputIf = this.getInput("IF" + i);
                    const inputDo = this.getInput("DO" + i);
                    clauseBlock.valueConnection_ =
                        inputIf && inputIf.connection!.targetConnection;
                    clauseBlock.statementConnection_ =
                        inputDo && inputDo.connection!.targetConnection;
                    i++;
                    break;
                }
                case "controls_if_else": {
                    const inputDo = this.getInput("ELSE");
                    clauseBlock.statementConnection_ =
                        inputDo && inputDo.connection!.targetConnection;
                    break;
                }
                default:
                    throw TypeError("Unknown block type: " + clauseBlock.type);
            }
            clauseBlock = clauseBlock.getNextBlock();
        }
    },

    rebuildShape_: function (this: IfBlock) {
        const valueConnections: Array<Connection | null> = [null];
        const statementConnections: Array<Connection | null> = [null];
        let elseStatementConnection: Connection | null = null;

        if (this.getInput("ELSE")) {
            elseStatementConnection =
                this.getInput("ELSE")!.connection!.targetConnection;
        }
        for (let i = 1; this.getInput("IF" + i); i++) {
            const inputIf = this.getInput("IF" + i);
            const inputDo = this.getInput("DO" + i);
            valueConnections.push(inputIf!.connection!.targetConnection);
            statementConnections.push(inputDo!.connection!.targetConnection);
        }
        this.updateShape_();
        this.reconnectChildBlocks_(
            valueConnections,
            statementConnections,
            elseStatementConnection,
        );
    },

    updateShape_: function (this: IfBlock) {
        // Delete everything.
        if (this.getInput("ELSE")) {
            this.removeInput("ELSE");
        }
        if (this.getInput("ELSELABEL")) {
            this.removeInput("ELSELABEL");
        }
        for (let i = 1; this.getInput("IF" + i); i++) {
            this.removeInput("IF" + i);
            this.removeInput("DO" + i);
        }
        // Rebuild block.
        for (let i = 1; i <= this.elseifCount_; i++) {
            this.appendValueInput("IF" + i)
                .setCheck("Boolean")
                .appendField(Blockly.Msg["CONTROLS_IF_MSG_ELSEIF"]);
            this.appendStatementInput("DO" + i).appendField(
                Blockly.Msg["CONTROLS_IF_MSG_THEN"],
            );
        }
        if (this.elseCount_) {
            this.appendDummyInput("ELSELABEL").appendField(
                Blockly.Msg["CONTROLS_IF_MSG_ELSE"],
            );
            this.appendStatementInput("ELSE");
        }
    },

    reconnectChildBlocks_: function (
        this: IfBlock,
        valueConnections: Array<Connection | null>,
        statementConnections: Array<Connection | null>,
        elseStatementConnection: Connection | null,
    ) {
        for (let i = 1; i <= this.elseifCount_; i++) {
            valueConnections[i]?.reconnect(this, "IF" + i);
            statementConnections[i]?.reconnect(this, "DO" + i);
        }
        if (elseStatementConnection) {
            elseStatementConnection.reconnect(this, "ELSE");
        }
    },
};

type IfBlock = Block & IfMixin;
interface IfMixin extends IfMixinType {}
type IfMixinType = typeof CONTROLS_IF_MUTATOR_MIXIN;

export {
    LIST_SELECT_EXTENSION,
    APPEND_STATEMENT_INPUT_STACK,
    CONTROLS_IF_MUTATOR_MIXIN,
};
