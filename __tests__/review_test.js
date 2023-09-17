const Review = require("../src/model/Review");

describe("clase Review", () => {
  test("constructor", () => {
    const review = new Review(
      "películaTítulo",
      "texto",
      "título",
      3,
      "películaLanzamiento",
      "películaDirector"
    );

    expect(review.películaTítulo).toBe("películaTítulo");
    expect(review.texto).toBe("texto");
    expect(review.título).toBe("título");
    expect(review.calificación).toBe(3);
    expect(review.películaLanzamiento).toBe("películaLanzamiento");
    expect(review.películaDirector).toBe("películaDirector");
  });

  test("fetchMovieDetails con película en swapi", async () => {
    const review = new Review(
      "A New Hope",
      "texto",
      "título",
      3,
      "películaLanzamiento",
      "películaDirector"
    );

    const success = await review.fetchMovieDetails();

    expect(success).toBe(true);
    expect(review.películaLanzamiento).toBe("1977-05-25");
    expect(review.películaDirector).toBe("George Lucas");
  });

  test("fetchMovieDetails con película no en swapi", async () => {
    const review = new Review(
      "películaTítulo",
      "texto",
      "título",
      3,
      "películaLanzamiento",
      "películaDirector"
    );

    const success = await review.fetchMovieDetails();

    expect(success).toBe(false);
    expect(review.películaLanzamiento).toBe("películaLanzamiento");
    expect(review.películaDirector).toBe("películaDirector");
  });

  test("toJSONReady", () => {
    const review = new Review(
      "películaTítulo",
      "texto",
      "título",
      3,
      "películaLanzamiento",
      "películaDirector"
    );

    const json = review.toJSONReady();

    expect(json.películaTítulo).toBe("películaTítulo");
    expect(json.texto).toBe("texto");
    expect(json.título).toBe("título");
    expect(json.calificación).toBe(3);
    expect(json.películaLanzamiento).toBe("películaLanzamiento");
    expect(json.películaDirector).toBe("películaDirector");
    expect(json.id).toBeDefined();
    expect(json.creado).toBeDefined();
  });
});
