const uuid = require("uuid");

class Review {
  constructor(
    id = null,
    películaTítulo,
    texto,
    título,
    calificación,
    películaLanzamiento = null,
    películaDirector = null
  ) {
    this.id = id || uuid.v4();
    this.películaTítulo = películaTítulo;
    this.texto = texto;
    this.título = título;
    this.calificación = calificación;
    this.películaLanzamiento = películaLanzamiento;
    this.películaDirector = películaDirector;
    this.timeStamp = new Date().toISOString();
  }
  async fetchMovieDetails() {
    const params = new URLSearchParams({
      search: this.películaTítulo,
    });

    const url = `https://swapi.py4e.com/api/films/?${params.toString()}`;

    const response = await fetch(url);

    if (response.status !== 200) {
      return false;
    }

    try {
      const data = await response.json();
      console.log(data);
      const movie = data.results[0];
      this.películaLanzamiento = movie.release_date;
      this.películaDirector = movie.director;
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;
  }

  toJSONReady() {
    return {
      id: this.id,
      películaTítulo: this.películaTítulo,
      texto: this.texto,
      título: this.título,
      calificación: this.calificación,
      películaLanzamiento: this.películaLanzamiento,
      películaDirector: this.películaDirector,
      creado: this.timeStamp,
    };
  }
}

module.exports = Review;
