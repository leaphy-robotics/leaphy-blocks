/**
 * A dictionary of the block definitions provided by this module.
 * @type {!Object<string, !BlockDefinition>}
 */
const blocks = [
  {
    type: "time_delay",
    message0: "%{BKY_ARD_TIME_DELAY} %1 %{BKY_ARD_TIME_MS}",
    args0: [{ type: "input_value", name: "DELAY_TIME_MILI", check: "Number" }],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    style: "situation_blocks",
    tooltip: "%{BKY_ARD_TIME_DELAY_TIP}",
    helpUrl: "http://arduino.cc/en/Reference/Delay",
  },
  //definition is here because it is not in the default blockly blocks.
  {
    type: "controls_repeat_forever",
    message0: "%{BKY_CONTROLS_REPEAT_FOREVER_TITLE}",
    message1: "%{BKY_CONTROLS_REPEAT_INPUT_DO} %1",
    args1: [{ type: "input_statement", name: "DO" }],
    previousStatement: null,
    nextStatement: null,
    style: "situation_blocks",
    tooltip: "%{BKY_CONTROLS_REPEAT_TOOLTIP}",
    helpUrl: "%{BKY_CONTROLS_REPEAT_HELPURL}",
  },
  // using this definition because the style is different from the default blockly blocks
  {
    type: "controls_if",
    message0: "%{BKY_CONTROLS_IF_MSG_IF} %1 %{BKY_CONTROLS_IF_MSG_THEN} ",
    args0: [{ type: "input_value", name: "IF0", check: "Boolean" }],
    message1: "%1",
    args1: [{ type: "input_statement", name: "DO0" }],
    previousStatement: null,
    nextStatement: null,
    style: "situation_blocks",
    helpUrl: "%{BKY_CONTROLS_IF_HELPURL}",
    mutator: "controls_if_mutator",
    extensions: ["controls_if_tooltip"],
  },
];

export { blocks };
