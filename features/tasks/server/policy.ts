export const canReadBoards = (userId: string) => {
  return !!userId;
};

export const canCreateBoard = (userId: string) => {
  return !!userId;
};

export const canEditBoard = (userId: string, taskUserId: string) => {
  return userId === taskUserId;
};

export const canDeleteBoard = (userId: string, taskUserId: string) => {
  return userId === taskUserId;
};
