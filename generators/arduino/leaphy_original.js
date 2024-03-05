function getCodeGenerators(Arduino) {
  Arduino.forBlock["leaphy_original_set_led"] = function (block) {
    var red = Arduino.valueToCode(this, "LED_RED", Arduino.ORDER_ATOMIC) || "0";
    var green =
      Arduino.valueToCode(this, "LED_GREEN", Arduino.ORDER_ATOMIC) || "0";
    var blue =
      Arduino.valueToCode(this, "LED_BLUE", Arduino.ORDER_ATOMIC) || "0";
    Arduino.addInclude(
      "include_leaphy_original",
      '#include "Leaphyoriginal1.h"',
    );
    var code = "setLed(" + red + ", " + green + ", " + blue + ");\n";
    return code;
  };

  Arduino.forBlock["leaphy_original_set_motor"] = function (block) {
    var dropdown_Type = block.getFieldValue("MOTOR_TYPE");
    var speed =
      Arduino.valueToCode(this, "MOTOR_SPEED", Arduino.ORDER_ATOMIC) || "100";
    Arduino.addInclude(
      "include_leaphy_original",
      '#include "Leaphyoriginal1.h"',
    );
    // Set different motor pins for nano robots
    if (Arduino.robotType.includes("nano"))
      Arduino.addSetup("set_motor_pins", "setMotorPins(3, 2, 11, 4);", true);

    var code = "setMotor(" + dropdown_Type + ", " + speed + ");\n";
    return code;
  };

  Arduino.forBlock["leaphy_click_set_motor"] =
    Arduino.forBlock["leaphy_original_set_motor"];

  Arduino.forBlock["leaphy_original_get_distance"] = function (block) {
    Arduino.addInclude(
      "include_leaphy_original",
      '#include "Leaphyoriginal1.h"',
    );
    if (Arduino.robotType === "l_original_nano") {
      Arduino.addSetup("set_us_pins", "setUSPins(16, 17);", true);
    }

    var code = "getDistance()";
    return [code, Arduino.ORDER_ATOMIC];
  };

  Arduino.forBlock["leaphy_original_move_motors"] = function (block) {
    var dropdown_Type = block.getFieldValue("MOTOR_DIRECTION");
    var speed =
      Arduino.valueToCode(this, "MOTOR_SPEED", Arduino.ORDER_ATOMIC) || "100";
    Arduino.addInclude(
      "include_leaphy_original",
      '#include "Leaphyoriginal1.h"',
    );
    // Set different motor pins for nano robots
    if (Arduino.robotType.includes("nano"))
      Arduino.addSetup("set_motor_pins", "setMotorPins(3, 2, 11, 4);", true);

    var code = "moveMotors(" + dropdown_Type + ", " + speed + ");\n";
    return code;
  };

  Arduino.forBlock["digital_read"] = function (block) {
    var dropdown_pin = block.getFieldValue("PIN");
    Arduino.setups_["setup_input_" + dropdown_pin] =
      "pinMode(" + dropdown_pin + ", INPUT);";
    var code = "digitalRead(" + dropdown_pin + ")";
    return [code, Arduino.ORDER_ATOMIC];
  };

  Arduino.forBlock["analog_read"] = function (block) {
    var dropdown_pin = block.getFieldValue("PIN");
    var code = "analogRead(" + dropdown_pin + ")";
    return [code, Arduino.ORDER_ATOMIC];
  };

  Arduino.forBlock["leaphy_original_buzz"] = function (block) {
    Arduino.addInclude("arduino", "#include <Arduino.h>");
    Arduino.addSetup("tone", "pinMode(4, OUTPUT);", false);
    var frequency =
      Arduino.valueToCode(this, "FREQUENCY", Arduino.ORDER_ATOMIC) || "0";
    var duration =
      Arduino.valueToCode(this, "DURATION", Arduino.ORDER_ATOMIC) || "0";
    var code = "tone(4, " + frequency + ", " + duration + ");\n";
    return code;
  };
}

export default getCodeGenerators;
