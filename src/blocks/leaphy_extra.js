/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Blocks for Leaphy Extra.
 */
'use strict';


// const {BlockDefinition} = goog.requireType('Blockly.blocks');
// TODO (6248): Properly import the BlockDefinition type.
/* eslint-disable-next-line no-unused-vars */



const digitalPinOptions = [
  ['2', '2'], ['3', '3'], ['4', '4'], ['5', '5'], ['6', '6'], ['7', '7'],
  ['8', '8'], ['9', '9'], ['10', '10'], ['11', '11'], ['12', '12'],
  ['13', '13'], ['14', '14'], ['15', '15'], ['16', '16'], ['17', '17'],
  ['18', '18'], ['19', '19'],
];
const ledstripDemoOptions = [
  ['%{BKY_LEAPHY_LED_STRIP_LIGHTBANK}', '0'],
  ['%{BKY_LEAPHY_LED_STRIP_BREATHE}', '1'],
  ['%{BKY_LEAPHY_LED_STRIP_GULF}', '3'],
  ['%{BKY_LEAPHY_LED_STRIP_RAINBOW}', '4'],
  ['%{BKY_LEAPHY_LED_STRIP_COLORGULF}', '5'],
];
const rgbColor = [
  ['%{BKY_LEAPHY_RGB_COLOR_RED}', '0'], ['%{BKY_LEAPHY_RGB_COLOR_GREEN}', '1'],
  ['%{BKY_LEAPHY_RGB_COLOR_BLUE}', '2'],
];
const rgbColorRaw = [
  ['%{BKY_LEAPHY_RGB_RAW_COLOR_RED}', '0'],
  ['%{BKY_LEAPHY_RGB_RAW_COLOR_GREEN}', '1'],
  ['%{BKY_LEAPHY_RGB_RAW_COLOR_BLUE}', '2'],
];
const displayPinNumbers = [['1', '0'], ['2', '1'], ['3', '2']];

/**
 * A dictionary of the block definitions provided by this module.
 * @type {!Object<string, !BlockDefinition>}
 */
