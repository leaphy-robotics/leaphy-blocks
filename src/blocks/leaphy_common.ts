import { BlockDefinition } from "blockly/core/blocks";

const blocks: BlockDefinition = [
    {
        type: "digital_read",
        message0: "%%{BKY_LEAPHY_DIGITAL_READ} %1",
        args0: [
            {
                type: "field_pin_selector",
                name: "PIN",
                mode: "digital",
            },
        ],
        style: "leaphy_blocks",
        output: "Number",
        helpUrl: "",
    },
    {
        type: "analog_read",
        message0: "%%{BKY_LEAPHY_ANALOG_READ} %1",
        args0: [
            {
                type: "field_pin_selector",
                name: "PIN",
                mode: "analog",
            },
        ],
        style: "leaphy_blocks",
        output: "Number",
        helpUrl: "",
    },
    {
        type: "leaphy_servo_write",
        message0:
            "%%{BKY_ARD_SERVO_WRITE} %1 %2 %%{BKY_ARD_SERVO_WRITE_TO} %3 %%{BKY_ARD_SERVO_WRITE_DEG_180}",
        args0: [
            {
                type: "field_pin_selector",
                name: "SERVO_PIN",
                mode: "digital",
            },
            { type: "input_dummy" },
            { type: "input_value", name: "SERVO_ANGLE", check: "Number" },
        ],
        inputsInline: true,
        previousStatement: null,
        nextStatement: null,
        style: "leaphy_blocks",
        // "extensions": "refreshServoPinFields",
        helpUrl:
            "https://www.leaphyfoundation.com/tutorials-leaphy-electronics.html#:~:text=TT%20motors-,Servo%20motors,-Rotating%20servo%20motor",
    },
    {
        type: "leaphy_servo_read",
        message0: "%%{BKY_ARD_SERVO_READ} %1",
        args0: [
            {
                type: "field_pin_selector",
                name: "SERVO_PIN",
                mode: "digital",
            },
        ],
        output: "Number",
        style: "leaphy_blocks",
        // "extensions": "returnAndUpdateServoRead",
        helpUrl:
            "https://www.leaphyfoundation.com/tutorials-leaphy-electronics.html#:~:text=TT%20motors-,Servo%20motors,-Rotating%20servo%20motor",
    },
    {
        type: "leaphy_io_digitalwrite",
        message0: "%%{BKY_ARD_DIGITALWRITE} %1 %%{BKY_ARD_WRITE_TO} %2",
        args0: [
            {
                type: "field_pin_selector",
                name: "PIN",
                mode: "digital",
            },
            { type: "input_value", name: "STATE", check: "Boolean" },
        ],
        inputsInline: true,
        previousStatement: null,
        nextStatement: null,
        style: "leaphy_blocks",
        helpUrl: "http://arduino.cc/en/Reference/DigitalWrite",
    },
    {
        type: "leaphy_multiplexer_digitalwrite",
        message0: "%%{BKY_ARD_SET_MULTIPLEXER} %1",
        args0: [
            {
                type: "field_dropdown",
                name: "PIN",
                options: [
                    ["Y0", "0"],
                    ["Y1", "1"],
                    ["Y2", "2"],
                    ["Y3", "3"],
                    ["Y4", "4"],
                    ["Y5", "5"],
                    ["Y6", "6"],
                    ["Y7", "7"],
                ],
            },
        ],
        inputsInline: true,
        previousStatement: null,
        nextStatement: null,
        style: "leaphy_blocks",
    },
    {
        type: "leaphy_io_analogwrite",
        message0: "%%{BKY_ARD_ANALOGWRITE} %1 %%{BKY_ARD_WRITE_TO} %2",
        args0: [
            { type: "field_pin_selector", name: "PIN", mode: "pwm" },
            { type: "input_value", name: "NUM", check: "Number" },
        ],
        inputsInline: true,
        previousStatement: null,
        nextStatement: null,
        style: "leaphy_blocks",
        // "extensions": "inputAndUpdateAnalog",
        helpUrl: "http://arduino.cc/en/Reference/AnalogWrite",
    },
    {
        type: "leaphy_sonar_read",
        message0:
            "%%{BKY_LEAPHY_SONAR_READ_TRIG} %1 %%{BKY_LEAPHY_SONAR_READ_ECHO} %2",
        args0: [
            {
                type: "field_pin_selector",
                name: "TRIG_PIN",
                mode: "digital",
            },
            {
                type: "field_pin_selector",
                name: "ECHO_PIN",
                mode: "digital",
            },
        ],
        output: "Number",
        style: "leaphy_blocks",
        helpUrl:
            "https://www.leaphyfoundation.com/tutorials-leaphy-electronics.html#:~:text=Programming-,Ultrasonic%20sensor,-Light%20sensor",
    },

    {
        type: "leaphy_segment_init",
        helpUrl:
            "https://www.leaphyfoundation.com/tutorials-leaphy-electronics.html#:~:text=%C2%A0Single%20leds-,Segment%20display%C2%A0,-Oled%20display",
        message0: "%{BKY_LEAPHY_SEGMENT_INIT}",
        args0: [
            {
                type: "field_pin_selector",
                name: "CLK",
                mode: "digital",
            },
            {
                type: "field_pin_selector",
                name: "DIO",
                mode: "digital",
            },
        ],
        previousStatement: null,
        nextStatement: null,
        style: "leaphy_blocks",
    },
    {
        type: "leaphy_matrix_init",
        helpUrl:
            "https://www.leaphyfoundation.com/tutorials-leaphy-electronics.html#:~:text=Multiple%20leds-,Led%20matrix%C2%A0,-Speaker%C2%A0",
        message0: "%{BKY_LEAPHY_MATRIX_INIT}",
        args0: [
            {
                type: "field_pin_selector",
                name: "DIN",
                mode: "digital",
            },
            {
                type: "field_pin_selector",
                name: "CLK",
                mode: "digital",
            },
            {
                type: "field_pin_selector",
                name: "CS",
                mode: "digital",
            },
        ],
        previousStatement: null,
        nextStatement: null,
        style: "leaphy_blocks",
    },
    {
        type: "leaphy_sound_init",
        helpUrl:
            "https://www.leaphyfoundation.com/tutorials-leaphy-electronics.html#:~:text=Led%20matrix-,Speaker%C2%A0,-Stichting",
        message0: "%{BKY_LEAPHY_SOUND_INIT}",
        args0: [
            {
                type: "field_pin_selector",
                name: "RX",
                mode: "digital",
            },
            {
                type: "field_pin_selector",
                name: "TX",
                mode: "digital",
            },
        ],
        inputsInline: true,
        previousStatement: null,
        nextStatement: null,
        style: "leaphy_blocks",
    },
];

export { blocks };
