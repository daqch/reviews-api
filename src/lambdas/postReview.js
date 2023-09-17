const AWS = require("aws-sdk");
const Review = require("../model/Review");

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

  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  const review = new Review(null, películaTítulo, texto, título, calificación);

  const success = await review.fetchMovieDetails();

  console.log(`
    Detalles de la película populados : ${success}
  `);

  const params = {
    TableName: "ReviewsTable",
    Item: review.toJSONReady(),
  };

  await dynamoDb.put(params).promise();

  // return the review
  return {
    statusCode: 200,
    body: JSON.stringify(review.toJSONReady()),
  };
};
