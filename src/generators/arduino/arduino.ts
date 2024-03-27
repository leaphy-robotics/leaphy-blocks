import { Arduino } from "../arduino";

function getCodeGenerators(arduino: Arduino) {
  arduino.forBlock["time_delay"] = function (block) {
    const delayTime =
      arduino.valueToCode(block, "DELAY_TIME_MILI", arduino.ORDER_ATOMIC) ||
      "0";

    return "delay(" + delayTime + ");\n";
  };
}
export default getCodeGenerators;
