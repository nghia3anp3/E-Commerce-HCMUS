const Comments = require("../models/main_comment.model");

const getComments = async (req, res) => {
  try {
    // const comments = await Comments.find({});
    const queryParams = req.query; // JSON data from the request query
    if (Object.keys(queryParams).length == 0) {
      const comments = await Comments.find({});
      return res.status(200).json(comments);
    }
    const filter = {};
    // Iterate over each key in the JSON data
    Object.keys(queryParams).forEach(key => {
        filter[key] = queryParams[key];
    });
    // Fetch comments from the database based on the constructed filter
    const comments = await Comments.find(filter);
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//By /:id + ?key=value
const getCommentByProductID = async (req, res) => {
    try {
        const { product_id } = req.params;
        // console.log("product_id: ",product_id);
        // const comment = await Comments.find({ product_id: product_id });
        //Take after ?    
        const queryParams = req.query; // JSON data from the request query
        if (Object.keys(queryParams).length == 0) {
            const comments = await Comments.find({ product_id });
            return res.status(200).json(comments);
        }
        const filter = { product_id }; // Start with the base filter containing product_id
        
        // Iterate over each key in the JSON data
        Object.keys(queryParams).forEach(key => {
            filter[key] = queryParams[key];
        });
        const comments = await Comments.find(filter);
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Only by /:id because using ? will return a list
const createComment = async (req, res) => {
  try {
    const comment = await Comments.create(req.body);
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateComment = async (req, res) => {
  try {
    const { product_id } = req.params;

    const comment = await Comments.findOneAndUpdate({ product_id: product_id }, req.body);
    if (!comment) {
      return res.status(404).json({ message: "comment not found" });
    }
    const updatedComment = await Comments.find({ product_id: product_id  });
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { product_id } = req.params;

    const comment = await Comments.findOneAndDelete({ product_id: product_id });

    if (!comment) {
      return res.status(404).json({ message: "comment not found" });
    }

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
    getComments,
    getCommentByProductID,
    createComment,
    updateComment,
    deleteComment,
};
