import axios from "axios";
const BASE_URL = "http://localhost:8080";
export async function loginUser(email, password) {
  try {
    console.log("login user");
    const response = await axios.post(BASE_URL + "/login", {
      email,
      password,
    });
    console.log({ response });
    if (response.status == 200) {
      return response.data;
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error(error);
    throw new Error(error.response.data.message.toString());
  }
}
export async function createUser(name, email, password, description) {
  try {
    console.log("login user");
    const response = await axios.post(BASE_URL + "/createAccount", {
      name,
      email,
      password,
      description,
    });
    console.log({ response, d: response.data.message });
    if (response.status == 200) {
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error(error);
    throw new Error(error.response.data.message.toString());
  }
}
export async function createPost(
  title,
  thumbnailUrl,
  subTitle,
  body,
  keywords,
  authorName,
  authorEmail,
  jwtToken
) {
  try {
    console.log("createPost ==>");
    const response = await axios.post(
      BASE_URL + "/createPost",
      {
        title,
        thumbnailUrl,
        subTitle,
        body,
        keywords,
        authorEmail,
        authorName,
      },
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
    console.log({ response, d: response.data.message });
    if (response.status == 200) {
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error(error);
    throw new Error(error.response.data.message.toString());
  }
}
export async function getUserPost(email) {
  try {
    console.log("getUserPost user");
    const response = await axios.get(BASE_URL + `/getAllPosts/${email}`);
    console.log({ response });
    if (response.status == 200) {
      return response.data;
    } else {
      throw new Error("getUserPost not found");
    }
  } catch (error) {
    console.error(error);
    throw new Error(error.response.data.message.toString());
  }
}
export async function getPostInformation(postId) {
  try {
    console.log("getPostInformation");
    const response = await axios.get(BASE_URL + `/getPost/${postId}`);
    console.log({ response });
    if (response.status == 200) {
      return response.data;
    } else {
      throw new Error("getUserPost not found");
    }
  } catch (error) {
    console.error(error);
    throw new Error(error.response.data.message.toString());
  }
}
export async function updatePost(
  id,
  title,
  thumbnailUrl,
  subTitle,
  body,
  keywords,
  authorName,
  authorEmail,
  jwtToken
) {
  try {
    console.log("getPostInformation");
    const response = await axios.put(
      BASE_URL + "/updatePost",
      {
        id,
        title,
        thumbnailUrl,
        subTitle,
        body,
        keywords,
        authorEmail,
        authorName,
        jwtToken,
      },
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
    console.log({ response });
    if (response.status == 200) {
      return response.data;
    } else {
      throw new Error("getUserPost not found");
    }
  } catch (error) {
    console.error(error);
    throw new Error(error.response.data.message.toString());
  }
}
export async function deletePost(id, authorName, authorEmail, jwtToken) {
  try {
    console.log("getPostInformation");
    const response = await axios.delete(BASE_URL + `/deletePost/${id}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        authorName,
        authorEmail,
      },
    });
    console.log({ response });
    if (response.status == 200) {
      return response.data;
    } else {
      throw new Error("getUserPost not found");
    }
  } catch (error) {
    console.error(error);
    throw new Error(error.response.data.message.toString());
  }
}
