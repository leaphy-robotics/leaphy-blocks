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



    micropython.forBlock["digital_read"] = function (block) {
        micropython.addInclude("machine", "from machine import Pin\n");
        const pin = block.getFieldValue("PIN");
        
        micropython.addDeclaration(`pin_${pin}`, `pin_${pin} = Pin(${pin}, Pin.IN)`, false);
        
        return [`pin_${pin}.value()`, 0];
    };

    micropython.forBlock["analog_read"] = function (block) {
        micropython.addInclude("read_analog", "from leaphymicropython.utils.pins import read_analog\n");
        const pin = block.getFieldValue("PIN");
        
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

        
        const code = `read_analog(${gpioPin})`;
        return [code, 0];
    };

    micropython.forBlock["leaphy_original_buzz"] = function (block) {
        micropython.addInclude("leaphymicro", "from leaphymicropython.utils.sound import tone\n");
        const frequency = micropython.valueToCode(block, "FREQUENCY", 0) || "0";
        const duration = micropython.valueToCode(block, "DURATION", 0) || "0";
        return `tone(4, ${frequency}, ${duration})\n`;
    };

    micropython.forBlock["leaphy_original_servo_set"] = function (block) {
        micropython.addInclude("servo_motor", "from leaphymicropython.actuators.servomotor import set_motor\n");
        
        const motor = block.getFieldValue("MOTOR");  // Kies motor: 'left' of 'right'
        const speed = micropython.valueToCode(block, "SPEED", micropython.ORDER_ATOMIC) || "0";  // Snelheid

        return `set_motor('${motor}', ${speed})\n`;  // Roep de motor aan met de snelheid
    };

    micropython.forBlock["leaphy_original_servo_move"] = function (block) {
        micropython.addInclude("servo_direction", "from leaphymicropython.actuators.servomotor import set_motor_direction\n");
        const direction = block.getFieldValue("DIRECTION");  // Kies richting: 'forward', 'backward', 'left', 'right'
        const speed = micropython.valueToCode(block, "SPEED", micropython.ORDER_ATOMIC) || "0";  // Snelheid

        return `set_motor_direction('${direction}', ${speed})\n`;  // Roep de functie aan met richting en snelheid
    };

    micropython.forBlock["leaphy_original_move_motors"] = function (block) {
        micropython.addInclude("dcmotor", "from leaphymicropython.actuators.dcmotor import DCMotor\n");
    
        const direction = block.getFieldValue("DIRECTION") || "Stop";  // Zorg dat direction nooit undefined is
        const speed = micropython.valueToCode(block, "SPEED", micropython.ORDER_ATOMIC) || "0";  // Zorg dat speed nooit undefined is
    
        // Maak een motor-instantie
        let code = "motor = DCMotor()\n";
    
        // Gebruik een veilige switch-case structuur
        switch (direction) {
            case "Vooruit":
                code += `motor.forward(${speed})\n`;
                break;
            case "Achteruit":
                code += `motor.backward(${speed})\n`;
                break;
            case "Links":
                code += `motor.left(${speed}, 1)\n`;  // 1 voor CW
                break;
            case "Rechts":
                code += `motor.right(${speed}, 1)\n`;  // 1 voor CW
                break;
            default:
                code += "motor.stop()\n";  // Fallback voor onbekende waarden
                break;
        }
    
        return code;
    };
    
    
    
}

export default getCodeGenerators; 
