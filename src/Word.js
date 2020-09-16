import { createElement, toRadian, random, randomBM, randomColor } from './utils';

export default class Word {
  constructor(options) {
    // 球面
    this.bail = options.bail;
    this.node = null;
    this.parentNode = null;
    this.text = options.text;
    this.color = this.bail.colorFlag > 0 ? this.bail.options.color[Math.floor(Math.random() * this.bail.options.color.length)] : randomColor();

    this.fontWeight = options.fontWeight;

    this.yAngle = randomBM() * 180; // y轴夹角
    this.xAngle = random(-90, 270); // x轴正方向夹角
    this.cache = {
      animateId: null,
      duraction: 1000
    };
    this.index = 0; // 当前字符索引
  }
  // 切面半径
  get cutRadius() {
    const deg = this.yAngle > 90 ? 180 - this.yAngle : this.yAngle;
    return this.bail.radius * Math.sin(toRadian(deg));
  }
  // y轴坐标
  get y() {
    return this.bail.center.y - this.bail.radius * Math.cos(toRadian(this.yAngle));
  }
  // x轴坐标
  get x() {
    return this.bail.center.x + this.cutRadius * Math.cos(toRadian(this.xAngle));
  }
  // z轴坐标
  get z() {
    return this.cutRadius * Math.sin(toRadian(this.xAngle));
  }

  get opacity() {
    return this.z < 0 ? 1 + this.z / this.cutRadius : 1;
  }

  get fontSize() {
    let sizeRange = this.bail.options.sizeRange;
    return this.z > 0 ? sizeRange[0] + ((sizeRange[1] - sizeRange[0]) * this.z) / this.cutRadius : sizeRange[0];
  }
  _renderText(node) {
    if (node.childNodes && node.childNodes.length) {
      node.removeChild(node.childNodes[0]);
    }
    node.appendChild(document.createTextNode(this.text[this.index]));
  }
  _renderChild(parentNode) {
    const node = createElement('span');
    this._renderText(node);
    node.style.display = 'block';
    node.style.marginLeft = '-50%';
    this.node = node;
    parentNode.appendChild(node);
  }

  render() {
    const parentNode = createElement('div');
    // const node = createElement('span');
    // node.appendChild(document.createTextNode(this.text[this.index]));
    // parentNode.appendChild(node);
    this._renderChild(parentNode);
    this.parentNode = parentNode;
    parentNode.style.position = 'absolute';
    parentNode.style.x = 0;
    parentNode.style.y = 0;
    parentNode.style.color = this.color;
    parentNode.style.height = this.bail.options.sizeRange[1] + 'px';
    parentNode.style.lineHeight = this.bail.options.sizeRange[1] + 'px';
    parentNode.style.transformOrigin = 'center center';
    parentNode.style.willChange = 'transform';

    // node.style.display = 'block';
    // node.style.marginLeft = '-50%';

    parentNode.addEventListener('mouseover', () => {
      this.pauseAnimate();
    });
    parentNode.addEventListener('mouseout', () => {
      this.startAnimate();
    });

    return parentNode;
  }
  updateRender() {
    const transform = `translate3d(${this.x}px, ${this.y}px, ${this.z}px)`;
    this.parentNode.style.transform = transform;
    this.parentNode.style.opacity = this.opacity;
    this.parentNode.style.fontSize = this.fontSize + 'px';
  }
  startAnimate(duraction = this.cache.duraction, delay = 0) {
    this.cache.duraction = duraction;
    const perFrameDeg = 360 / (duraction / 1000) / 60;
    const self = this;
    function step() {
      let nextDeg = self.xAngle + perFrameDeg;
      if (nextDeg > 270) {
        nextDeg = nextDeg - 360;
        self.index = (self.index + 1) % self.text.length;
        self._renderText(self.node);
      }
      self.xAngle = nextDeg;
      self.updateRender();
      self.cache.animateId = window.requestAnimationFrame(step);
    }
    setTimeout(function delayRun() {
      self.cache.animateId = window.requestAnimationFrame(step);
    }, delay);
  }
  pauseAnimate() {
    window.cancelAnimationFrame(this.cache.animateId);
  }
}
