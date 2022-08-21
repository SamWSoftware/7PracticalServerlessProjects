export interface GroupDetailsResponse {
  members: {
    userId: string;
    userName: string;
  }[];
  id: string;
  ownerId: string;
  groupName: string;
  joinRequests?: { id: string; userId: string; groupId: string; userName: string }[];
}
