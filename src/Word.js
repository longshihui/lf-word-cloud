import { createElement, setAttrs, toRadian, randomBM, randomColor } from './utils';

export default class Word {
  constructor(options) {
    this.text = options.text;
    this.fontSize = options.fontSize;
    this.color = randomColor();
    this.fontWeight = options.fontWeight;
    // 球面
    this.bail = options.bail;
    this.node = null;

    this.yAngle = randomBM() * 180; // y轴夹角
    this.xAngle = Math.random() * 360; // x轴正方向夹角
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
  render() {
    const node = createElement('span');
    node.appendChild(document.createTextNode(this.text));
    this.node = node;
    node.style.position = 'absolute';
    node.style.x = 0;
    node.style.y = 0;
    node.style.color = this.color;
    return node;
  }
  updateRender() {
    const transform = `translate3d(${this.x}px, ${this.y}px, ${this.z}px)`;
    this.node.style.transform = transform;
    this.node.style.opacity = this.opacity;
  }
  startAnimate(duraction, delay = 0) {
    const perFrameDeg = 360 / (duraction / 1000) / 60;
    const self = this;
    function step() {
      let nextDeg = self.xAngle + perFrameDeg;
      if (nextDeg > 360) {
        nextDeg = nextDeg - 360;
      }
      self.xAngle = nextDeg;
      self.updateRender();
      window.requestAnimationFrame(step);
    }
    setTimeout(function delayRun() {
      window.requestAnimationFrame(step);
    }, delay);
  }
}
