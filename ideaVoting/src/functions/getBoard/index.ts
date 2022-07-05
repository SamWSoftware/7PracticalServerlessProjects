import { APIGatewayProxyEvent } from 'aws-lambda';
import { formatJSONResponse } from '@libs/APIResponses';
import Dynamo from '@libs/Dynamo';
import { BoardRecord, IdeaRecord, VoteRecord } from 'src/types/dyanmo';

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    const tableName = process.env.singleTable;

    const boardId = event.pathParameters.boardId;

    const board = await Dynamo.get<BoardRecord>({
      tableName,
      pkValue: boardId,
    });

    if (!board.id) {
      return formatJSONResponse({
        statusCode: 400,
        body: { message: 'no board found with that id' },
      });
    }

    const { pk, sk, ...responseData } = board;

    const ideas = await Dynamo.query<IdeaRecord>({
      tableName,
      index: 'index1',
      pkValue: `idea-${boardId}`,
      pkKey: 'pk',
    });
    const ideaDataPromiseArray = ideas.map(async ({ pk, sk, boardId, ...ideaData }) => {
      const votes = await Dynamo.query<VoteRecord>({
        tableName,
        index: 'index1',
        pkValue: `vote-${ideaData.id}`,
        pkKey: 'pk',
      });

      return {
        ...ideaData,
        votes: votes.length,
      };
    });

    const ideaDataArray = (await Promise.all(ideaDataPromiseArray)).sort(
      (a, b) => a.votes - b.votes
    );

    return formatJSONResponse({
      body: {
        ...responseData,
        ideas: ideaDataArray,
      },
    });
  } catch (error) {
    return formatJSONResponse({ statusCode: 500, body: error.message });
  }
};
