const SubComments = require("../models/sub_comment.model");

const getSubComments = async (req, res) => {
  try {
    // const comments = await Comments.find({});
    const queryParams = req.query; // JSON data from the request query
    if (Object.keys(queryParams).length == 0) {
      const subcomments = await SubComments.find({});
      return res.status(200).json(subcomments);
    }
    const filter = {};
    // Iterate over each key in the JSON data
    Object.keys(queryParams).forEach(key => {
        filter[key] = queryParams[key];
    });
    // Fetch comments from the database based on the constructed filter
    const subcomments = await SubComments.find(filter);
    res.json(subcomments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//By /:id + ?key=value
const getSubcommentbyID = async (req, res) => {
    try {
        const { sub_comment_id } = req.params;
        // console.log("product_id: ",product_id);
        // const comment = await Comments.find({ product_id: product_id });
        //Take after ?    
        const queryParams = req.query; // JSON data from the request query
        if (Object.keys(queryParams).length == 0) {
            const subcomments = await SubComments.find({ product_id });
            return res.status(200).json(subcomments);
        }
        const filter = { sub_comment_id }; // Start with the base filter containing product_id
        
        // Iterate over each key in the JSON data
        Object.keys(queryParams).forEach(key => {
            filter[key] = queryParams[key];
        });
        const subcomments = await SubComments.find(filter);
        res.status(200).json(subcomments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Only by /:id because using ? will return a list
const createSubcomment = async (req, res) => {
  try {
    const subcomment = await SubComments.create(req.body);
    res.status(200).json(subcomment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateSubcomment = async (req, res) => {
  try {
    const { sub_comment_id } = req.params;

    const subcomment = await SubComments.findOneAndUpdate({ sub_comment_id: sub_comment_id }, req.body);
    if (!subcomment) {
      return res.status(404).json({ message: "comment not found" });
    }
    const updatedsubcomment = await SubComments.find({ sub_comment_id: sub_comment_id  });
    res.status(200).json(updatedsubcomment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteSubcomment = async (req, res) => {
  try {
    const { sub_comment_id } = req.params;

    const subcomment = await SubComments.findOneAndDelete({ sub_comment_id: sub_comment_id });

    if (!subcomment) {
      return res.status(404).json({ message: "comment not found" });
    }

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
    getSubComments,
    getSubcommentbyID,
    createSubcomment,
    updateSubcomment,
    deleteSubcomment,
};
