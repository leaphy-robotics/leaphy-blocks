import { Arduino } from "../arduino";
import { Block } from "blockly/core";

function getCodeGenerators(arduino: Arduino) {
    arduino.forBlock["bluetooth_setup"] = function (block: Block) {
        arduino.addInclude("leaphy_ble", "#include <LeaphyBLE.h>");
        arduino.addInclude("arduino_ble", "#include <ArduinoBLE.h>");
        arduino.addDeclaration("bluetooth", "LeaphyBLE LeaphyBLE;", true, 3);

        const name = arduino.valueToCode(block, "NAME", arduino.ORDER_NONE);
        let code = "";

        if (block.workspace.getBlocksByType("bluetooth_on_connect").length > 0) {
            code += "BLE.setEventHandler(BLEConnected, onBluetoothConnection);\n";
        }

        if (block.workspace.getBlocksByType("bluetooth_on_disconnect").length > 0) {
            code += "BLE.setEventHandler(BLEDisconnected, onBluetoothDisconnection);\n";
        }

        block.workspace.getBlocksByType("bluetooth_on_characteristic_updated").forEach(ble_update_block => {
            const name = arduino.valueToCode(ble_update_block, "NAME", arduino.ORDER_NONE);
            code += `LeaphyBLE.getCharacteristicByName(${name})->setEventHandler(BLEWritten, [](BLEDevice central, BLECharacteristic characteristic) {\n`;
            code += arduino.statementToCode(ble_update_block, "STACK");
            code += "});\n";
        });

        code += `LeaphyBLE.initialize(${name});\n`;

        arduino.addLoopTrap("bluetooth_setup", block);
        return code;
    };

    arduino.forBlock["create_binary_characteristic"] = function (block: Block) {
        const name = arduino.valueToCode(block, "NAME", arduino.ORDER_NONE);
        const initialValue = arduino.valueToCode(block, "INITIAL_VALUE", arduino.ORDER_NONE) === "true";
        return `LeaphyBLE.addBinaryCharacteristic(${name}, ${initialValue});\n`;
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

    arduino.forBlock["bluetooth_on_characteristic_updated"] = function (block: Block) {
        return "BLE.poll();";
    }
}

export default getCodeGenerators;
