import { MicroPython } from "../micropython";

function getCodeGenerators(micropython: MicroPython): void {
    micropython.forBlock["leaphy_sonar_read"] = function (block) {
        micropython.addInclude("sonar", "from leaphymicropython.sensors.sonar import read_distance\n");
        
        const trigPin = block.getFieldValue("TRIG_PIN");
        const echoPin = block.getFieldValue("ECHO_PIN");

        const code = `read_distance(${trigPin}, ${echoPin})`;
        return [code, micropython.ORDER_ATOMIC];
    };

    micropython.forBlock["leaphy_io_digitalwrite"] = function (block) {
        micropython.addInclude("machine", "from machine import Pin\n");
        const pin = block.getFieldValue("PIN");
        const stateOutput = micropython.valueToCode(block, "STATE", micropython.ORDER_ATOMIC) || "0";

        micropython.addDeclaration(`pin_${pin}`, `pin_${pin} = Pin(${pin}, Pin.OUT)`, false);
        
        return `pin_${pin}.value(${stateOutput})\n`;
    };
    
    micropython.forBlock["leaphy_io_analogwrite"] = function (block) {
        micropython.addInclude("pins", "from leaphymicropython.utils.pins import set_pwm\n");
        const pin = block.getFieldValue("PIN");
        const stateOutput = micropython.valueToCode(block, "NUM", micropython.ORDER_ATOMIC) || "0";
        
        return `set_pwm(${pin}, ${stateOutput})\n`;
    };
}

export default getCodeGenerators;

