"use strict";

var htmlGen = new Blockly.Generator('HTML');

htmlGen.init = function(workspace) {};
htmlGen.finish = function(code) {return code;};

htmlGen.scrub_ = function(block, code) {
	var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
	var nextCode = htmlGen.blockToCode(nextBlock);
	return code + nextCode;
};

htmlGen['html'] = function(block) {
	var statements_content = htmlGen.statementToCode(block, 'content');
	var code = '<html>\n' + statements_content + '</html>\n';
	return code;
};

htmlGen['head'] = function(block) {
	var statements_content = htmlGen.statementToCode(block, 'content');
	var code = '<head>\n' + statements_content + '</head>\n';
	return code;
};

htmlGen['title'] = function(block) {
	var value = block.getFieldValue('value');
	var code = '<title>'+value+'</title>';
	return code;
};

htmlGen['body'] = function(block) {
	var statements_content = htmlGen.statementToCode(block, 'content');
	var block_modifier = htmlGen.statementToCode(block, 'modifier', htmlGen.ORDER_ATOMIC);
	var code = '<body'+block_modifier+'>\n' + statements_content + '</body>\n';
	return code;
};

htmlGen['divider'] = function(block) {
	var statements_content = htmlGen.statementToCode(block, 'content');
	var block_modifier = htmlGen.statementToCode(block, 'modifier', htmlGen.ORDER_ATOMIC);
	var code = '<div'+block_modifier+'>\n' + statements_content + '</div>\n';
	return code;
};

htmlGen['linebreak'] = function(block){
	return "<br/>\n";
}

htmlGen['hline'] = function(block){
	var modifier = htmlGen.statementToCode(block, 'modifier', htmlGen.ORDER_ATOMIC);
	return "<hr"+modifier+"/>\n";
}

htmlGen['style'] = function(block){
	var stmt = htmlGen.statementToCode(block, 'content');
	var code = '<style>\n'+stmt+'</style>\n'
	return code;
};

htmlGen['cssitem'] = function(block){
	var stmt = htmlGen.statementToCode(block, 'content');
	var selector = block.getFieldValue('selector');
	var code = selector+'{'+stmt+'}\n';
	return code;
};

htmlGen['fontfamily'] = function(block){
	var value = block.getFieldValue('value');
	var code = '\nfont-family: '+value+';\n';
	return code;
};

htmlGen['fontsize'] = function(block){
	var value = block.getFieldValue('value');
	var code = '\nfont-size: '+value+';\n';
	return code;
};

htmlGen['margin'] = function(block){
	var direction = block.getFieldValue('direction');
	var value = block.getFieldValue('value');
	var code = '\nmargin-'+direction+': '+value+';\n';
	return code;
};

htmlGen['othercss'] = function(block){
	var property = block.getFieldValue('property');
	var value = block.getFieldValue('value');
	var code = '\n'+property+': '+value+';\n';
	return code;
};

htmlGen['args'] = function(block) {
	var content = htmlGen.statementToCode(block, 'content');
	return content;
};

htmlGen['class'] = function(block) {
	var text_content = block.getFieldValue('content');
	var code = 'class="'+text_content+'" ';
	return code;
};

htmlGen['id'] = function(block) {
	var text_content = block.getFieldValue('content');
	var code = 'id="'+text_content+'" ';
	return code;
};

htmlGen['emptyarg'] = function(block) {
	var property = block.getFieldValue('property');
	var value = block.getFieldValue('value');
	var code = property+'="'+value+'" ';
	return code;
};

htmlGen['emptytext'] = function(block) {
	var text_content = block.getFieldValue('content');
	var code = text_content+' ';
	return code;
};

htmlGen['paragraph'] = function(block) {
	var statements_content = htmlGen.statementToCode(block, 'content');
	var block_modifier = htmlGen.statementToCode(block, 'modifier', htmlGen.ORDER_ATOMIC);
	var code = '<p'+block_modifier+'>'+statements_content+'</p>\n';
	return code;
};

htmlGen['header'] = function(block) {
	var statements_content = htmlGen.statementToCode(block, 'content');
	var header_size = block.getFieldValue("size");
	var block_modifier = htmlGen.statementToCode(block, 'modifier', htmlGen.ORDER_ATOMIC);
	var code = '<h'+header_size+block_modifier+'>\n' + statements_content + '</h'+header_size+'>\n';
	return code;
};

htmlGen['span'] = function(block){
	var content = htmlGen.statementToCode(block,'content');
	var mod = htmlGen.statementToCode(block, 'modifier', htmlGen.ORDER_ATOMIC);
	var code = '<span'+mod+'>'+content+'</span>';
	return code;
};

htmlGen['link'] = function(block){
	var text = htmlGen.statementToCode(block, 'content');
	var link = block.getFieldValue('target');
	var block_modifier = htmlGen.statementToCode(block, 'modifier', htmlGen.ORDER_ATOMIC);
	var code = '<a href="'+link+'" '+block_modifier+'>'+text+'</a>\n';
	return code;
};