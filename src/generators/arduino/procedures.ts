import * as Blockly from "blockly/core";
import { Arduino } from "../arduino";
import { ISerializer } from "blockly/core/serialization";

interface Procedure {
    name: string;
    funcName: string;
    remote: boolean;
    arguments: { id: string; name: string }[];
}

class ProcedureManager {
    public procedures: Procedure[] = [];

    setProcedures(procedures: Procedure[]) {
        this.procedures = procedures;
    }

    hasArgument(procedure: Procedure, arg: string) {
        return !!procedure.arguments.find(({ id }) => id === arg);
    }

    getProcedure(funcName: string) {
        return this.procedures.find((e) => funcName === e.funcName);
    }
}

export const procedureManager = new ProcedureManager();

export class ProcedureSerializer implements ISerializer {
    public priority = 90;

    save() {
        return procedureManager.procedures;
    }

    load(state: Procedure[]): void {
        procedureManager.setProcedures(state);
    }

    clear(): void {
        procedureManager.setProcedures([]);
    }
}

function getCodeGenerators(arduino: Arduino) {
    arduino.forBlock["procedures_defreturn"] = function (block) {
        const funcName = arduino.nameDB_?.getName(
            block.getFieldValue("NAME"),
            Blockly.Names.NameType.PROCEDURE,
        ) as string;
        let branch = arduino.statementToCode(block, "STACK");
        if (arduino.STATEMENT_PREFIX) {
            branch =
                arduino.prefixLines(
                    arduino.STATEMENT_PREFIX.replace(
                        /%1/g,
                        "'" + block.id + "'",
                    ),
                    arduino.INDENT,
                ) + branch;
        }
        if (arduino.INFINITE_LOOP_TRAP) {
            branch =
                arduino.INFINITE_LOOP_TRAP.replace(
                    /%1/g,
                    "'" + block.id + "'",
                ) + branch;
        }
        let returnValue =
            arduino.valueToCode(block, "RETURN", arduino.ORDER_NONE) || "";
        if (returnValue) {
            returnValue = "  return " + returnValue + ";\n";
        }

        // Get arguments with type
        const args = [];
        const { arguments_ } = block as unknown as Record<string, string[]>;
        for (let x = 0; x < arguments_.length; x++) {
            args[x] =
                "double" +
                " " +
                arduino.nameDB_?.getName(
                    arguments_[x],
                    Blockly.Names.NameType.VARIABLE,
                );
        }
        let returnType;
        // Get return type
        if (block.type == "procedures_defreturn") {
            const checks = block
                .getInput("RETURN")
                ?.connection?.targetConnection?.getCheck();

            if (checks && checks[0]) returnType = arduino.TYPES[checks[0]];
            else returnType = "double";
        } else {
            returnType = "void";
        }

        // Construct code
        let code =
            `${returnType} ${funcName}(${args.join(", ")}) {\n` +
            branch +
            returnValue +
            "}";
        code = arduino.scrub_(block, code);
        arduino.addDeclaration(funcName, code, true);
        return null;
    };

    /**
     * Code generator to create a function without a return value.
     * It uses the same code as with return value, as it will maintain the void
     * type.
     * Arduino code: void functionname { }
     */
    arduino.forBlock["procedures_defnoreturn"] =
        arduino.forBlock["procedures_defreturn"];

    arduino.forBlock["procedures_callreturn"] = function (block) {
        const funcName = arduino.nameDB_?.getName(
            block.getFieldValue("NAME"),
            Blockly.Names.NameType.PROCEDURE,
        );
        const args = [];
        const { arguments_ } = block as unknown as Record<string, string[]>;
        for (let x = 0; x < arguments_.length; x++) {
            args[x] =
                arduino.valueToCode(block, "ARG" + x, arduino.ORDER_NONE) ||
                "null";
        }
        const code = funcName + "(" + args.join(", ") + ")";
        return [code, arduino.ORDER_UNARY_POSTFIX];
    };

    arduino.forBlock["procedures_callnoreturn"] = function (block) {
        const funcName = arduino.nameDB_?.getName(
            block.getFieldValue("NAME"),
            Blockly.Names.NameType.PROCEDURE,
        );
        const args = [];
        const { arguments_ } = block as unknown as Record<string, string[]>;
        for (let x = 0; x < arguments_.length; x++) {
            args[x] =
                arduino.valueToCode(block, "ARG" + x, arduino.ORDER_NONE) ||
                "null";
        }
        return funcName + "(" + args.join(", ") + ");\n";
    };

    arduino.forBlock["procedures_ifreturn"] = function (block) {
        const condition =
            arduino.valueToCode(block, "CONDITION", arduino.ORDER_NONE) ||
            "false";
        let code = "if (" + condition + ") {\n";

        const { hasReturnValue_ } = block as unknown as Record<string, boolean>;
        if (hasReturnValue_) {
            const value =
                arduino.valueToCode(block, "VALUE", arduino.ORDER_NONE) ||
                "null";
            code += "  return " + value + ";\n";
        } else {
            code += "  return;\n";
        }
        code += "}\n";
        return code;
    };

    arduino.forBlock["arduino_functions"] = function (block) {
        function statementToCodeNoTab(block: Blockly.Block, name: string) {
            const targetBlock = block.getInputTargetBlock(name);
            return arduino.blockToCode(targetBlock);
        }

        const setupBranch = arduino.statementToCode(block, "SETUP_FUNC");
        //var setupCode = Arduino.scrub_(block, setupBranch); No comment block
        if (setupBranch) {
            arduino.addSetup("userSetupCode", setupBranch, true);
        }

        //var loopcode = Arduino.scrub_(block, loopBranch); No comment block
        return statementToCodeNoTab(block, "LOOP_FUNC");
    };
}

export default getCodeGenerators;
