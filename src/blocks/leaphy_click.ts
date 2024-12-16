import { BlockDefinition } from "blockly/core/blocks";

const motorDropdown = [
    ["%{BKY_LEAPHY_MOTOR_A_DROPDOWN}", "9"],
    ["%{BKY_LEAPHY_MOTOR_B_DROPDOWN}", "10"],
];
const digitalPinOptions = [
    ["2", "2"],
    ["3", "3"],
    ["4", "4"],
    ["5", "5"],
    ["6", "6"],
    ["7", "7"],
    ["8", "8"],
    ["9", "9"],
    ["10", "10"],
    ["11", "11"],
    ["12", "12"],
    ["13", "13"],
    ["14", "14"],
    ["15", "15"],
    ["16", "16"],
    ["17", "17"],
    ["18", "18"],
    ["19", "19"],
];

const blocks: BlockDefinition = [
    {
        type: "leaphy_click_set_motor",
        message0:
            "%%{BKY_LEAPHY_MOTOR_TYPE} %1 %2 %%{BKY_LEAPHY_MOTOR_SPEED} %3",
        args0: [
            {
                type: "field_dropdown",
                name: "MOTOR_TYPE",
                options: motorDropdown,
            },
            { type: "input_dummy" },
            { type: "input_value", name: "MOTOR_SPEED", check: "Number" },
        ],
        inputsInline: true,
        previousStatement: null,
        nextStatement: null,
        style: "leaphy_blocks",
        helpUrl:
            "https://www.leaphyfoundation.com/tutorials-leaphy-electronics.html#:~:text=types%20of%20leds-,TT%20motors,-Servo%20motors",
    },
    {
        type: "leaphy_click_rgb_digitalwrite",
        message0:
            "%%{BKY_ARD_DIGITALWRITE} %1 %%{BKY_ARD_WRITE_TO} %2  %3 %%{BKY_ARD_WRITE_TO} %4  %5 %%{BKY_ARD_WRITE_TO} %6",
        args0: [
            {
                type: "field_dropdown",
                name: "PIN1",
                options: digitalPinOptions,
            },
            { type: "input_value", name: "STATE1", check: "Boolean" },
            {
                type: "field_dropdown",
                name: "PIN2",
                options: digitalPinOptions,
            },
            { type: "input_value", name: "STATE2", check: "Boolean" },
            {
                type: "field_dropdown",
                name: "PIN3",
                options: digitalPinOptions,
            },
            { type: "input_value", name: "STATE3", check: "Boolean" },
        ],
        inputsInline: true,
        previousStatement: null,
        nextStatement: null,
        style: "leaphy_blocks",
        // "extensions": "refreshPinFields",
        helpUrl:
            "https://www.leaphyfoundation.com/tutorials-leaphy-electronics.html#:~:text=Different%20types%20of%20leds",
    },
];

export { blocks };
