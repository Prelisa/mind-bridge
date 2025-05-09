import { COLLECTION_NAME, getCollectionObj } from "../database/mongodb.js";
import jwt from "jsonwebtoken";
// const userAccount = {
//   "name": "Prelisa",
//   "email": "dPrelisa@gmail.com",
//   "password": "123",
//   "description": "dwqw",
//   "country": "wqr",
// };
export async function createAccount(mongo, req) {
  try {

    // const copy = "hi"; const cop1 = copy;
    // const arry = [1,2,3,4];const copy = arry[0]
    // const obj = {he:1,she:2}; const copy1 = obj.he
    // const obj = {he:1,she:2}; const he = obj.he; const she = obj.she;
    // const obj = {he:1,she:2};  const {he, she} = obj
    // const {he, she} = {he:1,she:2};

    const{name,email,description,password}=req.body

    console.log(req.body);
    const newUserObject = {
      name:req.body.name,
      email,
      password,
      description,
      joinedData: new Date().getTime(),
      _id: email,
    };
    console.log("Adding a new user", newUserObject);
    const collection = await getCollectionObj(COLLECTION_NAME.USER_COLLECTION, mongo);

    await collection.insertOne(newUserObject);
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
