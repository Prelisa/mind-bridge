import express from "express";
var app = express();
app.get("/", (req, res) => {
  console.log("all good");
});
app.listen(8000,()=>{
    console.log("server running at port 8000")
})