import { Arduino } from "../arduino";

function getCodeGenerators(arduino: Arduino) {
    arduino.forBlock["text"] = function (block) {
        const code = arduino.quote_(block.getFieldValue("TEXT"));
        return [code, arduino.ORDER_ATOMIC];
    };

    arduino.forBlock["text_join"] = function (block) {
        const ADD0 = arduino.valueToCode(block, "ADD0", arduino.ORDER_NONE);
        const ADD1 = arduino.valueToCode(block, "ADD1", arduino.ORDER_NONE);
        const code = `String(${ADD0}) + String(${ADD1})`;

        return [code, arduino.ORDER_ATOMIC];
    };

    arduino.forBlock["text_charAt"] = function (block) {
        const at = arduino.valueToCode(block, "AT", arduino.ORDER_NONE);
        const value = arduino.valueToCode(block, "VALUE", arduino.ORDER_NONE);
        const code = `String(${value}[${at}])`;

        return [code, arduino.ORDER_ATOMIC];
    };

    arduino.forBlock["text_includes"] = function (block) {
        const value = arduino.valueToCode(block, "VALUE", arduino.ORDER_NONE);
        const check = arduino.valueToCode(block, "CHECK", arduino.ORDER_NONE);
        const code = `String(${value}).indexOf(${check}) != -1`;

        return [code, arduino.ORDER_ATOMIC];
    };

    arduino.forBlock["text_to_double"] = function (block) {
        const value = arduino.valueToCode(block, "VALUE", arduino.ORDER_NONE);

        return [`${value}.toDouble()`, arduino.ORDER_ATOMIC];
    };
}

export default getCodeGenerators;
