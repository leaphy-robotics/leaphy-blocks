/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Generating Arduino for loops blocks.
 */
 'use strict';


goog.module('Blockly.Arduino.loops');

const { arduinoGenerator: Arduino } = goog.require('Blockly.Arduino');
const {NameType} = goog.require('Blockly.Names');
const stringUtils = goog.require('Blockly.utils.string');

