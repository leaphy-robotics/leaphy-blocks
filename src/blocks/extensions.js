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

const APPEND_STATEMENT_INPUT_STACK = function() {
	this.appendStatementInput('STACK');
};

const CONTROLS_IF_MUTATOR_MIXIN = {
	elseifCount_: 0,
	elseCount_: 0,
	
	/**
	 * Create XML to represent the number of else-if and else inputs.
	 * Backwards compatible serialization implementation.
	 * @return {Element} XML storage element.
	 * @this {Block}
	 */
	mutationToDom: function() {
		if (!this.elseifCount_ && !this.elseCount_) {
			return null;
		}
		const container = xmlUtils.createElement('mutation');
		if (this.elseifCount_) {
			container.setAttribute('elseif', this.elseifCount_);
		}
		if (this.elseCount_) {
			container.setAttribute('else', 1);
		}
		return container;
	},
	/**
	 * Parse XML to restore the else-if and else inputs.
	 * Backwards compatible serialization implementation.
	 * @param {!Element} xmlElement XML storage element.
	 * @this {Block}
	 */
	domToMutation: function(xmlElement) {
		this.elseifCount_ = parseInt(xmlElement.getAttribute('elseif'), 10) || 0;
		this.elseCount_ = parseInt(xmlElement.getAttribute('else'), 10) || 0;
		this.rebuildShape_();
	},
	/**
	 * Returns the state of this block as a JSON serializable object.
	 * @return {?{elseIfCount: (number|undefined), haseElse: (boolean|undefined)}}
	 *     The state of this block, ie the else if count and else state.
	 */
	saveExtraState: function() {
		if (!this.elseifCount_ && !this.elseCount_) {
			return null;
		}
		const state = Object.create(null);
		if (this.elseifCount_) {
			state['elseIfCount'] = this.elseifCount_;
		}
		if (this.elseCount_) {
			state['hasElse'] = true;
		}
		return state;
	},
	/**
	 * Applies the given state to this block.
	 * @param {*} state The state to apply to this block, ie the else if count and
	 *     else state.
	 */
	loadExtraState: function(state) {
		this.elseifCount_ = state['elseIfCount'] || 0;
		this.elseCount_ = state['hasElse'] ? 1 : 0;
		this.updateShape_();
	},
	/**
	 * Populate the mutator's dialog with this block's components.
	 * @param {!Workspace} workspace Mutator's workspace.
	 * @return {!Block} Root block in mutator.
	 * @this {Block}
	 */
	decompose: function(workspace) {
		const containerBlock = workspace.newBlock('controls_if_if');
		containerBlock.initSvg();
		let connection = containerBlock.nextConnection;
		for (let i = 1; i <= this.elseifCount_; i++) {
			const elseifBlock = workspace.newBlock('controls_if_elseif');
			elseifBlock.initSvg();
			connection.connect(elseifBlock.previousConnection);
			connection = elseifBlock.nextConnection;
		}
		if (this.elseCount_) {
			const elseBlock = workspace.newBlock('controls_if_else');
			elseBlock.initSvg();
			connection.connect(elseBlock.previousConnection);
		}
		return containerBlock;
	},
	/**
	 * Reconfigure this block based on the mutator dialog's components.
	 * @param {!Block} containerBlock Root block in mutator.
	 * @this {Block}
	 */
	compose: function(containerBlock) {
		let clauseBlock = containerBlock.nextConnection.targetBlock();
		// Count number of inputs.
		this.elseifCount_ = 0;
		this.elseCount_ = 0;
		const valueConnections = [null];
		const statementConnections = [null];
		let elseStatementConnection = null;
		while (clauseBlock) {
			if (clauseBlock.isInsertionMarker()) {
				clauseBlock = clauseBlock.getNextBlock();
				continue;
			}
			switch (clauseBlock.type) {
				case 'controls_if_elseif':
					this.elseifCount_++;
					valueConnections.push(clauseBlock.valueConnection_);
					statementConnections.push(clauseBlock.statementConnection_);
					break;
				case 'controls_if_else':
					this.elseCount_++;
					elseStatementConnection = clauseBlock.statementConnection_;
					break;
				default:
					throw TypeError('Unknown block type: ' + clauseBlock.type);
			}
			clauseBlock = clauseBlock.getNextBlock();
		}
		this.updateShape_();
		// Reconnect any child blocks.
		this.reconnectChildBlocks_(
			valueConnections, statementConnections, elseStatementConnection);
	},
	/**
	 * Store pointers to any connected child blocks.
	 * @param {!Block} containerBlock Root block in mutator.
	 * @this {Block}
	 */
	saveConnections: function(containerBlock) {
		let clauseBlock = containerBlock.nextConnection.targetBlock();
		let i = 1;
		while (clauseBlock) {
			if (clauseBlock.isInsertionMarker()) {
				clauseBlock = clauseBlock.getNextBlock();
				continue;
			}
			switch (clauseBlock.type) {
				case 'controls_if_elseif': {
					const inputIf = this.getInput('IF' + i);
					const inputDo = this.getInput('DO' + i);
					clauseBlock.valueConnection_ =
						inputIf && inputIf.connection.targetConnection;
					clauseBlock.statementConnection_ =
						inputDo && inputDo.connection.targetConnection;
					i++;
					break;
				}
				case 'controls_if_else': {
					const inputDo = this.getInput('ELSE');
					clauseBlock.statementConnection_ =
						inputDo && inputDo.connection.targetConnection;
					break;
				}
				default:
					throw TypeError('Unknown block type: ' + clauseBlock.type);
			}
			clauseBlock = clauseBlock.getNextBlock();
		}
	},
	/**
	 * Reconstructs the block with all child blocks attached.
	 * @this {Block}
	 */
	rebuildShape_: function() {
		const valueConnections = [null];
		const statementConnections = [null];
		let elseStatementConnection = null;
		
		if (this.getInput('ELSE')) {
			elseStatementConnection =
				this.getInput('ELSE').connection.targetConnection;
		}
		for (let i = 1; this.getInput('IF' + i); i++) {
			const inputIf = this.getInput('IF' + i);
			const inputDo = this.getInput('DO' + i);
			valueConnections.push(inputIf.connection.targetConnection);
			statementConnections.push(inputDo.connection.targetConnection);
		}
		this.updateShape_();
		this.reconnectChildBlocks_(
			valueConnections, statementConnections, elseStatementConnection);
	},
	/**
	 * Modify this block to have the correct number of inputs.
	 * @this {Block}
	 * @private
	 */
	updateShape_: function() {
		// Delete everything.
		if (this.getInput('ELSE')) {
			this.removeInput('ELSE');
		}
		if (this.getInput('ELSELABEL')) {
			this.removeInput('ELSELABEL');
		}
		for (let i = 1; this.getInput('IF' + i); i++) {
			this.removeInput('IF' + i);
			this.removeInput('DO' + i);
		}
		// Rebuild block.
		for (let i = 1; i <= this.elseifCount_; i++) {
			this.appendValueInput('IF' + i).setCheck('Boolean').appendField(
				Msg['CONTROLS_IF_MSG_ELSEIF']);
			this.appendStatementInput('DO' + i).appendField(
				Msg['CONTROLS_IF_MSG_THEN']);
		}
		if (this.elseCount_) {
			this.appendDummyInput('ELSELABEL')
				.appendField(Msg['CONTROLS_IF_MSG_ELSE']);
			this.appendStatementInput('ELSE');
		}
	},
	/**
	 * Reconnects child blocks.
	 * @param {!Array<?RenderedConnection>} valueConnections List of
	 * value connections for 'if' input.
	 * @param {!Array<?RenderedConnection>} statementConnections List of
	 * statement connections for 'do' input.
	 * @param {?RenderedConnection} elseStatementConnection Statement
	 * connection for else input.
	 * @this {Block}
	 */
	reconnectChildBlocks_: function(
		valueConnections, statementConnections, elseStatementConnection) {
		for (let i = 1; i <= this.elseifCount_; i++) {
			Mutator.reconnect(valueConnections[i], this, 'IF' + i);
			Mutator.reconnect(statementConnections[i], this, 'DO' + i);
		}
		Mutator.reconnect(elseStatementConnection, this, 'ELSE');
	},
};

export {TEXT_QUOTES_EXTENSION, APPEND_STATEMENT_INPUT_STACK, CONTROLS_IF_MUTATOR_MIXIN};