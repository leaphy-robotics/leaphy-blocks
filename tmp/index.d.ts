import * as Blockly from 'blockly/core';
import { WorkspaceSvg, Workspace } from 'blockly/core';
import * as blockly_core_utils_toolbox from 'blockly/core/utils/toolbox';
import { ISerializer } from 'blockly/core/interfaces/i_serializer';
import { ISerializer as ISerializer$1 } from 'blockly/core/serialization';

declare const _default: {
    nl: Record<string, string>;
    en: Record<string, string>;
};

declare class Arduino extends Blockly.Generator {
    ORDER_ATOMIC: number;
    ORDER_UNARY_POSTFIX: number;
    ORDER_UNARY_PREFIX: number;
    ORDER_MULTIPLICATIVE: number;
    ORDER_ADDITIVE: number;
    ORDER_SHIFT: number;
    ORDER_RELATIONAL: number;
    ORDER_EQUALITY: number;
    ORDER_BITWISE_AND: number;
    ORDER_BITWISE_XOR: number;
    ORDER_BITWISE_OR: number;
    ORDER_LOGICAL_AND: number;
    ORDER_LOGICAL_OR: number;
    ORDER_CONDITIONAL: number;
    ORDER_ASSIGNMENT: number;
    ORDER_COMMA: number;
    ORDER_UNARY_NEGATION: number;
    ORDER_MEMBER: number;
    ORDER_NONE: number;
    PinTypes: {
        INPUT: string;
        OUTPUT: string;
        PWM: string;
        SERVO: string;
        STEPPER: string;
        SERIAL: string;
        I2C: string;
        SPI: string;
        LEDSTRIP: string;
    };
    DEF_FUNC_NAME: string;
    TYPES: Record<string, string>;
    DEFAULTS: Record<string, string>;
    pins_: Record<string, string>;
    includes_: Record<string, string>;
    setups_: Record<string, string>;
    declarations_: Record<string, {
        priority: number;
        code: string;
    }>;
    robotType: string;
    constructor();
    init(workspace: WorkspaceSvg): void;
    finish(code: string): string;
    addInclude(includeTag: string, code: string): void;
    addDeclaration(declarationTag: string, code: string, overwrite?: boolean, priority?: number): void;
    addSetup(setupTag: string, code: string, overwrite?: boolean): boolean;
    addI2CSetup(sensorName: string, setupCode: string): string;
    reservePin(block: Blockly.Block, pin: string, pinType: string, warningTag: string): void;
    scrubNakedValue(line: string): string;
    quote_(string: string): string;
    scrub_(block: Blockly.Block, code: string): string;
    workspaceToCode(workspace: Workspace, robotType?: string): string;
}
declare const generator: Arduino;

declare function registerExtensions(blockly: typeof Blockly): void;

declare const blocks: any[];

declare const defaultBlockStyles: {
    leaphy_blocks: {
        colourPrimary: string;
        hat: string;
    };
    loop_blocks: {
        colourPrimary: string;
    };
    math_blocks: {
        colourPrimary: string;
    };
    text_blocks: {
        colourPrimary: string;
    };
    logic_blocks: {
        colourPrimary: string;
    };
    variable_blocks: {
        colourPrimary: string;
    };
    list_blocks: {
        colourPrimary: string;
    };
    procedure_blocks: {
        colourPrimary: string;
    };
    mesh_blocks: {
        colourPrimary: string;
    };
};
declare const categoryStyles: {
    leaphy_category: {
        colour: string;
    };
    situation_category: {
        colour: string;
    };
    numbers_category: {
        colour: string;
    };
    variables_category: {
        colour: string;
    };
    lists_category: {
        colour: string;
    };
    functions_category: {
        colour: string;
    };
    mesh_category: {
        colour: string;
    };
};
declare const componentStyles: {
    workspaceBackgroundColour: string;
    toolboxBackgroundColour: string;
    toolboxForegroundColour: string;
    flyoutBackgroundColour: string;
    flyoutForegroundColour: string;
    flyoutOpacity: number;
};

declare const theme_categoryStyles: typeof categoryStyles;
declare const theme_componentStyles: typeof componentStyles;
declare const theme_defaultBlockStyles: typeof defaultBlockStyles;
declare namespace theme {
  export { theme_categoryStyles as categoryStyles, theme_componentStyles as componentStyles, theme_defaultBlockStyles as defaultBlockStyles };
}

interface SerialList {
    name: string;
    id: string;
}
declare class ListSerializer implements ISerializer {
    priority: number;
    clear(): void;
    load(state: SerialList[]): void;
    save(): SerialList[] | null;
}
declare function export_default(workspace: WorkspaceSvg): blockly_core_utils_toolbox.FlyoutItemInfoArray;

type all_ListSerializer = ListSerializer;
declare const all_ListSerializer: typeof ListSerializer;
declare namespace all {
  export { export_default as LISTS, all_ListSerializer as ListSerializer };
}

interface Procedure {
    name: string;
    funcName: string;
    remote: boolean;
    arguments: {
        id: string;
        name: string;
    }[];
}
declare class ProcedureSerializer implements ISerializer$1 {
    priority: number;
    save(): Procedure[];
    load(state: Procedure[]): void;
    clear(): void;
}

export { all as CATEGORIES, ProcedureSerializer, theme as THEME, generator as arduino, blocks, registerExtensions, _default as translations };
