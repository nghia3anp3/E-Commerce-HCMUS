const Specific_Info = require("../../models/phone/specific_data.model");

const getData = async (req, res) => {
    try {
      // const comments = await Comments.find({});
      const queryParams = req.query; // JSON data from the request query
      if (Object.keys(queryParams).length == 0) {
        const comments = await Specific_Info.find({});
        return res.status(200).json(comments);
      }
      const filter = {};
      // Iterate over each key in the JSON data
      Object.keys(queryParams).forEach(key => {
          filter[key] = queryParams[key];
      });
      // Fetch comments from the database based on the constructed filter
      const comments = await Specific_Info.find(filter);
      res.json(comments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

//By /:id + ?key=value
const getDataByID = async (req, res) => {
    try {
        const { product_id } = req.params;
        // console.log("product_id: ",product_id);
        // const comment = await Comments.find({ product_id: product_id });
        //Take after ?    
        const queryParams = req.query; // JSON data from the request query
        if (Object.keys(queryParams).length == 0) {
            const comments = await Specific_Info.find({ product_id });
            return res.status(200).json(comments);
        }
        const filter = { product_id }; // Start with the base filter containing product_id
        
        // Iterate over each key in the JSON data
        Object.keys(queryParams).forEach(key => {
            filter[key] = queryParams[key];
        });
        const comments = await Specific_Info.find(filter);
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getData,
    getDataByID,
};