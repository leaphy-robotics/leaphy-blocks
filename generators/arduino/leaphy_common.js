import { addI2CDeclarations } from "./i2c";

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

  Arduino.forBlock["leaphy_serial_available"] = function (block) {
    Arduino.addSetup("serial", "Serial.begin(115200);", false);
    var code = "Serial.available()";
    return [code, Arduino.ORDER_ATOMIC];
  };

  Arduino.forBlock["leaphy_serial_read_line"] = function (block) {
    Arduino.addSetup("serial", "Serial.begin(115200);", false);
    var code = "Serial.readStringUntil('\\n')";
    return [code, Arduino.ORDER_ATOMIC];
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
    const setup = Arduino.addI2CSetup(
      "compass",
      "compass.init();\n    compass.setMagneticDeclination(2, 30);\n",
    );
    Arduino.addDeclaration(
      "leaphy_compass_read",
      "int getCompassDegrees() {\n" +
        "    " +
        setup +
        "\n" +
        "    compass.read();\n" +
        "    int azimuth = compass.getAzimuth();\n" +
        "    return round((azimuth > -0.5) ? azimuth : azimuth + 360);\n" +
        "}\n",
    );
    return ["getCompassDegrees()", Arduino.ORDER_ATOMIC];
  };

  Arduino.forBlock["leaphy_gas_sensor"] = function (block) {
    Arduino.addInclude("leaphy_gas_sensor", "#include <Adafruit_SGP30.h>");
    Arduino.addDeclaration("leaphy_gas_sensor", "Adafruit_SGP30 sgp;");
    const setup = Arduino.addI2CSetup("gas", "if (! sgp.begin()) return -1;\n");

    let gasValue = block.getFieldValue("GAS");
    let code = "";
    if (gasValue === "TVOC") {
      code = "getGasValueTVOC()";
      Arduino.addDeclaration(
        "leaphy_gas_valueTVOC",
        "int getGasValueTVOC() {\n" +
          "    " +
          setup +
          "    sgp.IAQmeasure();\n" +
          "    return " +
          "sgp.TVOC" +
          ";\n}\n",
      );
    } else if (gasValue === "eCO2") {
      code = "getGasValueCOTWO()";
      Arduino.addDeclaration(
        "leaphy_gas_valueCOTWO",
        "int getGasValueCOTWO() {\n" +
          "    " +
          setup +
          "    sgp.IAQmeasure();\n" +
          "    return " +
          "sgp.eCO2" +
          ";\n}\n",
      );
    } else if (gasValue === "Raw H2") {
      code = "getGasValueHTWO()";
      Arduino.addDeclaration(
        "leaphy_gas_valueHTWO",
        "int getGasValueHTWO() {\n" +
          "    " +
          setup +
          "    sgp.IAQmeasureRaw();\n" +
          "    return " +
          "sgp.rawH2" +
          ";\n}\n",
      );
    } else if (gasValue === "RAWETHANOL") {
      code = "getGasValueETHANOL()";
      Arduino.addDeclaration(
        "leaphy_gas_valueETHANOL",
        "int getGasValueETHANOL() {\n" +
          "    " +
          setup +
          "    sgp.IAQmeasureRaw();\n" +
          "    return " +
          "sgp.rawEthanol" +
          ";\n}\n",
      );
    }
    return [code, Arduino.ORDER_ATOMIC];
  };

  Arduino.forBlock["leaphy_i2c_rgb_color"] = function (block) {
    const setup = Arduino.addI2CSetup("apds9960", "APDS.begin();\n");

    const rgb_declaration =
      "int r[8], g[8], b[8], a[8];\n" +
      "int getAPDS9960Color(int colorType) {\n" +
      "    " +
      setup +
      "    uint8_t channel = i2cChannelStack.i2cGetChannel();\n" +
      "    if (APDS.colorAvailable()) {\n" +
      "        APDS.readColor(r[channel], g[channel], b[channel], a[channel]);\n" +
      "    }\n" +
      "    switch(colorType) {\n" +
      "      case 0:\n" +
      "        return r[channel];\n" +
      "      case 1:\n" +
      "        return g[channel];\n" +
      "      case 2:\n" +
      "        return b[channel];\n" +
      "      case 3:\n" +
      "        return a[channel];\n" +
      "    }\n" +
      "}\n";
    let colorType = block.getFieldValue("COLOR_TYPE");

    Arduino.addInclude("apds9960", "#include <Arduino_APDS9960.h>");
    Arduino.addDeclaration("apds9960_rgb", rgb_declaration);
    let code = "getAPDS9960Color(" + colorType + ")";
    return [code, Arduino.ORDER_ATOMIC];
  };

  Arduino.forBlock["leaphy_i2c_gesture"] = function (block) {
    const setup = Arduino.addI2CSetup("apds9960", "APDS.begin();\n");
    const gesture_declaration =
      "int gesture[8];\n" +
      "int getAPDS9960Gesture() {\n" +
      "    " +
      setup +
      "    uint8_t channel = i2cChannelStack.i2cGetChannel();\n" +
      "    if (APDS.gestureAvailable()) {\n" +
      "        gesture[channel] = APDS.readGesture();\n" +
      "    }\n" +
      "    return gesture[channel];\n" +
      "}\n";
    Arduino.addInclude("apds9960", "#include <Arduino_APDS9960.h>");
    Arduino.addDeclaration("apds9960_gesture", gesture_declaration);
    let code = "getAPDS9960Gesture()";
    return [code, Arduino.ORDER_ATOMIC];
  };

  Arduino.forBlock["i2c_use_channel"] = function (block) {
    const channel = block.getFieldValue("CHANNEL");
    const innerCode = Arduino.statementToCode(block, "DO");

    addI2CDeclarations();

    const code =
      "i2cSelectChannel(" +
      channel +
      ");\n" +
      innerCode +
      "i2cRestoreChannel();\n";

    return code;
  };
}

export default getCodeGenerators;
