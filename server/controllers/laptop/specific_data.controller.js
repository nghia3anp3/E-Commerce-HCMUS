const Specific_Info = require("../../models/laptop/specific_data.model");

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

// router.get("/", async (req, res) => {
//     //   Connect to collection
//     let collection = await db.collection(col);
//     try {
//       //   default (always have!)
//         const queryParams = req.query;
//         if (Object.keys(queryParams).length === 0) {
//           let results = await collection.find().toArray();
//           return res.status(200).json(results);
//           }
  
//       //   Define query
//         let query = {};
//       // add Object from queryParams to Query 
//           Object.keys(queryParams).forEach(key => {
//               // Tạo một đối tượng lọc để thêm vào query
//               let filter = {};
//               filter[key] = queryParams[key];
//               query = { ...query, ...filter };
//           });
          
//       // Query  
//         let results = await collection.find(query).toArray();
    
//       //   Check if result exist
//         if (results.length === 0) {
//           return res.status(404).send('No value matchs your query');
//         }
  
//       // Response to front-end
//         res.status(200).json(results);
  
//       } catch (error) {
//         console.error("Error:", error);
//         res.status(500).send("Internal Server Error");
//       }
//   });
  
//   // to access all the database using _id
//   router.get("/:id", async (req, res) => {
//       try {
//       //   default (always have!)
//         const id = req.params.id;
//         const queryParams = req.query;
  
//       //   Connect to collection
//         let collection = await db.collection(col);
  
//       //   Define query
//         let query = { pid: Int32(id) };
//       // add Object from queryParams to Query 
//           Object.keys(queryParams).forEach(key => {
//               // Tạo một đối tượng lọc để thêm vào query
//               let filter = {};
//               filter[key] = queryParams[key];
//               query = { ...query, ...filter };
//           });
          
//       // Query  
//         let results = await collection.find(query).toArray();
    
//       //   Check if result exist
//         if (results.length === 0) {
//           return res.status(404).send('No result matchs your query');
//         }
  
//       // Response to front-end
//         res.status(200).json(results);
//       } catch (error) {
//         console.error("Error:", error);
//         res.status(500).send("Internal Server Error");
//       }
//     });
  
//   export default router;