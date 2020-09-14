const NAMESPACE = 'http://www.w3.org/2000/svg';

function setAttr(el, key, value) {
  el.setAttribute(key, value);
}

function setAttrs(el, attrs) {
  Object.keys(attrs).forEach(attrName => {
    setAttr(el, attrName, attrs[attrName]);
  });
}

function createSVGElement(tagName, attrs = {}) {
  const node = document.createElementNS(NAMESPACE, tagName);
  setAttrs(node, attrs);
  return node;
}

const Word = function () {
  return class {
    constructor(options) {
      this.data = options.data;
      this.fontSize = options.fontSize;
      this.color = options.color;
      this.fontWeight = options.fontWeight;
      this.radius = options.radius; // 所在位置到球心的半径
      this.initXAngle = options.initXAngle; // 初始位置与X轴夹角
      this.initYAngle = options.initYAngle; // 初始位置与Y轴夹角
      this.initZAngle = options.initZAngle; // 初始位置与Z轴夹角
    }
  };
};
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
        if (cursor.x + width > containerWidth) {
          cursor.x = 0;
          cursor.y = cursor.y + height + grap;
        }
        node.setAttribute('x', cursor.x);
        node.setAttribute('y', cursor.y + height);
        cursor.x = cursor.x + width + grap;
      });
      this.wordNodes.forEach(node => {
        node.setAttribute('transform');
      });
    }
    render() {
      this.renderContainer();
      this.renderWords();
      this.layoutWords();
    }
  };
})();
