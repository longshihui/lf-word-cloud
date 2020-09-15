import { createElement } from './utils';
import Word from './Word';

export default class {
    constructor(options) {
      // 渲染容器
      this.el = options.el;
      // 使用的单词
      this.words = options.initWords.map(word => new Word({
        text: word
      }));
      this.container = null;
    }
    renderWords() {
      this.words.map(word => {
        this.container.appendChild(word.render());
      });
    }
    renderContainer() {
      const { width, height } = this.el.getBoundingClientRect();
      this.container = createSVGElement('svg', {
        width: width,
        height: height
      });
      this.el.appendChild(this.container);
    }
    layoutWords() {
      const { width: containerWidth, height: containerHeight } = this.container.getBoundingClientRect();
      const grap = 5;
      let cursor = { x: 0, y: 0 };
      this.words.forEach(({ node }) => {
        const { width, height } = node.getBoundingClientRect();
        if (cursor.x + width > containerWidth) {
          cursor.x = 0;
          cursor.y = cursor.y + height + grap;
        }
        node.setAttribute('x', cursor.x);
        node.setAttribute('y', cursor.y + height);
        cursor.x = cursor.x + width + grap;
      });
    }
    render() {
      this.renderContainer();
      this.renderWords();
      this.layoutWords();
    }
  }