import { MicroPython } from "../micropython";

function getCodeGenerators(micropython: MicroPython) {
    micropython.forBlock["leaphy_original_set_led"] = function (block) {
        micropython.addInclude("rgbled", "from leaphymicropython.actuators.rgbled import RGBLed\n");
        
        micropython.addDeclaration("led_init", "led = RGBLed(6, 7, 9)\n", true, 90);
        
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
        
        // Arduino to GPIO pin mapping
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
        
        const motor = block.getFieldValue("MOTOR"); 
        const speed = micropython.valueToCode(block, "SPEED", micropython.ORDER_ATOMIC) || "0";

        return `set_motor('${motor}', ${speed})\n`;  
    };

    micropython.forBlock["leaphy_original_servo_move"] = function (block) {
        micropython.addInclude("servo_direction", "from leaphymicropython.actuators.servomotor import set_motor_direction\n");
        const direction = block.getFieldValue("DIRECTION");  
        const speed = micropython.valueToCode(block, "SPEED", micropython.ORDER_ATOMIC) || "0";

        return `set_motor_direction('${direction}', ${speed})\n`;  
    };

    
    
    
}

export default getCodeGenerators; 
