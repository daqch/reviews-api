// lambda to get all movies from swapi
const AWS = require("aws-sdk");
const Review = require("../model/Review");

exports.handler = async (event) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  // it may be the case that the url was /reviews/:id
  // so we need to check if the id is present
  const id = event.pathParameters ? event.pathParameters.id : null;

  const params = {
    TableName: "ReviewsTable",
  };

  if (id) {
    params.KeyConditionExpression = "id = :id";
    params.ExpressionAttributeValues = {
      ":id": id,
    };
  }

  const result = await dynamoDb.scan(params).promise();

  const reviews = result.Items.map(
    (item) =>
      new Review(
        item.id,
        item.películaTítulo,
        item.texto,
        item.título,
        item.calificación,
        item.películaLanzamiento,
        item.películaDirector
      )
  );

  const JSONs = reviews.map((review) => review.toJSONReady());

  // return the reviews
  return {
    statusCode: 200,
    body: JSON.stringify(JSONs),
  };
};
