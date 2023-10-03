const ReviewRepository = require("../model/Repositories/ReviewRepository");

exports.handler = async (event) => {
  const repo = new ReviewRepository();

  const id = event.pathParameters ? event.pathParameters.id : null;

  const reviews = id ? [await repo.findById(id)] : await repo.findAll();

  const JSONs = reviews.map((review) => review.toJSONReady());

  // return the reviews
  return {
    statusCode: 200,
    body: JSON.stringify(JSONs),
  };
};
