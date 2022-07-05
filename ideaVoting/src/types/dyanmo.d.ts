export interface BoardRecord {
  id: string;
  pk: string;
  sk: string;

  ownerId: string;
  boardName: string;
  description: string;
  isPublic: boolean;
  date: number;
}

export interface IdeaRecord {
  id: string;
  pk: string;
  sk: string;

  boardId: string;
  ideaTitle: string;
  description?: string;
  date: number;
}

export interface VoteRecord {
  id: string;
  pk: string;
  sk: string;

  userId: string;
  ideaId: string;
}
