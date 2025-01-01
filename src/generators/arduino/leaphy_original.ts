import { Arduino } from "../arduino";
import { MotorDirection } from "../../blocks/leaphy_original";

function getCodeGenerators(arduino: Arduino) {
    arduino.forBlock["leaphy_original_set_led"] = function (block) {
        const red =
            arduino.valueToCode(block, "LED_RED", arduino.ORDER_ATOMIC) || "0";
        const green =
            arduino.valueToCode(block, "LED_GREEN", arduino.ORDER_ATOMIC) ||
            "0";
        const blue =
            arduino.valueToCode(block, "LED_BLUE", arduino.ORDER_ATOMIC) || "0";

        let pin_red, pin_blue, pin_green;
        if (arduino.robotType.includes("nano")) {
            pin_red = 11;
            pin_green = 10;
            pin_blue = 9;
            arduino.addSetup(
                "setup_nano_rgb",
                "pinMode(8, OUTPUT);\n  digitalWrite(8, LOW);",
                false,
            );
        } else {
            pin_red = 3;
            pin_green = 5;
            pin_blue = 6;
        }
        // Ground is connected to pin 8 on the nano, so it needs to be pulled LOW
        const code =
            `analogWrite(${pin_red}, ${red});\n` +
            `analogWrite(${pin_green}, ${green});\n` +
            `analogWrite(${pin_blue}, ${blue});\n`;

        return code;
    };

    arduino.forBlock["leaphy_original_set_motor"] = function (block) {
        const dropdown_Type = block.getFieldValue("MOTOR_TYPE");
        let speed =
            arduino.valueToCode(block, "MOTOR_SPEED", arduino.ORDER_ATOMIC) ||
            "100";

        arduino.addInclude(
            "include_leaphy_original",
            '#include "Leaphyoriginal1.h"',
        );
        // Set different motor pins for nano robots
        if (arduino.robotType.includes("nano")) {
            if (parseInt(speed) > 0) {
                // Map the speed to a range of 150 - 255 to compensate for low PWM signal voltage
                speed = `map(${speed}, 0, 255, 150, 255)`;
            }
            arduino.addSetup(
                "set_motor_pins",
                "setMotorPins(3, 2, 11, 4);",
                true,
            );
        }

        return `setMotor(${dropdown_Type}, ${speed});\n`;
    };

    arduino.forBlock["leaphy_click_set_motor"] =
        arduino.forBlock["leaphy_original_set_motor"];

    arduino.forBlock["leaphy_original_get_distance"] = function () {
        arduino.addInclude(
            "include_leaphy_original",
            '#include "Leaphyoriginal1.h"',
        );
        if (arduino.robotType === "l_original_nano") {
            arduino.addSetup("set_us_pins", "setUSPins(16, 17);", true);
        }

        const code = "getDistance()";
        return [code, arduino.ORDER_ATOMIC];
    };

    arduino.forBlock["leaphy_original_move_motors"] = function (block) {
        let direction = block.getFieldValue(
            "MOTOR_DIRECTION",
        ) as MotorDirection;
        let speed =
            arduino.valueToCode(block, "MOTOR_SPEED", arduino.ORDER_ATOMIC) ||
            "100";
        arduino.addInclude(
            "include_leaphy_original",
            '#include "Leaphyoriginal1.h"',
        );

        // Set different motor pins for nano robots
        if (arduino.robotType.includes("nano")) {
            // Map the speed to a range of 150 - 255 to compensate for low PWM signal voltage
            if (parseInt(speed) > 0) {
                speed = `map(${speed}, 0, 255, 150, 255)`;
            }
            const directionMap: Record<MotorDirection, number> = {
                [MotorDirection.FORWARD]: 2,
                [MotorDirection.BACKWARD]: 1,
                [MotorDirection.LEFT]: 4,
                [MotorDirection.RIGHT]: 3,
            };
            direction = directionMap[direction];
            arduino.addSetup(
                "set_motor_pins",
                "setMotorPins(3, 2, 11, 4);",
                true,
            );
        }

        return `moveMotors(${direction}, ${speed});\n`;
    };

    arduino.forBlock["digital_read"] = function (block) {
        const dropdown_pin = block.getFieldValue("PIN");
        arduino.setups_["setup_input_" + dropdown_pin] =
            "pinMode(" + dropdown_pin + ", INPUT);";
        const code = "digitalRead(" + dropdown_pin + ")";
        return [code, arduino.ORDER_ATOMIC];
    };

    arduino.forBlock["analog_read"] = function (block) {
        const dropdown_pin = block.getFieldValue("PIN");
        const code = "analogRead(" + dropdown_pin + ")";
        return [code, arduino.ORDER_ATOMIC];
    };

    arduino.forBlock["leaphy_original_buzz"] = function (block) {
        arduino.addInclude("arduino", "#include <Arduino.h>");
        arduino.addSetup("tone", "pinMode(4, OUTPUT);", false);
        const frequency =
            arduino.valueToCode(block, "FREQUENCY", arduino.ORDER_ATOMIC) ||
            "0";
        const duration =
            arduino.valueToCode(block, "DURATION", arduino.ORDER_ATOMIC) || "0";
        return `tone(4, ${frequency}, ${duration});\n`;
    };

    arduino.forBlock["leaphy_original_servo_set"] = function (block) {
        arduino.addInclude("servo", "#include <Servo.h>");
        arduino.addDeclaration("servo_left", "Servo servo_left;");
        arduino.addDeclaration("servo_right", "Servo servo_right;");
        arduino.addSetup("servo_left", "servo_left.attach(12);", false);
        arduino.addSetup("servo_right", "servo_right.attach(13);", false);

        const motor = block.getFieldValue("MOTOR");
        const speed =
            arduino.valueToCode(block, "SPEED", arduino.ORDER_ATOMIC) || "100";
        const direction = motor == "left" ? 1 : -1;

        return `servo_${motor}.write(90 + 90*${speed}/100*${direction});\n`;
    };

    arduino.forBlock["leaphy_original_servo_move"] = function (block) {
        arduino.addInclude("servo", "#include <Servo.h>");
        arduino.addDeclaration("servo_left", "Servo servo_left;");
        arduino.addDeclaration("servo_right", "Servo servo_right;");
        arduino.addSetup("servo_left", "servo_left.attach(12);", false);
        arduino.addSetup("servo_right", "servo_right.attach(13);", false);

        const MOTOR_SPEEDS: Record<string, [number, number]> = {
            forward: [1, -1],
            backward: [-1, 1],
            left: [-1, -1],
            right: [1, 1],
        };
        const direction = block.getFieldValue("DIRECTION");
        const speed =
            arduino.valueToCode(block, "SPEED", arduino.ORDER_ATOMIC) || "100";
        const motor_left = MOTOR_SPEEDS[direction][0];
        const motor_right = MOTOR_SPEEDS[direction][1];

        return (
            `servo_left.write(90 + 90*${speed}/100*${motor_left});\n` +
            `servo_right.write(90 + 90*${speed}/100*${motor_right});\n`
        );
    };
}

export default getCodeGenerators;
