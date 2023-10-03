const AWS = require("aws-sdk");
const Review = require("../Entities/Review");

class ReviewRepository {
  constructor() {
    this.db = new AWS.DynamoDB.DocumentClient();
    this.tableName = "reviewsTable";
  }

  async findAll() {
    const results = await this.db
      .scan({
        tableName: this.tableName,
      })
      .promise();

    return this.batchConstructReview(results.Items);
  }

  async findById(id) {
    if (!id) {
      return null;
    }

    const results = await this.db
      .scan({
        FilterExpression: "id = :id",
        tableName: this.tableName,
        ExpressionAttributeValues: {
          ":id": id,
        },
      })
      .promise();

    return this.batchConstructReview(results.Items)?.[0] || null;
  }

  async add(review) {
    try {
      const success = await review.fetchMovieDetails();

      console.log(`Detalles de la película populados : ${success}`);

      const params = {
        TableName: "ReviewsTable",
        Item: review.toJSONReady(),
      };

      await dynamoDb.put(params).promise();

      return review;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  batchConstructReview(items) {
    return (
      items?.map(
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
      ) || []
    );
  }
}

module.exports = ReviewRepository;
