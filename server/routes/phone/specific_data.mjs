import express from "express";
import db from "../../db/conn.mjs";
import { Int32, ObjectId } from "mongodb";

const router = express.Router();
const col = "DT_specific_info"



router.get("/", async (req, res) => {
  //   Connect to collection
  let collection = await db.collection(col);
  try {
    //   default (always have!)
      const queryParams = req.query;
      if (Object.keys(queryParams).length === 0) {
        let results = await collection.find().toArray();
        return res.status(200).json(results);
    }

    //   Define query
      let query = {};
    // add Object from queryParams to Query 
        Object.keys(queryParams).forEach(key => {
            // Tạo một đối tượng lọc để thêm vào query
            let filter = {};
            filter[key] = queryParams[key];
            query = { ...query, ...filter };
        });
        
    // Query  
      let results = await collection.find(query).toArray();
  
    //   Check if result exist
      if (results.length === 0) {
        return res.status(404).send('No value matchs your query');
      }

    // Response to front-end
      res.status(200).json(results);

    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Internal Server Error");
    }
});

// to access all the database using _id
router.get("/:id", async (req, res) => {
    try {
    //   default (always have!)
      const id = req.params.id;
      const queryParams = req.query;

    //   Connect to collection
      let collection = await db.collection(col);

    //   Define query
      let query = { pid: Int32(id) };
    // add Object from queryParams to Query 
        Object.keys(queryParams).forEach(key => {
            // Tạo một đối tượng lọc để thêm vào query
            let filter = {};
            filter[key] = queryParams[key];
            query = { ...query, ...filter };
        });
        
    // Query  
      let results = await collection.find(query).toArray();
  
    //   Check if result exist
      if (results.length === 0) {
        return res.status(404).send('No result matchs your query');
      }

    // Response to front-end
      res.status(200).json(results);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Internal Server Error");
    }
  });

export default router;