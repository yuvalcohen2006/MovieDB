const defaultActorUrl = "http://localhost:3000/actor";

const addActorForm = document.querySelector(`#add-actor`);
const addActorName = document.querySelector(`#actor-name`);
const actorDisplay = document.querySelector(`#actor-display`);
const fetchAllActors = document.querySelector(`#fetch-actors`);
const fetchActorById = document.querySelector(`#fetch-actor-by-id`);
const fetchActorId = document.querySelector(`#fetch-actor-id`);
const fetchActorByName = document.querySelector(`#fetch-actor-by-name`);
const fetchActorName = document.querySelector(`#fetch-actor-name`);
const updateActorById = document.querySelector(`#update-actor-by-id`);
const updateActorId = document.querySelector(`#update-actor-id`);
const updateActorAge = document.querySelector(`#update-actor-age`);
const deleteActorById = document.querySelector(`#delete-actor-by-id`);
const deleteActorId = document.querySelector(`#delete-actor-id`);
const actorsRankByRatingForm = document.querySelector("#actors-rank-by-rating");
const actorsRankByAgeForm = document.querySelector("#actors-rank-by-age");

addActorForm.addEventListener("submit", (e) => {
  e.preventDefault();
  actorDisplay.textContent = "Loading...";
  const data = {
    Name: addActorName.value
  };
  axios
    .post(defaultActorUrl, data)
    .then((res) => (actorDisplay.textContent = `Created Successfully: ${res.data.Name}`))
    .catch((err) => (actorDisplay.textContent = `An error has occured: ${err.message}`));
});

fetchAllActors.addEventListener("submit", (e) => {
  e.preventDefault();
  actorDisplay.textContent = "Loading...";
  axios
    .get(defaultActorUrl)
    .then((res) => {
      const actorNames = res.data.map((actor) => actor.Name).join(", ");
      actorDisplay.textContent = actorNames || "No actors found.";
    })
    .catch((err) => (actorDisplay.textContent = `An error has occured: ${err.message}`));
});

fetchActorById.addEventListener("submit", (e) => {
  e.preventDefault();
  actorDisplay.textContent = "Loading...";
  const id = fetchActorId.value;
  axios
    .get(`${defaultActorUrl}/id/${id}`)
    .then((res) => {
      const details = Object.entries(res.data)
        .map(([k, v]) => `${k}: ${v}`)
        .join(", ");
      actorDisplay.textContent = details || "Couldn't find the actor.";
    })
    .catch((err) => (actorDisplay.textContent = `Error: ${err.message}`));
});

fetchActorByName.addEventListener("submit", (e) => {
  e.preventDefault();
  actorDisplay.textContent = "Loading...";
  const name = fetchActorName.value;
  axios
    .get(`${defaultActorUrl}/name/${name}`)
    .then((res) => {
      const details = Object.entries(res.data)
        .map(([k, v]) => `${k}: ${v}`)
        .join(", ");
      actorDisplay.textContent = details || "Couldn't find the actor.";
    })
    .catch((err) => (actorDisplay.textContent = `Error: ${err.message}`));
});

updateActorById.addEventListener("submit", (e) => {
  e.preventDefault();
  actorDisplay.textContent = "Loading...";
  const id = updateActorId.value;
  const data = {
    Age: updateActorAge.value
  };
  axios
    .patch(`${defaultActorUrl}/update/${id}`, data)
    .then((res) => {
      actorDisplay.textContent = `Updated ${res.data.Name}: Age is now ${res.data.Age}`;
    })
    .catch((err) => (actorDisplay.textContent = `Error: ${err.message}`));
});

deleteActorById.addEventListener("submit", (e) => {
  e.preventDefault();
  actorDisplay.textContent = "Loading...";
  const id = deleteActorId.value;
  axios
    .delete(`${defaultActorUrl}/delete/${id}`)
    .then((res) => (actorDisplay.textContent = `Deleted: ${res.data.Name}`))
    .catch((err) => (actorDisplay.textContent = `Error: ${err.message}`));
});

actorsRankByRatingForm.addEventListener("submit", (e) => {
  e.preventDefault();
  specialDisplay.textContent = "Loading...";
  axios
    .get(`${defaultActorUrl}/rank/rating`)
    .then((res) => {
      specialDisplay.textContent = res.data
        .map((actor) => `${actor.Name}: ${actor.avgRating.toFixed(1)}`)
        .join(", ");
    })
    .catch((err) => (specialDisplay.textContent = err.message));
});

actorsRankByAgeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  specialDisplay.textContent = "Loading...";
  axios
    .get(`${defaultActorUrl}/rank/age`)
    .then((res) => {
      specialDisplay.textContent = res.data
        .map((a) => `${a.Name}: ${a.Age}`)
        .join(", ");
    })
    .catch((err) => (specialDisplay.textContent = err.message));
});