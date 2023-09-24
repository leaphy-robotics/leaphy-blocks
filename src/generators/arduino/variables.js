function getCodeGenerators(Arduino) {
	
	/**
	 * Code generator for a literal String (X).
	 * Arduino code: loop { "X" }
	 * @param {!Block} block Block to generate the code from.
	 * @return {array} Completed code with order of operation.
	 */
	Arduino['text'] = function (block) {
		var code = Arduino.quote_(block.getFieldValue('TEXT'));
		return [code, Arduino.ORDER_ATOMIC];
	};
	
	/**
	 * Code generator for variable (X) getter.
	 * Arduino code: loop { X }
	 * @param {!Block} block Block to generate the code from.
	 * @return {array} Completed code with order of operation.
	 */
	Arduino['variables_get'] = function (block) {
		
		var varName = Arduino.nameDB_.getName(block.getFieldValue('VAR'), Blockly.NameType.VARIABLE);
		return [varName, Arduino.ORDER_ATOMIC];
	};
	
	/**
	 * Code generator for variable (X) setter (Y).
	 * Arduino code: type X;
	 *               loop { X = Y; }
	 * @param {!Block} block Block to generate the code from.
	 * @return {string} Completed code.
	 */
	Arduino['variables_set'] = function (block) {
		
		var argument0 = Arduino.valueToCode(block, 'VALUE', Arduino.ORDER_ASSIGNMENT) || '0';
		var varName = Arduino.nameDB_.getName(block.getFieldValue('VAR'), Blockly.NameType.VARIABLE);
		
		return varName + ' = ' + argument0 + ';\n';
	};
}

export default getCodeGenerators;