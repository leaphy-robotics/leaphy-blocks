import { Arduino } from "../arduino";
import {Block} from "blockly/core";

function getCodeGenerators(arduino: Arduino) {
    arduino.forBlock["bluetooth_setup"] = function (block: Block) {
        arduino.addInclude("leaphy_ble", "#include <LeaphyBLE.h>");
        arduino.addInclude("arduino_ble", "#include <ArduinoBLE.h>");
        arduino.addDeclaration("bluetooth", "LeaphyBLE LeaphyBLE;\n", true, 3);

        const name = arduino.valueToCode(block, "NAME", arduino.ORDER_NONE);
        let code = `LeaphyBLE.initializeBluetooth(${name});\n`

        if (block.workspace.getBlocksByType("bluetooth_on_connect").length > 0) {
            code += "BLE.setEventHandler(BLEConnected, onBluetoothConnection);\n";
        }
        if (block.workspace.getBlocksByType("bluetooth_on_disconnect").length > 0) {
            code += "BLE.setEventHandler(BLEDisconnected, onBluetoothDisconnection);\n";
        }

        code += "BLE.advertise();\n"

        return code;

    };

    arduino.forBlock["bluetooth_on_connect"] = function (block: Block) {
        const branch = arduino.statementToCode(block, "STACK");
        const code =
            `void onBluetoothConnection(BLEDevice device) {\n` + branch + "}\n";
        arduino.addDeclaration("bluetooth_on_connect", code, true, 2);

        return "BLE.poll();";
    };

    arduino.forBlock["bluetooth_on_disconnect"] = function (block: Block) {
        const branch = arduino.statementToCode(block, "STACK");
        const code =
            `void onBluetoothDisconnection(BLEDevice device) {\n` + branch + "}\n";
        arduino.addDeclaration("bluetooth_on_disconnect", code, true, 2);

        return "BLE.poll();";
    };
}

export default getCodeGenerators;
