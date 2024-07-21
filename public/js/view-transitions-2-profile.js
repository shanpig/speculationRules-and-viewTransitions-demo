const setTemporaryViewTransitionNames = async (entries, vtPromise) => {
  for (const [$el, name] of entries) {
    $el.style.viewTransitionName = name;
  }

  await vtPromise;

  for (const [$el, name] of entries) {
    $el.style.viewTransitionName = "";
  }
};

window.addEventListener("pageswap", async (e) => {
  if (e.viewTransition) {
    setTemporaryViewTransitionNames(
      [
        [document.querySelector(`h1`), "name"],
        [document.querySelector(`img`), "avatar"],
      ],
      e.viewTransition.finished
    );
  }
});

window.addEventListener("pagereveal", async (e) => {
  if (!navigation.activation.from) return;

  if (e.viewTransition) {
    setTemporaryViewTransitionNames(
      [
        [document.querySelector(`h1`), "name"],
        [document.querySelector(`img`), "avatar"],
      ],
      e.viewTransition.ready
    );
  }
});
