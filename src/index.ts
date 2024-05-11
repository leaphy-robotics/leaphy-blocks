import translations from "./msg/translations";
import arduino from "./generators/arduino";
import registerExtensions from "./blocks/extensions";
import { blocks } from "./blocks/blocks";

export * as THEME from "./theme/theme";
export * as CATEGORIES from "./categories/all";
export { ProcedureSerializer } from "./generators/arduino/procedures";
export { translations, arduino, blocks, registerExtensions };
