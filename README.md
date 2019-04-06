# cm-addon-toolbar

CodeMirror action toollbar

-Visible on focus.

-Works whith multiple editor

# Usage

You will need include set of the stylesheet and script tags below in your document:

```html
<link rel="stylesheet" href="https://raw.githubusercontent.com/alterfan/cm-toolbar-addon/master/cm-addon-minimap.css"/>
<script src="https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.9.1/beautify.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.9.1/beautify-css.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.9.1/beautify-html.js"></script>
<script	type="text/javascript" src="https://raw.githubusercontent.com/alterfan/cm-toolbar-addon/master/cm-addon-minimap.js"></script>
```

Then set CodeMirror option "toolBar" : `true/false`

```javascript
var editor = CodeMirror("#editor", {
	mode: html,
	toolBar: true
});
```
