import { listManager } from "../../categories/lists";

function getCodeGenerators(Arduino) {
  Arduino.forBlock["lists_add"] = function (block) {
    const list = listManager.getList(block.getFieldValue("LIST"));
    const value =
      Arduino.valueToCode(block, "VALUE", Arduino.ORDER_ATOMIC) || "0";

    return `${list.name}.add(${value});\n`;
  };

  Arduino.forBlock["lists_delete"] = function (block) {
    const list = listManager.getList(block.getFieldValue("LIST"));
    const index =
      Arduino.valueToCode(block, "INDEX", Arduino.ORDER_ATOMIC) || "0";

    return `${list.name}.remove(${index});\n`;
  };

  Arduino.forBlock["lists_clear"] = function (block) {
    const list = listManager.getList(block.getFieldValue("LIST"));

    return `${list.name}.clear();\n`;
  };

  Arduino.forBlock["lists_insert"] = function (block) {
    const list = listManager.getList(block.getFieldValue("LIST"));
    const value =
      Arduino.valueToCode(block, "VALUE", Arduino.ORDER_ATOMIC) || "0";
    const index =
      Arduino.valueToCode(block, "INDEX", Arduino.ORDER_ATOMIC) || "0";

    return `${list.name}.addAtIndex(${index}, ${value});\n`;
  };

  Arduino.forBlock["lists_get"] = function (block) {
    const list = listManager.getList(block.getFieldValue("LIST"));
    const index =
      Arduino.valueToCode(block, "INDEX", Arduino.ORDER_ATOMIC) || "0";

    return [`${list.name}.get(${index})`, Arduino.ORDER_ATOMIC];
  };

  Arduino.forBlock["lists_replace"] = function (block) {
    const list = listManager.getList(block.getFieldValue("LIST"));
    const value =
      Arduino.valueToCode(block, "VALUE", Arduino.ORDER_ATOMIC) || "0";
    const index =
      Arduino.valueToCode(block, "INDEX", Arduino.ORDER_ATOMIC) || "0";

    return `${list.name}.remove(${index});\n${list.name}.addAtIndex(${index}, ${value});\n`;
  };

  Arduino.forBlock["lists_length"] = function (block) {
    const list = listManager.getList(block.getFieldValue("LIST"));

    return [`${list.name}.getSize()`, Arduino.ORDER_ATOMIC];
  };
}

export default getCodeGenerators;
