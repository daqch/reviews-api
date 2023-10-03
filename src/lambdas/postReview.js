const ReviewRepository = require("../model/Repositories/ReviewRepository");
const Review = require("../model/Entities/Review");

const validateParams = (películaTítulo, texto, título, calificación) => {
  if (
    !películaTítulo ||
    !texto ||
    !título ||
    calificación < 1 ||
    calificación > 5
  ) {
    return false;
  } else {
    return true;
  }
};

exports.handler = async (event) => {
  const { películaTítulo, texto, título, calificación } = JSON.parse(
    event.body
  );

  if (!validateParams(películaTítulo, texto, título, calificación)) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Parámetros inválidos",
      }),
    };
  }

  const review = new Review(null, películaTítulo, texto, título, calificación);

  const repo = new ReviewRepository();

  const result = await repo.add(review);

  if (!result) {
    return {
      statusCode: 500,
      body: {
        error: "Error al subir reseña",
      },
    };
  }

  // return the review
  return {
    statusCode: 201,
    body: JSON.stringify(review.toJSONReady()),
  };
};
