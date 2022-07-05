export interface CreateBoardBody {
  name: string;
  description?: string;
  isPublic?: boolean;
}

export interface CreateIdeaBody {
  title: string;
  description?: string;
  boardId: string;
}
