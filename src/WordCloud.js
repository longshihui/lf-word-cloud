import { createElement, random } from './utils';
import Word from './Word';

export default class {
  constructor(options) {
    // 渲染容器
    this.el = options.el;
    this.container = null;
    // 球心坐标
    this.center = null;
    // 球半径
    this.radius = 0;
    this.calculateBailInfo();
    // 使用的单词
    this.words = options.initWords.map(
      word =>
        new Word({
          text: word,
          bail: this
        })
    );
  }
  calculateBailInfo() {
    const { width, height } = this.el.getBoundingClientRect();
    this.center = {
      x: width / 2,
      y: height / 2,
      z: 0
    };
    this.radius = Math.min(width, height) / 2 - 20;
  }
  renderWords() {
    this.words.map(word => {
      this.container.appendChild(word.render());
      word.updateRender();
    });
  }
  renderContainer() {
    const { width, height } = this.el.getBoundingClientRect();
    this.container = createElement('div');
    this.container.style.position = 'relative';
    this.container.style.width = width + 'px';
    this.container.style.height = height + 'px';
    this.container.style.overflow = 'hidden';
    this.el.appendChild(this.container);
  }
  layoutWords() {
    const { width: containerWidth } = this.container.getBoundingClientRect();
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
  }
  startAnimate() {
    this.words.forEach(word => {
      word.startAnimate(random(3000, 5000), random(0, 3000));
    })
  }
}
