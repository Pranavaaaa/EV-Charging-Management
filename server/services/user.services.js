import userModel from "../models/user.model.js";

const createUser = async ({ firstName, lastName, email, password }) => {
  try {
    if (!firstName || !lastName || !password || !email) {
      throw new Error("Missing required fields");
    }

    const user = await userModel.create({
      fullName: {
        firstName,
        lastName,
      },
      email,
      password,
    });


    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default { createUser };