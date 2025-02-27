import { MicroPython } from "../micropython";

function getCodeGenerators(micropython: MicroPython) {
    
    micropython.forBlock["time_delay"] = function (block) {
        micropython.addInclude("time", "import time\n");
        const delayTime = micropython.valueToCode(block, "DELAY_TIME_MILI", micropython.ORDER_ATOMIC) || "0";
        return "time.sleep_ms(" + delayTime + ")\n";
    };

    micropython.forBlock["leaphy_serial_print_line"] = function (block) {
        const value = micropython.valueToCode(block, "VALUE", micropython.ORDER_ATOMIC) || "''";
        
        return `print(${value})\n`;
    };

    micropython.forBlock["controls_repeat_forever"] = function (block) {
        // Genereer een commentaarregel in plaats van uitvoerbare code
        const code = `# herhaal_voor_altijd_niet_beschikbaar\n`;
        return code;
    };

    micropython.forBlock["leaphy_start"] = function (block) {
        console.log("Start block generator");
        
      
        let code = micropython.statementToCode(block, "STACK");
        
        if (code) {
            const lines = code.split('\n');
          
            const firstNonEmptyLine = lines.find(line => line.trim() !== '');
            
            if (firstNonEmptyLine) {
                
                const indentationMatch = firstNonEmptyLine.match(/^\s*/);
                const indentation = indentationMatch ? indentationMatch[0] : '';
                const adjustedLines = lines.map(line => line.startsWith(indentation) ? line.slice(indentation.length) : line);
                code = adjustedLines.join('\n');
            }
        }
        
        console.log("Final code:", code);
        return code;
    };

}

export default getCodeGenerators;
