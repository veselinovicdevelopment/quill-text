const Block = Quill.import('blots/block');
//Define a new blog type
class FlexBox extends Block {
	static create(value) {
		const node = super.create(value);
		// node.setAttribute('contenteditable', 'true');
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

let Inline = Quill.import('blots/inline');

class SpanBlock extends Inline {
	static create(value) {
		let node = super.create(value);
		node.setAttribute('class', 'spanblock');
		node.innerHTML = value;
		return node;
	}
}

SpanBlock.blotName = 'spanblock';
SpanBlock.tagName = 'div';
Quill.register(SpanBlock);

class HeaderBlot extends Block {
	// formats(node) {
	// 	return HeaderBlot.tagName.indexOf(node.tagName) + 1;
	// }
}
HeaderBlot.blotName = 'header';
// Medium only supports two header sizes, so we will only demonstrate two,
// but we could easily just add more tags into this array
HeaderBlot.tagName = ['H1', 'H2'];
Quill.register(HeaderBlot);

function customHeaderHandler(val, next) {
	console.log(val, next);
}

const bindings = {
	enter: {
		key: 13,
		shiftKey: null,
		handler: (range, context) => {
			if (context.format.FlexBox) {
				this.quill.scroll.deleteAt(range.index, context.suffix.length);
				if (context.suffix == "") {
					this.quill.insertText(range.index, " ");
					this.quill.insertEmbed(range.index, 'spanblock', " ");
				} else {
					this.quill.insertEmbed(range.index, 'spanblock', context.suffix);
				}
			} else {
				if (range.length > 0) {
					this.quill.scroll.deleteAt(range.index, range.length); // So we do not trigger text-change
				}
				this.quill.insertText(range.index, '\n');
			}
		}
	}
};

var quill = new Quill('#editor', {
	modules: {
		toolbar: {
			container: "#toolbar",
			// handlers: {
			// 	'header': customHeaderHandler
			// }
		},
		keyboard: {
			bindings
		},
	},
	placeholder: "What is on your mind ?",
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
				// endIndex--;
			}
			endIndex++;
		}
		quill.insertEmbed(endIndex || 0, 'FlexBox', ' ');
		quill.insertEmbed(endIndex || 0, 'FlexBox', ' ');
	}
});

quill.on('text-change', function (arg) {
	setTimeout(() => {
		var br = document.querySelector(".flex-box > br:first-child");
		if (br) {
			br.closest(".flex-box").innerHTML = " ";
		}
	}, 1);
});
