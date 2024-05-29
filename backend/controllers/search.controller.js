const Products = require("../models/product.model");
const { spawn } = require('child_process');

const getContext = async (req, res) => {
    const { search_components } = req.body;
    try {
        if (search_components) {
            const pythonProcess = spawn('python3', ['../AI_process/semantic_seach.py']);

            // Gửi dữ liệu đến stdin của Python process
            pythonProcess.stdin.write(JSON.stringify({ search_components }));
            pythonProcess.stdin.end();

            let result = '';

            // Nhận dữ liệu từ stdout của Python process
            pythonProcess.stdout.on('data', (data) => {
                result += data.toString();
            });

            // Xử lý khi quá trình Python hoàn thành
            pythonProcess.on('close', (code) => {
                if (code !== 0) {
                    res.status(500).json("An error occurred in the Python script");
                } else {
                    const response = JSON.parse(result);
                    res.status(200).json(response);
                }
            });
        } else {
            res.status(403).json("Error");
        }
    } catch (error) {
        res.status(500).json("An error occurred");
    }
};
