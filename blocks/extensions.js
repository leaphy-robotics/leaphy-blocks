import * as Blockly from "blockly/core";
import { listManager } from "../categories/lists";
const xmlUtils = Blockly.utils.xml;
/**
 * @mixin
 * @package
 * @readonly
 */
const QUOTE_IMAGE_MIXIN = {
  /**
   * Image data URI of an LTR opening double quote (same as RTL closing double
   * quote).
   * @readonly
   */
  QUOTE_IMAGE_LEFT_DATAURI:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAA" +
    "n0lEQVQI1z3OMa5BURSF4f/cQhAKjUQhuQmFNwGJEUi0RKN5rU7FHKhpjEH3TEMtkdBSCY" +
    "1EIv8r7nFX9e29V7EBAOvu7RPjwmWGH/VuF8CyN9/OAdvqIXYLvtRaNjx9mMTDyo+NjAN1" +
    "HNcl9ZQ5oQMM3dgDUqDo1l8DzvwmtZN7mnD+PkmLa+4mhrxVA9fRowBWmVBhFy5gYEjKMf" +
    "z9AylsaRRgGzvZAAAAAElFTkSuQmCC",
  /**
   * Image data URI of an LTR closing double quote (same as RTL opening double
   * quote).
   * @readonly
   */
  QUOTE_IMAGE_RIGHT_DATAURI:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAA" +
    "qUlEQVQI1z3KvUpCcRiA8ef9E4JNHhI0aFEacm1o0BsI0Slx8wa8gLauoDnoBhq7DcfWhg" +
    "gONDmJJgqCPA7neJ7p934EOOKOnM8Q7PDElo/4x4lFb2DmuUjcUzS3URnGib9qaPNbuXvB" +
    "O3sGPHJDRG6fGVdMSeWDP2q99FQdFrz26Gu5Tq7dFMzUvbXy8KXeAj57cOklgA+u1B5Aos" +
    "lLtGIHQMaCVnwDnADZIFIrXsoXrgAAAABJRU5ErkJggg==",
  /**
   * Pixel width of QUOTE_IMAGE_LEFT_DATAURI and QUOTE_IMAGE_RIGHT_DATAURI.
   * @readonly
   */
  QUOTE_IMAGE_WIDTH: 12,
  /**
   * Pixel height of QUOTE_IMAGE_LEFT_DATAURI and QUOTE_IMAGE_RIGHT_DATAURI.
   * @readonly
   */
  QUOTE_IMAGE_HEIGHT: 12,

  /**
   * Inserts appropriate quote images before and after the named field.
   * @param {string} fieldName The name of the field to wrap with quotes.
   * @this {Block}
   */
  quoteField_: function (fieldName) {
    for (let i = 0, input; (input = this.inputList[i]); i++) {
      for (let j = 0, field; (field = input.fieldRow[j]); j++) {
        if (fieldName === field.name) {
          input.insertFieldAt(j, this.newQuote_(true));
          input.insertFieldAt(j + 2, this.newQuote_(false));
          return;
        }
      }
    }
    console.warn(
      'field named "' + fieldName + '" not found in ' + this.toDevString(),
    );
  },

  /**
   * A helper function that generates a FieldImage of an opening or
   * closing double quote. The selected quote will be adapted for RTL blocks.
   * @param {boolean} open If the image should be open quote (“ in LTR).
   *                       Otherwise, a closing quote is used (” in LTR).
   * @return {!FieldImage} The new field.
   * @this {Block}
   */
  newQuote_: function (open) {
    const isLeft = this.RTL ? !open : open;
    const dataUri = isLeft
      ? this.QUOTE_IMAGE_LEFT_DATAURI
      : this.QUOTE_IMAGE_RIGHT_DATAURI;
    return new Blockly.FieldImage(
      dataUri,
      this.QUOTE_IMAGE_WIDTH,
      this.QUOTE_IMAGE_HEIGHT,
      isLeft ? "\u201C" : "\u201D",
    );
  },
};

