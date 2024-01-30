function getCodeGenerators(Arduino) {
  /**
   * Code generator for a literal String (X).
   * Arduino code: loop { "X" }
   * @param {!Block} block Block to generate the code from.
   * @return {array} Completed code with order of operation.
   */
  Arduino.forBlock["text"] = function (block) {
    var code = Arduino.quote_(block.getFieldValue("TEXT"));
    return [code, Arduino.ORDER_ATOMIC];
  };

  Arduino.forBlock["text_join"] = function (block) {
    const ADD0 = Arduino.valueToCode(block, "ADD0", Arduino.ORDER_NONE);
    const ADD1 = Arduino.valueToCode(block, "ADD1", Arduino.ORDER_NONE);
    const code = `String(${ADD0}) + String(${ADD1})`;

    return [code, Arduino.ORDER_ATOMIC];
  };

  Arduino.forBlock["text_charAt"] = function (block) {
    const at = Arduino.valueToCode(block, "AT", Arduino.ORDER_NONE);
    const value = Arduino.valueToCode(block, "VALUE", Arduino.ORDER_NONE);
    const code = `String(${value}[${at}])`;

    return [code, Arduino.ORDER_ATOMIC];
  };

  Arduino.forBlock["text_length"] = function (block) {
    const value = Arduino.valueToCode(block, "VALUE", Arduino.ORDER_NONE);
    const code = `String(${value}).length()`;

    return [code, Arduino.ORDER_ATOMIC];
  };

  Arduino.forBlock["text_includes"] = function (block) {
    const value = Arduino.valueToCode(block, "VALUE", Arduino.ORDER_NONE);
    const check = Arduino.valueToCode(block, "CHECK", Arduino.ORDER_NONE);
    const code = `String(${value}).indexOf(${check}) != -1`;

    return [code, Arduino.ORDER_ATOMIC];
  };
}

export default getCodeGenerators;
