const settings = {
  url: `https://randomuser.me/api?results=50`,
};

const filterInput = document.querySelector(`input[name="filter"]`);
const resultEl = document.querySelector(`ul[data-user-list]`);
const listItems = [];

getData();

filterInput.addEventListener(`input`, (e) => filterData(e.target.value));

async function getData() {
  const { url } = settings;
  const response = await fetch(url);
  const { results } = await response.json();
  console.log(results);

  resultEl.innerHTML = ``;

  results.forEach((user) => {
    const { name, location, picture } = user;
    const { first, last } = name;
    const { country, state } = location;
    const { large } = picture;

    const userListItemEl = document.createElement(`li`);
    userListItemEl.classList.add(`user-list-item`);
    userListItemEl.innerHTML = `
      <img src="${large}" alt="${first} ${last} avatar" class="user-avatar">
      <h3 class="user-name">${first} ${last}</h3>
      <p class="user-location">${state}, ${country}</p>
    `;

    listItems.push(userListItemEl);

    resultEl.appendChild(userListItemEl);
  });
}

function filterData(searchTerm) {
  listItems.forEach((item) => {
    if (item.innerText.toLowerCase().includes(searchTerm.toLowerCase())) {
      item.removeAttribute(`data-hide`);
    } else {
      item.setAttribute(`data-hide`, true);
    }
  });
}
