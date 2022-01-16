//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const app = express();
const mongoose = require("mongoose");
const Post = require("./blog.js")

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut..";

const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. ";

const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat.";



app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views "));

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

async function main() {
  try {
    await mongoose.connect("mongodb+srv://admin-gael:Test123@cluster0.zz2na.mongodb.net/blogDB");
  } catch(error) {
    console.log(error);
  }
}

main();

// Homepage route
app.get("/", (req, res) => {

  findPosts()

  async function findPosts() {
    try {
      const posts = await Post.find();
      res.render( "home", {startingContent: homeStartingContent, posts: posts});
    } catch(error) {
      res.send(error);
    }
  }
});

// Contact page route
app.get("/contact", (req, res) => {
  res.render("contact", {contactText: contactContent});
});

// About Us page route
app.get("/about", (req, res) => {
  res.render("about", {aboutText: aboutContent});
});

// Posts page routes
app.get("/posts/:postID", (req, res) => {
  const requestedPost = req.params.postID;

  findPosts();

  async function findPosts() {
    try {
      const post = await Post.findOne({_id: requestedPost});
      const storedTitle = _.lowerCase(post.title);
      res.render("post", {postTitle: storedTitle, postDate: post.date, postAuthor: post.author, postContent: post.content, postID: post._id});
    } catch(error) {
      console.log(error);
    }
  }
});

//compose page for posts creation
app.get("/compose", (req, res) => {
  res.render("compose");
});

//post route for posts creation
app.post("/compose", (req, res) => {
  const postTitle = req.body.postTitle;
  const postAuthor = req.body.postAuthor;
  const postContent = req.body.postBody;

  const post = new Post({
    title: postTitle,
    author: postAuthor,
    content: postContent
  });

  post.save((error, post) => {
    if (error) {
      console.log(error);
    } else {
      res.redirect("/");
    }
  })
});



let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started on port 3000");
});
