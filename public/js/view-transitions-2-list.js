const basePath = "/examples/view-transitions-2";

const homePagePattern = new URLPattern(`${basePath}(/)*`, window.origin);
const isHomePage = (url) => {
  return homePagePattern.exec(url);
};

const profilePagePattern = new URLPattern(
  `${basePath}/:username`,
  window.origin
);
const isProfilePage = (url) => {
  return profilePagePattern.exec(url);
};

const extractProfileNameFromUrl = (url) => {
  const match = profilePagePattern.exec(url);
  return match?.pathname.groups.username;
};

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
    const targetUrl = new URL(e.activation.entry.url);

    const profile = extractProfileNameFromUrl(targetUrl);

    setTemporaryViewTransitionNames(
      [
        [document.querySelector(`#${profile} > span`), "name"],
        [document.querySelector(`#${profile} > img`), "avatar"],
      ],
      e.viewTransition.finished
    );
  }
});

window.addEventListener("pagereveal", async (e) => {
  if (!navigation.activation.from) return;

  if (e.viewTransition) {
    console.log(navigation.activation);
    const fromUrl = new URL(navigation.activation.from.url);

    const profile = extractProfileNameFromUrl(fromUrl);

    setTemporaryViewTransitionNames(
      [
        [document.querySelector(`#${profile} > span`), "name"],
        [document.querySelector(`#${profile} > img`), "avatar"],
      ],
      e.viewTransition.ready
    );
  }
});
