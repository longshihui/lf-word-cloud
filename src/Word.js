import { createElement } from './utils';

export default class Word {
  constructor(options) {
    this.text = options.text;
    this.fontSize = options.fontSize;
    this.color = options.color;
    this.fontWeight = options.fontWeight;
    // 球面半径
    this.ballRadius = options.ballRadius;
    this.node = null;
  }
  // y轴夹角
  get yAngle() {
    return Math.random() * 180;
  }
  // 切面半径
  get cutRadius() {
    const deg = this.yAngle > 90 ? 180 - this.yAngle : this.yAngle;
    return this.ballRadius * Math.sin(deg);
  }
  render() {
    const node = createElement('text');
    node.appendChild(document.createTextNode(this.text));
    this.node = node;
    return node;
  }
}
