import {BlockDefinition} from "blockly/core/blocks";

const blocks: BlockDefinition = [
    {
        type: "bluetooth_setup",
        style: "bluetooth_blocks",
        message0: "%{BKY_LEAPHY_BLUETOOTH_SETUP}",
        args0: [
            {
                type: "input_value",
                name: "NAME",
                check: ["String"],
            },
        ],
        previousStatement: null,
        nextStatement: null,
    },
    {
        type: "bluetooth_on_connect",
        style: "bluetooth_blocks",
        message0: "%{BKY_LEAPHY_BLUETOOTH_ON_CONNECT}",
        extensions: ["appendStatementInputStack"],
        nextStatement: null,
    },
    {
        type: "bluetooth_on_characteristic_updated",
        style: "bluetooth_blocks",
        message0: "%{BKY_LEAPHY_BLUETOOTH_CHARACTERISTIC_ON_UPDATE}",
        args0: [
            {
                type: "input_value",
                name: "NAME",
                check: ["String"],
            },
        ],
        extensions: ["appendStatementInputStack"],
        nextStatement: null,
    },
    {
        type: "bluetooth_on_disconnect",
        style: "bluetooth_blocks",
        message0: "%{BKY_LEAPHY_BLUETOOTH_ON_DISCONNECT}",
        extensions: ["appendStatementInputStack"],
        nextStatement: null,
    },
    {
        type: "create_binary_characteristic",
        style: "bluetooth_blocks",
        message0: "%{BKY_LEAPHY_BLUETOOTH_CREATE_BINARY_CHARACTERISTIC}",
        args0: [
            {
                type: "input_value",
                name: "NAME",
                check: ["String"],
            },
            { type: "input_value", name: "INITIAL_VALUE", check: "Boolean" },
        ],
        previousStatement: null,
        nextStatement: null,
    },
    {
        type: "bluetooth_characteristic_read",
        style: "bluetooth_blocks",
        message0: "%{BKY_LEAPHY_READ_BINARY_CHARACTERISTIC_VALUE}",
        args0: [
            {
                type: "input_value",
                name: "NAME",
                check: ["String"],
            },
        ],
        output: "Boolean",
    },
];

export {blocks};
