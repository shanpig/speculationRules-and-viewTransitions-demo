const toggleView = (transitioned) => {
  const box = document.querySelector(".box");
  box.innerText = transitioned
    ? 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum'
    : "Here are some text";
};

const handleToggleView = (e) => {
  console.log(e);
  const hasViewTransition = document.querySelector(
    ".view-transition .switch input"
  ).checked;
  const transitioned = e.target.checked;

  if (hasViewTransition) {
    document.startViewTransition(() => toggleView(transitioned));
  } else {
    toggleView(transitioned);
  }
};

document
  .querySelector(".transition .switch input")
  .addEventListener("click", handleToggleView);
