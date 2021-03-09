let users = [];

const userJoin = (id, username, room) => {
  const user = { id, username, room };
  users.push(user);
  return user;
};

const userLeave = (id) => {
  return users.filter((user) => user.id === id)[0];
};

const getCurrentUser = (id) => {
  return users.find((user) => user.id === id);
};

const getRoomUsers = (room) => {
  return users.filter((room) => user.room === room);
};

module.exports = { userJoin, userLeave, getCurrentUser, getRoomUsers };
