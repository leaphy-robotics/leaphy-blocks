import {Block, Workspace} from "blockly/core";
import {PythonGenerator} from 'blockly/python';
import {pythonGenerator} from 'blockly/python';

export class MicroPython extends PythonGenerator {
    public ORDER_ATOMIC = 0;
    public includes_: Record<string, string> = {};
    public setups_: Record<string, string> = {};
    public declarations_: Record<string, { priority: number; code: string }> = {};
    public robotType: string = '';
    public definitions_: Record<string, string> = {};

    constructor() {
        super();
        this.includes_ = Object.create(null);
        this.setups_ = Object.create(null);
        this.declarations_ = Object.create(null);
        
        // Voeg de noodzakelijke import toe
        this.addInclude("pins", "from leaphymicropython.utils.pins import set_pwm\n");
        
        Object.assign(this.forBlock, pythonGenerator.forBlock);
    }

    public addInclude(includeTag: string, code: string) {
        if (!this.includes_[includeTag]) {
            this.includes_[includeTag] = code;
        }
    }

    public addSetup(setupTag: string, code: string, overwrite: boolean = false) {
        if (overwrite || this.setups_[setupTag] === undefined) {
            this.setups_[setupTag] = code;
        }
    }

    public addDeclaration(declarationTag: string, code: string, overwrite = false, priority = 0) {
        if (this.declarations_[declarationTag] === undefined || overwrite) {
            this.declarations_[declarationTag] = {
                priority,
                code,
            };
        }
    }

    public finish(code: string) {
        // Converteer de includes en definities naar lijsten
        const includes = Object.values(this.includes_),
            definitions: string[] = Object.values(this.definitions_),
            declarations = Object.values(this.declarations_)
                .sort((a, b) => b.priority - a.priority)
                .map(({ code }) => code);

        // Voeg de includes en definities bovenaan de code toe
        const allDefs = includes.join("\n") + "\n" + definitions.join("\n") + "\n" + declarations.join("\n");

        

        // Return alleen de definities en de gegenereerde code
        return allDefs + "\n" + code;
    }

    public workspaceToCode(workspace: Workspace, robotType?: string): string {
        if (robotType) this.robotType = robotType;
        return super.workspaceToCode(workspace);
    }

    public getDefinition(name: string): string | undefined {
        return this.definitions_[name];
    }

    public addDefinition(name: string, code: string): void {
        this.definitions_[name] = code;
    }
}

// Maak een instantie van de generator
const generator = new MicroPython();

// Voeg de workspaceToCode methode toe aan de pythonGenerator
pythonGenerator.oldworkspaceToCode = pythonGenerator.workspaceToCode;
pythonGenerator.workspaceToCode = function(workspace: Workspace, robotType?: string): string {
    if (robotType) this.robotType = robotType;
    return pythonGenerator.oldworkspaceToCode(workspace);
}

// Importeer alle blokdefinities
import * as micropython from "./micropython/micropython";
import * as leaphy_original from "../generators/micropython/leaphy_original";
import * as leaphy_extra from "../generators/micropython/leaphy_extra";
// ... andere imports ...

// Initialiseer alle blokdefinities
micropython.default(generator);
leaphy_original.default(generator);
leaphy_extra.default(generator);
// ... andere initialisaties ...

export default generator;
