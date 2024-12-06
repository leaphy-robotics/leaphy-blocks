import { MicroPython } from "../micropython";

function getCodeGenerators(micropython: MicroPython) {
    
    micropython.forBlock["time_delay"] = function (block) {
        micropython.addInclude("time", "import time\n");
        const delayTime = micropython.valueToCode(block, "DELAY_TIME_MILI", micropython.ORDER_ATOMIC) || "0";
        return "time.sleep_ms(" + delayTime + ")\n";
    };

    micropython.forBlock["leaphy_serial_print_line"] = function (block) {
        micropython.addInclude("machine", "from machine import UART\n");
        
        micropython.addSetup("uart", "uart = UART(0, baudrate=115200)", false);
        
        const value = micropython.valueToCode(block, "VALUE", micropython.ORDER_ATOMIC) || "''";
        
      
        return `uart.write(str(${value}) + '\\n')\n`;
    };

}

export default getCodeGenerators;
