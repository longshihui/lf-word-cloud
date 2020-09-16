import { createElement, setAttrs, toRadian, randomBM, randomColor } from './utils';

export default class Word {
  constructor(options) {
    // 球面
    this.bail = options.bail;
    this.node = null;
    this.text = options.text;
    this.color = this.bail.colorFlag > 0 ? this.bail.options.color[Math.floor(Math.random() * this.bail.options.color.length)] : randomColor();

    this.fontWeight = options.fontWeight;

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

  get fontSize() {
    let sizeRange = this.bail.options.sizeRange;
    return this.z > 0 ? sizeRange[0] + ((sizeRange[1] - sizeRange[0]) * this.z) / this.cutRadius : sizeRange[0];
  }

  render() {
    const parentNode = createElement('div');
    const node = createElement('span');
    node.appendChild(document.createTextNode(this.text));
    parentNode.appendChild(node);
    this.node = parentNode;
    parentNode.style.position = 'absolute';
    parentNode.style.x = 0;
    parentNode.style.y = 0;
    parentNode.style.color = this.color;
    parentNode.style.transformOrigin = 'center center';

    node.style.display = 'block';
    node.style.marginLeft = '-50%';
    node.style.marginTop = '-50%';
    return parentNode;
  }
  updateRender() {
    const transform = `translate3d(${this.x}px, ${this.y}px, ${this.z}px)`;
    this.node.style.transform = transform;
    this.node.style.opacity = this.opacity;
    this.node.style.fontSize = this.fontSize + 'px';
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
