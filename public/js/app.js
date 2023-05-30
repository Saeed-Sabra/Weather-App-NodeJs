const weatherForm = document.querySelector("form");
const search = document.getElementById("city-name");
const p1 = document.getElementById("mass-p1");
const p2 = document.getElementById("mass-p2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  p1.textContent = "Loading...";
  p2.textContent = "";
  fetch(
    "http://localhost:3000/weather?address=" + decodeURIComponent(location)
  ).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        p1.textContent = data.error;
      } else {
        p1.textContent = data.Location;
        p2.textContent = data.Forecast;
      }
    });
  });
});
