const express = require("express");
const PostCollection = require("../models/PostEmloyee");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { usersCollection } = require("../models/User");

router.get('/PostEmployee', async (req, res) => {
  const posts = await PostCollection.find().lean();
  const employees = await usersCollection.find({"role" : "employee"}).lean();
  if(posts && employees){
    res.send({ status: "success", message: "success", posts, employees });
  }else{
    res.send({ status: "error", message: "no posts !" });
  }
})

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "PostPhoto/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

router.post("/PostEmployee", upload.single("photo"), async (req, res) => {
  const formData = req.body;
  const file = req.file;

  console.log(file);
  let infoPost = { ...formData };
  if (!file) {
    res.send({ status: "error", message: "photo is requird" });
  }

  infoPost = { ...infoPost, photo: file.filename };
  console.log(formData);
  if (!formData) {
    res.send({ status: "error", message: "All files is requird" });
  } else {
    const Post = await PostCollection(infoPost);
    const result = await Post.save();
    if (result) {
      res.send({ status: "success", message: " denner poster" });
    } else {
      res.send({ status: "error", message: "error in Poste try again" });
    }
  }
});



module.exports = router;
