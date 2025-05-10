import express from "express";
import cors from "cors";
import { connectMongoDB } from "./src/database/mongodb.js";
import { createAccount } from "./src/controllers/authentication/createAccount.js";
import { login } from "./src/controllers/authentication/login.js";
import { createPost } from "./src/controllers/posts/createPost.js";
import {
  getAllPostForUser,
  getSinglePostInformation,
} from "./src/controllers/posts/getPosts.js";
import { updatePost } from "./src/controllers/posts/updatePost.js";
import { deletePost } from "./src/controllers/posts/deletePost.js";

const MONGO_URI =
  "mongodb+srv://prelisadahalbiz:YNRs2fRa2QH2bW76@mind-bridge.ksdpzu3.mongodb.net/mind-bridge";
var app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("all good!");
});
app.post("/createAccount", async (req, res) => {
  try {
    const createAccountResponse = await createAccount(req);
    res.status(200).send({
      status: true,
      result: createAccountResponse,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: false, message: error.toString() });
  }
});
app.post("/login", async (req, res) => {
  try {
    const user = await login(req);
    res.status(200).send({
      status: true,
      result: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: false, message: error.toString() });
  }
});
app.post("/createPost", async (req, res) => {
  try {
    const result = await createPost(req);
    res.status(200).send({
      status: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: false, message: error.toString() });
  }
});
app.get("/getAllPosts/:authorEmail", async (req, res) => {
  try {
    console.log("getAllPosts=>");
    const result = await getAllPostForUser(req);
    res.status(200).send({
      status: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: false, message: error.toString() });
  }
});
app.get("/getPost/:postId", async (req, res) => {
  try {
    console.log("getSinglePostInformation=>");
    const result = await getSinglePostInformation(req);
    res.status(200).send({
      status: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: false, message: error.toString() });
  }
});

app.put("/updatePost", async (req, res) => {
  try {
    console.log("getSinglePostInformation=>");
    const result = await updatePost(req);
    res.status(200).send({
      status: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: false, message: error.toString() });
  }
});

app.delete("/deletePost/:id", async (req, res) => {
  try {
    console.log("deletePost=>");
    const result = await deletePost(req);
    res.status(200).send({
      status: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: false, message: error.toString() });
  }
});
app.listen(8080, async () => {
  console.log("Server starting at 8080");
  await connectMongoDB(MONGO_URI);
});
