export const canReadBoards = (userId: string) => {
  return !!userId;
};

export const canCreateBoard = (userId: string) => {
  return !!userId;
};

export const canEditBoard = (userId: string, boardUserId: string) => {
  return userId === boardUserId;
};

export const canDeleteBoard = (userId: string, boardUserId: string) => {
  return userId === boardUserId;
};
