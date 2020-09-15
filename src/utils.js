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