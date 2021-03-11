interface Options {
  element: string;
  className?: string;
  innerHTML?: string;
  appendTo?: HTMLElement;
  onClick?: () => void;
}

/**
 * Creates a DOM Element
 */
export function create(options: Options): HTMLElement {
  const element = document.createElement(options.element);

  if (options.className) {
    element.className = options.className;
  }

  if (options.onClick) {
    element.onclick = options.onClick;
  }

  if (options.appendTo) {
    options.appendTo.appendChild(element);
  }

  if (options.innerHTML) {
    element.innerHTML = options.innerHTML;
  }

  return element;
}
