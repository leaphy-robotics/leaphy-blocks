/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview All the blocks.  (Entry point for blocks_compressed.js.)
 * @suppress {extraRequire}
 */
'use strict';

//const colour = goog.require('Blockly.libraryBlocks.colour');
import * as colour from './colour';
//const lists = goog.require('Blockly.libraryBlocks.lists');
import * as lists from './lists';
//const logic = goog.require('Blockly.libraryBlocks.logic');
import * as logic from './logic';
//const loops = goog.require('Blockly.libraryBlocks.loops');
import * as loops from './loops';
//const math = goog.require('Blockly.libraryBlocks.math');
import * as math from './math';
//const procedures = goog.require('Blockly.libraryBlocks.procedures');
//import * as procedures from './procedures';
//const texts = goog.require('Blockly.libraryBlocks.texts');
import * as texts from './text';
//const variables = goog.require('Blockly.libraryBlocks.variables');
import * as variables from './variables';
//const variablesDynamic = goog.require('Blockly.libraryBlocks.variablesDynamic');
import * as variablesDynamic from './variables_dynamic';
//const leaphyCommon = goog.require('Blockly.libraryBlocks.leaphyCommon');
import * as leaphyCommon from './leaphy_common';
//const leaphyOriginal = goog.require('Blockly.libraryBlocks.leaphyOriginal');
import * as leaphyOriginal from './leaphy_original';
//const leaphyFlitz = goog.require('Blockly.libraryBlocks.leaphyFlitz');
import * as leaphyFlitz from './leaphy_flitz';
//const leaphyClick = goog.require('Blockly.libraryBlocks.leaphyClick');
import * as leaphyClick from './leaphy_click';
//const leaphyExtra = goog.require('Blockly.libraryBlocks.leaphyExtra');
import * as leaphyExtra from './leaphy_extra';
//const arduino = goog.require('Blockly.libraryBlocks.arduino');
import * as arduino from './arduino';
import * as procedures from "./procedures";

// Add all blocks from each independent module in one list
const block = [
	  ...colour.blocks,
	  ...lists.blocks,
	  ...logic.blocks,
	  ...loops.blocks,
	  ...math.blocks,
	  //...procedures.blocks,
	  ...texts.blocks,
	  ...variables.blocks,
	  ...variablesDynamic.blocks,
	  ...leaphyCommon.blocks,
	  ...leaphyOriginal.blocks,
	  ...leaphyFlitz.blocks,
	  ...leaphyClick.blocks,
	  ...leaphyExtra.blocks,
	  ...arduino.blocks,
	  ...procedures.blocks,
];


export const blocks = block;