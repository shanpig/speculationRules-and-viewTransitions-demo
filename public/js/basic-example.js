setTimeout(() => {
  document.getElementById("message").innerText = "loading...";

  fetch("http://localhost:3000/api")
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("message").innerText = data.message;
    });
}, 500);
