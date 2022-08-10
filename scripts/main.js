const settings = {
  url: `https://randomuser.me/api?results=50`,
};

const filterInput = document.querySelector(`input[name="filter"]`);
const resultEl = document.querySelector(`ul[data-user-list]`);
const listItems = [];

async function getData() {
  const { url } = settings;
  const response = await fetch(url);
  const { results } = await response.json();
  console.log(results);

  resultEl.innerHTML = ``;

  results.forEach((user) => {
    console.log(user);
    const { name, location, picture } = user;
    const { first, last } = name;
    const { country, state } = location;
    const { thumbnail } = picture;

    const userListItemEl = document.createElement(`li`);
    userListItemEl.classList.add(`user-list-item`);

    const userAvatarEl = document.createElement(`img`);
    userAvatarEl.classList.add(`user-avatar`);
    userAvatarEl.setAttribute(`src`, thumbnail);
    userAvatarEl.setAttribute(`alt`, `${first} ${last}'s Avatar`);
    userListItemEl.appendChild(userAvatarEl);

    const userNameEl = document.createElement(`h3`);
    userNameEl.innerText = `${first} ${last}`;
    userNameEl.classList.add(`user-name`);
    userListItemEl.appendChild(userNameEl);

    resultEl.appendChild(userListItemEl);
  });
}

getData();
