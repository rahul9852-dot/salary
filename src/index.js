const api = `https://randomuser.me/api`;

const mainApp = document.getElementById("app");
const addUser = document.getElementById("user-btn");
const AscsortBtn = document.getElementById("sort-asc");
const DecsortBtn = document.getElementById("sort-desc");

const userList = document.getElementById("user-list");

const serachInput = document.getElementById("search");

const appState = [];
//console.log(addUser)

// cereating class

class User {
  constructor(title, firstname, lastname, gender, email) {
    this.title = `${title}`;
    this.name = `${firstname} ${lastname}`;
    this.gender = gender;
    this.email = email;
  }
}

// attaching function

addUser.addEventListener("click", async () => {
  const userData = await fetch(api, {
    method: "GET"
  });
  const userJson = await userData.json();
  //console.log(userJson.results[0]);

  const user = userJson.results[0];
  const classUser = new User(
    user.name.title,
    user.name.first,
    user.name.last,
    user.gender,
    user.email
  );
  appState.push(classUser);
  console.log(appState);
  domRenderer(appState);
});

// rendering our state on the dom.

const domRenderer = (stateArr) => {
  userList.innerHTML = null;
  stateArr.forEach((userObj) => {
    const userEl = document.createElement("div");
    userEl.innerHTML = `<div>
    Name:${userObj.title}${userObj.name}
    <ol>
    <li>${userObj.gender}</li>
    <li>${userObj.email}</li>
    </ol>
  </div>`;
    userList.appendChild(userEl);
  });
};

// Implememnting serach

serachInput.addEventListener("keyup", (e) => {
  console.log(e, serachInput.value);
  const filterdAppState = appState.filter(
    (user) =>
      user.name.toLowerCase().includes(serachInput.value.toLowerCase()) ||
      user.gender.toLowerCase().includes(serachInput.value.toLowerCase()) ||
      user.email.toLowerCase().includes(serachInput.value.toLowerCase())
  );

  domRenderer(filterdAppState);
});

// sort Name
AscsortBtn.addEventListener("click", () => {
  const appstateCopy = [...appState];
  appstateCopy.sort((a, b) => (a.name < b.name ? 1 : -1));
  domRenderer(appstateCopy);
});

// Desc

DecsortBtn.addEventListener("click", () => {
  const appstateCopy = [...appState];
  appstateCopy.sort((a, b) => (a.name < b.name ? -1 : 1));
  domRenderer(appstateCopy);
});
