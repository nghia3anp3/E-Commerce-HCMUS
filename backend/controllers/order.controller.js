const Orders = require("../models/order.model");
const Detail_products = require("../models/detail_product.model")
const Product = require("../models/product.model")
const nodemailer =  require('nodemailer');
require('dotenv').config();


const getAll = async (req, res) => {
  try {
    // const comments = await Comments.find({});
    const queryParams = req.query; // JSON data from the request query
    if (Object.keys(queryParams).length == 0) {
      const orders = await Orders.find({});
      return res.status(200).json(orders);
    }
    const filter = {};
    // Iterate over each key in the JSON data
    Object.keys(queryParams).forEach(key => {
        filter[key] = queryParams[key];
    });
    // Fetch comments from the database based on the constructed filter
    const orders = await Orders.find(filter);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getbyID = async (req, res) => {
  try {
    const { order_id } = req.params;
    //Take after ?    
    const queryParams = req.query; // JSON data from the request query
    if (Object.keys(queryParams).length == 0) {
        const order = await Orders.find({ order_id });
        return res.status(200).json(order);
    }
    const filter = { order_id }; // Start with the base filter containing order_id
    
    // Iterate over each key in the JSON data
    Object.keys(queryParams).forEach(key => {
        filter[key] = queryParams[key];
    });
    const order = await Orders.find(filter);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createOrder = async (req, res) => {
  try {
    const order = await Orders.create(req.body);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { order_id } = req.params;
    const order = await Orders.findOneAndUpdate({ order_id: order_id }, req.body);

    if (!order) {
      return res.status(404).json({ message: "order not found" });
    }

    const updatedorder = await Orders.find({ order_id: order_id  });
    const email = updatedorder[0].email
    const status = updatedorder[0].status
    const detail_product_ids = updatedorder[0].detail_product_ids
    let list_products_name = []
    let list_products_price = []
    let list_detail_products = [];
    for (let i = 0; i < detail_product_ids.length; i++) {
        let detail_product_info = await Detail_products.findOne({ order_id: order_id, detail_product_id: detail_product_ids[i] });
        let product = await Product.findOne({product_id: detail_product_info.product_id})
        let name = product.name
        let price = product.price.toLocaleString()
        list_detail_products.push(detail_product_info);
        list_products_price.push(price)
        list_products_name.push(name)
    }
    res.status(200).json(updatedorder);

    // Gửi mail
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
          user: process.env.EMAIL_ADDRESS,
          pass: process.env.EMAIL_PASSWORD
      }
    });

    // Tạo nội dung HTML cho email
    let pending_Content = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Details</title>
    </head>
    <body>
        <h2>Thông tin đơn hàng</h2>
        <p><strong>Mã đơn hàng:</strong> ${updatedorder[0].order_id}</p>
        <p><strong>Ngày đặt hàng:</strong> ${updatedorder[0].date}</p>
        <p><strong>Địa chỉ nhận hàng:</strong> ${updatedorder[0].address}</p>
        <p><strong>Phương thức vận chuyển:</strong> ${updatedorder[0].shipping_method}</p>
        <p><strong>Tổng tiền:</strong> ${updatedorder[0].total.toLocaleString()} đồng</p>
        <p><strong>Trạng thái:</strong> ${updatedorder[0].status}</p>

        <h2>Thông tin sản phẩm</h2>
        <table border="1">
            <thead>
                <tr>
                    <th>Mã sản phẩm</th>
                    <th>Tên sản phẩm</th>
                    <th>Giá tiền sản phẩm</th>
                    <th>Số lượng</th>
                </tr>
            </thead>
            <tbody>
                ${list_detail_products.map((product, index) => `
                    <tr>
                        <td>${product.product_id}</td>
                        <td>${list_products_name[index]}</td>
                        <td>${list_products_price[index]} đồng</td>
                        <td>${product.quantity}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>

        <h2>Liên hệ</h2>
        <p><strong>Email:</strong> ${process.env.EMAIL_ADDRESS}</p>
    </body>
    </html>
    `;

    let approved_content = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #fff;">
    <h2 style="color: #333;">Thông Báo Đơn Hàng</h2>
    <p>Xin chào,</p>
    <p>Chúng tôi xin trân trọng thông báo rằng đơn hàng với mã số ${updatedorder[0].order_id} của bạn đã được chấp thuận và đang được gửi đi.</p>
    </div>
    `

    let declined_content = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #fff;">
    <h2 style="color: #333;">Thông Báo Đơn Hàng</h2>
    <p>Xin chào,</p>
    <p>Chúng tôi xin trân trọng thông báo rằng đơn hàng với mã số ${updatedorder[0].order_id} của bạn đã được bị từ chối vì vi phạm quy định.</p>
    <p>Nếu bạn có bất kỳ thắc mắc nào, vui lòng <a href="mailto:${process.env.EMAIL_ADDRESS}" style="color: #007bff;">liên hệ với chúng tôi</a>.</p>
    </div>
    `
    let htmlContent
    if (status === "Approved"){
      htmlContent = approved_content
    }
    else if (status === "Declined"){
      htmlContent = declined_content
    }
    else{
      htmlContent = pending_Content
    }

    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: email,
        subject: 'Thông tin đơn hàng',
        text: "",
        html: htmlContent
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

const deleteOrder = async (req, res) => {
  try {
    const { order_id } = req.params;

    const order = await Orders.findOneAndDelete({ order_id: order_id });

    if (!order) {
      return res.status(404).json({ message: "order not found" });
    }
    res.status(200).json({ message: "order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAll,
  getbyID,
  createOrder,
  updateOrder,
  deleteOrder,
};
