import { addI2CDeclarations } from "./i2c";
import { Arduino } from "../arduino";

function getCodeGenerators(arduino: Arduino) {
    arduino.forBlock["leaphy_start"] = function (block) {
        // Define the Start procedure
        const funcName = "leaphyProgram";
        let branch = arduino.statementToCode(block, "STACK");
        if (arduino.STATEMENT_PREFIX) {
            const id = block.id.replace(/\$/g, "$$$$"); // Issue 251.
            branch =
                arduino.prefixLines(
                    arduino.STATEMENT_PREFIX.replace(/%1/g, "'" + id + "'"),
                    arduino.INDENT,
                ) + branch;
        }
        if (arduino.INFINITE_LOOP_TRAP) {
            branch =
                arduino.INFINITE_LOOP_TRAP.replace(
                    /%1/g,
                    "'" + block.id + "'",
                ) + branch;
        }
        const returnType = "void";
        let code = returnType + " " + funcName + "() {\n" + branch + "}";

        code = arduino.scrub_(block, code);
        arduino.addDeclaration(funcName, code, true);
        arduino.addSetup("userSetupCode", funcName + "();", false);
        return null;
    };

    arduino.forBlock["leaphy_serial_available"] = function () {
        arduino.addSetup("serial", "Serial.begin(115200);", false);
        const code = "Serial.available()";
        return [code, arduino.ORDER_ATOMIC];
    };

    arduino.forBlock["leaphy_serial_read_line"] = function () {
        arduino.addSetup("serial", "Serial.begin(115200);", false);
        const code = "Serial.readStringUntil('\\n')";
        return [code, arduino.ORDER_ATOMIC];
    };

    arduino.forBlock["leaphy_serial_print_line"] = function (block) {
        arduino.addSetup("serial", "Serial.begin(115200);", false);
        const value =
            arduino.valueToCode(block, "VALUE", arduino.ORDER_ATOMIC) || "0";
        return "Serial.println(" + value + ");\n";
    };
    arduino.forBlock["leaphy_serial_print_without_line"] = function (block) {
        arduino.addSetup("serial", "Serial.begin(115200);", false);
        const value =
            arduino.valueToCode(block, "VALUE", arduino.ORDER_ATOMIC) || "0";
        return "Serial.print(" + value + ");\n";
    };
    arduino.forBlock["leaphy_serial_print_value"] = function (block) {
        arduino.addSetup("serial", "Serial.begin(115200);", false);
        const name =
            arduino.valueToCode(block, "NAME", arduino.ORDER_ATOMIC) || "0";
        const value =
            arduino.valueToCode(block, "VALUE", arduino.ORDER_ATOMIC) || "0";
        return (
            `Serial.print(${name});\n` +
            `Serial.print(" = ");\n` +
            `Serial.println(${value});\n`
        );
    };

    arduino.forBlock["leaphy_compass_degrees"] = function () {
        arduino.addInclude("leaphy_compass", "#include <QMC5883LCompass.h>");
        arduino.addDeclaration("leaphy_compass", "QMC5883LCompass compass;");
        const setup = arduino.addI2CSetup(
            "compass",
            "compass.init();\n    compass.setMagneticDeclination(2, 30);\n",
        );
        arduino.addDeclaration(
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
        return ["getCompassDegrees()", arduino.ORDER_ATOMIC];
    };

    arduino.forBlock["leaphy_tof_get_distance"] = function () {
        arduino.addInclude("leaphy_tof", "#include <Adafruit_VL53L0X.h>");
        arduino.addDeclaration("leaphy_tof", "Adafruit_VL53L0X i2c_distance;");
        const setup = arduino.addI2CSetup(
            "tof",
            "i2c_distance.begin();\n" +
                "      i2c_distance.setMeasurementTimingBudgetMicroSeconds(20000);\n",
        );
        arduino.addDeclaration(
            "leaphy_tof_read",
            "int getTOF() {\n" +
                `    ${setup}\n` +
                "    VL53L0X_RangingMeasurementData_t measure;\n" +
                "    i2c_distance.rangingTest(&measure, false);\n" +
                "    if (measure.RangeStatus == 4) return -1;\n" +
                "    return measure.RangeMilliMeter;\n" +
                "}",
        );
        return ["getTOF()", arduino.ORDER_ATOMIC];
    };

    arduino.forBlock["leaphy_get_air_pressure"] = function () {
        arduino.addInclude("bmp280", "#include <Adafruit_BMP280.h>");
        arduino.addDeclaration("bmp280", "Adafruit_BMP280 bmp280;");
        const setup = arduino.addI2CSetup(
            "bmp280",
            "bmp280.begin(BMP280_ADDRESS_ALT);\n" +
                "      bmp280.setSampling(Adafruit_BMP280::MODE_NORMAL,\n" +
                "                      Adafruit_BMP280::SAMPLING_X2,\n" +
                "                      Adafruit_BMP280::SAMPLING_X16,\n" +
                "                      Adafruit_BMP280::FILTER_X16,\n" +
                "                      Adafruit_BMP280::STANDBY_MS_500);\n",
        );
        arduino.addDeclaration(
            "bmp280_get_air_pressure",
            "double getAirPressure() {\n" +
                `    ${setup}\n` +
                "    return bmp280.readPressure() / 100;\n" +
                "}",
        );
        return ["getAirPressure()", arduino.ORDER_ATOMIC];
    };

    arduino.forBlock["leaphy_gas_sensor"] = function (block) {
        arduino.addInclude("leaphy_gas_sensor", "#include <Adafruit_SGP30.h>");
        arduino.addDeclaration("leaphy_gas_sensor", "Adafruit_SGP30 sgp;");
        const setup = arduino.addI2CSetup(
            "gas",
            "if (! sgp.begin()) return -1;\n",
        );

        const gasValue = block.getFieldValue("GAS");
        let code = "";
        if (gasValue === "TVOC") {
            code = "getGasValueTVOC()";
            arduino.addDeclaration(
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
            arduino.addDeclaration(
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
            arduino.addDeclaration(
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
            arduino.addDeclaration(
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
        return [code, arduino.ORDER_ATOMIC];
    };

    arduino.forBlock["leaphy_i2c_rgb_color"] = function (block) {
        const setup = arduino.addI2CSetup("apds9960", "APDS.begin();\n");

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
        const colorType = block.getFieldValue("COLOR_TYPE");

        arduino.addInclude("apds9960", "#include <Arduino_APDS9960.h>");
        arduino.addDeclaration("apds9960_rgb", rgb_declaration);
        const code = "getAPDS9960Color(" + colorType + ")";
        return [code, arduino.ORDER_ATOMIC];
    };

    arduino.forBlock["leaphy_i2c_gesture"] = function () {
        const setup = arduino.addI2CSetup("apds9960", "APDS.begin();\n");
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
        arduino.addInclude("apds9960", "#include <Arduino_APDS9960.h>");
        arduino.addDeclaration("apds9960_gesture", gesture_declaration);
        const code = "getAPDS9960Gesture()";
        return [code, arduino.ORDER_ATOMIC];
    };

    arduino.forBlock["i2c_use_channel"] = function (block) {
        const channel = block.getFieldValue("CHANNEL");
        const innerCode = arduino.statementToCode(block, "DO");

        addI2CDeclarations();

        return (
            "i2cSelectChannel(" +
            channel +
            ");\n" +
            innerCode +
            "i2cRestoreChannel();\n"
        );
    };

    arduino.forBlock["i2c_list_devices"] = function () {
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

        arduino.addSetup("serial", "Serial.begin(115200);", false);
        addI2CDeclarations();
        arduino.addInclude("i2c_device_map", DEVICE_CHANNEL_MAP);
        arduino.addDeclaration("i2c_list_devices", LIST_DEVICES);

        return "i2cListDevices();\n";
    };

    arduino.forBlock["leaphy_segment_init"] = function (block) {
        const clk = block.getFieldValue("CLK");
        const dio = block.getFieldValue("DIO");

        arduino.addInclude("tm1637", "#include <TM1637Display.h>");
        arduino.addDeclaration(
            "segment",
            `TM1637Display segment_display(${clk}, ${dio});`,
        );
        arduino.addSetup(
            "segment",
            "segment_display.setBrightness(255);\n",
            false,
        );

        return "";
    };

    arduino.forBlock["leaphy_segment_set"] = function (block) {
        const num =
            arduino.valueToCode(block, "NUM", arduino.ORDER_ATOMIC) || "0";

        return `segment_display.showNumberDec(${num});\n`;
    };

    arduino.forBlock["leaphy_segment_clear"] = function () {
        return "segment_display.clear();\n";
    };

    arduino.forBlock["leaphy_segment_set_brightness"] = function (block) {
        const brightness =
            arduino.valueToCode(block, "BRIGHTNESS", arduino.ORDER_ATOMIC) ||
            "0";

        return `segment_display.setBrightness(${brightness}/100*255);\n`;
    };

    arduino.forBlock["leaphy_matrix_init"] = function (block) {
        const din = block.getFieldValue("DIN");
        const clk = block.getFieldValue("CLK");
        const cs = block.getFieldValue("CS");

        arduino.addInclude("matrix", "#include <LedControl.h>");
        arduino.addDeclaration(
            "matrix",
            `LedControl matrix = LedControl(${din}, ${clk}, ${cs}, 1);`,
        );
        arduino.addSetup(
            "matrix",
            "matrix.shutdown(0, false);\n" +
                "  matrix.setIntensity(0, 8);\n" +
                "  matrix.clearDisplay(0);",
        );

        return "";
    };

    arduino.forBlock["leaphy_matrix_set"] = function (block) {
        const x = arduino.valueToCode(block, "X", arduino.ORDER_ATOMIC) || "0";
        const y = arduino.valueToCode(block, "Y", arduino.ORDER_ATOMIC) || "0";
        const on =
            arduino.valueToCode(block, "ON", arduino.ORDER_ATOMIC) || "0";

        return `matrix.setLed(0, ${y}, ${x}, ${on});\n`;
    };

    arduino.forBlock["leaphy_matrix_set_brightness"] = function (block) {
        const brightness =
            arduino.valueToCode(block, "BRIGHTNESS", arduino.ORDER_ATOMIC) ||
            "0";

        return `matrix.setIntensity(0, ${brightness}/100*16);\n`;
    };

    arduino.forBlock["leaphy_matrix_clear"] = function () {
        return `matrix.clearDisplay(0);\n`;
    };

    arduino.forBlock["leaphy_matrix_fill"] = function (block) {
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

    arduino.forBlock["leaphy_sound_init"] = function (block) {
        const RX = block.getFieldValue("RX");
        const TX = block.getFieldValue("TX");

        arduino.addInclude("sound", "#include <RedMP3.h>");
        arduino.addDeclaration("sound", `MP3 mp3(${RX}, ${TX});`);

        return "";
    };

    arduino.forBlock["leaphy_sound_play"] = function (block) {
        const item =
            arduino.valueToCode(block, "ITEM", arduino.ORDER_ATOMIC) || "0";

        return `mp3.playWithIndex(${item});\n`;
    };

    arduino.forBlock["leaphy_sound_stop"] = function () {
        return "mp3.stopPlay();\n";
    };

    arduino.forBlock["leaphy_sound_set_volume"] = function (block) {
        const volume =
            arduino.valueToCode(block, "VOLUME", arduino.ORDER_ATOMIC) || "0";

        return `mp3.setVolume(${volume}/100.0*30.0);\n`;
    };
}

export default getCodeGenerators;
