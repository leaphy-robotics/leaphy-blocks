import { MicroPython } from "../micropython";

function getCodeGenerators(micropython: MicroPython) {
    micropython.forBlock["leaphy_original_set_led"] = function (block) {
        micropython.addInclude("rgbled", "from leaphymicropython.actuators.rgbled import RGBLed\n");
        
        micropython.addDeclaration("led_init", "led = RGBLed(5, 6, 7)\n", true, 90);
        
        const red = micropython.valueToCode(block, "LED_RED", 0) || "0";
        const green = micropython.valueToCode(block, "LED_GREEN", 0) || "0";
        const blue = micropython.valueToCode(block, "LED_BLUE", 0) || "0";
        
        return `led.set_color(${red}, ${green}, ${blue})\n`;
    };

    micropython.forBlock["leaphy_original_motor_init"] = function(block) {
        micropython.addInclude("dcmotor", "from leaphymicropython.actuators.dcmotor import DCMotor\n");
        micropython.addDeclaration("motor_init", "motor = DCMotor()\n", true, 90);
        return '';
    };

    micropython.forBlock["leaphy_original_move_forward"] = function(block) {
        micropython.addInclude("dcmotor", "from leaphymicropython.actuators.dcmotor import DCMotor\n");
        micropython.addDeclaration("motor_init", "motor = DCMotor()\n", true, 90);
        
        const speed = micropython.valueToCode(block, 'SPEED', 0) || '0';
        return `motor.forward(${speed})\n`;
    };

    micropython.forBlock["leaphy_original_move_backward"] = function(block) {
        micropython.addInclude("dcmotor", "from leaphymicropython.actuators.dcmotor import DCMotor\n");
        micropython.addDeclaration("motor_init", "motor = DCMotor()\n", true, 90);
        
        const speed = micropython.valueToCode(block, 'SPEED', 0) || '0';
        return `motor.backward(${speed})\n`;
    };

    micropython.forBlock["leaphy_original_turn_left"] = function(block) {
        const speed = micropython.valueToCode(block, 'SPEED', 0) || '0';
        const direction = micropython.valueToCode(block, 'DIRECTION', 0) || '1';
        return `motor.left(${speed}, ${direction})\n`;
    };

    micropython.forBlock["leaphy_original_turn_right"] = function(block) {
        const speed = micropython.valueToCode(block, 'SPEED', 0) || '0';
        const direction = micropython.valueToCode(block, 'DIRECTION', 0) || '1';
        return `motor.right(${speed}, ${direction})\n`;
    };

    micropython.forBlock["leaphy_original_motor_stop"] = function() {
        micropython.addInclude("dcmotor", "from leaphymicropython.actuators.dcmotor import DCMotor\n");
        micropython.addDeclaration("motor_init", "motor = DCMotor()\n", true, 90);
        
        return 'motor.stop()\n';
    };

    micropython.forBlock["leaphy_original_get_distance"] = function () {
        micropython.addInclude("leaphymicro", "from leaphymicropython.utils.sensors import get_distance\n");
        
        if (micropython.robotType === "l_original_nano") {
            micropython.addSetup("set_us_pins", "set_us_pins(16, 17)", true);
        }

        return ["get_distance()", 0];
    };

    micropython.forBlock["leaphy_original_move_motors"] = function (block) {
        micropython.addInclude("leaphymicro", "from leaphymicropython.utils.motors import move_motors\n");
        const direction = block.getFieldValue("MOTOR_DIRECTION");
        const speed = micropython.valueToCode(block, "MOTOR_SPEED", micropython.ORDER_ATOMIC) || "100";
        
        if (micropython.robotType.includes("nano")) {
            micropython.addSetup("set_motor_pins", "set_motor_pins(3, 2, 11, 4)", true);
        }

        return `move_motors(${direction}, ${speed})\n`;
    };

    micropython.forBlock["digital_read"] = function (block) {
        micropython.addInclude("machine", "from machine import Pin\n");
        const pin = block.getFieldValue("PIN");
        micropython.addSetup(`pin_${pin}`, `pin_${pin} = Pin(${pin}, Pin.IN)`, false);
        return [`pin_${pin}.value()`, 0];
    };

    micropython.forBlock["analog_read"] = function (block) {
        micropython.addInclude("read_analog", "from leaphymicropython.utils.pins import read_analog\n");
        const pin = block.getFieldValue("PIN");
        
        //mapping wordt gedaan ivm library die met de digitale poort nummer aan geroepen wrodt
        const pinMapping: Record<string, number> = {
            "A0": 14,
            "A1": 15,
            "A2": 16,
            "A3": 17,
            "A4": 18,
            "A5": 19,
            "A6": 20,
            "A7": 21
        };

        const gpioPin = pinMapping[pin] || pin;

        micropython.addDeclaration(`analog_value_${gpioPin}`, `analog_value_${gpioPin} = int(read_analog(${gpioPin}))`);
        const code = `analog_value_${gpioPin}`;
        return [code, 0];
    };

    micropython.forBlock["leaphy_original_buzz"] = function (block) {
        micropython.addInclude("leaphymicro", "from leaphymicropython.utils.sound import tone\n");
        const frequency = micropython.valueToCode(block, "FREQUENCY", 0) || "0";
        const duration = micropython.valueToCode(block, "DURATION", 0) || "0";
        return `tone(4, ${frequency}, ${duration})\n`;
    };

    micropython.forBlock["leaphy_original_servo_set"] = function(block) {
        micropython.addInclude("dcmotor", "from leaphymicropython.actuators.dcmotor import DCMotor\n");
        micropython.addDeclaration("motor_init", "motor = DCMotor()\n", true, 90);
        
        const motor = block.getFieldValue("MOTOR");  // 'left' of 'right'
        const speed = micropython.valueToCode(block, "SPEED", 0) || "0";
        
        // Zet de juiste motor op de juiste snelheid
        if (motor === 'left') {
            return `motor.left(${speed}, 1)\n`;
        } else {
            return `motor.right(${speed}, 1)\n`;
        }
    };

    micropython.forBlock["leaphy_original_servo_move"] = function (block) {
        micropython.addInclude("machine", "from machine import PWM, Pin\n");
        
        const MOTOR_SPEEDS: Record<string, [number, number]> = {
            forward: [1, -1],
            backward: [-1, 1],
            left: [-1, -1],
            right: [1, 1],
        };
        
        const direction = block.getFieldValue("DIRECTION");
        const speed = micropython.valueToCode(block, "SPEED", 0) || "100";
        const motor_left = MOTOR_SPEEDS[direction][0];
        const motor_right = MOTOR_SPEEDS[direction][1];

        micropython.addSetup("servo_left", "servo_left = PWM(Pin(12))", false);
        micropython.addSetup("servo_right", "servo_right = PWM(Pin(13))", false);

        return (
            `servo_left.duty_u16(int(65535 * (90 + 90*${speed}/100*${motor_left}) / 180))\n` +
            `servo_right.duty_u16(int(65535 * (90 + 90*${speed}/100*${motor_right}) / 180))\n`
        );
    };

    micropython.forBlock["leaphy_start"] = function (block) {
        console.log("Start block generator");
        
        // Gebruik statementToCode om de code van de kinderen op te halen
        let code = micropython.statementToCode(block, "STACK");
        
        if (code) {
            const lines = code.split('\n');
            // Zoek de eerste niet-lege regel
            const firstNonEmptyLine = lines.find(line => line.trim() !== '');
            
            if (firstNonEmptyLine) {
                // Bepaal de inspringing van de eerste niet-lege regel
                const indentationMatch = firstNonEmptyLine.match(/^\s*/);
                const indentation = indentationMatch ? indentationMatch[0] : '';
                
                // Verwijder de inspringing van alle regels
                const adjustedLines = lines.map(line => line.startsWith(indentation) ? line.slice(indentation.length) : line);
                code = adjustedLines.join('\n');
            }
        }
        
        console.log("Final code:", code);
        return code;
    };
}

export default getCodeGenerators; 
