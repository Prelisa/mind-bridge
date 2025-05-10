import PostModel from "../../schema/post.js";

export async function getAllPostForUser(req) {
  try {
    const { authorEmail } = req.params;
    console.log(authorEmail);
    const response = await PostModel.find({ authorEmail });
    return response.sort((a, b) => b.createdTime - a.createdTime);
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

export async function getSinglePostInformation(req) {
  try {
    const { postId } = req.params;
    const response = await PostModel.findOne({ _id: postId });
    return response;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}
