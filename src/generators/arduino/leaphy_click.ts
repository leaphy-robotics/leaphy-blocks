import { Arduino } from "../arduino";

function getCodeGenerators(arduino: Arduino) {
  arduino.forBlock["leaphy_click_rgb_digitalwrite"] = function (block) {
    const pin1 = block.getFieldValue("PIN1");
    let state1Output =
      arduino.valueToCode(block, "STATE1", arduino.ORDER_ATOMIC) || "LOW";
    if (state1Output == "true") {
      state1Output = "HIGH";
    } else {
      state1Output = "LOW";
    }

    arduino.reservePin(block, pin1, arduino.PinTypes.OUTPUT, "Digital Write");

    const pin1SetupCode = "pinMode(" + pin1 + ", OUTPUT);";
    arduino.addSetup("io_" + pin1, pin1SetupCode, false);

    const pin2 = block.getFieldValue("PIN2");

    let state2Output =
      arduino.valueToCode(block, "STATE2", arduino.ORDER_ATOMIC) || "LOW";
    if (state2Output == "true") {
      state2Output = "HIGH";
    } else {
      state2Output = "LOW";
    }
    arduino.reservePin(block, pin2, arduino.PinTypes.OUTPUT, "Digital Write");

    const pin2SetupCode = "pinMode(" + pin2 + ", OUTPUT);";
    arduino.addSetup("io_" + pin2, pin2SetupCode, false);

    const pin3 = block.getFieldValue("PIN3");

    let state3Output =
      arduino.valueToCode(block, "STATE3", arduino.ORDER_ATOMIC) || "LOW";
    if (state3Output == "true") {
      state3Output = "HIGH";
    } else {
      state3Output = "LOW";
    }
    arduino.reservePin(block, pin3, arduino.PinTypes.OUTPUT, "Digital Write");

    const pin3SetupCode = "pinMode(" + pin3 + ", OUTPUT);";
    arduino.addSetup("io_" + pin3, pin3SetupCode, false);

    return (
      `digitalWrite(${pin1}, ${state1Output});\n` +
      `digitalWrite(${pin2}, ${state2Output});\n` +
      `digitalWrite(${pin3}, ${state3Output});\n`
    );
  };
}

export default getCodeGenerators;
