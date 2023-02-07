import User from '../models/User';

export const validateUserName = async (username: string): Promise<string> => {
  let check = await User.findOne({
    userName: username,
  });

  if (check) {
    let newUsername = username + Math.floor(Math.random() * 100);
    return validateUserName(newUsername);
  } else {
    return username;
  }
};
