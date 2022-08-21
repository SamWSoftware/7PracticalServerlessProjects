export interface UserConnectionRecord {
  id: string;
  pk: string;
  sk: string;

  userName: string;
  userId: string;

  domainName: string;
  stage: string;
}

export interface GroupRecord {
  id: string;
  ownerId: string;
  groupName: string;
}

export interface UserGroupRecord {
  id: string;
  pk: string; // group
  sk: string; // user#${userId}
  pk2: string; // userId
  sk2: string; // group#${groupId}

  userId: string;
  groupId: string;
  userName: string;
  groupName: string;
}

export interface MessageRecord {
  id: string;
  pk: string; // groupId
  sk: string; // message#${date}

  groupId: string;
  from: string;
  fromId: string;
  message: string;
  date: number;
}

export interface JoinGroupRequestRecord {
  id: string;
  pk: string; // groupId
  sk: string; // joinRequest#${userId}

  userId: string;
  groupId: string;
  userName: string;
}
