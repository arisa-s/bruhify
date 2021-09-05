const DEFAULT_ELEMENT_THRESHOLD = 0.05;
const DEFAULT_WORD_THRESHOLD = 0.01;

const getSafeThreshold = (argThreshold) =>
  argThreshold > 1 || argThreshold < 0
    ? DEFAULT_ELEMENT_THRESHOLD
    : argThreshold;

const bruhify = ({
  elementThreshold = DEFAULT_ELEMENT_THRESHOLD,
  wordThreshold = DEFAULT_WORD_THRESHOLD,
}) => {
  const safeElementThreshold = getSafeThreshold(elementThreshold);
  const safeWordThreshold = getSafeThreshold(wordThreshold);

  const [DEBOUNCE_DELAY, TARGET_ELEMENT, TEXT] = [2000, "body", "bruh"];

  const targetNode = document.querySelector(TARGET_ELEMENT);

  const shouldBruh = (threshold) => Math.random() < threshold;

  const addBruh = (htmlElement) => {
    if (shouldBruh(safeElementThreshold)) {
      htmlElement.textContent = htmlElement.textContent
        .split(" ")
        .map((word) => (shouldBruh(safeWordThreshold) ? TEXT : word))
        .join(" ");
    }
  };

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
      if (!element.textContent) return;

      // Element is textnode
      if (element.nodeType === 3) {
        if (
          !element.parentElement ||
          !element.parentElement.dataset ||
          element.parentElement.dataset.isBruhed
        )
          return;

        element.parentElement.dataset.isBruhed = true;

        addBruh(element);

        return;
      }

      if (element.dataset && element.dataset.isBruhed) return;

      if (element.dataset) {
        element.dataset.isBruhed = true;
      }

      addBruh(element);

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
};

bruhify({});
