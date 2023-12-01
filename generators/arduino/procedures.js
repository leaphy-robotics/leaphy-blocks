import * as Blockly from "blockly/core";

function getCodeGenerators(Arduino) {
  /**
   * Code generator to create a function with a return value (X).
   * Arduino code: void functionname { return X }
   * @param {!Block} block Block to generate the code from.
   * @return {null} There is no code added to loop.
   */
  Arduino.forBlock["procedures_defreturn"] = function (block) {
    var funcName = Arduino.nameDB_.getName(
      block.getFieldValue("NAME"),
      Blockly.Names.NameType.PROCEDURE,
    );
    var branch = Arduino.statementToCode(block, "STACK");
    if (Arduino.STATEMENT_PREFIX) {
      branch =
        Arduino.prefixLines(
          Arduino.STATEMENT_PREFIX.replace(/%1/g, "'" + block.id + "'"),
          Arduino.INDENT,
        ) + branch;
    }
    if (Arduino.INFINITE_LOOP_TRAP) {
      branch =
        Arduino.INFINITE_LOOP_TRAP.replace(/%1/g, "'" + block.id + "'") +
        branch;
    }
    var returnValue =
      Arduino.valueToCode(block, "RETURN", Arduino.ORDER_NONE) || "";
    if (returnValue) {
      returnValue = "  return " + returnValue + ";\n";
    }

    // Get arguments with type
    var args = [];
    for (var x = 0; x < block.arguments_.length; x++) {
      args[x] =
        "double" +
        " " +
        Arduino.nameDB_.getName(
          block.arguments_[x],
          Blockly.Names.NameType.VARIABLE,
        );
    }
    var returnType;
    // Get return type
    if (block.type == "procedures_defreturn"){
      returnType = "double";
    } else {
      returnType = "void";
    }

    // Construct code
    var code =
      returnType +
      " " +
      funcName +
      "(" +
      args.join(", ") +
      ") {\n" +
      branch +
      returnValue +
      "}";
    code = Arduino.scrub_(block, code);
    Arduino.definitions_[funcName] = code;
    return null;
  };

  /**
   * Code generator to create a function without a return value.
   * It uses the same code as with return value, as it will maintain the void
   * type.
   * Arduino code: void functionname { }
   */
  Arduino.forBlock["procedures_defnoreturn"] =
    Arduino.forBlock["procedures_defreturn"];

  /**
   * Code generator to create a function call with a return value.
   * Arduino code: loop { functionname() }
   * @param {!Block} block Block to generate the code from.
   * @return {array} Completed code with order of operation.
   */
  Arduino.forBlock["procedures_callreturn"] = function (block) {
    var funcName = Arduino.nameDB_.getName(
      block.getFieldValue("NAME"),
      Blockly.Names.NameType.PROCEDURE,
    );
    var args = [];
    for (var x = 0; x < block.arguments_.length; x++) {
      args[x] =
        Arduino.valueToCode(block, "ARG" + x, Arduino.ORDER_NONE) || "null";
    }
    var code = funcName + "(" + args.join(", ") + ")";
    return [code, Arduino.ORDER_UNARY_POSTFIX];
  };

  /**
   * Code generator to create a function call without a return value.
   * Arduino code: loop { functionname() }
   * @param {!Block} block Block to generate the code from.
   * @return {string} Completed code.
   */
  Arduino.forBlock["procedures_callnoreturn"] = function (block) {
    var funcName = Arduino.nameDB_.getName(
      block.getFieldValue("NAME"),
      Blockly.Names.NameType.PROCEDURE,
    );
    var args = [];
    for (var x = 0; x < block.arguments_.length; x++) {
      args[x] =
        Arduino.valueToCode(block, "ARG" + x, Arduino.ORDER_NONE) || "null";
    }
    return funcName + "(" + args.join(", ") + ");\n";
  };

  /**
   * Code generator to create a conditional (X) return value (Y) for a function.
   * Arduino code: if (X) { return Y; }
   * @param {!Block} block Block to generate the code from.
   * @return {string} Completed code.
   */
  Arduino.forBlock["procedures_ifreturn"] = function (block) {
    var condition =
      Arduino.valueToCode(block, "CONDITION", Arduino.ORDER_NONE) || "false";
    var code = "if (" + condition + ") {\n";
    if (block.hasReturnValue_) {
      var value =
        Arduino.valueToCode(block, "VALUE", Arduino.ORDER_NONE) || "null";
      code += "  return " + value + ";\n";
    } else {
      code += "  return;\n";
    }
    code += "}\n";
    return code;
  };

  /**
   * Code generator to add code into the setup() and loop() functions.
   * Its use is not mandatory, but necessary to add manual code to setup().
   * @param {!Block} block Block to generate the code from.
   * @return {string} Completed code.
   */
  Arduino.forBlock["arduino_functions"] = function (block) {
    function statementToCodeNoTab(block, name) {
      var targetBlock = block.getInputTargetBlock(name);
      var code = Arduino.blockToCode(targetBlock);
      if (!code.isString()) {
        throw 'Expecting code from statement block "' + targetBlock.type + '".';
      }
      return code;
    }

    var setupBranch = Arduino.statementToCode(block, "SETUP_FUNC");
    //var setupCode = Arduino.scrub_(block, setupBranch); No comment block
    if (setupBranch) {
      Arduino.addSetup("userSetupCode", setupBranch, true);
    }

    //var loopcode = Arduino.scrub_(block, loopBranch); No comment block
    return statementToCodeNoTab(block, "LOOP_FUNC");
  };
}

export default getCodeGenerators;
