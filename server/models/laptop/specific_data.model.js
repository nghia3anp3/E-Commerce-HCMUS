const mongoose = require("mongoose");

// Define main comment schema
const Specific_Info_Schema = mongoose.Schema({
    pid: Number,
    audio_technology: String,
    bluetooth: String,
    brand: String, 
    brand_country: String,
    camera: String,
    card_mang_hinh: String,
    cong_ket_noi: String,
    cpu: String,
    display_type: String,
    dung_luong_dientu: String,
    ket_noi_khong_day_khac: String,
    loai_pin:String,
    loai_ram: String,
    origin: String,
    product_weight: String,
    ram: String,
    system_requirements: String,
    wifi: String,
    is_warranty_applied: String,
    warranty_form: String,
    warranty_time_period: Number,
    resolution: String,
    chip_set: String,
  },
  {
    Timestamp: true,
  }
  );
  const Specific_Info = mongoose.model('laptop_specific_infos', Specific_Info_Schema);
  module.exports = Specific_Info;