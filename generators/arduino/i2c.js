import Arduino from "./all";

function addI2CDeclarations() {
  Arduino.addInclude("i2c", "#include 'i2c.h'");
  // Yes, this needs to be an include to sort it at the top
  Arduino.addInclude("i2c_channel_stack", "i2c i2cChannelStack;\n");
}

export { addI2CDeclarations };
