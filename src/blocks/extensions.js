import * as Blockly from 'blockly/core';

/**
 * @mixin
 * @package
 * @readonly
 */
const QUOTE_IMAGE_MIXIN = {
	/**
	 * Image data URI of an LTR opening double quote (same as RTL closing double
	 * quote).
	 * @readonly
	 */
	QUOTE_IMAGE_LEFT_DATAURI:
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAA' +
		'n0lEQVQI1z3OMa5BURSF4f/cQhAKjUQhuQmFNwGJEUi0RKN5rU7FHKhpjEH3TEMtkdBSCY' +
		'1EIv8r7nFX9e29V7EBAOvu7RPjwmWGH/VuF8CyN9/OAdvqIXYLvtRaNjx9mMTDyo+NjAN1' +
		'HNcl9ZQ5oQMM3dgDUqDo1l8DzvwmtZN7mnD+PkmLa+4mhrxVA9fRowBWmVBhFy5gYEjKMf' +
		'z9AylsaRRgGzvZAAAAAElFTkSuQmCC',
	/**
	 * Image data URI of an LTR closing double quote (same as RTL opening double
	 * quote).
	 * @readonly
	 */
	QUOTE_IMAGE_RIGHT_DATAURI:
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAA' +
		'qUlEQVQI1z3KvUpCcRiA8ef9E4JNHhI0aFEacm1o0BsI0Slx8wa8gLauoDnoBhq7DcfWhg' +
		'gONDmJJgqCPA7neJ7p934EOOKOnM8Q7PDElo/4x4lFb2DmuUjcUzS3URnGib9qaPNbuXvB' +
		'O3sGPHJDRG6fGVdMSeWDP2q99FQdFrz26Gu5Tq7dFMzUvbXy8KXeAj57cOklgA+u1B5Aos' +
		'lLtGIHQMaCVnwDnADZIFIrXsoXrgAAAABJRU5ErkJggg==',
	/**
	 * Pixel width of QUOTE_IMAGE_LEFT_DATAURI and QUOTE_IMAGE_RIGHT_DATAURI.
	 * @readonly
	 */
	QUOTE_IMAGE_WIDTH: 12,
	/**
	 * Pixel height of QUOTE_IMAGE_LEFT_DATAURI and QUOTE_IMAGE_RIGHT_DATAURI.
	 * @readonly
	 */
	QUOTE_IMAGE_HEIGHT: 12,

	/**
	 * Inserts appropriate quote images before and after the named field.
	 * @param {string} fieldName The name of the field to wrap with quotes.
	 * @this {Block}
	 */
	quoteField_: function(fieldName) {
		for (let i = 0, input; (input = this.inputList[i]); i++) {
			for (let j = 0, field; (field = input.fieldRow[j]); j++) {
				if (fieldName === field.name) {
					input.insertFieldAt(j, this.newQuote_(true));
					input.insertFieldAt(j + 2, this.newQuote_(false));
					return;
				}
			}
		}
		console.warn(
			'field named "' + fieldName + '" not found in ' + this.toDevString());
	},

	/**
	 * A helper function that generates a FieldImage of an opening or
	 * closing double quote. The selected quote will be adapted for RTL blocks.
	 * @param {boolean} open If the image should be open quote (“ in LTR).
	 *                       Otherwise, a closing quote is used (” in LTR).
	 * @return {!FieldImage} The new field.
	 * @this {Block}
	 */
	newQuote_: function(open) {
		const isLeft = this.RTL ? !open : open;
		const dataUri =
			isLeft ? this.QUOTE_IMAGE_LEFT_DATAURI : this.QUOTE_IMAGE_RIGHT_DATAURI;
		return new Blockly.FieldImage(
			dataUri, this.QUOTE_IMAGE_WIDTH, this.QUOTE_IMAGE_HEIGHT,
			isLeft ? '\u201C' : '\u201D');
	},
};

/**
 * Wraps TEXT field with images of double quote characters.
 * @this {Block}
 */
const TEXT_QUOTES_EXTENSION = function() {
	this.mixin(QUOTE_IMAGE_MIXIN);
	this.quoteField_('TEXT');
};

export {TEXT_QUOTES_EXTENSION};