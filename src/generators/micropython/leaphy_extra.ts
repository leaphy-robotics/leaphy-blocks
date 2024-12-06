import { MicroPython } from "../micropython";

function getCodeGenerators(micropython: MicroPython) {
    micropython.forBlock["leaphy_sonar_read"] = function (block) {
        // Voeg de import toe voor de sonar sensor
        micropython.addInclude("sonar", "from leaphymicropython.sensors.sonar import read_distance\n");
        
        // Haal de pinnen op uit het blok
        const trigPin = block.getFieldValue("TRIG_PIN");
        const echoPin = block.getFieldValue("ECHO_PIN");
        
        // Genereer de code voor het lezen van de afstand
        const code = `read_distance(${trigPin}, ${echoPin})`;
        return [code, 0];
    };

    micropython.forBlock["controls_repeat_forever"] = function (block) {
        // Haal de code op die binnen de lus moet worden uitgevoerd
        const branch = micropython.statementToCode(block, "DO");
        
        // Genereer de code voor een oneindige lus
        const code = `while True:\n${branch}`;
        return code;
    };
}

export default getCodeGenerators;

