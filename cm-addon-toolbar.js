((mod) => {
	if (typeof exports == "object" && typeof module == "object") // CommonJS
		mod(require("codemirror"), require("codemirror-toolbar"));
	else if (typeof define == "function" && define.amd) // AMD
		define(["codemirror", "codemirror-toolbar"], mod);
	else // Plain browser env
		mod(CodeMirror);
})((CodeMirror) => {
	'use strict';
	let active = null,
		panel, wrap;
	let searchBar = $("<form>", {
		"class": "cm-edit-toolbar_form",
		append: $("<div>", {
			"class": "group_search",
			append: $("<input>", {
				"class": "group_input",
				"type": "search"
			}).add("<a>", {
				"class": "group_btn",
				"data-action": "search",
				append: $("<i>", {
					"class": "material-icons",
					"text": "search"
				})
			})
		})
	});
	let editorBar = '<ul class="group group-max-width" data-action="search"><li class="group" data-action="search">' +
		'<a class="group_btn group_btn-max-width" data-action="format"><i class="material-icons">code</i></a>' +
		'</li><li class="group">' +
		'<a class="group_btn group_btn-max-width" data-action="undo"><i class="material-icons">undo</i></a>' +
		'</li><li class="group">' +
		'<a class="group_btn group_btn-max-width" data-action="redo"><i class="material-icons">redo</i></a>' +
		'</li></ul>';
	var create = (cm, toolbar) => {
		wrap = cm.getWrapperElement();
		panel = $('<div>', {
			"id": "cm-edit-toolbar",
			"class": "cm-edit-toolbar",
			"style": "top:-50%;opacity: 0",
			"html": toolbar
		});
		panel.insertBefore(wrap).animate({
			opacity: 1,
			top: "0%"
		}, 250)
		cm.refresh()
	}
	let close = (cm) => {
		panel.animate({
			opacity: 0,
			top: "-50%"
		}, 200)
		panel.remove()
		cm.focus();
	}
	CodeMirror.defineOption("toolBar", false, function (cm, val, old) {
		if (old && old != CodeMirror.Init) {
			return
		}
		if (old == CodeMirror.Init) old = false;
		if (!old == !val) return;
		if (val) {
			CodeMirror.on(cm, "focus", (cm) => {
				if (active != cm) {
					if (panel) {
						close(cm)
					}
					active = cm
					return create(cm, editorBar)
				}
			});
		}
	});
})