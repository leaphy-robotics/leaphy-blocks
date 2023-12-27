import * as colour from "./colour";
import * as lists from "./lists";
import * as logic from "./logic";
import * as loops from "./loops";
import * as math from "./math";
import * as texts from "./text";
import * as variables from "./variables";
import * as variablesDynamic from "./variables_dynamic";
import * as leaphyCommon from "./leaphy_common";
import * as leaphyOriginal from "./leaphy_original";
import * as leaphyFlitz from "./leaphy_flitz";
import * as leaphyClick from "./leaphy_click";
import * as arduino from "./arduino";
import * as procedures from "./procedures";
import * as blockly from "blockly";

class Board {
  boardType = "";
  digitalPins = [];
  analogPins = [];
  servoName = "";

  constructor(boardType, digiPins, anaPins, servoName) {
    this.boardType = boardType;
    this.digitalPins = digiPins;
    this.analogPins = anaPins;
    this.servoName = servoName;
  }
}

function getBlocks(boardType = "l_uno") {
  var digitalPinOptions = [];
  var analogPinOptions = [];
  var servoName =
    boardType == "l_flitz_nano"
      ? "BKY_ARD_SERVO_ARM_WRITE"
      : "BKY_ARD_SERVO_WRITE";

  if (
    boardType === "l_uno" ||
    boardType === "l_click" ||
    boardType === "l_flitz" ||
    boardType === "l_original"
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
    ];
  } else if (
    boardType === "l_nano" ||
    boardType === "l_flitz_nano" ||
    boardType === "l_click_nano" ||
    boardType === "l_original_nano"
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
  }

  const board = new Board(
    boardType,
    digitalPinOptions,
    analogPinOptions,
    servoName,
  );

  // Add all blocks from each independent module in one list
  const block = [
    ...colour.blocks,
    ...lists.blocks,
    ...blockly.logic.blocks,
    ...loops.blocks,
    ...math.blocks,
    ...texts.blocks,
    ...variables.blocks,
    ...variablesDynamic.blocks,
    ...leaphyCommon.default(board),
    ...leaphyOriginal.blocks,
    ...leaphyFlitz.blocks,
    ...leaphyClick.blocks,
    ...arduino.blocks,
  ];

  const blockJs = procedures.blocks;

  return { block, blockJs };
}

export default getBlocks;
