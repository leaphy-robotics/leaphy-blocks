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

  Arduino.forBlock["leaphy_tof_get_distance"] = function (block) {
    Arduino.addInclude("leaphy_tof", "#include <Adafruit_VL53L0X.h>");
    Arduino.addDeclaration("leaphy_tof", "Adafruit_VL53L0X i2c_distance;");
    const setup = Arduino.addI2CSetup(
      "tof",
      "i2c_distance.begin();\n" +
        "      i2c_distance.setMeasurementTimingBudgetMicroSeconds(20000);\n",
    );
    Arduino.addDeclaration(
      "leaphy_tof_read",
      "int getTOF() {\n" +
        `    ${setup}\n` +
        "    VL53L0X_RangingMeasurementData_t measure;\n" +
        "    i2c_distance.rangingTest(&measure, false);\n" +
        "    if (measure.RangeStatus == 4) return -1;\n" +
        "    return measure.RangeMilliMeter;\n" +
        "}",
    );
    return ["getTOF()", Arduino.ORDER_ATOMIC];
  };

  Arduino.forBlock["leaphy_get_air_pressure"] = function (block) {
    Arduino.addInclude("bmp280", "#include <Adafruit_BMP280.h>");
    Arduino.addDeclaration("bmp280", "Adafruit_BMP280 bmp280;");
    const setup = Arduino.addI2CSetup(
      "bmp280",
      "bmp280.begin(BMP280_ADDRESS_ALT);\n" +
        "      bmp280.setSampling(Adafruit_BMP280::MODE_NORMAL,\n" +
        "                      Adafruit_BMP280::SAMPLING_X2,\n" +
        "                      Adafruit_BMP280::SAMPLING_X16,\n" +
        "                      Adafruit_BMP280::FILTER_X16,\n" +
        "                      Adafruit_BMP280::STANDBY_MS_500);\n",
    );
    Arduino.addDeclaration(
      "bmp280_get_air_pressure",
      "double getAirPressure() {\n" +
        `    ${setup}\n` +
        "    return bmp280.readPressure() / 100;\n" +
        "}",
    );
    return ["getAirPressure()", Arduino.ORDER_ATOMIC];
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
      "    uint8_t channel = i2cGetChannel();\n" +
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
      "    uint8_t channel = i2cGetChannel();\n" +
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

  Arduino.forBlock["i2c_list_devices"] = function (block) {
    const LIST_DEVICES =
      "void i2cListDevices() {\n" +
      "    for (int channel = 0; channel < 8; channel++) {\n" +
      '        Serial.print("Scanning channel ");\n' +
      "        Serial.print(channel);\n" +
      '        Serial.println(":");\n' +
      "        \n" +
      "        i2cSelectChannel(channel);\n" +
      "        \n" +
      "        for (DeviceAddress address : deviceMap) {\n" +
      "            Wire.beginTransmission(address.address);\n" +
      "            int error = Wire.endTransmission();\n" +
      "            \n" +
      "            if (error == 0) {\n" +
      '                Serial.print("Found: ");\n' +
      "                Serial.print(address.device);\n" +
      '                Serial.print(" at address 0x");\n' +
      "                \n" +
      "                if (address.address < 16) {\n" +
      '                    Serial.print("0");\n' +
      "                }\n" +
      "                Serial.println(address.address, HEX);\n" +
      "            }\n" +
      "        }\n" +
      "        \n" +
      "        i2cRestoreChannel();\n" +
      "    }\n" +
      "}\n";

    const DEVICE_CHANNEL_MAP =
      "struct DeviceAddress { \n" +
      "  uint8_t address;\n" +
      "  char* device;\n" +
      "};\n" +
      "\n" +
      "DeviceAddress deviceMap[] = {\n" +
      '    {0x0D, "Compass"},\n' +
      '    {0x29, "Color Sensor / ToF Sensor"},\n' +
      '    {0x39, "RGB + Gesture Sensor"},\n' +
      '    {0x3C, "Screen"},\n' +
      '    {0x58, "Gas Sensor"},\n' +
      '    {0x76, "Air Pressure Sensor"}\n' +
      "};\n";

    Arduino.addSetup("serial", "Serial.begin(115200);", false);
    addI2CDeclarations();
    Arduino.addInclude("i2c_device_map", DEVICE_CHANNEL_MAP);
    Arduino.addDeclaration("i2c_list_devices", LIST_DEVICES);

    return "i2cListDevices();\n";
  };

  Arduino.forBlock["leaphy_segment_init"] = function (block) {
    const clk = block.getFieldValue("CLK");
    const dio = block.getFieldValue("DIO");

    Arduino.addInclude("tm1637", "#include <TM1637Display.h>");
    Arduino.addDeclaration(
      "segment",
      `TM1637Display segment_display(${clk}, ${dio});`,
    );
    Arduino.addSetup("segment", "segment_display.setBrightness(255);\n", false);

    return "";
  };

  Arduino.forBlock["leaphy_segment_set"] = function () {
    const num = Arduino.valueToCode(this, "NUM", Arduino.ORDER_ATOMIC) || "0";

    return `segment_display.showNumberDec(${num});\n`;
  };

  Arduino.forBlock["leaphy_segment_clear"] = function () {
    return "segment_display.clear();\n";
  };

  Arduino.forBlock["leaphy_segment_set_brightness"] = function () {
    const brightness =
      Arduino.valueToCode(this, "BRIGHTNESS", Arduino.ORDER_ATOMIC) || "0";

    return `segment_display.setBrightness(${brightness}/100*255);\n`;
  };

  Arduino.forBlock["leaphy_matrix_init"] = function (block) {
    const din = block.getFieldValue("DIN");
    const clk = block.getFieldValue("CLK");
    const cs = block.getFieldValue("CS");

    Arduino.addInclude("matrix", "#include <LedControl.h>");
    Arduino.addDeclaration(
      "matrix",
      `LedControl matrix = LedControl(${din}, ${clk}, ${cs}, 1);`,
    );
    Arduino.addSetup(
      "matrix",
      "matrix.shutdown(0, false);\n" +
        "  matrix.setIntensity(0, 8);\n" +
        "  matrix.clearDisplay(0);",
    );

    return "";
  };

  Arduino.forBlock["leaphy_matrix_set"] = function () {
    const x = Arduino.valueToCode(this, "X", Arduino.ORDER_ATOMIC) || "0";
    const y = Arduino.valueToCode(this, "Y", Arduino.ORDER_ATOMIC) || "0";
    const on = Arduino.valueToCode(this, "ON", Arduino.ORDER_ATOMIC) || "0";

    return `matrix.setLed(0, ${y}, ${x}, ${on});\n`;
  };

  Arduino.forBlock["leaphy_matrix_set_brightness"] = function () {
    const brightness =
      Arduino.valueToCode(this, "BRIGHTNESS", Arduino.ORDER_ATOMIC) || "0";

    return `matrix.setIntensity(0, ${brightness}/100*16);\n`;
  };

  Arduino.forBlock["leaphy_matrix_clear"] = function () {
    return `matrix.clearDisplay(0);\n`;
  };

  Arduino.forBlock["leaphy_matrix_fill"] = function (block) {
    const matrix = block.getFieldValue("MATRIX");

    return (
      `matrix.setRow(0, 0, B${matrix[0].join("")});\n` +
      `matrix.setRow(0, 1, B${matrix[1].join("")});\n` +
      `matrix.setRow(0, 2, B${matrix[2].join("")});\n` +
      `matrix.setRow(0, 3, B${matrix[3].join("")});\n` +
      `matrix.setRow(0, 4, B${matrix[4].join("")});\n` +
      `matrix.setRow(0, 5, B${matrix[5].join("")});\n` +
      `matrix.setRow(0, 6, B${matrix[6].join("")});\n` +
      `matrix.setRow(0, 7, B${matrix[7].join("")});\n`
    );
  };

  Arduino.forBlock["leaphy_sound_init"] = function (block) {
    const RX = block.getFieldValue("RX");
    const TX = block.getFieldValue("TX");

    Arduino.addInclude("sound", "#include <RedMP3.h>");
    Arduino.addDeclaration("sound", `MP3 mp3(${RX}, ${TX});`);

    return "";
  };

  Arduino.forBlock["leaphy_sound_play"] = function () {
    const item = Arduino.valueToCode(this, "ITEM", Arduino.ORDER_ATOMIC) || "0";

    return `mp3.playWithIndex(${item});\n`;
  };

  Arduino.forBlock["leaphy_sound_stop"] = function () {
    return "mp3.stopPlay();\n";
  };

  Arduino.forBlock["leaphy_sound_set_volume"] = function () {
    const volume =
      Arduino.valueToCode(this, "VOLUME", Arduino.ORDER_ATOMIC) || "0";

    return `mp3.setVolume(${volume}/100.0*30.0);\n`;
  };
}

export default getCodeGenerators;
