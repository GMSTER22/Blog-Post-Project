const mongoose = require("mongoose");

async function main() {
    try {
      await mongoose.connect("mongodb+srv://admin-gael:Test123@cluster0.zz2na.mongodb.net/blogDB");
    } catch(error) {
      console.log(error);
    }
}
  
main();

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date
    },
    content: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Post", postSchema);