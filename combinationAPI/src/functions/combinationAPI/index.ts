import { formatJSONResponse } from "@libs/apiGateway";
import { APIGatewayProxyEvent } from "aws-lambda";
import Axios from "axios";

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    const { queryStringParameters = {} } = event;

    const { currency } = queryStringParameters;

    if (!currency) {
      return formatJSONResponse({
        statusCode: 400,
        data: {
          message: "Missing currency query parameter",
        },
      });
    }

    const deals = await Axios.get(
      "https://www.cheapshark.com/api/1.0/deals?upperPrice=15&pageSize=5"
    );

    const currencyData = await Axios.get(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/${currency}.json`
    );

    const currencyConversion = currencyData.data[currency];

    const repricedDeals = deals.data.map((deal) => {
      const {
        title,
        storeID,
        salePrice,
        normalPrice,
        savings,
        steamRatingPercent,
        releaseDate,
      } = deal;

      return {
        title,
        storeID,
        steamRatingPercent,

        salePrice: salePrice * currencyConversion,
        normalPrice: normalPrice * currencyConversion,
        savingsPercent: savings,

        releaseDate: new Date(releaseDate * 1000).toDateString(),
      };
    });

    return formatJSONResponse({
      data: repricedDeals,
    });
  } catch (error) {
    console.log("error", error);
    return formatJSONResponse({
      statusCode: 502,
      data: {
        message: error.message,
      },
    });
  }
};
