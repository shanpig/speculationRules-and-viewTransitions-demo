setTimeout(() => {
  document.getElementById("message").innerText = "loading...";

  fetch("http://localhost:3000/api")
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("message").innerText = data.message;
    });
}, 500);

new WOW().init();

const whenActivated = new Promise((res) => {
  if (document.prerendering) {
    document.addEventListener("prerenderingchange", res, { once: true });
  } else {
    res("");
  }
});
async function startAnimation() {
  await whenActivated;

  const direction = window.location.href.includes("2")
    ? "fadeInRight"
    : "fadeInLeft";
  document.querySelector("h1").classList.add(direction);
}

startAnimation();
