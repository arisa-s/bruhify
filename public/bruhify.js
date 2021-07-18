

const bruhify = (threshold = .03) => {
  const safeThreshold = threshold > 1 || threshold < 0 ? .5 : threshold

  const [DEBOUNCE_DELAY, TARGET_ELEMENT, TEXT] = [2000, "body", "bruh"];

  const targetNode = document.querySelector(TARGET_ELEMENT);

  const shouldBruh = () => Math.random() < safeThreshold

  const addBruh = (htmlElement) => htmlElement.textContent.split(" ").map(word => shouldBruh() ? TEXT : word).join(" ")

  const debounce = (fn, wait) => {
    let timer;

    return (...args) => {
      if (timer) clearTimeout(timer);

      timer = setTimeout(() => fn(...args), wait);
    };
  };

  const iterateThroughChildren = (element) => {
    const len = element.childNodes.length;

    if (len === 0) {
      if (!element.textContent) return

      // Element is textnode
      if (element.nodeType === 3) {
        if (!element.parentElement || !element.parentElement.dataset || element.parentElement.dataset.isBruhed) return

        element.parentElement.dataset.isBruhed = true

        element.textContent = addBruh(element)

        return
      }

      if (element.dataset && element.dataset.isBruhed) return

      if (element.dataset) {
        element.dataset.isBruhed = true
      }

      element.textContent = addBruh(element)

      return;
    }

    for (let i = 0; i < len; i++) {
      const child = element.childNodes[i];

      if (child.childNodes) {
        iterateThroughChildren(element.childNodes[i]);
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

bruhify()