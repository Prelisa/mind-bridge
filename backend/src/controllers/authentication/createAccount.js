import UserModel from "../../schema/user.js";
import jwt from "jsonwebtoken";

export async function createAccount(req) {
  try {
    const { name, email, password, description } = req.body;
    const newUserObject = {
      name,
      email,
      password,
      description,
      joinedData: new Date().getTime(),
      _id: email,
    };
    console.log("Adding a new user", newUserObject);

    await UserModel.insertOne(newUserObject);
    const jwtToken = jwt.sign(
      {
        iat: new Date().getTime(),
        exp: new Date().getTime() + 60 * 60,
        name,
        email,
      },
      "prelisaSecretCode"
    );

    console.table(newUserObject);
    console.log("Successfully added a new user");
    return { newUserObject, jwtToken };
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}
