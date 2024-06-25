const Products = require("../models/product.model");
const { spawn } = require('child_process');
const fs = require('fs');
const multer = require('multer');
const uploadSearch = multer({ dest: 'uploads/' });

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
          fs.writeFileSync("./handle_txt/input_query.txt", bodyParams.comments);
          var active_noti = "1";
          const currentDirectory = __dirname;
          console.log('Current Directory:', currentDirectory);  
          var process = spawn('python',["../../AI_process/semantic_search.py", active_noti], options);    
          process.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });
          process.on('exit', function (code) {
            const data = fs.readFileSync('./handle_txt/output_query.txt', 'utf8');
            // console.log("New data: ", data);
            const parsedData = data.split('\n').map(line => {
              try {
                  return JSON.parse(line);
              } catch (e) {
                  return null;
              }
              }).filter(item => item !== null);
              // console.log(parsedData)
              const ids = parsedData.map(item => ({ product_id: item.product_id }));
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


  const getContext_image_search = async (req, res) => {
    try {
        // Define the path where the image will be saved
        const imageData = req.file.path;
        if (!imageData) {
          return res.status(400).json({ error: 'No file uploaded' });
        }
        console.log(imageData)
        const ImageBinary = fs.readFileSync(imageData)
        fs.unlinkSync(req.file.path);
        // const imagePath = "D:/LHH/E-Commerce-HCMUS/backend/handle_txt/input_image.jpg";
        const imagePath = "../frontend/src/img/input_image.jpg";
        console.log('Image path:', imagePath);
  
        // Write the binary data to a file using async/await
        await fs.promises.writeFile(imagePath, ImageBinary);
        console.log('Image saved successfully.');
        // Call Python script to process the image
        const pythonScriptPath = "../../AI_process/image_search.py";
        const process = spawn('python', [pythonScriptPath, imagePath], { cwd: __dirname });
  
        process.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });
  
        process.on('exit', async (code) => {
            console.log('Python process exited with code:', code); // Log Python process exit code
  
            try {
                const outputFilePath = "./handle_txt/output_image.txt";
                const data = await fs.promises.readFile(outputFilePath, 'utf8');
                console.log('Read data from output file:', data);
  
                const parsedData = data.split('\n').map(line => {
                    try {
                        return JSON.parse(line);
                    } catch (e) {
                        return null;
                    }
                }).filter(item => item !== null);
  
                const ids = parsedData.map(item => ({ product_id: item.product_id }));
                console.log('Parsed IDs:', ids);
  
                res.status(200).json(ids);
            } catch (error) {
                console.error('Error reading or parsing output file:', error);
                res.status(501).json({ error: 'Error reading or parsing output file' });
            }
        });
  
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'An error occurred' });
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
    getContext_semantic_search, getContext_image_search, uploadSearch
};
