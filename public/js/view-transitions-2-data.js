const fetchUser = async (username) => {
  const userData = await fetch(
    `http://localhost:3000/api/users/${username}`
  ).then((res) => res.json());

  return userData;
};

const appendUserDataToDOM = (userData) => {
  const userContainer = document.getElementById("user-info");
  userContainer.innerHTML = `
    <div>${userData.age}</div>
    <div>${userData.email}</div>
    <div>${userData.description}</div>
  `;
};

const loadData = async (username) => {
  const userContainer = document.getElementById("user-info");
  userContainer.innerHTML = "loading...";
  const userData = await fetchUser(username);
  appendUserDataToDOM(userData);
};
