export function setAttr(el, key, value) {
  el.setAttribute(key, value);
}

export function setAttrs(el, attrs) {
  Object.keys(attrs).forEach(attrName => {
    setAttr(el, attrName, attrs[attrName]);
  });
}

export function createElement(tagName, attrs = {}) {
  const node = document.createElement(tagName);
  setAttrs(node, attrs);
  return node;
}

export function toRadian(angle) {
  return Math.PI * (angle / 180);
}
// 生成0和1之间正太分布的随机变量
export function randomBM() {
  let u = 0,
    v = 0;
  while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
  while (v === 0) v = Math.random();
  let num = Math.sqrt(-5.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  num = num / 10.0 + 0.5; // Translate to 0 -> 1
  if (num > 1 || num < 0) return randomBM(); // resample between 0 and 1
  return num;
}
