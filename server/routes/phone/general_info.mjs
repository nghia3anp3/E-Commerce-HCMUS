import express from "express";
import db from "../../db/conn.mjs";
import Int32 from "mongodb";

const router = express.Router();
const col = "DT_general_info"

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

      let query = { id: Int32(id) };

        Object.keys(queryParams).forEach(key => {
            let filter = {};
            filter[key] = queryParams[key];
            query = { ...query, ...filter };
        });
        
      let results = await collection.find(query).toArray();
  
      if (results.length === 0) {
        return res.status(404).send('No result matchs your query');
      }

      res.status(200).json(results);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Internal Server Error");
    }
  });

export default router;