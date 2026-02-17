const defaultUrl = "http://localhost:3000/movie";

const addMovieForm = document.querySelector(`#add-movie`);
const addMovieName = document.querySelector(`#add-movie-name`);
const addMovieRate = document.querySelector(`#add-movie-rate`);
const addDateWatched = document.querySelector(`#add-movie-date`);
const movieDisplay = document.querySelector(`#movie-display`);
const fetchAllMovies = document.querySelector(`#fetch-movies`);
const fetchById = document.querySelector(`#fetch-movie-by-id`);
const fetchId = document.querySelector(`#fetch-movie-id`);
const fetchByName = document.querySelector(`#fetch-movie-by-name`);
const fetchName = document.querySelector(`#fetch-movie-name`);
const updateById = document.querySelector(`#update-movie-by-id`);
const updateId = document.querySelector(`#update-movie-id`);
const updateRate = document.querySelector(`#update-movie-rate`);
const updateDate = document.querySelector(`#update-movie-date`);
const deleteById = document.querySelector(`#delete-movie-by-id`);
const deleteId = document.querySelector(`#delete-movie-id`);
const specialDisplay = document.querySelector("#special-display");
const moviesByActorForm = document.querySelector("#movies-by-actor-name");
const moviesByActorInput = document.querySelector("#movies-by-actor-input");
const moviesByGenreForm = document.querySelector("#movies-by-genre");
const moviesByGenreInput = document.querySelector("#movies-by-genre-input");
const moviesRankByReleaseForm = document.querySelector(
  "#movies-rank-by-release",
);
const moviesAboveRatingForm = document.querySelector("#movies-above-rating");
const moviesAboveRatingInput = document.querySelector(
  "#movies-above-rating-input",
);
const moviesBetweenYearsForm = document.querySelector("#movies-between-years");
const moviesYearStart = document.querySelector("#movies-year-start");
const moviesYearEnd = document.querySelector("#movies-year-end");

addMovieForm.addEventListener("submit", (e) => {
  e.preventDefault();
  movieDisplay.textContent = "Loading...";
  const data = {
    name: addMovieName.value,
    rating: addMovieRate.value,
    date: addDateWatched.value,
  };
  axios
    .post(defaultUrl, data)
    .then(
      () => (movieDisplay.textContent = `Created Successfully: ${data.name}`),
    )
    .catch(
      (err) =>
        (movieDisplay.textContent = `An error has occured: ${err.message}`),
    );
});

fetchAllMovies.addEventListener("submit", (e) => {
  e.preventDefault();
  movieDisplay.textContent = "Loading...";
  axios
    .get(defaultUrl)
    .then((res) => {
      const movieNames = res.data.map((movie) => movie.Title).join(", ");
      movieDisplay.textContent = movieNames || "No movies found.";
    })
    .catch(
      (err) =>
        (movieDisplay.textContent = `An error has occured: ${err.message}`),
    );
});

fetchById.addEventListener("submit", (e) => {
  e.preventDefault();
  movieDisplay.textContent = "Loading...";
  const id = fetchId.value;
  axios
    .get(`${defaultUrl}/id/${id}`)
    .then((res) => {
      const details = Object.entries(res.data)
        .map(([k, v]) => `${k}: ${v}`)
        .join(", ");
      movieDisplay.textContent = details || "Couldn't find the movie.";
    })
    .catch((err) => (movieDisplay.textContent = `Error: ${err.message}`));
});

fetchByName.addEventListener("submit", (e) => {
  e.preventDefault();
  movieDisplay.textContent = "Loading...";
  const name = fetchName.value;
  axios
    .get(`${defaultUrl}/name/${name}`)
    .then((res) => {
      const details = Object.entries(res.data)
        .map(([k, v]) => `${k}: ${v}`)
        .join(", ");
      movieDisplay.textContent = details || "Couldn't find the movie.";
    })
    .catch((err) => (movieDisplay.textContent = `Error: ${err.message}`));
});

updateById.addEventListener("submit", (e) => {
  e.preventDefault();
  movieDisplay.textContent = "Loading...";
  const id = updateId.value;
  const data = {
    Rating: Number(updateRate.value),
    WatchedAt: updateDate.value || Date.now(),
  };
  axios
    .patch(`${defaultUrl}/update/${id}`, data)
    .then((res) => {
      movieDisplay.textContent = `Updated ${res.data.Title}: Rating is now ${res.data.Rating}`;
    })
    .catch((err) => (movieDisplay.textContent = `Error: ${err.message}`));
});

deleteById.addEventListener("submit", (e) => {
  e.preventDefault();
  movieDisplay.textContent = "Loading...";
  const id = deleteId.value;
  axios
    .delete(`${defaultUrl}/delete/${id}`)
    .then((res) => (movieDisplay.textContent = `Deleted: ${res.data.Title}`))
    .catch((err) => (movieDisplay.textContent = `Error: ${err.message}`));
});

moviesByActorForm.addEventListener("submit", (e) => {
  e.preventDefault();
  specialDisplay.textContent = "Loading...";
  axios
    .get(`${defaultUrl}/actor-movies/${moviesByActorInput.value}`)
    .then((res) => {
      specialDisplay.textContent = res.data || "No movies found.";
    })
    .catch((err) => (specialDisplay.textContent = err.message));
});

moviesByGenreForm.addEventListener("submit", (e) => {
  e.preventDefault();
  specialDisplay.textContent = "Loading...";
  axios
    .get(`${defaultUrl}/genre/${moviesByGenreInput.value}`)
    .then((res) => {
      specialDisplay.textContent =
        res.data.map((movie) => movie.Title).join(", ") || "No movies found.";
    })
    .catch((err) => (specialDisplay.textContent = err.message));
});

moviesRankByReleaseForm.addEventListener("submit", (e) => {
  e.preventDefault();
  specialDisplay.textContent = "Loading...";
  axios
    .get(`${defaultUrl}/rank/release`)
    .then((res) => {
      specialDisplay.textContent = res.data
        .map((movie) => `${movie.Title} (${movie.Released.slice(0, 10)})`)
        .join(", ");
    })
    .catch((err) => (specialDisplay.textContent = err.message));
});

moviesAboveRatingForm.addEventListener("submit", (e) => {
  e.preventDefault();
  specialDisplay.textContent = "Loading...";
  axios
    .get(`${defaultUrl}/above-rating/${moviesAboveRatingInput.value}`)
    .then((res) => {
      specialDisplay.textContent =
        res.data
          .map((movie) => `${movie.Title} (${movie.Rating})`)
          .join(", ") || "No movies found.";
    })
    .catch((err) => (specialDisplay.textContent = err.message));
});

moviesBetweenYearsForm.addEventListener("submit", (e) => {
  e.preventDefault();
  specialDisplay.textContent = "Loading...";

  const start = moviesYearStart.value;
  const end = moviesYearEnd.value;
  axios
    .get(`${defaultUrl}/between/${start}/${end}`)
    .then((res) => {
      specialDisplay.textContent =
        res.data.map((movie) => `${movie.Title} (${movie.Year})`)
        .join(", ") || "No movies found.";
    })
    .catch((err) => (specialDisplay.textContent = err.message));
});
