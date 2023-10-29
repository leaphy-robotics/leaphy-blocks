function getCodeGenerators(Arduino) {
  Arduino.forBlock["leaphy_start"] = function (block) {
    // Define the Start procedure
    var funcName = "leaphyProgram";
    var branch = Arduino.statementToCode(block, "STACK");
    if (Arduino.STATEMENT_PREFIX) {
      var id = block.id.replace(/\$/g, "$$$$"); // Issue 251.
      branch =
        Arduino.prefixLines(
          Arduino.STATEMENT_PREFIX.replace(/%1/g, "'" + id + "'"),
          Arduino.INDENT,
        ) + branch;
    }
    if (Arduino.INFINITE_LOOP_TRAP) {
      branch =
        Arduino.INFINITE_LOOP_TRAP.replace(/%1/g, "'" + block.id + "'") +
        branch;
    }
    var returnType = "void";
    var code = returnType + " " + funcName + "() {\n" + branch + "}";

    code = Arduino.scrub_(block, code);
    Arduino.definitions_[funcName] = code;
    Arduino.addSetup("userSetupCode", funcName + "();", false);
    return null;
  };

  Arduino.forBlock["leaphy_serial_print_line"] = function (block) {
    Arduino.addSetup("serial", "Serial.begin(115200);", false);
    var value = Arduino.valueToCode(this, "VALUE", Arduino.ORDER_ATOMIC) || "0";
    var code = "Serial.println(" + value + ");\n";
    return code;
  };

  Arduino.forBlock["leaphy_serial_print_value"] = function (block) {
    Arduino.addSetup("serial", "Serial.begin(115200);", false);
    var name = Arduino.valueToCode(this, "NAME", Arduino.ORDER_ATOMIC) || "0";
    var value = Arduino.valueToCode(this, "VALUE", Arduino.ORDER_ATOMIC) || "0";
    var code =
      "Serial.print(" +
      name +
      ');\nSerial.print(" = ");\nSerial.println(' +
      value +
      ");\n";
    return code;
  };
}

export default getCodeGenerators;
