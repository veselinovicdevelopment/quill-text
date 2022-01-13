const BlockEmbed = Quill.import('blots/block/embed');
//Define a new blog type
class FlexBox extends BlockEmbed {
	static create(value) {
		const node = super.create(value);
		node.setAttribute('contenteditable', 'true');
		// node.setAttribute('custom-flex', true);

		//Set custom HTML
		node.innerHTML = value;
		return node;
	}

	static transformValue(value) {
		let handleArr = value.split('\n')
		handleArr = handleArr.map(e => e.replace(/^[\s]+/, '')
			.replace(/[\s]+$/, ''))
		return handleArr.join('')
	}

	//Returns the value of the node itself for undo operation
	static value(node) {
		return node.innerHTML
	}
}
// blotName
FlexBox.blotName = 'FlexBox';
//The class name will be used to match the blot name
FlexBox.className = 'flex-box';
//Label type customization
FlexBox.tagName = 'div';
Quill.register(FlexBox, true);

var quill = new Quill('#editor', {
	modules: {
		toolbar: {
			container: "#toolbar"
		},
	},
	placeholder: "What is on your mind ?",
	theme: "snow"
});

var quill2 = new Quill("#editor2", {
	theme: "snow"
});

var toolbar = quill.getModule('toolbar');

var flexBox = document.querySelector('.ql-flexbox');
flexBox.addEventListener('click', function () {
	var range = quill.getSelection();
	if (range) {
		var flag = false;
		var endIndex = range.index;
		var limit = 0;
		while (!flag && limit < 100) {
			limit++;
			if (quill.getText(endIndex, 1) == "\n") {
				flag = true;
			}
			endIndex++;
		}
		quill.insertEmbed(endIndex || 0, 'FlexBox', '<p> </p>');
		quill.insertEmbed(endIndex || 0, 'FlexBox', '<p> </p>');
	}
});

quill.on('text-change', function (arg) {
	console.log(arg.ops[0].retain);
	// setTimeout(() => {
	// 	var br = document.querySelector(".flex-box > br");
	// 	if (br) {
	// 		br.closest(".flex-box").innerHTML = " ";
	// 	}
	// }, 1);
});
<p><span>asdfs</span></p>
// var buttons = document.querySelectorAll('#toolbar button, #toolbar select');
var buttons = document.querySelectorAll('#toolbar .ql-header');
buttons.forEach((button, index) => {
	button.addEventListener('click', function () {
		var content = document.querySelector('.flex-box').innerHTML;
		// document.querySelector('#editor2').innerHTML = content;
		quill2.
		// document.querySelector('.flex-box').innerHTML = "";
	});
});