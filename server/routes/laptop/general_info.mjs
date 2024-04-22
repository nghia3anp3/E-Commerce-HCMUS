import express from "express";
import db from "../../db/conn.mjs";
import Int32 from "mongodb";

const router = express.Router();
const col = "Laptop_general_info"

router.get("/", async (req, res) => {
  let collection = await db.collection(col);
  try {
      const queryParams = req.query;
      if (Object.keys(queryParams).length === 0) {
        let results = await collection.find().toArray();
        return res.status(200).json(results);
        }
      let query = {};
        Object.keys(queryParams).forEach(key => {
            let filter = {};
            filter[key] = queryParams[key];
            query = { ...query, ...filter };
        });
      let results = await collection.find(query).toArray();
      if (results.length === 0) {
        return res.status(404).send('No value matchs your query');
      }
      res.status(200).json(results);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Internal Server Error");
    }
});

router.get("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const queryParams = req.query;
      let collection = await db.collection(col);

    //   Define query
      let query = { id: Int32(id) };
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