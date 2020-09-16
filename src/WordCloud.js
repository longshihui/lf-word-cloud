import { createElement, random } from './utils';
import Word from './Word';

export default class {
  constructor(options) {
    // 渲染容器
    this.el = options.el;
    this.container = null;

    let _defaultOptions = {
      sizeRange: [20, 50], // 字体大小范围
      speedRange: [8000, 10000],
      fontStyle: {
        fontWeight: 'bold'
      },
      hoverPaused: true, // 鼠标移入停止动画效果
      onClick: () => {} // 点击事件回调
    };

    this.options = Object.assign(_defaultOptions, options.options || {});
    this.setColorFlag();
    // 球心坐标
    this.center = null;
    // 球半径
    this.radius = 0;
    this.calculateBailInfo();

    if (this.options.maxNumber > 0 && this.options.maxNumber < options.initWords.length) {
      this.wordsMatrix = [];
      let len = Math.ceil(options.initWords.length / this.options.maxNumber);

      for (let i = 0; i < len; i++) {
        this.wordsMatrix.push(options.initWords.slice(i * this.options.maxNumber, (i + 1) * this.options.maxNumber));
      }

      this.words = [];
      for (let i = 0; i < this.options.maxNumber; i++) {
        this.words.push(
          new Word({
            text: this.wordsMatrix.map(wordList => wordList[i]).filter(word => word),
            bail: this
          })
        );
      }
    } else {
      // 使用的单词
      this.words = options.initWords.map(
        word =>
          new Word({
            text: [word],
            bail: this
          })
      );
    }
  }

  setColorFlag() {
    // 传入色值个数超过1时，从传入色值中选择颜色，否则使用随即色值
    this.colorFlag = this.options.color && this.options.color instanceof Array && this.options.color.length;
  }

  calculateBailInfo() {
    const { width, height } = this.el.getBoundingClientRect();
    this.center = {
      x: width / 2,
      y: height / 2 - this.options.sizeRange[1],
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
  render() {
    this.renderContainer();
    this.renderWords();
  }
  startAnimate() {
    this.words.forEach(word => {
      word.startAnimate(random(...this.options.speedRange), random(0, 3000));
    });
  }
}
