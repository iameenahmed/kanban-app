export const canReadBoards = (userId: string) => {
  return !!userId;
};

export const canReadTask = (userId: string) => {
  return !!userId;
};

export const canCreateTask = (userId: string) => {
  return !!userId;
};

export const canEditTask = (userId: string, taskUserId: string) => {
  return userId === taskUserId;
};

export const canDeleteTask = (userId: string, taskUserId: string) => {
  return userId === taskUserId;
};
