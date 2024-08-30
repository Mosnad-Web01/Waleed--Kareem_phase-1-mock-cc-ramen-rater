document.addEventListener("DOMContentLoaded", () => {
  const ramenMenu = document.getElementById("ramen-menu");
  const ramenDetail = document.getElementById("ramen-detail");
  const newRamenForm = document.getElementById("new-ramen");

  let currentRamenId;

  // Fetch all ramens
  fetch("http://localhost:3000/ramens")
    .then((response) => response.json())
    .then((ramens) => {
      ramens.forEach((ramen) => {
        const img = document.createElement("img");
        img.src = ramen.image;
        img.alt = ramen.name;
        img.addEventListener("click", () => displayRamenDetails(ramen));
        ramenMenu.appendChild(img);
      });
      // Display first ramen details on load
      if (ramens.length > 0) {
        displayRamenDetails(ramens[0]);
      }
    });

  // Display ramen details
  function displayRamenDetails(ramen) {
    currentRamenId = ramen.id;
    document.querySelector(".detail-image").src = ramen.image;
    document.querySelector(".name").innerText = ramen.name;
    document.querySelector(".restaurant").innerText = ramen.restaurant;
    document.getElementById("rating-display").innerText = ramen.rating;
    document.getElementById("comment-display").innerText = ramen.comment;
  }

  // Add new ramen
  newRamenForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const newRamen = {
      name: document.getElementById("new-name").value,
      restaurant: document.getElementById("new-restaurant").value,
      image: document.getElementById("new-image").value,
      rating: document.getElementById("new-rating").value,
      comment: document.getElementById("new-comment").value,
    };

    const img = document.createElement("img");
    img.src = newRamen.image;
    img.alt = newRamen.name;
    img.addEventListener("click", () => displayRamenDetails(newRamen));
    ramenMenu.appendChild(img);

    newRamenForm.reset();
  });
});
