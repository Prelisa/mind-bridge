import PostModel from "../../schema/post.js";
import jwt from "jsonwebtoken";
export async function deletePost(req) {
  try {
    const { id } = req.params;
    const { authorization, authoremail, authorname } = req.headers;
    console.log({ authorization, authoremail, authorname, id });
    const jwtTokendecoded = jwt.verify(
      authorization.split(" ")[1],
      "prelisaSecretCode"
    );

    console.log(jwtTokendecoded);

    if (jwtTokendecoded.exp <= new Date().getTime()) {
      throw new Error("Session Expired");
    }
    if (
      jwtTokendecoded.name.toLowerCase() != authorname.toLowerCase() ||
      jwtTokendecoded.email.toLowerCase() != authoremail.toLowerCase()
    ) {
      throw new Error("Authentication failed!");
    }

    console.log("Deleting post..");
    await PostModel.deleteOne({
      _id: id,
      authorName: authorname,
      authorEmail: authoremail,
    });
    console.log("Successfully deleted the post");
    return true;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}
