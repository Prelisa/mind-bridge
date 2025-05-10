import PostModel from "../../schema/post.js";

export async function searchPost(req) {
  try {
    const { key } = req.query;
    let query = {};
    if (key && key.trim() !== "") {
      const decodedSearch = decodeURIComponent(key.trim());
      const searchRegex = { $regex: decodedSearch, $options: "i" };
      query = {
        $or: [
          { title: searchRegex },
          { subTitle: searchRegex },
          { body: searchRegex },
          { authorName: searchRegex },
          { authorEmail: searchRegex },
          {
            keywords: { $elemMatch: { $regex: decodedSearch, $options: "i" } },
          },
        ],
      };
    }
    const posts = await PostModel.find(query).sort({ createdAt: -1 });

    return posts;
  } catch (error) {
    console.error("Search posts error:", error);
    throw new Error(error);
  }
}
