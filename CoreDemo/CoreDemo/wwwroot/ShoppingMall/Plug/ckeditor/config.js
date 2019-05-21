CKEDITOR.editorConfig = function( config ) {
	config.language = 'zh-cn';
	config.uiColor = '#DFECFA';
	config.filebrowserImageUploadUrl = 'http://up.vpay8.com/Up/ArticleImg';
	config.toolbarCanCollapse = true;
	config.basePath = "http://r.vpay8.com/Plug/ckeditor/";
 
	// The toolbar groups arrangement, optimized for two toolbar rows.
	config.toolbarGroups = [
		//{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
		//{ name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
		//{ name: 'document',	   groups: [ 'mode', 'document' ] },
		
		//{ name: 'forms' },
		
		//{ name: 'others' },
		//'/',
		//{ name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
		{ name: 'styles' },
		{ name: 'colors' },
		{ name: 'paragraph',   groups: [ 'list', 'indent', 'align' ] },
		
		//{ name: 'insert' },
		{ name: 'insert', groups : [ 'Image','Flash','Table','HorizontalRule','Smiley','SpecialChar','PageBreak'
                 ,'Iframe' ] },
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
		{ name: 'links' },
		{ name: 'tools' },
		//{ name: 'document',	   groups: [ 'document', 'doctools' ] },
		//{ name: 'about' }
	];
	// Remove some buttons provided by the standard plugins, which are
	// not needed in the Standard(s) toolbar.
	config.removeButtons = 'Flash,Iframe,Underline,Subscript,Superscript';

	// Set the most common block elements.
	config.format_tags = 'p;h1;h2;h3;pre';

	// Simplify the dialog windows.
	config.removeDialogTabs = 'image:advanced;link:advanced';
};
