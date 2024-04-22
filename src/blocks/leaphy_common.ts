import { Board } from "./blocks";
import { BlockDefinition } from "blockly/core/blocks";

const ledstripDemoOptions = [
    ["%{BKY_LEAPHY_LED_STRIP_LIGHTBANK}", "0"],
    ["%{BKY_LEAPHY_LED_STRIP_BREATHE}", "1"],
    ["%{BKY_LEAPHY_LED_STRIP_GULF}", "3"],
    ["%{BKY_LEAPHY_LED_STRIP_RAINBOW}", "4"],
    ["%{BKY_LEAPHY_LED_STRIP_COLORGULF}", "5"],
];

function getBlocks(board: Board): BlockDefinition {
    return [
        {
            type: "digital_read",
            message0: "%%{BKY_LEAPHY_DIGITAL_READ} %1",
            args0: [
                {
                    type: "field_dropdown",
                    name: "PIN",
                    options: board.digitalPins,
                },
            ],
            style: "leaphy_blocks",
            output: "Number",
            tooltip: "",
            helpUrl: "",
        },
        {
            type: "analog_read",
            message0: "%%{BKY_LEAPHY_ANALOG_READ} %1",
            args0: [
                {
                    type: "field_dropdown",
                    name: "PIN",
                    options: board.analogPins,
                },
            ],
            style: "leaphy_blocks",
            output: "Number",
            tooltip: "",
            helpUrl: "",
        },
        {
            type: "leaphy_led_strip_demo",
            message0: "%%{BKY_LEAPHY_LED_STRIP_DEMO} %1 %2 %3 %4 %5",
            args0: [
                {
                    type: "field_dropdown",
                    name: "DEMO_TYPE",
                    options: ledstripDemoOptions,
                },
                { type: "input_dummy" },
                {
                    type: "input_value",
                    name: "LED_STRIP_DEMO_RED",
                    check: "Number",
                },
                {
                    type: "input_value",
                    name: "LED_STRIP_DEMO_GREEN",
                    check: "Number",
                },
                {
                    type: "input_value",
                    name: "LED_STRIP_DEMO_BLUE",
                    check: "Number",
                },
            ],
            inputsInline: true,
            previousStatement: null,
            nextStatement: null,
            style: "leaphy_blocks",
            tooltip: "",
            helpUrl: "",
        },
        {
            type: "leaphy_servo_write",
            message0:
                "%%{" +
                board.servoName +
                "} %1 %2 %%{BKY_ARD_SERVO_WRITE_TO} %3 %%{BKY_ARD_SERVO_WRITE_DEG_180}",
            args0: [
                {
                    type: "field_dropdown",
                    name: "SERVO_PIN",
                    options: board.pwmPins,
                },
                { type: "input_dummy" },
                { type: "input_value", name: "SERVO_ANGLE", check: "Number" },
            ],
            inputsInline: true,
            previousStatement: null,
            nextStatement: null,
            style: "leaphy_blocks",
            // "extensions": "refreshServoPinFields",
            tooltip: "%{BKY_ARD_SERVO_WRITE_TIP}",
            helpUrl: "http://arduino.cc/en/Reference/ServoWrite",
        },
        {
            type: "leaphy_servo_read",
            message0: "%%{BKY_ARD_SERVO_READ} %1",
            args0: [
                {
                    type: "field_dropdown",
                    name: "SERVO_PIN",
                    options: board.digitalPins,
                },
            ],
            output: "Number",
            style: "leaphy_blocks",
            // "extensions": "returnAndUpdateServoRead",
            tooltip: "%{BKY_ARD_SERVO_READ_TIP}",
            helpUrl: "http://arduino.cc/en/Reference/ServoRead",
        },
        {
            type: "leaphy_io_digitalwrite",
            message0: "%%{BKY_ARD_DIGITALWRITE} %1 %%{BKY_ARD_WRITE_TO} %2",
            args0: [
                {
                    type: "field_dropdown",
                    name: "PIN",
                    options: board.digitalPins,
                },
                { type: "input_value", name: "STATE", check: "Boolean" },
            ],
            inputsInline: true,
            previousStatement: null,
            nextStatement: null,
            style: "leaphy_blocks",
            tooltip: "%{BKY_ARD_DIGITALWRITE_TIP}",
            helpUrl: "http://arduino.cc/en/Reference/DigitalWrite",
        },
        {
            type: "leaphy_io_analogwrite",
            message0: "%%{BKY_ARD_ANALOGWRITE} %1 %%{BKY_ARD_WRITE_TO} %2",
            args0: [
                { type: "field_dropdown", name: "PIN", options: board.pwmPins },
                { type: "input_value", name: "NUM", check: "Number" },
            ],
            inputsInline: true,
            previousStatement: null,
            nextStatement: null,
            style: "leaphy_blocks",
            // "extensions": "inputAndUpdateAnalog",
            tooltip: "%{BKY_ARD_ANALOGWRITE_TIP}",
            helpUrl: "http://arduino.cc/en/Reference/AnalogWrite",
        },
        {
            type: "leaphy_sonar_read",
            message0:
                "%%{BKY_LEAPHY_SONAR_READ_TRIG} %1 %%{BKY_LEAPHY_SONAR_READ_ECHO} %2",
            args0: [
                {
                    type: "field_dropdown",
                    name: "TRIG_PIN",
                    options: board.digitalPins,
                },
                {
                    type: "field_dropdown",
                    name: "ECHO_PIN",
                    options: board.digitalPins,
                },
            ],
            output: "Number",
            style: "leaphy_blocks",
            tooltip: "%{BKY_LEAPHY_SONAR_READ_TIP}",
            helpUrl: "",
        },
 
        {
            type: "leaphy_segment_init",
            message0: "%{BKY_LEAPHY_SEGMENT_INIT}",
            args0: [
                {
                    type: "field_dropdown",
                    name: "CLK",
                    options: board.digitalPins,
                },
                {
                    type: "field_dropdown",
                    name: "DIO",
                    options: board.digitalPins,
                },
            ],
            previousStatement: null,
            nextStatement: null,
            style: "leaphy_blocks",
        },
        {
            type: "leaphy_matrix_init",
            message0: "%{BKY_LEAPHY_MATRIX_INIT}",
            args0: [
                {
                    type: "field_dropdown",
                    name: "DIN",
                    options: board.digitalPins,
                },
                {
                    type: "field_dropdown",
                    name: "CLK",
                    options: board.digitalPins,
                },
                {
                    type: "field_dropdown",
                    name: "CS",
                    options: board.digitalPins,
                },
            ],
            previousStatement: null,
            nextStatement: null,
            style: "leaphy_blocks",
        },
        {
            type: "leaphy_sound_init",
            message0: "%{BKY_LEAPHY_SOUND_INIT}",
            args0: [
                {
                    type: "field_dropdown",
                    name: "RX",
                    options: board.digitalPins,
                },
                {
                    type: "field_dropdown",
                    name: "TX",
                    options: board.digitalPins,
                },
            ],
            inputsInline: true,
            previousStatement: null,
            nextStatement: null,
            style: "leaphy_blocks",
        },
       
    ];
}

export default getBlocks;
