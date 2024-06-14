const Products = require("../models/product.model");
const { spawn } = require('child_process');

const getContext_semantic_search = async (req, res) => {
    try {
      const bodyParams = req.body;
      console.log(bodyParams);//input
      try {
        if (bodyParams) {
          const options = {
            cwd : __dirname
          };
          var spawn = require("child_process").spawn;
          const fs = require('fs');
          fs.writeFileSync("./handle_txt/input_query.txt", bodyParams.comments);
          var active_noti = "1";
          const currentDirectory = __dirname;
          console.log('Current Directory:', currentDirectory);  
          var process = spawn('python',["../../AI_process/semantic_search.py", active_noti], options);    
              
          process.on('exit', function (code) {
            const data = fs.readFileSync('./handle_txt/output_query.txt', 'utf8');
            console.log("New data: ", data);
            const parsedData = data.split('\n').map(line => {
              try {
                  return JSON.parse(line);
              } catch (e) {
                  return null;
              }
              }).filter(item => item !== null);
              const ids = parsedData.map(item => ({ _id: item._id }));
              console.log(ids)
              res.status(200).json(ids);
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

// const getContext_semantic_search = async (req, res) => {
//     const { search_components } = req.body;
//     try {
//         if (search_components) {
//             const pythonProcess = spawn('python3', ['../AI_process/semantic_seach.py']);

//             // Gửi dữ liệu đến stdin của Python process
//             pythonProcess.stdin.write(JSON.stringify({ search_components }));
//             pythonProcess.stdin.end();

//             let result = '';

//             // Nhận dữ liệu từ stdout của Python process
//             pythonProcess.stdout.on('data', (data) => {
//                 result += data.toString();
//             });

//             // Xử lý khi quá trình Python hoàn thành
//             pythonProcess.on('close', (code) => {
//                 if (code !== 0) {
//                     res.status(500).json("An error occurred in the Python script");
//                 } else {
//                     const response = JSON.parse(result);
//                     res.status(200).json(response);
//                 }
//             });
//         } else {
//             res.status(403).json("Error");
//         }
//     } catch (error) {
//         res.status(500).json("An error occurred");
//     }
// };

module.exports = {
    getContext_semantic_search
};
