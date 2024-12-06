import * as lists from "./lists";
import * as texts from "../text";
import * as leaphyCommon from "./leaphy_common";
import * as leaphyOriginal from "./leaphy_original";
import * as leaphyFlitz from "./leaphy_flitz";
import * as leaphyClick from "./leaphy_click";
import * as arduino from "./arduino";
import * as loops from "./alternatives";
import * as mesh from "./mesh";
import * as rtc from "./rtc";

const blocks = [
    ...lists.blocks,
    ...texts.blocks,
    ...leaphyOriginal.blocks,
    ...leaphyFlitz.blocks,
    ...leaphyClick.blocks,
    ...arduino.blocks,
    ...loops.blocks,
    ...leaphyCommon.blocks,
    ...mesh.blocks,
    ...rtc.blocks,
];

export { blocks };
