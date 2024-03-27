import * as Blockly from "blockly/core";
import { listManager } from "../categories/lists";
import { Block } from "blockly/core";

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

export { LIST_SELECT_EXTENSION, APPEND_STATEMENT_INPUT_STACK };
