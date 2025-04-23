import { Arduino } from "../arduino";

function getCodeGenerators(arduino: Arduino) {
    function addRGBColorDefinitions() {
        const includeDefinition = '#include "Adafruit_TCS34725.h"';
        const variablesDefinition =
            "Adafruit_TCS34725 tcs = Adafruit_TCS34725(TCS34725_INTEGRATIONTIME_24MS, TCS34725_GAIN_16X);\n";
        const rgbColorSetupCode =
            'if (tcs.begin()) {\n    Serial.println("RGB-sensor gevonden!");\n  } else {\n    Serial.println("Geen RGB-sensor gevonden... check je verbindingen...");\n  }\n';
        const rgbColorSetup = arduino.addI2CSetup(
            "rgb_color",
            rgbColorSetupCode,
        );
        const getColorDefinition =
            "double getColor(int colorCode, bool isRaw) {\n" +
            "  " +
            rgbColorSetup +
            "  uint16_t RawColor_Red, RawColor_Green, RawColor_Blue, RawColor_Clear;\n" +
            "  byte Color_Red, Color_Green, Color_Blue, Color_Clear;\n" +
            "  tcs.getRawData(&RawColor_Red, &RawColor_Green, &RawColor_Blue, &RawColor_Clear);\n" +
            "  Color_Red = min(RawColor_Red/5,255); Color_Green = min(RawColor_Green/5,255); Color_Blue = min(RawColor_Blue/5,255);\n" +
            "  switch(colorCode) {\n" +
            "    case 0:\n" +
            "      return (isRaw) ? RawColor_Red : Color_Red;\n" +
            "    case 1:\n" +
            "      return (isRaw) ? RawColor_Green : Color_Green;\n" +
            "    case 2:\n" +
            "      return (isRaw) ? RawColor_Blue : Color_Blue;\n" +
            "  }\n" +
            "}\n";
        arduino.addInclude("define_leaphy_rgb", includeDefinition);
        arduino.addInclude("define_leaphy_rgb_var", variablesDefinition);
        arduino.addDeclaration("define_get_color", getColorDefinition);
    }

    arduino.forBlock["leaphy_rgb_color"] = function (block) {
        addRGBColorDefinitions();
        const colorType = block.getFieldValue("COLOR_TYPE");
        const code = "getColor(" + colorType + ", false)";
        return [code, arduino.ORDER_ATOMIC];
    };

    arduino.forBlock["leaphy_rgb_color_raw"] = function (block) {
        addRGBColorDefinitions();
        const colorType = block.getFieldValue("COLOR_TYPE_RAW");
        const code = "getColor(" + colorType + ", true)";
        return [code, arduino.ORDER_ATOMIC];
    };

    arduino.forBlock["leaphy_rgb_raw_color_red"] = function () {
        addRGBColorDefinitions();
        const code = "getColor(0, true)";
        return [code, arduino.ORDER_ATOMIC];
    };

    arduino.forBlock["leaphy_rgb_raw_color_green"] = function () {
        addRGBColorDefinitions();
        const code = "getColor(1, true)";
        return [code, arduino.ORDER_ATOMIC];
    };

    arduino.forBlock["leaphy_rgb_raw_color_blue"] = function () {
        addRGBColorDefinitions();
        const code = "getColor(2, true)";
        return [code, arduino.ORDER_ATOMIC];
    };

    arduino.forBlock["leaphy_led_set_strip"] = function (block) {
        const pin =
            arduino.valueToCode(block, "LED_SET_PIN", arduino.ORDER_ATOMIC) ||
            "0";
        const leds =
            arduino.valueToCode(block, "LED_SET_LEDS", arduino.ORDER_ATOMIC) ||
            "0";

        arduino.addInclude("led_libs", '#include "ledstrip.h"');
        arduino.addDeclaration(
            "leds_pins",
            `LEDSTRIP ledstrip(${pin}, ${leds});`,
        );

        arduino.reservePin(block, pin, arduino.PinTypes.LEDSTRIP, "Led Strip");
        return "";
    };

    arduino.forBlock["leaphy_led_set_basic"] = function (block) {
        const led =
            arduino.valueToCode(block, "LED_SET_LED", arduino.ORDER_ATOMIC) ||
            "0";
        const red =
            arduino.valueToCode(block, "LED_BASIC_RED", arduino.ORDER_ATOMIC) ||
            "0";
        const green =
            arduino.valueToCode(
                block,
                "LED_BASIC_GREEN",
                arduino.ORDER_ATOMIC,
            ) || "0";
        const blue =
            arduino.valueToCode(
                block,
                "LED_BASIC_BLUE",
                arduino.ORDER_ATOMIC,
            ) || "0";
        return `ledstrip.basis(${led}, ${red}, ${green}, ${blue});\n`;
    };

    arduino.forBlock["leaphy_led_set_speed"] = function (block) {
        const speedValue =
            arduino.valueToCode(
                block,
                "LED_SET_SPEEDVALUE",
                arduino.ORDER_ATOMIC,
            ) || "0";
        return `_snelHeid = ${speedValue}`;
    };

    arduino.forBlock["leaphy_led_strip_demo"] = function (block) {
        const dropdownType = block.getFieldValue("DEMO_TYPE");
        const red =
            arduino.valueToCode(
                block,
                "LED_STRIP_DEMO_RED",
                arduino.ORDER_ATOMIC,
            ) || "0";
        const green =
            arduino.valueToCode(
                block,
                "LED_STRIP_DEMO_GREEN",
                arduino.ORDER_ATOMIC,
            ) || "0";
        const blue =
            arduino.valueToCode(
                block,
                "LED_STRIP_DEMO_BLUE",
                arduino.ORDER_ATOMIC,
            ) || "0";
        return `ledstrip.runFunction(${dropdownType}, ${red}, ${green}, ${blue});\n`;
    };

    arduino.forBlock["leaphy_servo_write"] = function (block) {
        const pinKey = block.getFieldValue("SERVO_PIN");
        const servoAngle =
            arduino.valueToCode(block, "SERVO_ANGLE", arduino.ORDER_ATOMIC) ||
            "90";
        const servoName = "myServo" + pinKey;

        arduino.reservePin(
            block,
            pinKey,
            arduino.PinTypes.SERVO,
            "Servo Write",
        );

        arduino.includeServoHeader();
        arduino.addDeclaration("servo_" + pinKey, "Servo " + servoName + ";");

        const setupCode = servoName + ".attach(" + pinKey + ");";
        arduino.addSetup("servo_" + pinKey, setupCode, true);

        return `${servoName}.write(${servoAngle});\n`;
    };

    arduino.forBlock["leaphy_servo_read"] = function (block) {
        const pinKey = block.getFieldValue("SERVO_PIN");
        const servoName = "myServo" + pinKey;

        arduino.reservePin(block, pinKey, arduino.PinTypes.SERVO, "Servo Read");

        arduino.includeServoHeader();
        arduino.addDeclaration("servo_" + pinKey, "Servo " + servoName + ";");

        const setupCode = servoName + ".attach(" + pinKey + ");";
        arduino.addSetup("servo_" + pinKey, setupCode, true);

        const code = servoName + ".read()";
        return [code, arduino.ORDER_ATOMIC];
    };

    arduino.forBlock["leaphy_io_digitalwrite"] = function (block) {
        const pin = block.getFieldValue("PIN");
        const stateOutput =
            arduino.valueToCode(block, "STATE", arduino.ORDER_ATOMIC) ||
            "false";

        arduino.reservePin(
            block,
            pin,
            arduino.PinTypes.OUTPUT,
            "Digital Write",
        );

        const pinSetupCode = "pinMode(" + pin + ", OUTPUT);";
        arduino.addSetup("io_" + pin, pinSetupCode, false);

        return `digitalWrite(${pin}, ${stateOutput});\n`;
    };

    arduino.forBlock["leaphy_io_analogwrite"] = function (block) {
        const pin = block.getFieldValue("PIN");
        const stateOutput =
            arduino.valueToCode(block, "NUM", arduino.ORDER_ATOMIC) || "0";

        arduino.reservePin(
            block,
            pin,
            arduino.PinTypes.OUTPUT,
            "Analogue Write",
        );

        const pinSetupCode = "pinMode(" + pin + ", OUTPUT);";
        arduino.addSetup("io_" + pin, pinSetupCode, false);

        // Warn if the input value is out of range
        if (Number(stateOutput) < 0 || Number(stateOutput) > 255) {
            block.setWarningText(
                "The analogue value set must be between 0 and 255",
                "pwm_value",
            );
        } else {
            block.setWarningText(null);
        }

        return `analogWrite(${pin}, ${stateOutput});\n`;
    };

    arduino.forBlock["leaphy_multiplexer_digitalwrite"] = function (block) {
        const pin = block.getFieldValue("PIN");

        const pinSetupCode =
            "pinMode(0, OUTPUT);\n" +
            "  pinMode(16, OUTPUT);\n" +
            "  pinMode(1, OUTPUT);\n";
        arduino.addSetup("dgmulti", pinSetupCode, false);

        return (
            `digitalWrite(0, bitRead(${pin}, 2));\n` +
            `digitalWrite(16, bitRead(${pin}, 1));\n` +
            `digitalWrite(1, bitRead(${pin}, 0));\n`
        );
    };

    arduino.forBlock["leaphy_sonar_read"] = function (block) {
        arduino.addInclude("leaphy_extra", '#include "Leaphy_Extra.h"');
        const trigPin = block.getFieldValue("TRIG_PIN");
        const echoPin = block.getFieldValue("ECHO_PIN");
        const code = `getDistanceSonar(${trigPin}, ${echoPin})`;
        return [code, arduino.ORDER_ATOMIC];
    };

    const addDisplaySetupCode = () => {
        const displaySetup =
            'if(!display.begin())\n  {\n    Serial.println(F("Contact with the display failed: Check the connections"));\n  }\n';
        const setup = arduino.addI2CSetup("oled", displaySetup);

        arduino.addInclude("include_display", '#include "OLED_Display.h"');
        arduino.addInclude("define_display", "OLEDDISPLAY display;");
        arduino.addSetup("serial", "Serial.begin(115200);");
        return setup;
    };

    arduino.forBlock["leaphy_display_clear"] = function () {
        const setup = addDisplaySetupCode();
        return setup + "display.clearDisplay();\n";
    };

    arduino.forBlock["leaphy_display_set_text_size"] = function (block) {
        const setup = addDisplaySetupCode();

        const stateOutput =
            arduino.valueToCode(block, "NUM", arduino.ORDER_ATOMIC) || "0";
        return setup + "display.setTextSize(" + stateOutput + ");\n";
    };

    arduino.forBlock["leaphy_display_print_line"] = function (block) {
        const setup = addDisplaySetupCode();

        const value =
            arduino.valueToCode(block, "VALUE", arduino.ORDER_ATOMIC) || "0";
        const row = block.getFieldValue("DISPLAY_ROW");
        const cursorHeight = row * 12;
        return (
            setup +
            `display.setCursor(0, ${cursorHeight});\n` +
            `display.println(${value});\n`
        );
    };

    arduino.forBlock["leaphy_display_print_value"] = function (block) {
        const setup = addDisplaySetupCode();

        const name =
            arduino.valueToCode(block, "NAME", arduino.ORDER_ATOMIC) || "0";
        const value =
            arduino.valueToCode(block, "VALUE", arduino.ORDER_ATOMIC) || "0";
        const row = block.getFieldValue("DISPLAY_ROW");
        const cursorHeight = row * 12;
        return (
            setup +
            `display.setCursor(0, ${cursorHeight});\n` +
            `display.print(${name});\n` +
            `display.print(" = ");\n` +
            `display.println(${value});\n`
        );
    };

    arduino.forBlock["leaphy_display_display"] = function () {
        const setup = addDisplaySetupCode();
        return setup + "display.display();\n";
    };
}

export default getCodeGenerators;
