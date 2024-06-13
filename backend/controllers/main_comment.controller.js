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
    const queryParams = req.query;
    if (Object.keys(req.body).length === 0) {
      const updateResult = await Comments.updateMany(
        { product_id: product_id },
        { $set: req.body },
        { new: true }
      );
      // Fetch updated comments
      const updatedComments = await Comments.find({ product_id: product_id });
      return res.status(200).json(updatedComments);
    }
    // Create filter with product_id
    const filter = { product_id };
    // Add query parameters to filter if they exist
    Object.keys(queryParams).forEach(key => {
      filter[key] = queryParams[key];
    });
    // Update multiple comments based on filter
    const updateResult = await Comments.updateMany(
      filter,
      { $set: req.body },
      { new: true }
    );
    if (updateResult.matchedCount === 0) {
      return res.status(404).json({ message: "No comments found matching the criteria" });
    }
    // Fetch updated comments
    const updatedComments = await Comments.find(filter);
    res.status(200).json(updatedComments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { product_id } = req.params;
    const queryParams = req.query;
    // Create filter with product_id
    const filter = { product_id };
    // Add query parameters to filter if they exist
    Object.keys(queryParams).forEach(key => {
      filter[key] = queryParams[key];
    });
    // Delete multiple comments based on filter
    const deleteResult = await Comments.deleteMany(filter);
    if (deleteResult.deletedCount === 0) {
      return res.status(404).json({ message: "No comments found matching the criteria" });
    }
    res.status(200).json({ message: "Comments deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getReplyComments = async (req, res) => {
  try {
    const bodyParams = req.body;
    console.log(bodyParams);//input
    try {
      if (bodyParams) {
        const options = {
          cwd : __dirname
        };
        var spawn = require("child_process").spawn;
        //Write comments to txt
        const fs = require('fs');
        fs.writeFileSync("./handle_txt/input_comment.txt", bodyParams.comments);
        //Send notify to python file
        var active_noti = "1";  
        var process = spawn('python',["../../AI_process/sentiment_analysis.py", active_noti], options);        
        process.stdout.on('data', function (chunk) {
          const data = fs.readFileSync('./handle_txt/output_comment.txt', 'utf8');
          console.log("New comment: ", data);
          // Split the content by lines
          const lines = data.split('\n');
          // Get the first line (Positive/Negative)
          const sentiment = lines[0].trim();
          // Get the rest of the content as the comment
          const comment = lines.slice(1).join('\n').trim();
          const replyComment = {
            sentiment: sentiment,
            message:comment
          };
          res.status(200).json(replyComment);
        });
      } else {
          res.status(403).json("Error");
      }
    } catch (error) {
        console.log(error);
        res.status(500).json("An error occurred");
    }
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
    getReplyComments,
};
