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

  Arduino.forBlock["leaphy_compass_degrees"] = function (block) {
    Arduino.addInclude("leaphy_compass", "#include <QMC5883LCompass.h>");
    Arduino.addDeclaration("leaphy_compass", "QMC5883LCompass compass;");
    Arduino.addDeclaration(
      "leaphy_compass_read",
      "int getCompassDegrees() {\n" +
        "    compass.read();\n" +
        "    int azimuth = compass.getAzimuth();\n" +
        "    return round((azimuth > -0.5) ? azimuth : azimuth + 360);\n" +
        "}\n",
    );
    Arduino.addSetup(
      "leaphy_compass",
      "compass.init();\n  compass.setMagneticDeclination(2, 30);",
    );
    var code = "getCompassDegrees()";
    return [code, Arduino.ORDER_ATOMIC];
  };

  Arduino.forBlock["leaphy_gas_sensor"] = function (block) {
    Arduino.addInclude("leaphy_gas_sensor", "#include <Adafruit_SGP30.h>");
    Arduino.addDeclaration(
      "leaphy_gas_sensor",
      "Adafruit_SGP30 sgp;",
    );
    Arduino.addSetup("leaphy_gas_sensor", "if (! sgp.begin()){\n" +
      "\treturn -1;\n" +
    "}");

    var gasValue = block.getFieldValue("GAS");
    let code = "";
    if (gasValue == "TVOC") {
      code = "sgp.TVOC";
    } else if (gasValue == "eCO2") {
      code = "sgp.eCO2";
    } else if (gasValue == "Raw H2") {
      code = "sgp.rawH2";
    } else if (gasValue == "Raw Ethanol") {
      code = "sgp.rawEthanol";
    }

    return [code, Arduino.ORDER_ATOMIC];
  }

  Arduino.forBlock["leaphy_i2c_rgb_color"] = function (block) {
    const rgb_declaration =
      "int r = 0, g = 0, b = 0, a = 0;\n" +
      "int getAPDS9960Color(int colorType) {\n" +
      "    if (APDS.colorAvailable()) {\n" +
      "        APDS.readColor(r, g, b, a);\n" +
      "    }\n" +
      "    switch(colorType) {\n" +
      "      case 0:\n" +
      "        return r;\n" +
      "      case 1:\n" +
      "        return g;\n" +
      "      case 2:\n" +
      "        return b;\n" +
      "      case 3:\n" +
      "        return a;\n" +
      "    }\n" +
      "}\n";
    let colorType = block.getFieldValue("COLOR_TYPE");

    Arduino.addInclude("apds9960", "#include <Arduino_APDS9960.h>");
    Arduino.addSetup("apds9960", "APDS.begin();");
    Arduino.addDeclaration("apds9960_rgb", rgb_declaration);
    let code = "getAPDS9960Color(" + colorType + ")";
    return [code, Arduino.ORDER_ATOMIC];
  };

  Arduino.forBlock["leaphy_i2c_gesture"] = function (block) {
    const gesture_declaration =
      "int gesture = GESTURE_NONE;\n" +
      "int getAPDS9960Gesture() {\n" +
      "    if (APDS.gestureAvailable()) {\n" +
      "        gesture = APDS.readGesture();\n" +
      "    }\n" +
      "    return gesture;\n" +
      "}\n";
    Arduino.addInclude("apds9960", "#include <Arduino_APDS9960.h>");
    Arduino.addSetup("apds9960", "APDS.begin();");
    Arduino.addDeclaration("apds9960_gesture", gesture_declaration);
    let code = "getAPDS9960Gesture()";
    return [code, Arduino.ORDER_ATOMIC];
  };
}

export default getCodeGenerators;
