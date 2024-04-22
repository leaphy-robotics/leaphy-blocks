import * as lists from "./lists";
import * as texts from "./text";
import * as leaphyCommon from "./leaphy_common";
import * as leaphyOriginal from "./leaphy_original";
import * as leaphyFlitz from "./leaphy_flitz";
import * as leaphyClick from "./leaphy_click";
import * as arduino from "./arduino";
import * as loops from "./alternatives";

type PinOptions = [string, string][];

export class Board {
    constructor(
        public boardType: string,
        public digitalPins: PinOptions,
        public analogPins: PinOptions,
        public pwmPins: PinOptions,
        public servoName: string,
    ) {}
}

function getBlocks(boardType = "l_uno") {
    let digitalPinOptions: PinOptions = [];
    let analogPinOptions: PinOptions = [];
    let pwmPinOptions: PinOptions = [];
    const servoName =
        boardType == "l_flitz_nano"
            ? "BKY_ARD_SERVO_ARM_WRITE"
            : "BKY_ARD_SERVO_WRITE";

    if (["l_uno", "l_click", "l_flitz", "l_original_uno"].includes(boardType)) {
        digitalPinOptions = [
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
        analogPinOptions = [
            ["A0", "A0"],
            ["A1", "A1"],
            ["A2", "A2"],
            ["A3", "A3"],
            ["A4", "A4"],
            ["A5", "A5"],
        ];
        pwmPinOptions = [
            ["3", "3"],
            ["5", "5"],
            ["6", "6"],
            ["9", "9"],
            ["10", "10"],
            ["11", "11"],
        ];
    }
    if (
        [
            "l_nano",
            "l_nano_esp32",
            "l_nano_rp2040",
            "l_flitz_nano",
            "l_click_nano",
            "l_original_nano",
            "l_original_nano_esp32",
            "l_original_nano_rp2040",
        ].includes(boardType)
    ) {
        digitalPinOptions = [
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
        analogPinOptions = [
            ["A0", "A0"],
            ["A1", "A1"],
            ["A2", "A2"],
            ["A3", "A3"],
            ["A4", "A4"],
            ["A5", "A5"],
            ["A6", "A6"],
            ["A7", "A7"],
        ];
        pwmPinOptions = [
            ["3", "3"],
            ["5", "5"],
            ["6", "6"],
            ["9", "9"],
            ["10", "10"],
            ["11", "11"],
        ];
    }
    if (boardType === "l_mega") {
        digitalPinOptions = new Array(51)
            .fill(0)
            .map((_, i) => [(i + 2).toString(), (i + 2).toString()]);
        analogPinOptions = new Array(15)
            .fill(0)
            .map((_, i) => [`A${i}`, `A${i}`]);
        pwmPinOptions = [
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
        ];
    }

    const board = new Board(
        boardType,
        digitalPinOptions,
        analogPinOptions,
        pwmPinOptions,
        servoName,
    );

    // Add all blocks from each independent module in one list
    const block = leaphyCommon.default(board);
    return { block };
}

const constantBlocks = [
    ...lists.blocks,
    ...texts.blocks,
    ...leaphyOriginal.blocks,
    ...leaphyFlitz.blocks,
    ...leaphyClick.blocks,
    ...arduino.blocks,
    ...loops.blocks,
];

export { getBlocks, constantBlocks };
