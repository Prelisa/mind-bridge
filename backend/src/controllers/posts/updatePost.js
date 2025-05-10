import PostModel from "../../schema/post.js";
import jwt from "jsonwebtoken";
export async function updatePost(req) {
  try {
    const {
      id,
      title,
      thumbnailUrl,
      subTitle,
      body,
      keywords,
      authorEmail,
      authorName,
    } = req.body;
    const { authorization } = req.headers;
    console.log(req.headers);

    const jwtTokendecoded = jwt.verify(
      authorization.split(" ")[1],
      "prelisaSecretCode"
    );
    console.log({
      id,
      title,
      thumbnailUrl,
      subTitle,
      body,
      keywords,
      authorEmail,
      authorName,
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

    const updatePostObject = {
      id,
      title,
      thumbnailUrl,
      subTitle,
      body,
      keywords: keywords.split(","),
      authorEmail,
      authorName,
      createdTime: new Date().getTime(),
    };
    console.log("Adding a new user", updatePostObject);
    await PostModel.findOneAndUpdate(
      { _id: id },
      {
        title,
        thumbnailUrl,
        subTitle,
        body,
        keywords: keywords.split(","),
        authorEmail,
        authorName,
      }
    );
    console.table(updatePostObject);
    console.log("Successfully updated the post");
    return { updatePostObject };
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}
