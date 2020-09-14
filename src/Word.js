export default class Word {
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
}
