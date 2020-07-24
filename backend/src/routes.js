const routes = require("express").Router();
const multer = require("multer")
const multerConfig = require('./config/multer')

const Post = require("./models/Post");
const { fileFilter } = require("./config/multer");

routes.post("/posts", multer(multerConfig).single('file'), async (req, res) => {
  const {originalname: name, filename: key, size} = req.file

  const post = await Post.create({
    name,
    size,
    key,
    url: '',
  })

  return res.json(post)
})

routes.delete("/delete", async (req, res) => {
  //const photo = await Post.findById("5f1a53c1221e6f1e5c331d72")

  Post.deleteOne({ _id: req.query.id}, (err, res) => {
    if (err) return handleError(err)
  })
  return res.send(req.query.id)
})

module.exports = routes