/**
 * Wraps TEXT field with images of double quote characters.
 * @this {Block}
 */
const TEXT_QUOTES_EXTENSION = function () {
  this.mixin(QUOTE_IMAGE_MIXIN);
  this.quoteField_("TEXT");
};

const APPEND_STATEMENT_INPUT_STACK = function () {
  this.appendStatementInput("STACK");
};

const CONTROLS_IF_MUTATOR_MIXIN = {
  elseifCount_: 0,
  elseCount_: 0,

  /**
   * Create XML to represent the number of else-if and else inputs.
   * Backwards compatible serialization implementation.
   * @return {Element} XML storage element.
   * @this {Block}
   */
  mutationToDom: function () {
    if (!this.elseifCount_ && !this.elseCount_) {
      return null;
    }
    const container = xmlUtils.createElement("mutation");
    if (this.elseifCount_) {
      container.setAttribute("elseif", this.elseifCount_);
    }
    if (this.elseCount_) {
      container.setAttribute("else", 1);
    }
    return container;
  },
  /**
   * Parse XML to restore the else-if and else inputs.
   * Backwards compatible serialization implementation.
   * @param {!Element} xmlElement XML storage element.
   * @this {Block}
   */
  domToMutation: function (xmlElement) {
    this.elseifCount_ = parseInt(xmlElement.getAttribute("elseif"), 10) || 0;
    this.elseCount_ = parseInt(xmlElement.getAttribute("else"), 10) || 0;
    this.rebuildShape_();
  },
  /**
   * Returns the state of this block as a JSON serializable object.
   * @return {?{elseIfCount: (number|undefined), haseElse: (boolean|undefined)}}
   *     The state of this block, ie the else if count and else state.
   */
  saveExtraState: function () {
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
  /**
   * Applies the given state to this block.
   * @param {*} state The state to apply to this block, ie the else if count and
   *     else state.
   */
  loadExtraState: function (state) {
    this.elseifCount_ = state["elseIfCount"] || 0;
    this.elseCount_ = state["hasElse"] ? 1 : 0;
    this.updateShape_();
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Workspace} workspace Mutator's workspace.
   * @return {!Block} Root block in mutator.
   * @this {Block}
   */
  decompose: function (workspace) {
    const containerBlock = workspace.newBlock("controls_if_if");
    containerBlock.initSvg();
    let connection = containerBlock.nextConnection;
    for (let i = 1; i <= this.elseifCount_; i++) {
      const elseifBlock = workspace.newBlock("controls_if_elseif");
      elseifBlock.initSvg();
      connection.connect(elseifBlock.previousConnection);
      connection = elseifBlock.nextConnection;
    }
    if (this.elseCount_) {
      const elseBlock = workspace.newBlock("controls_if_else");
      elseBlock.initSvg();
      connection.connect(elseBlock.previousConnection);
    }
    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Block} containerBlock Root block in mutator.
   * @this {Block}
   */
  compose: function (containerBlock) {
    let clauseBlock = containerBlock.nextConnection.targetBlock();
    // Count number of inputs.
    this.elseifCount_ = 0;
    this.elseCount_ = 0;
    const valueConnections = [null];
    const statementConnections = [null];
    let elseStatementConnection = null;
    while (clauseBlock) {
      if (clauseBlock.isInsertionMarker()) {
        clauseBlock = clauseBlock.getNextBlock();
        continue;
      }
      switch (clauseBlock.type) {
        case "controls_if_elseif":
          this.elseifCount_++;
          valueConnections.push(clauseBlock.valueConnection_);
          statementConnections.push(clauseBlock.statementConnection_);
          break;
        case "controls_if_else":
          this.elseCount_++;
          elseStatementConnection = clauseBlock.statementConnection_;
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
  /**
   * Store pointers to any connected child blocks.
   * @param {!Block} containerBlock Root block in mutator.
   * @this {Block}
   */
  saveConnections: function (containerBlock) {
    let clauseBlock = containerBlock.nextConnection.targetBlock();
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
            inputIf && inputIf.connection.targetConnection;
          clauseBlock.statementConnection_ =
            inputDo && inputDo.connection.targetConnection;
          i++;
          break;
        }
        case "controls_if_else": {
          const inputDo = this.getInput("ELSE");
          clauseBlock.statementConnection_ =
            inputDo && inputDo.connection.targetConnection;
          break;
        }
        default:
          throw TypeError("Unknown block type: " + clauseBlock.type);
      }
      clauseBlock = clauseBlock.getNextBlock();
    }
  },
  /**
   * Reconstructs the block with all child blocks attached.
   * @this {Block}
   */
  rebuildShape_: function () {
    const valueConnections = [null];
    const statementConnections = [null];
    let elseStatementConnection = null;

    if (this.getInput("ELSE")) {
      elseStatementConnection =
        this.getInput("ELSE").connection.targetConnection;
    }
    for (let i = 1; this.getInput("IF" + i); i++) {
      const inputIf = this.getInput("IF" + i);
      const inputDo = this.getInput("DO" + i);
      valueConnections.push(inputIf.connection.targetConnection);
      statementConnections.push(inputDo.connection.targetConnection);
    }
    this.updateShape_();
    this.reconnectChildBlocks_(
      valueConnections,
      statementConnections,
      elseStatementConnection,
    );
  },
  /**
   * Modify this block to have the correct number of inputs.
   * @this {Block}
   * @private
   */
  updateShape_: function () {
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
  /**
   * Reconnects child blocks.
   * @param {!Array<?RenderedConnection>} valueConnections List of
   * value connections for 'if' input.
   * @param {!Array<?RenderedConnection>} statementConnections List of
   * statement connections for 'do' input.
   * @param {?RenderedConnection} elseStatementConnection Statement
   * connection for else input.
   * @this {Block}
   */
  reconnectChildBlocks_: function (
    valueConnections,
    statementConnections,
    elseStatementConnection,
  ) {
    for (let i = 1; i <= this.elseifCount_; i++) {
      valueConnections[i].reconnect(this, "IF" + i);
      statementConnections[i].reconnect(this, "DO" + i);
    }
    if (elseStatementConnection) {
      elseStatementConnection.reconnect(this, "ELSE");
    }
  },
};

const CONTROLS_IF_TOOLTIP_EXTENSION = function () {
  this.setTooltip(
    function () {
      if (!this.elseifCount_ && !this.elseCount_) {
        return Blockly.Msg["CONTROLS_IF_TOOLTIP_1"];
      } else if (!this.elseifCount_ && this.elseCount_) {
        return Blockly.Msg["CONTROLS_IF_TOOLTIP_2"];
      } else if (this.elseifCount_ && !this.elseCount_) {
        return Blockly.Msg["CONTROLS_IF_TOOLTIP_3"];
      } else if (this.elseifCount_ && this.elseCount_) {
        return Blockly.Msg["CONTROLS_IF_TOOLTIP_4"];
      }
      return "";
    }.bind(this),
  );
};

/**
 * Tooltips for the 'controls_whileUntil' block, keyed by MODE value.
 * @see {Extensions#buildTooltipForDropdown}
 * @readonly
 */
const WHILE_UNTIL_TOOLTIPS = {
  WHILE: "%{BKY_CONTROLS_WHILEUNTIL_TOOLTIP_WHILE}",
  UNTIL: "%{BKY_CONTROLS_WHILEUNTIL_TOOLTIP_UNTIL}",
};

/**
 * Tooltip text, keyed by block OP value. Used by logic_compare and
 * logic_operation blocks.
 * @see {Extensions#buildTooltipForDropdown}
 * @readonly
 */
const LOGIC_TOOLTIPS_BY_OP = {
  // logic_compare
  EQ: "%{BKY_LOGIC_COMPARE_TOOLTIP_EQ}",
  NEQ: "%{BKY_LOGIC_COMPARE_TOOLTIP_NEQ}",
  LT: "%{BKY_LOGIC_COMPARE_TOOLTIP_LT}",
  LTE: "%{BKY_LOGIC_COMPARE_TOOLTIP_LTE}",
  GT: "%{BKY_LOGIC_COMPARE_TOOLTIP_GT}",
  GTE: "%{BKY_LOGIC_COMPARE_TOOLTIP_GTE}",

  // logic_operation
  AND: "%{BKY_LOGIC_OPERATION_TOOLTIP_AND}",
  OR: "%{BKY_LOGIC_OPERATION_TOOLTIP_OR}",
};

/**
 * Mapping of math block OP value to tooltip message for blocks
 * math_arithmetic, math_simple, math_trig, and math_on_lists.
 * @see {Extensions#buildTooltipForDropdown}
 * @package
 * @readonly
 */
const MATH_TOOLTIPS_BY_OP = {
  // math_arithmetic
  ADD: "%{BKY_MATH_ARITHMETIC_TOOLTIP_ADD}",
  MINUS: "%{BKY_MATH_ARITHMETIC_TOOLTIP_MINUS}",
  MULTIPLY: "%{BKY_MATH_ARITHMETIC_TOOLTIP_MULTIPLY}",
  DIVIDE: "%{BKY_MATH_ARITHMETIC_TOOLTIP_DIVIDE}",
  POWER: "%{BKY_MATH_ARITHMETIC_TOOLTIP_POWER}",

  // math_simple
  ROOT: "%{BKY_MATH_SINGLE_TOOLTIP_ROOT}",
  ABS: "%{BKY_MATH_SINGLE_TOOLTIP_ABS}",
  NEG: "%{BKY_MATH_SINGLE_TOOLTIP_NEG}",
  LN: "%{BKY_MATH_SINGLE_TOOLTIP_LN}",
  LOG10: "%{BKY_MATH_SINGLE_TOOLTIP_LOG10}",
  EXP: "%{BKY_MATH_SINGLE_TOOLTIP_EXP}",
  POW10: "%{BKY_MATH_SINGLE_TOOLTIP_POW10}",

  // math_trig
  SIN: "%{BKY_MATH_TRIG_TOOLTIP_SIN}",
  COS: "%{BKY_MATH_TRIG_TOOLTIP_COS}",
  TAN: "%{BKY_MATH_TRIG_TOOLTIP_TAN}",
  ASIN: "%{BKY_MATH_TRIG_TOOLTIP_ASIN}",
  ACOS: "%{BKY_MATH_TRIG_TOOLTIP_ACOS}",
  ATAN: "%{BKY_MATH_TRIG_TOOLTIP_ATAN}",

  // math_on_lists
  SUM: "%{BKY_MATH_ONLIST_TOOLTIP_SUM}",
  MIN: "%{BKY_MATH_ONLIST_TOOLTIP_MIN}",
  MAX: "%{BKY_MATH_ONLIST_TOOLTIP_MAX}",
  AVERAGE: "%{BKY_MATH_ONLIST_TOOLTIP_AVERAGE}",
  MEDIAN: "%{BKY_MATH_ONLIST_TOOLTIP_MEDIAN}",
  MODE: "%{BKY_MATH_ONLIST_TOOLTIP_MODE}",
  STD_DEV: "%{BKY_MATH_ONLIST_TOOLTIP_STD_DEV}",
  RANDOM: "%{BKY_MATH_ONLIST_TOOLTIP_RANDOM}",
};

/**
 * Mixin for mutator functions in the 'math_is_divisibleby_mutator'
 * extension.
 * @mixin
 * @augments Block
 * @package
 */
const IS_DIVISIBLEBY_MUTATOR_MIXIN = {
  /**
   * Create XML to represent whether the 'divisorInput' should be present.
   * Backwards compatible serialization implementation.
   * @return {!Element} XML storage element.
   * @this {Block}
   */
  mutationToDom: function () {
    const container = xmlUtils.createElement("mutation");
    const divisorInput = this.getFieldValue("PROPERTY") === "DIVISIBLE_BY";
    container.setAttribute("divisor_input", divisorInput);
    return container;
  },
  /**
   * Parse XML to restore the 'divisorInput'.
   * Backwards compatible serialization implementation.
   * @param {!Element} xmlElement XML storage element.
   * @this {Block}
   */
  domToMutation: function (xmlElement) {
    const divisorInput = xmlElement.getAttribute("divisor_input") === "true";
    this.updateShape_(divisorInput);
  },

  // This block does not need JSO serialization hooks (saveExtraState and
  // loadExtraState) because the state of this object is already encoded in the
  // dropdown values.
  // XML hooks are kept for backwards compatibility.

  /**
   * Modify this block to have (or not have) an input for 'is divisible by'.
   * @param {boolean} divisorInput True if this block has a divisor input.
   * @private
   * @this {Block}
   */
  updateShape_: function (divisorInput) {
    // Add or remove a Value Input.
    const inputExists = this.getInput("DIVISOR");
    if (divisorInput) {
      if (!inputExists) {
        this.appendValueInput("DIVISOR").setCheck("Number");
      }
    } else if (inputExists) {
      this.removeInput("DIVISOR");
    }
  },
};

/**
 * 'math_is_divisibleby_mutator' extension to the 'math_property' block that
 * can update the block shape (add/remove divisor input) based on whether
 * property is "divisible by".
 * @this {Block}
 * @package
 */
const IS_DIVISIBLE_MUTATOR_EXTENSION = function () {
  this.getField("PROPERTY").setValidator(
    /**
     * @this {FieldDropdown}
     * @param {*} option The selected dropdown option.
     */
    function (option) {
      const divisorInput = option === "DIVISIBLE_BY";
      this.getSourceBlock().updateShape_(divisorInput);
    },
  );
};

/**
 * Mixin with mutator methods to support alternate output based if the
 * 'math_on_list' block uses the 'MODE' operation.
 * @mixin
 * @augments Block
 * @package
 * @readonly
 */
const LIST_MODES_MUTATOR_MIXIN = {
  /**
   * Modify this block to have the correct output type.
   * @param {string} newOp Either 'MODE' or some op than returns a number.
   * @private
   * @this {Block}
   */
  updateType_: function (newOp) {
    if (newOp === "MODE") {
      this.outputConnection.setCheck("Array");
    } else {
      this.outputConnection.setCheck("Number");
    }
  },
  /**
   * Create XML to represent the output type.
   * Backwards compatible serialization implementation.
   * @return {!Element} XML storage element.
   * @this {Block}
   */
  mutationToDom: function () {
    const container = xmlUtils.createElement("mutation");
    container.setAttribute("op", this.getFieldValue("OP"));
    return container;
  },
  /**
   * Parse XML to restore the output type.
   * Backwards compatible serialization implementation.
   * @param {!Element} xmlElement XML storage element.
   * @this {Block}
   */
  domToMutation: function (xmlElement) {
    this.updateType_(xmlElement.getAttribute("op"));
  },

  // This block does not need JSO serialization hooks (saveExtraState and
  // loadExtraState) because the state of this object is already encoded in the
  // dropdown values.
  // XML hooks are kept for backwards compatibility.
};

/**
 * Extension to 'math_on_list' blocks that allows support of
 * modes operation (outputs a list of numbers).
 * @this {Block}
 * @package
 */
const LIST_MODES_MUTATOR_EXTENSION = function () {
  this.getField("OP").setValidator(
    function (newOp) {
      this.updateType_(newOp);
    }.bind(this),
  );
};

/**
 * Factory for callbacks for rename variable dropdown menu option
 * associated with a variable getter block.
 * @param {!Block} block The block with the variable to rename.
 * @return {!function()} A function that renames the variable.
 */
const renameOptionCallbackFactory = function (block) {
  return function () {
    const workspace = block.workspace;
    const variable = block.getField("VAR").getVariable();
    Blockly.Variables.renameVariable(workspace, variable);
  };
};

/**
 * Factory for callbacks for delete variable dropdown menu option
 * associated with a variable getter block.
 * @param {!Block} block The block with the variable to delete.
 * @return {!function()} A function that deletes the variable.
 */
const deleteOptionCallbackFactory = function (block) {
  return function () {
    const workspace = block.workspace;
    const variable = block.getField("VAR").getVariable();
    workspace.deleteVariableById(variable.getId());
    workspace.refreshToolboxSelection();
  };
};

/**
 * Mixin to add context menu items to create getter/setter blocks for this
 * setter/getter.
 * Used by blocks 'variables_set' and 'variables_get'.
 * @mixin
 * @augments Block
 * @package
 * @readonly
 */
const CUSTOM_CONTEXT_MENU_VARIABLE_GETTER_SETTER_MIXIN = {
  /**
   * Add menu option to create getter/setter block for this setter/getter.
   * @param {!Array} options List of menu options to add to.
   * @this {Block}
   */
  customContextMenu: function (options) {
    if (!this.isInFlyout) {
      let oppositeType;
      let contextMenuMsg;
      // Getter blocks have the option to create a setter block, and vice versa.
      if (this.type === "variables_get") {
        oppositeType = "variables_set";
        contextMenuMsg = Blockly.Msg["VARIABLES_GET_CREATE_SET"];
      } else {
        oppositeType = "variables_get";
        contextMenuMsg = Blockly.Msg["VARIABLES_SET_CREATE_GET"];
      }

      const option = { enabled: this.workspace.remainingCapacity() > 0 };
      const name = this.getField("VAR").getText();
      option.text = contextMenuMsg.replace("%1", name);
      const xmlField = xmlUtils.createElement("field");
      xmlField.setAttribute("name", "VAR");
      xmlField.appendChild(xmlUtils.createTextNode(name));
      const xmlBlock = xmlUtils.createElement("block");
      xmlBlock.setAttribute("type", oppositeType);
      xmlBlock.appendChild(xmlField);
      option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
      options.push(option);
      // Getter blocks have the option to rename or delete that variable.
    } else {
      if (
        this.type === "variables_get" ||
        this.type === "variables_get_reporter"
      ) {
        const renameOption = {
          text: Msg["RENAME_VARIABLE"],
          enabled: true,
          callback: renameOptionCallbackFactory(this),
        };
        const name = this.getField("VAR").getText();
        const deleteOption = {
          text: Msg["DELETE_VARIABLE"].replace("%1", name),
          enabled: true,
          callback: deleteOptionCallbackFactory(this),
        };
        options.unshift(renameOption);
        options.unshift(deleteOption);
      }
    }
  },
};

const LIST_SELECT_EXTENSION = function () {
  const input = this.getInput("LIST");

  input.appendField(
    new Blockly.FieldDropdown(() => {
      return listManager.getLists().map((list) => {
        return [list.name, list.id];
      });
    }),
    "LIST",
  );
};

export {
  CUSTOM_CONTEXT_MENU_VARIABLE_GETTER_SETTER_MIXIN,
  LIST_MODES_MUTATOR_EXTENSION,
  LIST_MODES_MUTATOR_MIXIN,
  IS_DIVISIBLE_MUTATOR_EXTENSION,
  IS_DIVISIBLEBY_MUTATOR_MIXIN,
  MATH_TOOLTIPS_BY_OP,
  LOGIC_TOOLTIPS_BY_OP,
  TEXT_QUOTES_EXTENSION,
  APPEND_STATEMENT_INPUT_STACK,
  CONTROLS_IF_MUTATOR_MIXIN,
  CONTROLS_IF_TOOLTIP_EXTENSION,
  WHILE_UNTIL_TOOLTIPS,
  LIST_SELECT_EXTENSION,
};
