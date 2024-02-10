function getCodeGenerators(Arduino) {
  function addRGBColorDefinitions() {
    const includeDefinition = '#include "Adafruit_TCS34725.h"';
    const variablesDefinition =
      "Adafruit_TCS34725 tcs = Adafruit_TCS34725(TCS34725_INTEGRATIONTIME_24MS, TCS34725_GAIN_16X);\n";
    const rgbColorSetupCode =
      'if (tcs.begin()) {\n    Serial.println("RGB-sensor gevonden!");\n  } else {\n    Serial.println("Geen RGB-sensor gevonden... check je verbindingen...");\n  }\n';
    const rgbColorSetup = Arduino.addI2CSetup("rgb_color", rgbColorSetupCode);
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
    Arduino.addInclude("define_leaphy_rgb", includeDefinition);
    Arduino.addInclude("define_leaphy_rgb_var", variablesDefinition);
    Arduino.addDeclaration("define_get_color", getColorDefinition);
  }

  Arduino.forBlock["leaphy_rgb_color"] = function (block) {
    addRGBColorDefinitions();
    const colorType = block.getFieldValue("COLOR_TYPE");
    const code = "getColor(" + colorType + ", false)";
    return [code, Arduino.ORDER_ATOMIC];
  };

  Arduino.forBlock["leaphy_rgb_color_raw"] = function (block) {
    addRGBColorDefinitions();
    const colorType = block.getFieldValue("COLOR_TYPE_RAW");
    const code = "getColor(" + colorType + ", true)";
    return [code, Arduino.ORDER_ATOMIC];
  };

  Arduino.forBlock["leaphy_rgb_raw_color_red"] = function (block) {
    addRGBColorDefinitions();
    const code = "getColor(0, true)";
    return [code, Arduino.ORDER_ATOMIC];
  };

  Arduino.forBlock["leaphy_rgb_raw_color_green"] = function (block) {
    addRGBColorDefinitions();
    const code = "getColor(1, true)";
    return [code, Arduino.ORDER_ATOMIC];
  };

  Arduino.forBlock["leaphy_rgb_raw_color_blue"] = function (block) {
    addRGBColorDefinitions();
    const code = "getColor(2, true)";
    return [code, Arduino.ORDER_ATOMIC];
  };

  Arduino.forBlock["leaphy_led_set_strip"] = function (block) {
    var pin =
      Arduino.valueToCode(this, "LED_SET_PIN", Arduino.ORDER_ATOMIC) || "0";
    var leds =
      Arduino.valueToCode(this, "LED_SET_LEDS", Arduino.ORDER_ATOMIC) || "0";
    Arduino.definitions_["define_led_lib"] = '#include "ledstrip.h"';
    Arduino.definitions_["define_leds_pins"] =
      "LEDSTRIP ledstrip(" + pin + ", " + leds + ");";
    Arduino.reservePin(block, pin, Arduino.PinTypes.LEDSTRIP, "Led Strip");
    var code = "";
    return code;
  };

  Arduino.forBlock["leaphy_led_set_basic"] = function (block) {
    var led =
      Arduino.valueToCode(this, "LED_BASIC_LED", Arduino.ORDER_ATOMIC) || "0";
    var red =
      Arduino.valueToCode(this, "LED_BASIC_RED", Arduino.ORDER_ATOMIC) || "0";
    var green =
      Arduino.valueToCode(this, "LED_BASIC_GREEN", Arduino.ORDER_ATOMIC) || "0";
    var blue =
      Arduino.valueToCode(this, "LED_BASIC_BLUE", Arduino.ORDER_ATOMIC) || "0";
    var code =
      "ledstrip.basis(" +
      led +
      ", " +
      red +
      ", " +
      green +
      ", " +
      blue +
      ");\n";
    return code;
  };

  Arduino.forBlock["leaphy_led_set_speed"] = function (block) {
    var speedValue =
      Arduino.valueToCode(this, "LED_SET_SPEEDVALUE", Arduino.ORDER_ATOMIC) ||
      "0";
    var code = "_snelHeid = " + speedValue + ";\n";
    return code;
  };

  Arduino.forBlock["leaphy_led_strip_demo"] = function (block) {
    var dropdownType = block.getFieldValue("DEMO_TYPE");
    var red =
      Arduino.valueToCode(this, "LED_STRIP_DEMO_RED", Arduino.ORDER_ATOMIC) ||
      "0";
    var green =
      Arduino.valueToCode(this, "LED_STRIP_DEMO_GREEN", Arduino.ORDER_ATOMIC) ||
      "0";
    var blue =
      Arduino.valueToCode(this, "LED_STRIP_DEMO_BLUE", Arduino.ORDER_ATOMIC) ||
      "0";
    var code =
      "ledstrip.runFunction(" +
      dropdownType +
      ", " +
      red +
      ", " +
      green +
      ", " +
      blue +
      ");\n";
    return code;
  };

  Arduino.forBlock["leaphy_servo_write"] = function (block) {
    var pinKey = block.getFieldValue("SERVO_PIN");
    var servoAngle =
      Arduino.valueToCode(block, "SERVO_ANGLE", Arduino.ORDER_ATOMIC) || "90";
    var servoName = "myServo" + pinKey;

    Arduino.reservePin(block, pinKey, Arduino.PinTypes.SERVO, "Servo Write");

    Arduino.addInclude("servo", "#include <Servo.h>");
    Arduino.addDeclaration("servo_" + pinKey, "Servo " + servoName + ";");

    var setupCode = servoName + ".attach(" + pinKey + ");";
    Arduino.addSetup("servo_" + pinKey, setupCode, true);

    var code = servoName + ".write(" + servoAngle + ");\n";
    return code;
  };

  /**
   * Code generator to read an angle value from a servo pin (X).
   * Arduino code: #include <Servo.h>
   *               Servo myServoX;
   *               setup { myServoX.attach(X); }
   *               loop  { myServoX.read();    }
   * @param {!Block} block Block to generate the code from.
   * @return {array} Completed code with order of operation.
   */

  Arduino.forBlock["leaphy_servo_read"] = function (block) {
    var pinKey = block.getFieldValue("SERVO_PIN");
    var servoName = "myServo" + pinKey;

    Arduino.reservePin(block, pinKey, Arduino.PinTypes.SERVO, "Servo Read");

    Arduino.addInclude("servo", "#include <Servo.h>");
    Arduino.addDeclaration("servo_" + pinKey, "Servo " + servoName + ";");

    var setupCode = servoName + ".attach(" + pinKey + ");";
    Arduino.addSetup("servo_" + pinKey, setupCode, true);

    var code = servoName + ".read()";
    return [code, Arduino.ORDER_ATOMIC];
  };

  Arduino.forBlock["leaphy_io_digitalwrite"] = function (block) {
    var pin = block.getFieldValue("PIN");
    var stateOutput =
      Arduino.valueToCode(block, "STATE", Arduino.ORDER_ATOMIC) || "false";
    if (stateOutput == "true") {
      stateOutput = "HIGH";
    } else {
      stateOutput = "LOW";
    }

    Arduino.reservePin(block, pin, Arduino.PinTypes.OUTPUT, "Digital Write");

    var pinSetupCode = "pinMode(" + pin + ", OUTPUT);";
    Arduino.addSetup("io_" + pin, pinSetupCode, false);

    var code = "digitalWrite(" + pin + ", " + stateOutput + ");\n";
    return code;
  };

  Arduino.forBlock["leaphy_io_analogwrite"] = function (block) {
    var pin = block.getFieldValue("PIN");
    var stateOutput =
      Arduino.valueToCode(block, "NUM", Arduino.ORDER_ATOMIC) || "0";

    Arduino.reservePin(block, pin, Arduino.PinTypes.OUTPUT, "Analogue Write");

    var pinSetupCode = "pinMode(" + pin + ", OUTPUT);";
    Arduino.addSetup("io_" + pin, pinSetupCode, false);

    // Warn if the input value is out of range
    if (stateOutput < 0 || stateOutput > 255) {
      block.setWarningText(
        "The analogue value set must be between 0 and 255",
        "pwm_value",
      );
    } else {
      block.setWarningText(null);
    }

    var code = "analogWrite(" + pin + ", " + stateOutput + ");\n";
    return code;
  };

  Arduino.forBlock["leaphy_sonar_read"] = function (block) {
    Arduino.addInclude("leaphy_extra", '#include "Leaphy_Extra.h"');
    var trigPin = block.getFieldValue("TRIG_PIN");
    var echoPin = block.getFieldValue("ECHO_PIN");
    var code = "getDistanceSonar(" + trigPin + ", " + echoPin + ")";
    return [code, Arduino.ORDER_ATOMIC];
  };

  const addDisplaySetupCode = () => {
    const displaySetup =
      'if(!display.begin())\n  {\n    Serial.println(F("Contact with the display failed: Check the connections"));\n  }\n';
    const setup = Arduino.addI2CSetup("oled", displaySetup);

    Arduino.addInclude("include_display", '#include "OLED_Display.h"');
    Arduino.addInclude("define_display", "OLEDDISPLAY display;");
    Arduino.addSetup("serial", "Serial.begin(115200);");
    return setup;
  };

  Arduino.forBlock["leaphy_display_clear"] = function (block) {
    const setup = addDisplaySetupCode();
    return setup + "display.clearDisplay();\n";
  };

  Arduino.forBlock["leaphy_display_set_text_size"] = function (block) {
    const setup = addDisplaySetupCode();

    const stateOutput =
      Arduino.valueToCode(block, "NUM", Arduino.ORDER_ATOMIC) || "0";
    return setup + "display.setTextSize(" + stateOutput + ");\n";
  };

  Arduino.forBlock["leaphy_display_print_line"] = function (block) {
    const setup = addDisplaySetupCode();

    const value =
      Arduino.valueToCode(this, "VALUE", Arduino.ORDER_ATOMIC) || "0";
    const row = block.getFieldValue("DISPLAY_ROW");
    const cursorHeight = row * 12;
    const code =
      setup +
      "display.setCursor(0," +
      cursorHeight +
      ");\ndisplay.println(" +
      value +
      ");\n";
    return code;
  };

  Arduino.forBlock["leaphy_display_print_value"] = function (block) {
    const setup = addDisplaySetupCode();

    const name = Arduino.valueToCode(this, "NAME", Arduino.ORDER_ATOMIC) || "0";
    const value =
      Arduino.valueToCode(this, "VALUE", Arduino.ORDER_ATOMIC) || "0";
    const row = block.getFieldValue("DISPLAY_ROW");
    const cursorHeight = row * 12;
    const code =
      setup +
      "display.setCursor(0," +
      cursorHeight +
      ");\ndisplay.print(" +
      name +
      ');\ndisplay.print(" = ");\ndisplay.println(' +
      value +
      ");\n";
    return code;
  };

  Arduino.forBlock["leaphy_display_display"] = function (block) {
    const setup = addDisplaySetupCode();
    return setup + "display.display();\n";
  };

  Arduino.forBlock["leaphy_update_lsm9ds1"] = function (block) {
    return "  lsm.read();  /* ask it to read in the data */  \n \n  /* Get a new sensor event */  \n  sensors_event_t a, m, g, temp; \n \n  lsm.getEvent(&a, &m, &g, &temp);";
  };

  Arduino.forBlock["leaphy_use_lsm9ds1"] = function (block) {
    var sensor = block.getFieldValue("SENSOR");
    var axis = block.getFieldValue("AXIS");
    Arduino.addInclude("adafruit_lsm9ds1", "#include <Adafruit_LSM9DS1.h>");
    Arduino.addDeclaration(
      "lsm9ds1_declaration",
      "Adafruit_LSM9DS1 lsm = Adafruit_LSM9DS1();\n",
    );
    Arduino.addFunction(
      "lsm9ds1_setttings",
      "void setupSettings()\n{\n    lsm.setupAccel(lsm.LSM9DS1_ACCELRANGE_2G);\n    lsm.setupMag(lsm.LSM9DS1_MAGGAIN_4GAUSS);\n    lsm.setupGyro(lsm.LSM9DS1_GYROSCALE_245DPS);\n}\n",
    );
    Arduino.addSetup(
      "lsm9ds1_setup', 'void setup()  \n{ \n  Serial.begin(115200); \n \n  while (!Serial) { \n    delay(1); // will pause Zero, Leonardo, etc until serial console opens \n  } \n   \n  Serial.println('LSM9DS1 data read demo'); \n   \n  // Try to initialise and warn if we couldn't detect the chip \n  if (!lsm.begin()) \n  { \n    Serial.println('Oops ... unable to initialize the LSM9DS1. Check your wiring!'); \n    while (1); \n  } \n  Serial.println('Found LSM9DS1 9DOF'); \n \n  // helper to just set the default scaling we want, see above! \n  setupSensor(); \n}",
    );
    return [sensor + axis, Arduino.ORDER_ATOMIC];
  };
}

export default getCodeGenerators;
