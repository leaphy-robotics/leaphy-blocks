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
//const arduino = goog.require('Blockly.libraryBlocks.arduino');
import * as arduino from './arduino';
import * as procedures from "./procedures";

function getBlocks(boardType = 'l_uno') {
	var digitalPinOptions = [];
	var analogPinOptions = [];

	console.log('boardType: ' + boardType);

	if (boardType == 'l_uno') {
		digitalPinOptions = [
			['2', '2'], ['3', '3'], ['4', '4'], ['5', '5'], ['6', '6'], ['7', '7'],
			['8', '8'], ['9', '9'], ['10', '10'], ['11', '11'], ['12', '12'],
			['13', '13'], ['14', '14'], ['15', '15'], ['16', '16'], ['17', '17'],
			['18', '18'], ['19', '19'],
		];
	} else if (boardType == 'l_nano') {
		 digitalPinOptions = [
			['2', '2'], ['3', '3'], ['4', '4'], ['5', '5'], ['6', '6'], ['7', '7'],
			['8', '8'], ['9', '9'], ['10', '10'], ['11', '11'], ['12', '12'],
			['13', '13'], ['14', '14'], ['15', '15'], ['16', '16'], ['17', '17'],
			['18', '18'], ['19', '19'],
		];
		 analogPinOptions = [
			['A0', 'A0'], ['A1', 'A1'], ['A2', 'A2'], ['A3', 'A3'], ['A4', 'A4'],
			['A5', 'A5'], ['A6', 'A6'], ['A7', 'A7'],
		];
	} else if (boardType == 'l_click') {
		 digitalPinOptions = [
			['2', '2'], ['3', '3'], ['4', '4'], ['5', '5'], ['6', '6'], ['7', '7'],
			['8', '8'], ['9', '9'], ['10', '10'], ['11', '11'], ['12', '12'],
			['13', '13'], ['14', '14'], ['15', '15'], ['16', '16'], ['17', '17'],
			['18', '18'], ['19', '19'],
		];
	}

	console.log('digitalPinOptions: ' + digitalPinOptions);



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
		...leaphyCommon.default(digitalPinOptions),
		...leaphyOriginal.blocks,
		...leaphyFlitz.blocks,
		...leaphyClick.blocks,
		...arduino.blocks,
	];

	const blockJs = procedures.blocks;

	return {block, blockJs};
}

export default getBlocks;