const blocks = [
  {
    'type': 'leaphy_rgb_color',
    'message0': '%1',
    'args0':
        [{'type': 'field_dropdown', 'name': 'COLOR_TYPE', 'options': rgbColor}],
    'style': 'leaphy_blocks',
    'output': 'Number',
    'tooltip': '',
    'helpUrl': '',
  },
  {
    'type': 'leaphy_rgb_color_raw',
    'message0': '%1',
    'args0': [{
      'type': 'field_dropdown',
      'name': 'COLOR_TYPE_RAW',
      'options': rgbColorRaw,
    }],
    'style': 'leaphy_blocks',
    'output': 'Number',
    'tooltip': '',
    'helpUrl': '',
  },
  {
    'type': 'leaphy_rgb_raw_color_red',
    'message0': '%%{BKY_LEAPHY_RGB_RAW_COLOR_RED}',
    'style': 'leaphy_blocks',
    'output': 'Number',
    'tooltip': '',
    'helpUrl': '',
  },
  {
    'type': 'leaphy_rgb_raw_color_green',
    'message0': '%%{BKY_LEAPHY_RGB_RAW_COLOR_GREEN}',
    'style': 'leaphy_blocks',
    'output': 'Number',
    'tooltip': '',
    'helpUrl': '',
  },
  {
    'type': 'leaphy_rgb_raw_color_blue',
    'message0': '%%{BKY_LEAPHY_RGB_RAW_COLOR_BLUE}',
    'style': 'leaphy_blocks',
    'output': 'Number',
    'tooltip': '',
    'helpUrl': '',
  },
  {
    'type': 'leaphy_led_set_strip',
    'message0':
        '%%{BKY_LEAPHY_LED_SET_STRIP} %1 %%{BKY_LEAPHY_LED_SET_PIN} %2 %%{BKY_LEAPHY_LED_SET_LEDS} %3',
    'args0': [
      {'type': 'input_dummy'},
      {'type': 'input_value', 'name': 'LED_SET_PIN', 'check': 'Number'},
      {'type': 'input_value', 'name': 'LED_SET_LEDS', 'check': 'Number'},
    ],
    'inputsInline': true,
    'previousStatement': null,
    'nextStatement': null,
    'style': 'leaphy_blocks',
    'tooltip': '',
    'helpUrl': '',
  },
  {
    'type': 'leaphy_led_set_basic',
    'message0':
        '%%{BKY_LEAPHY_LED_BASIC_LED} %1 %%{BKY_LEAPHY_LED_BASIC_RED} %2 %%{BKY_LEAPHY_LED_BASIC_GREEN} %3 %%{BKY_LEAPHY_LED_BASIC_BLUE} %4',
    'args0': [
      {'type': 'input_value', 'name': 'LED_SET_LED', 'check': 'Number'},
      {'type': 'input_value', 'name': 'LED_BASIC_RED', 'check': 'Number'},
      {'type': 'input_value', 'name': 'LED_BASIC_GREEN', 'check': 'Number'},
      {'type': 'input_value', 'name': 'LED_BASIC_BLUE', 'check': 'Number'},
    ],
    'inputsInline': true,
    'previousStatement': null,
    'nextStatement': null,
    'style': 'leaphy_blocks',
    'tooltip': '',
    'helpUrl': '',
  },
  {
    'type': 'leaphy_led_set_speed',
    'message0': '%%{BKY_LEAPHY_LED_SET_SPEEDVALUE} %1',
    'args0': [
      {'type': 'input_value', 'name': 'LED_SET_SPEEDVALUE', 'check': 'Number'},
    ],
    'inputsInline': true,
    'previousStatement': null,
    'nextStatement': null,
    'style': 'leaphy_blocks',
    'tooltip': '',
    'helpUrl': '',
  },
  {
    'type': 'leaphy_led_strip_demo',
    'message0': '%%{BKY_LEAPHY_LED_STRIP_DEMO} %1 %2 %3 %4 %5',
    'args0': [
      {
        'type': 'field_dropdown',
        'name': 'DEMO_TYPE',
        'options': ledstripDemoOptions,
      },
      {'type': 'input_dummy'},
      {'type': 'input_value', 'name': 'LED_STRIP_DEMO_RED', 'check': 'Number'},
      {
        'type': 'input_value',
        'name': 'LED_STRIP_DEMO_GREEN',
        'check': 'Number',
      },
      {'type': 'input_value', 'name': 'LED_STRIP_DEMO_BLUE', 'check': 'Number'},
    ],
    'inputsInline': true,
    'previousStatement': null,
    'nextStatement': null,
    'style': 'leaphy_blocks',
    'tooltip': '',
    'helpUrl': '',
  },
  {
    'type': 'leaphy_servo_write',
    'message0':
        '%%{BKY_ARD_SERVO_WRITE} %1 %2 %%{BKY_ARD_SERVO_WRITE_TO} %3 %%{BKY_ARD_SERVO_WRITE_DEG_180}',
    'args0': [
      {
        'type': 'field_dropdown',
        'name': 'SERVO_PIN',
        'options': digitalPinOptions,
      },
      {'type': 'input_dummy'},
      {'type': 'input_value', 'name': 'SERVO_ANGLE', 'check': 'Number'},
    ],
    'inputsInline': true,
    'previousStatement': null,
    'nextStatement': null,
    'style': 'leaphy_blocks',
    // "extensions": "refreshServoPinFields",
    'tooltip': '%{BKY_ARD_SERVO_WRITE_TIP}',
    'helpUrl': 'http://arduino.cc/en/Reference/ServoWrite',
  },
  {
    'type': 'leaphy_servo_read',
    'message0': '%%{BKY_ARD_SERVO_READ} %1',
    'args0': [{
      'type': 'field_dropdown',
      'name': 'SERVO_PIN',
      'options': digitalPinOptions,
    }],
    'output': 'Number',
    'style': 'leaphy_blocks',
    // "extensions": "returnAndUpdateServoRead",
    'tooltip': '%{BKY_ARD_SERVO_READ_TIP}',
    'helpUrl': 'http://arduino.cc/en/Reference/ServoRead',
  },
  {
    'type': 'leaphy_io_digitalwrite',
    'message0': '%%{BKY_ARD_DIGITALWRITE} %1 %%{BKY_ARD_WRITE_TO} %2',
    'args0': [
      {'type': 'field_dropdown', 'name': 'PIN', 'options': digitalPinOptions},
      {'type': 'input_value', 'name': 'NAME', 'check': 'Boolean'},
    ],
    'inputsInline': true,
    'previousStatement': null,
    'nextStatement': null,
    'style': 'leaphy_blocks',
    'tooltip': '%{BKY_ARD_DIGITALWRITE_TIP}',
    'helpUrl': 'http://arduino.cc/en/Reference/DigitalWrite',
  },
  {
    'type': 'leaphy_io_analogwrite',
    'message0': '%%{BKY_ARD_ANALOGWRITE} %1 %%{BKY_ARD_WRITE_TO} %2',
    'args0': [
      {'type': 'field_dropdown', 'name': 'PIN', 'options': digitalPinOptions},
      {'type': 'input_value', 'name': 'NUM', 'check': 'Number'},
    ],
    'inputsInline': true,
    'previousStatement': null,
    'nextStatement': null,
    'style': 'leaphy_blocks',
    // "extensions": "inputAndUpdateAnalog",
    'tooltip': '%{BKY_ARD_ANALOGWRITE_TIP}',
    'helpUrl': 'http://arduino.cc/en/Reference/AnalogWrite',
  },
  {
    'type': 'leaphy_sonar_read',
    'message0':
        '%%{BKY_LEAPHY_SONAR_READ_TRIG} %1 %%{BKY_LEAPHY_SONAR_READ_ECHO} %2',
    'args0': [
      {
        'type': 'field_dropdown',
        'name': 'TRIG_PIN',
        'options': digitalPinOptions,
      },
      {
        'type': 'field_dropdown',
        'name': 'ECHO_PIN',
        'options': digitalPinOptions,
      },
    ],
    'output': 'Number',
    'style': 'leaphy_blocks',
    // "extensions": "returnAndUpdateTrig",
    'tooltip': '%{BKY_LEAPHY_SONAR_READ_TIP}',
    'helpUrl': '',
  },
  {
    'type': 'leaphy_display_clear',
    'message0': '%%{BKY_LEAPHY_DISPLAY_CLEAR}',
    'previousStatement': null,
    'nextStatement': null,
    'style': 'leaphy_blocks',
    'tooltip': '',
    'helpUrl': '',
  },
  {
    'type': 'leaphy_display_display',
    'message0': '%%{BKY_LEAPHY_DISPLAY_DISPLAY}',
    'previousStatement': null,
    'nextStatement': null,
    'style': 'leaphy_blocks',
    'tooltip': '',
    'helpUrl': '',
  },
  {
    'type': 'leaphy_display_print_line',
    'message0': '%%{BKY_LEAPHY_DISPLAY_PRINT} %1 %2 %3',
    'args0': [
      {'type': 'input_dummy'}, {
        'type': 'field_dropdown',
        'name': 'DISPLAY_ROW',
        'options': displayPinNumbers,
      },
      {'type': 'input_value', 'name': 'VALUE'},
    ],
    'inputsInline': true,
    'previousStatement': null,
    'nextStatement': null,
    'style': 'leaphy_blocks',
    // "extensions": "updateDisplay",
    'tooltip': '',
    'helpUrl': '',
  },
  {
    'type': 'leaphy_display_print_value',
    'message0': '%%{BKY_LEAPHY_DISPLAY_PRINT} %1 %2 %3 = %4 %5',
    'args0': [
      {'type': 'input_dummy'}, {
        'type': 'field_dropdown',
        'name': 'DISPLAY_ROW',
        'options': displayPinNumbers,
      },
      {'type': 'input_value', 'name': 'NAME'}, {'type': 'input_dummy'},
      {'type': 'input_value', 'name': 'VALUE'},
    ],
    'inputsInline': true,
    'previousStatement': null,
    'nextStatement': null,
    'style': 'leaphy_blocks',
    // "extensions": "updateDisplay",
    'tooltip': '',
    'helpUrl': '',
  },
  {
    'type': 'leaphy_use_lsm9ds1',
    'message0': '%1 %2',
    'args0': [
      {
        'type': 'field_dropdown',
        'name': 'SENSOR',
        'options': [
          ['Gyro', 'g.gyro'], ['Compass', 'm.magnetic'],
          ['Accelerator', 'a.acceleration'],
        ],
      },
      {
        'type': 'field_dropdown',
        'name': 'AXIS',
        'options': [['X-axis', '.x'], ['Y-axis', '.y'], ['Z-axis', '.z']],
      },
    ],
    'inputsInline': true,
    'output': 'Number',
    'style': 'leaphy_blocks',
    'tooltip': '',
    'helpUrl': '',
  },
  {
    'type': 'leaphy_update_lsm9ds1',
    'message0': 'Update Lsm9ds1',
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
