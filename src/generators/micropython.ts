import {Block, Workspace} from "blockly/core";
import {PythonGenerator} from 'blockly/python';
import {pythonGenerator} from 'blockly/python';

import * as micropython from "./micropython/micropython";
import * as leaphy_original from "../generators/micropython/leaphy_original";
import * as leaphy_extra from "../generators/micropython/leaphy_extra";

export class MicroPython extends PythonGenerator {
    // Constants for operator precedence
    public ORDER_ATOMIC = 0;             // 0 "" ...

    // Dictionaries to store different types of code segments
    public includes_: Record<string, string> = {};        // Stores include statements
    public setups_: Record<string, string> = {};         // Stores setup code
    public declarations_: Record<string, { 
        priority: number;
        code: string 
    }> = {};                                            // Stores declarations with priority
    
    public robotType: string = '';                      // Type of robot being programmed
    public definitions_: Record<string, string> = {};   // Stores variable/function definitions

    constructor() {
        super();
        // Initialize empty dictionaries
        this.includes_ = Object.create(null);
        this.setups_ = Object.create(null);
        this.declarations_ = Object.create(null);
        
        this.INDENT = "    ";  // Set indentation to 4 spaces instead of 2
        
        // Add default pin utilities
        this.addInclude("pins", "from leaphymicropython.utils.pins import set_pwm\n");
        
        // Inherit Python block definitions
        Object.assign(this.forBlock, pythonGenerator.forBlock);
    }

    /**
     * Adds an include statement if it doesn't exist yet
     * @param includeTag Unique identifier for this include
     * @param code The actual include statement
     */
    public addInclude(includeTag: string, code: string) {
        if (!this.includes_[includeTag]) {
            this.includes_[includeTag] = code;
        }
    }

    /**
     * Adds setup code with optional overwrite capability
     * @param setupTag Unique identifier for this setup code
     * @param code The setup code to add
     * @param overwrite Whether to overwrite existing setup code
     */
    public addSetup(setupTag: string, code: string, overwrite: boolean = false) {
        if (overwrite || this.setups_[setupTag] === undefined) {
            this.setups_[setupTag] = code;
        }
    }

    /**
     * Adds a declaration with priority level
     * @param declarationTag Unique identifier for this declaration
     * @param code The declaration code
     * @param overwrite Whether to overwrite existing declaration
     * @param priority Priority level for ordering declarations
     */
    public addDeclaration(declarationTag: string, code: string, overwrite = false, priority = 0) {
        if (this.declarations_[declarationTag] === undefined || overwrite) {
            this.declarations_[declarationTag] = {
                priority,
                code,
            };
        }
    }

    /**
     * Finalizes the generated code by combining all code segments
     * @param code The main program code
     * @returns Complete program as string
     */
    public finish(code: string) {
        const includes = Object.values(this.includes_),
            definitions: string[] = Object.values(this.definitions_),
            declarations = Object.values(this.declarations_)
                .sort((a, b) => b.priority - a.priority)
                .map(({ code }) => code);

        const allDefs = includes.join("\n") + "\n" + definitions.join("\n") + "\n" + declarations.join("\n");

        return allDefs + "\n" + code;
    }

    /**
     * Generates code for an entire workspace
     * @param workspace The Blockly workspace
     * @param robotType Optional robot type specification
     */
    public workspaceToCode(workspace: Workspace, robotType?: string): string {
        if (robotType) this.robotType = robotType;
        return super.workspaceToCode(workspace);
    }

    /**
     * Retrieves a definition by name
     * @param name The definition identifier
     */
    public getDefinition(name: string): string | undefined {
        return this.definitions_[name];
    }

    /**
     * Adds a new definition
     * @param name The definition identifier
     * @param code The definition code
     */
    public addDefinition(name: string, code: string): void {
        this.definitions_[name] = code;
    }
}

const generator = new MicroPython();

pythonGenerator.oldworkspaceToCode = pythonGenerator.workspaceToCode;
pythonGenerator.workspaceToCode = function(workspace: Workspace, robotType?: string): string {
    if (robotType) this.robotType = robotType;
    return pythonGenerator.oldworkspaceToCode(workspace);
}




micropython.default(generator);
leaphy_original.default(generator);
leaphy_extra.default(generator);


export default generator;
