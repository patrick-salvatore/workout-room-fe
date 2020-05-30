export function findAttribute(el: any, attr: string): any {
  for (; el !== document; el = el.parentNode) {
    if (el.getAttribute(attr)) {
      return el.getAttribute(attr);
    }
  }
}
