export function findAttribute(el, attr: string): null | undefined {
  for (; el !== document; el = el.parentNode) {
    if (el.getAttribute(attr)) {
      return el.getAttribute(attr);
    }
  }
}
