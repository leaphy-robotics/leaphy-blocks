import Arduino from "./all";

const SELECT_CHANNEL =
  "void i2cSelectChannel(uint8_t channel, bool push = true) {\n" +
  "    if (push) i2cChannelStack.addLast(channel);\n" +
  "    if (channel <= 7) channel = (1 << channel);\n" +
  "    Wire.beginTransmission(0x70);\n" +
  "    Wire.write(channel);\n" +
  "    Wire.endTransmission();\n" +
  "}\n";

const RESTORE_CHANNEL =
  "void i2cRestoreChannel() {\n" +
  "    i2cChannelStack.removeLast();\n" +
  "    uint8_t channel = i2cChannelStack.get(i2cChannelStack.getSize() - 1);\n" +
  "    i2cSelectChannel(channel, false);\n" +
  "}\n";

const BROADCAST_MODE =
    "Wire.begin();\n" +
    "  Wire.setWireTimeout();\n" +
    "  i2cSelectChannel(0xff);";

function addI2CDeclarations() {
  Arduino.addInclude("wire", "#include <Wire.h>");
  Arduino.addInclude("lists", "#include <List.hpp>");
  // Yes, this needs to be an include to sort it at the top
  Arduino.addInclude("i2c_channel_stack", "List<int> i2cChannelStack;\n");

  Arduino.addDeclaration("i2c_select_channel", SELECT_CHANNEL);
  Arduino.addDeclaration("i2c_restore_channel", RESTORE_CHANNEL);

  Arduino.addSetup("i2c_broadcast_mode", BROADCAST_MODE);
}

export { addI2CDeclarations };
