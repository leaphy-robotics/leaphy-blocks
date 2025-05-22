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

        block.workspace.getBlocksByType("create_binary_characteristic").forEach(add_binary_characteristic => {
            const initialValue = arduino.valueToCode(add_binary_characteristic, "INITIAL_VALUE", arduino.ORDER_NONE) === "true";
            const name = arduino.valueToCode(add_binary_characteristic, "NAME", arduino.ORDER_NONE);
            code += `LeaphyBLE.addBinaryCharacteristic(${name}, ${initialValue});\n`;
        });

        block.workspace.getBlocksByType("create_string_characteristic").forEach(add_binary_characteristic => {
            const initialValue = arduino.valueToCode(add_binary_characteristic, "INITIAL_VALUE", arduino.ORDER_NONE);
            const name = arduino.valueToCode(add_binary_characteristic, "NAME", arduino.ORDER_NONE);
            code += `LeaphyBLE.addStringCharacteristic(${name}, ${initialValue});\n`;
        });

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
        return ``;
    };

    arduino.forBlock["create_string_characteristic"] = function (block: Block) {
        return ``;
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

    arduino.forBlock["bluetooth_string_characteristic_read"] = function (block: Block) {
        const name = arduino.valueToCode(block, "NAME", arduino.ORDER_NONE);
        return [`(char *)LeaphyBLE.getCharacteristicByName(${name})->value()`, arduino.ORDER_ATOMIC];
    };

    arduino.forBlock["bluetooth_bool_characteristic_read"] = function (block: Block) {
        const name = arduino.valueToCode(block, "NAME", arduino.ORDER_NONE);
        return [`*LeaphyBLE.getCharacteristicByName(${name})->value() == 1`, arduino.ORDER_ATOMIC];
    };
}

export default getCodeGenerators;
