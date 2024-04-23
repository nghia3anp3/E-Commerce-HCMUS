const mongoose = require("mongoose");

// Define main comment schema
const Specific_Info_Schema = mongoose.Schema({
    pid: Number,
    battery_capacity: String,
    bluetooth: String,
    brand: String, 
    brand_country: String,
    camera_sau: String,
    camera_truoc: String,
    chip_do_hoa: String,
    chuc_nang_khac: String,
    den_flash: String,
    dimensions: String,
    display_type: String,
    ho_tro_5g:String,
    included_accessories: String,
    item_model_number: String,
    khe_sim: Number,
    loai_pin: String,
    loai_sim: String,
    material: String,
    origin: String,
    port_sac: String,
    screen_size: String,
    wifi: String,
    is_warranty_applied: String,
  },
  {
    Timestamp: true,
  }
  );
  const Specific_Info = mongoose.model('dt_specific_infos', Specific_Info_Schema);
  module.exports = Specific_Info;