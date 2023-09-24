/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Common blocks for the Leaphy robots.
 */
'use strict';


// const {BlockDefinition} = goog.requireType('Blockly.blocks');
// TODO (6248): Properly import the BlockDefinition type.
/* eslint-disable-next-line no-unused-vars */
import * as Blockly from 'blockly/core';


/**
 * A dictionary of the block definitions provided by this module.
 * @type {!Object<string, !BlockDefinition>}
 */
const blocks = [
  {
    'type': 'leaphy_start',
    'lastDummyAlign0': 'CENTRE',
    'message0': '%%{BKY_LEAPHY_START}',
    'style': 'leaphy_blocks',
    'extensions': ['appendStatementInputStack'],
    'isDeletable': false,
    'tooltip': '',
    'helpUrl': '',
  },
  {
    'type': 'leaphy_serial_print_line',
    'message0': '%%{BKY_LEAPHY_SERIAL_PRINT} %1 %2',
    'args0':
        [{'type': 'input_dummy'}, {'type': 'input_value', 'name': 'VALUE'}],
    'inputsInline': true,
    'previousStatement': null,
    'nextStatement': null,
    'style': 'leaphy_blocks',
    'tooltip': '',
    'helpUrl': '',
  },
  {
    'type': 'leaphy_serial_print_value',
    'message0': '%%{BKY_LEAPHY_SERIAL_PRINT} %1 %2 = %3 %4',
    'args0': [
      {'type': 'input_dummy'}, {'type': 'input_value', 'name': 'NAME'},
      {'type': 'input_dummy'}, {'type': 'input_value', 'name': 'VALUE'},
    ],
    'inputsInline': true,
    'previousStatement': null,
    'nextStatement': null,
    'style': 'leaphy_blocks',
    'tooltip': '',
    'helpUrl': '',
  },
];

export {
  blocks,
}
