export type HatType = 'red' | 'blue' | 'black' | 'green' | 'yellow' | 'white';

export type ChatData = {
  nickname: string | null;
  message: string | null;
  hat?: HatType;
};

export type UserData = {
  nickname: string | null;
  hat: string | null;
};

export type UserList = UserData;

export type ChatHistoryType = ChatData;

export type SixHatState = {
  currentPage: number;
  nickname: string | null;
  isAdmin: boolean;
  isSubmit: boolean;
  chatHistory?: ChatHistoryType;
  subject?: string;
  userList: UserList;
};
