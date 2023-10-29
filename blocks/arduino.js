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
];

export { blocks };
