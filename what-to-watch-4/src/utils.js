
export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const formatTime = (time) =>
  [60, 60, 24]
    .map((n) => {
      const result = time % n;
      time = (time - result) / n;
      return (`0` + result).slice(-2);
    })
    .reverse()
    .join(`:`);

export const formatMovieDuration = (duration) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  return `${hours}h ${(`0` + minutes).slice(-2)}m`;
};

export const adapterData = (films) =>
  films.map((film) =>
    Object.keys(film).length
      ? {
        id: film.id,
        name: film.name,
        posterUrl: film.poster_image,
        previewUrl: film.preview_image,
        bigPosterUrl: film.background_image,
        backgroundColor: film.background_color,
        videoUrl: film.video_link,
        trailerUrl: film.preview_video_link,
        description: film.description,
        rating: film.rating,
        votes: film.scores_count,
        director: film.director,
        starring: film.starring,
        runTime: formatMovieDuration(film.run_time),
        genre: film.genre,
        releaseYear: film.released,
        isFavorite: film.is_favorite
      }
      : {});

export const adapterFilm = (film) =>
  Object.keys(film).length
    ? {
      id: film.id,
      name: film.name,
      posterUrl: film.poster_image,
      previewUrl: film.preview_image,
      bigPosterUrl: film.background_image,
      backgroundColor: film.background_color,
      videoUrl: film.video_link,
      trailerUrl: film.preview_video_link,
      description: film.description,
      rating: film.rating,
      votes: film.scores_count,
      director: film.director,
      starring: film.starring,
      runTime: formatMovieDuration(film.run_time),
      genre: film.genre,
      releaseYear: film.released,
      isFavorite: film.is_favorite
    }
    : {};


export const getCurentFilm = (movies, props) => {
  return movies.find((movie) => movie.id === Number(props.match.params.id));
};

export const getTextRating = (value) => {
  if (value >= 0 && value < 3) {
    return `Bad`;
  } else if (value >= 3 && value < 5) {
    return `Normal`;
  } else if (value >= 5 && value < 8) {
    return `Good`;
  } else if (value >= 8 && value < 10) {
    return `Very good`;
  } else if (value === 10) {
    return `Awesome`;
  }
  return ``;
};

export const formatDate = (date) => {
  const MONTH_NAMES = [
    `January`,
    `February`,
    `March`,
    `April`,
    `May`,
    `June`,
    `July`,
    `August`,
    `September`,
    `October`,
    `November`,
    `December`,
  ];
  return `${MONTH_NAMES[date.getMonth()]}
    ${date.getDate()},
    ${date.getFullYear()}`;
};


