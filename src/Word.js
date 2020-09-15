import { createElement, setAttrs } from './utils';

export default class Word {
  constructor(options) {
    this.text = options.text;
    this.fontSize = options.fontSize;
    this.color = options.color;
    this.fontWeight = options.fontWeight;
    // 球面
    this.bail = options.bail;
    this.node = null;

    this.yAngle = Math.random() * 180; // y轴夹角
    this.xAngle = Math.random() * 360; // x轴正方向夹角
  }
  // 切面半径
  get cutRadius() {
    const deg = this.yAngle > 90 ? 180 - this.yAngle : this.yAngle;
    return this.bail.radius * Math.sin(deg);
  }
  // y轴坐标
  get y() {
    return this.bail.center.y - this.bail.radius * Math.cos(this.yAngle);
  }
  // x轴坐标
  get x() {
    return this.bail.center.x + this.cutRadius * Math.cos(this.xAngle);
  }
  // z轴坐标
  get z() {
    return this.cutRadius * Math.sin(this.xAngle);
  }
  render() {
    const node = createElement('text');
    node.appendChild(document.createTextNode(this.text));
    this.node = node;
    return node;
  }
  updateRender() {
    setAttrs(this.node, {
      x: this.x,
      y: this.y,
      z: this.z
    });
  }
}
