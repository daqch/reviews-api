const AWS = require("aws-sdk");
const handler = require("../src/lambdas/getReviews").handler;
const Review = require("../src/model/Review");

jest.mock("aws-sdk", () => {
  const mockScan = jest.fn();
  return {
    DynamoDB: {
      DocumentClient: jest.fn(() => ({
        scan: mockScan,
      })),
    },
  };
});

describe("getReviews handler", () => {
  it("should return a list of reviews", async () => {
    const mockScan = jest.fn();
    mockScan.mockReturnValue({
      promise: () =>
        Promise.resolve({
          Items: [
            {
              id: "1",
              películaTítulo: "Star Wars: Episode IV - A New Hope",
              texto: "A classic",
              título: "A classic",
              calificación: 5,
              películaLanzamiento: "1977-05-25",
              películaDirector: "George Lucas",
            },
            {
              id: "2",
              películaTítulo: "Star Wars: Episode V - The Empire Strikes Back",
              texto: "The best of the series",
              título: "The best of the series",
              calificación: 5,
              películaLanzamiento: "1980-05-21",
              películaDirector: "Irvin Kershner",
            },
          ],
        }),
    });
    AWS.DynamoDB.DocumentClient.mockImplementation(() => ({
      scan: mockScan,
    }));
    const result = await handler({});
    const body = JSON.parse(result.body);
    expect(body).not.toBeNull();
    expect(body.length).toEqual(2);
    expect(body[0].id).toEqual("1");
    expect(body[1].id).toEqual("2");
  });
});
