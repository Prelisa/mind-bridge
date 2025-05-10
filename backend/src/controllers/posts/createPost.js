import PostModel from "../../schema/post.js";
import jwt from "jsonwebtoken";
export async function createPost(req) {
  try {
    const {
      title,
      thumbnailUrl,
      subTitle,
      body,
      keywords,
      authorEmail,
      authorName,
      jwtToken,
    } = req.body;
    const { authorization } = req.headers;
    const jwtTokendecoded = jwt.verify(
      authorization.split(" ")[1],
      "prelisaSecretCode"
    );
    console.log({
      title,
      thumbnailUrl,
      subTitle,
      body,
      keywords,
      authorEmail,
      authorName,
      jwtToken,
    });
    console.log(jwtTokendecoded);
    console.log(
      jwtTokendecoded.name.toLowerCase(),
      authorName.toLowerCase(),
      jwtTokendecoded.email.toLowerCase(),
      authorEmail.toLowerCase()
    );
    if (jwtTokendecoded.exp <= new Date().getTime()) {
      throw new Error("Session Expired");
    }
    if (
      jwtTokendecoded.name.toLowerCase() != authorName.toLowerCase() ||
      jwtTokendecoded.email.toLowerCase() != authorEmail.toLowerCase()
    ) {
      throw new Error("Authentication failed!");
    }

    const newPostObject = {
      title,
      thumbnailUrl,
      subTitle,
      body,
      keywords: keywords.split(","),
      authorEmail,
      authorName,
      createdTime: new Date().getTime(),
    };
    console.log("Adding a new user", newPostObject);
    await PostModel.insertOne(newPostObject);
    console.table(newPostObject);
    console.log("Successfully added a new user");
    return { newPostObject };
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}
