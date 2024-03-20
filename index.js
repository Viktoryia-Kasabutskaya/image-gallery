const mainContent = document.querySelector(".main-content");
const input = document.querySelector(".input");
const searchBtn = document.querySelector(".btn-search");

let query;

function getData() {
  query = input.value || "random";

  const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=12&orientation=landscape`;

  fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Client-ID Pj2isf9Y5IMX7lJqxZZReIn6M884CTeecOtH06WobqQ",
    },
  })
    .then((result) => result.json())
    .then((data) => showData(data.results))
    .catch((e) => alert(e.message));
}

function showData(photos) {
  mainContent.innerHTML = "";

  photos.forEach((photo) => {
    const photoElement = document.createElement("div");
    photoElement.classList.add("photo");

    const imgElement = document.createElement("img");
    imgElement.src = photo.urls.regular;
    imgElement.alt = photo.alt_description;

    imgElement.addEventListener("click", () => {
      window.open(photo.links.html, "_blank");
    });

    photoElement.appendChild(imgElement);
    mainContent.appendChild(photoElement);
  });
}

input.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) getData(input.value);
});

searchBtn.addEventListener("click", getData);

getData();
