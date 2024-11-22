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
        type: "bluetooth_on_disconnect",
        style: "bluetooth_blocks",
        message0: "%{BKY_LEAPHY_BLUETOOTH_ON_DISCONNECT}",
        extensions: ["appendStatementInputStack"],
        nextStatement: null,
    },
];

export {blocks};
