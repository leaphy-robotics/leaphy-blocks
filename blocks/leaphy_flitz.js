/**
 * @fileoverview Blocks for the Leaphy Flitz robot.
 */
'use strict';

/* eslint-disable-next-line no-unused-vars */

const stomachSensorOptions =
  [
    ['%{BKY_LEAPHY_STOMACH_SENSOR_TYPE1}', '1'],
    ['%{BKY_LEAPHY_STOMACH_SENSOR_TYPE2}', '2'],
  ];

/**
 * A dictionary of the block definitions provided by this module.
 * @type {!Object<string, !BlockDefinition>}
 */
const blocks = [
  {
    'type': 'leaphy_flitz_read_stomach_sensor',
    'message0': '%%{BKY_LEAPHY_READ_STOMACH} %1',
    'args0': [{
      'type': 'field_dropdown',
      'name': 'SENSOR_TYPE',
      'options': stomachSensorOptions,
    }],
    'output': 'Number',
    'style': 'leaphy_blocks',
    'tooltip': '',
    'helpUrl': '',
  },
  {
    'type': 'leaphy_flitz_nano_read_stomach_sensor',
    'message0': '%%{BKY_LEAPHY_READ_STOMACH}',
    'output': 'Number',
    'style': 'leaphy_blocks',
    'tooltip': '',
    'helpUrl': '',
  },
  {
    'type': 'leaphy_flitz_read_hand_sensor',
    'message0': '%%{BKY_LEAPHY_READ_HAND}',
    'output': 'Number',
    'style': 'leaphy_blocks',
    'tooltip': '',
    'helpUrl': '',
  },
  {
    'type': 'leaphy_flitz_nano_read_hand_sensor',
    'message0': '%%{BKY_LEAPHY_READ_HAND}',
    'output': 'Number',
    'style': 'leaphy_blocks',
    'tooltip': '',
    'helpUrl': '',
  },
  {
    'type': 'leaphy_flitz_led',
    'message0':
      '%%{BKY_LEAPHY_FLITZ_LED} %1 %%{BKY_LEAPHY_FLITZ_LED_R} %2 %%{BKY_LEAPHY_FLITZ_LED_G} %3 %%{BKY_LEAPHY_FLITZ_LED_B} %4',
    'args0': [
      {'type': 'input_dummy'},
      {'type': 'input_value', 'name': 'FLITZ_LED_R', 'check': 'Number'},
      {'type': 'input_value', 'name': 'FLITZ_LED_G', 'check': 'Number'},
      {'type': 'input_value', 'name': 'FLITZ_LED_B', 'check': 'Number'},
    ],
    'inputsInline': true,
    'previousStatement': null,
    'nextStatement': null,
    'style': 'leaphy_blocks',
    'tooltip': '',
    'helpUrl': '',
  },
  {
    'type': 'leaphy_flitz_nano_led',
    'message0':
      '%%{BKY_LEAPHY_FLITZ_LED} %1 %%{BKY_LEAPHY_FLITZ_LED_R} %2 %%{BKY_LEAPHY_FLITZ_LED_G} %3 %%{BKY_LEAPHY_FLITZ_LED_B} %4',
    'args0': [
      {'type': 'input_dummy'},
      {'type': 'input_value', 'name': 'FLITZ_LED_R', 'check': 'Number'},
      {'type': 'input_value', 'name': 'FLITZ_LED_G', 'check': 'Number'},
      {'type': 'input_value', 'name': 'FLITZ_LED_B', 'check': 'Number'},
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
