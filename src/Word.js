import { createElement, setAttrs, toRadian, randomBM } from './utils';

export default class Word {
  constructor(options) {
    this.text = options.text;
    this.fontSize = options.fontSize;
    this.color = options.color;
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
  render() {
    const node = createElement('span');
    node.appendChild(document.createTextNode(this.text));
    this.node = node;
    node.style.position = 'absolute';
    node.style.x = 0;
    node.style.y = 0;
    return node;
  }
  updateRender() {
    const transform = `translate3d(${this.x}px, ${this.y}px, ${this.z}px)`;
    this.node.style.transform = transform;
  }
  startAnimate(duraction, delay = 0) {
    const perFrameDeg = (360 / (duraction / 1000)) / 60;
    const self = this;
    function step() {
      let nextDeg = self.xAngle + perFrameDeg;
      if (nextDeg > 360) {
        nextDeg = 0;
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
