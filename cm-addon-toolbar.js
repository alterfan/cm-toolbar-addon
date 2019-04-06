((mod) => {
	if (typeof exports == "object" && typeof module == "object") // CommonJS
		mod(require("codemirror"), require("codemirror-toolbar"));
	else if (typeof define == "function" && define.amd) // AMD
		define(["codemirror", "codemirror-toolbar"], mod);
	else // Plain browser env
		mod(CodeMirror);
})((CodeMirror) => {
	'use strict';
	let _cm = null,
		panel, wrap;
	/* let searchBar = $("<form>", {
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
	}); */
	let editorBar = '<ul class="group group-max-width"><li class="group">' +
		'<a class="group_btn group_btn-max-width" data-action="clear"><i class="material-icons">delete</i></a>' +
		'</li><li class="group">' +
		'<a class="group_btn group_btn-max-width" data-action="format"><i class="material-icons">code</i></a>' +
		'</li><li class="group">' +
		'<a class="group_btn group_btn-max-width" data-action="undo"><i class="material-icons">undo</i></a>' +
		'</li><li class="group">' +
		'<a class="group_btn group_btn-max-width" data-action="redo"><i class="material-icons">redo</i></a>' +
		'</li></ul>';
	let actions = {
		clear: function (cm) {
			cm.setValue('');
			cm.refresh()
		},
		undo: function (cm) {
			cm.undo()
			cm.refresh()
		},
		redo: function (cm) {
			cm.redo();
			cm.refresh();
		},
		format: function (cm) {
			if (typeof cm.getOption('mode') == "object") {
				var mode = (cm.getOption('mode')).name
			} else {
				var mode = cm.getOption('mode');
			}
			let code = cm.getValue();
			if (mode == 'htmlmixed' || mode == 'html' || mode == 'xml') {
				var formatted = html_beautify(code, {
					'indent_size': 2,
					'indent_char': '\t'
				});
			}
			if (mode == 'javascript') {
				var formatted = js_beautify(code, {
					'indent_size': 2,
					'indent_char': '\t'
				});
			}
			if (mode == 'css') {
				var formatted = css_beautify(code, {
					'indent_size': 2,
					'indent_char': '\t'
				});
			}
			cm.setValue(formatted);
			cm.setCursor(cm.getDoc().lineCount(), 0);
		}
	}
	let action = new Function("action", "cm", "actions", "actions[action](cm);");
	let create = (cm, toolbar) => {
		wrap = cm.getWrapperElement();
		panel = document.createElement('div');
		panel.className = 'cm-edit-toolbar';
		wrap.parentNode.insertBefore(panel, wrap);
		panel.innerHTML = toolbar;
		cm.refresh()
		let btns = panel.querySelectorAll('[data-action]');
		for (var i = 0; i < btns.length; i++) {
			btns[i].onclick = function () {
				action(this.getAttribute('data-action'), cm, actions)
			}
		}
	}
	let show = (cm) => {
		wrap = cm.getWrapperElement();
		wrap.parentNode.querySelector(".cm-edit-toolbar").classList.add('visible');
		cm.refresh();
	}
	let close = (cm) => {
		for (var i = 0; i < document.querySelectorAll(".cm-edit-toolbar").length; i++) {
			document.querySelectorAll(".cm-edit-toolbar")[i].classList.remove('visible');
			document.querySelectorAll(".cm-edit-toolbar")[i].remove()
		}
		cm.refresh();
	}
	CodeMirror.defineOption("toolBar", false, function (cm, val, old) {
		if (old && old != CodeMirror.Init) {
			return
		}
		if (old == CodeMirror.Init) old = false;
		if (!old == !val) return;
		if (val) {
			CodeMirror.on(cm, "mousedown", (cm) => {
				if (_cm != cm) {
					if (panel) {
						close(cm)
						_cm = cm;
					}
					create(cm, editorBar);
					show(cm)
				}
			});
		}
	});
})