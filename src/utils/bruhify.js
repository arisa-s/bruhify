export const bruhify = () => {
  const [DEBOUNCE_DELAY, TARGET_ELEMENT, TEXT] = [2000, "body", "bruh"];

  const targetNode = document.querySelector(TARGET_ELEMENT);

  const debounce = (fn, wait) => {
    let timer;

    return (...args) => {
      if (timer) clearTimeout(timer);

      timer = setTimeout(() => fn(...args), wait);
    };
  };

  const iterateThroughChildren = (element) => {
    const len = element.children.length;

    if (!len) {
      if (element.innerHTML.length) {
        element.innerHTML = TEXT;
      }
      return;
    }

    for (let i = 0; i < len; i++) {
      const child = element.children[i];

      if (child.children) {
        iterateThroughChildren(element.children[i]);
      }
    }
  };

  iterateThroughChildren(targetNode);

  const domTreeObserver = new MutationObserver(
    debounce(() => {
      iterateThroughChildren(targetNode);
    }, DEBOUNCE_DELAY)
  );

  domTreeObserver.observe(targetNode, {
    attributes: true,
    childList: true,
    subtree: true,
  });
}