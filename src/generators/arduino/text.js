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
}

export default getCodeGenerators;