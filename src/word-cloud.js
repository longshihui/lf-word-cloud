const NAMESPACE = 'http://www.w3.org/2000/svg';

function setAttr(el, key, value) {
    el.setAttribute(key, value);
}

function setAttrs(el, attrs) {
    Object.keys(attrs).forEach(attrName => {
        setAttr(el, attrName, attrs[attrName]);
    })
}

function createSVGElement(tagName, attrs = {}) {
    const node = document.createElementNS(NAMESPACE, tagName);
    setAttrs(node, attrs);
    return node;
}

const WordCloud = (function () {
    return class {
        constructor(options) {
            // 渲染容器
            this.el = options.el;
            // 使用的单词
            this.words = options.initWords;
            this.container = null;
            this.wordNodes = null;
        }
        renderWords() {
            const nodes = this.words.map(word => {
                const node = createSVGElement('text');
                node.appendChild(document.createTextNode(word));
                return node;
            });
            nodes.forEach(node => {
                this.container.appendChild(node);
            });
            this.wordNodes = nodes;
        }
        renderContainer() {
            this.container = createSVGElement('svg', {
                width: 600,
                height: 600
            });
            this.el.appendChild(this.container);
        }
        layoutWords() {
            const { width: containerWidth, height: containerHeight } = this.container.getBoundingClientRect();
            const grap = 5;
            let cursor = { x: 0, y: 0 };
            this.wordNodes.forEach(node => {
                const { width, height } = node.getBoundingClientRect();
                if ((cursor.x + width) > containerWidth) {
                    cursor.x = 0;
                    cursor.y = cursor.y + height + grap;
                }
                node.setAttribute('x', cursor.x);
                node.setAttribute('y', cursor.y + height);
                cursor.x = cursor.x + width + grap;
            });
            this.wordNodes.forEach(node => {
                node.setAttribute('transform')
            })
        }
        render() {
            this.renderContainer();
            this.renderWords();
            this.layoutWords();
        }
    }
}())