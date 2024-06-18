import { BlockDefinition } from "blockly/core/blocks";

const blocks: BlockDefinition = [
    {
        type: "mesh_setup",
        style: "mesh_blocks",
        message0: "setup mesh network with name %1",
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
        type: "mesh_update",
        style: "mesh_blocks",
        message0: "update mesh procedure calls",
        previousStatement: null,
        nextStatement: null,
    },
    {
        type: "mesh_add_procedure",
        style: "mesh_blocks",
        message0: "add mesh procedure %1",
        args0: [
            {
                type: "input_dummy",
                name: "METHOD",
            },
        ],
        extensions: ["procedure_select_extension"],
        inputsInline: true,
        previousStatement: null,
        nextStatement: null,
    },
    {
        type: "mesh_call_procedure",
        style: "mesh_blocks",
        message0: "call mesh procedure %1 on %2",
        args0: [
            {
                type: "input_dummy",
                name: "METHOD",
            },
            {
                type: "input_value",
                name: "TO",
                check: ["Number"],
            },
        ],
        extensions: ["procedure_select_extension"],
        mutator: "procedure_arguments_extension",
        inputsInline: true,
        previousStatement: null,
        nextStatement: null,
    },
    {
        type: "mesh_call_procedure_all",
        style: "mesh_blocks",
        message0: "call mesh procedure %1 on all %2",
        args0: [
            {
                type: "input_dummy",
                name: "METHOD",
            },
            {
                type: "input_dummy",
                name: "ARGUMENTS",
            },
        ],
        extensions: ["procedure_select_extension"],
        mutator: "procedure_arguments_extension",
        inputsInline: true,
        previousStatement: null,
        nextStatement: null,
    },
    {
        type: "mesh_on_connection",
        style: "mesh_blocks",
        message0: "on mesh connection",
        extensions: ["appendStatementInputStack"],
    },
    {
        type: "mesh_client",
        style: "mesh_blocks",
        message0: "get sender",
        output: "Number",
    },
];

export { blocks };
