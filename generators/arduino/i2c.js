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

const LIST_DEVICES =
  "void i2cListDevices() {\n" +
  "    for (int channel = 0; channel < 8; channel++) {\n" +
  '        Serial.print("Scanning channel ");\n' +
  "        Serial.print(channel);\n" +
  '        Serial.println(":");\n' +
  "        \n" +
  "        i2cSelectChannel(channel);\n" +
  "        \n" +
  "        for (DeviceAddress address : deviceMap) {\n" +
  "            Wire.beginTransmission(address.address);\n" +
  "            int error = Wire.endTransmission();\n" +
  "            \n" +
  "            if (error == 0) {\n" +
  '                Serial.print("Found: ");\n' +
  "                Serial.print(address.device);\n" +
  '                Serial.print(" at address 0x");\n' +
  "                \n" +
  "                if (address.address < 16) {\n" +
  '                    Serial.print("0");\n' +
  "                }\n" +
  "                Serial.println(address.address, HEX);\n" +
  "            }\n" +
  "        }\n" +
  "        \n" +
  "        i2cRestoreChannel();\n" +
  "    }\n" +
  "}\n";

// Function to get the current channel in sensor code.
// Returns 0 in broadcast mode so single sensors work without using the 'select i2c' block
const GET_CHANNEL =
  "uint8_t i2cGetChannel() {\n" +
  "    uint8_t channel = i2cChannelStack.get(i2cChannelStack.getSize() - 1);\n" +
  "    if (channel > 7) channel = 0;\n" +
  "    return channel;\n" +
  "}\n";

const BROADCAST_MODE =
  "Wire.begin();\n" +
  "  Wire.setWireTimeout();\n" +
  "  i2cSelectChannel(0xff);";

const DEVICE_CHANNEL_MAP =
  "struct DeviceAddress { \n" +
  "  uint8_t address;\n" +
  "  char* device;\n" +
  "};\n" +
  "\n" +
  "DeviceAddress deviceMap[] = {\n" +
  '    {0x0D, "Compass"},\n' +
  '    {0x29, "Color Sensor / ToF Sensor"},\n' +
  '    {0x39, "RGB + Gesture Sensor"},\n' +
  '    {0x3C, "Screen"},\n' +
  '    {0x58, "Gas Sensor"},\n' +
  '    {0x76, "Air Pressure Sensor"}\n' +
  "};\n";

function addI2CDeclarations(scanning = false) {
  Arduino.addInclude("wire", "#include <Wire.h>");
  Arduino.addInclude("lists", "#include <List.hpp>");
  // Yes, this needs to be an include to sort it at the top
  Arduino.addInclude("i2c_channel_stack", "List<int> i2cChannelStack;\n");

  Arduino.addDeclaration("i2c_select_channel", SELECT_CHANNEL);
  Arduino.addDeclaration("i2c_restore_channel", RESTORE_CHANNEL);
  Arduino.addDeclaration("i2c_get_channel", GET_CHANNEL);

  if (scanning) {
    Arduino.addInclude("i2c_device_map", DEVICE_CHANNEL_MAP);
    Arduino.addDeclaration("i2c_list_devices", LIST_DEVICES);
  }

  Arduino.addSetup("i2c_broadcast_mode", BROADCAST_MODE);
}

export { addI2CDeclarations };
