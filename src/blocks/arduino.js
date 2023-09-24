/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Blocks for Arduino boards.
 */
'use strict';

// const {BlockDefinition} = goog.requireType('Blockly.blocks');
// TODO (6248): Properly import the BlockDefinition type.
/* eslint-disable-next-line no-unused-vars */



/**
 * A dictionary of the block definitions provided by this module.
 * @type {!Object<string, !BlockDefinition>}
 */
const blocks = [{
  'type': 'time_delay',
  'message0': '%{BKY_ARD_TIME_DELAY} %1 %{BKY_ARD_TIME_MS}',
  'args0':
      [{'type': 'input_value', 'name': 'DELAY_TIME_MILI', 'check': 'Number'}],
  'inputsInline': true,
  'previousStatement': null,
  'nextStatement': null,
  'style': 'situation_blocks',
  'tooltip': '%{BKY_ARD_TIME_DELAY_TIP}',
  'helpUrl': 'http://arduino.cc/en/Reference/Delay',
}];

export {
  blocks,
}