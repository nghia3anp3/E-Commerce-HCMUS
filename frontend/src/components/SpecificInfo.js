import React from 'react';
import { BsCheck } from "react-icons/bs";

class SpecificInfo extends React.Component {

    state = {
        dict_specific_info : {
            battery_capacity: "Dung lượng pin",
            audio_technology: "Công nghệ âm thanh",
            bluetooth: "Bluetooth",
            bo_nho_do_hoa: "Bộ nhớ đồ họa",
            brand: "Hãng sản xuất",
            brand_country: "Hãng quốc gia",
            bus: "Bus dữ liệu",
            camera: "Camera",
            card_mang_hinh: "Card màn hình",
            card_reader: "Đầu đọc card",
            cong_ket_noi: "Cổng kết nối",
            cpu: "Cpu",
            display_type: "Độ phân giải",
            dung_luong_dientu: "Dung lượng ổ cứng",
            giao_tiep_mang: "Cách thức kết nối mạng",
            item_model_number: "Model number",
            ket_noi_khong_day_khac: "Kết nối không dây khác",
            loai_o_dia: "Loại ổ đĩa",
            loai_pin: "Loại pin",
            loai_ram: "Loại ram",
            network_internet: "Chuẩn kết nối modem mạng",
            origin: "Xuất xứ",
            product_weight: "Trọng lượng",
            ram: "Ram",
            chuc_nang_khac: "Chức năng khác",
            o_dia_quang: "Ổ đĩa quang",
            camera_truoc: "Camera trước",
            camera_sau: "Camera sau",
            chip_do_hoa: "Chip đồ họa",
            den_flash: "Đèn flash",
            dimensions: "Kích thước",
            ho_tro_5g: "Hỗ trợ 5g",
            included_accessories: "Bao gồm phụ kiện",
            khe_sim: "Khe sim",
            loai_sim: "Loại sim",
            material: "Nguyên liệu",
            port_sac: "Cổng sạc",
            screen_size: "Kích thước màn hình",
            wifi: "Wifi",
            is_warranty_applied: "Bảo hành",
            vat_taxable: "Thuế VAT",
            warranty_form: "Loại bảo hành",
            warranty_time_period: "Thời gian bảo hành",
            cart_slot: "Bộ nhớ rời",
            chip_set: "Chip xử lý",
            cpu_speed: "Tốc độ cpu",
            ho_tro_4g: "Hỗ trợ 4g",
            jack_headphone: "Lỗ cắm tai nghe jack",
            resolution: "Độ phân giải",
            thiet_ke_card: "Thiết kế card",
            noi_san_xuat: "Nơi sản suất",
            rom: "Rom",
            gpt: "GPS",
            quay_phim: "Quay phim",
            the_ngoai_toi_da: "Thẻ nhớ ngoài tối đa",
            tinh_nang_camera: "Tính năng camera",
            bang_tan_2g: "Băng tần 2g",
            bang_tan_3g: "Băng tần 3g",
            connect_nfc: "Chuẩn kết nối không dây trong phạm vi tầm ngắn",
            fm_radio: "Radio",
            kha_dung: "Bộ nhớ khả dụng",
            nghe_nhac: "Nghe nhạc",
            pin_co_the_thao_roi: "Pin có thể tháo rời",
            video_call: "Video call",
            xem_phim: "Xem phim",
            ghi_am: "Ghi âm",
            connect_khac: "Kết nối khác",
            battery_life: "Tuổi thọ pin",
            charge_time: "Thời gian sạc",
            content_formats_supported: "none",
            manufacturer_electronics: "Nhà sản xuất",
            usb_port: "Cổng usb",
            display_color: "Dãy màu",
            luu_y: "Lưu ý",
            part_number: "none",
            seller_delivery_method: "none",
            Organization_name: "Hãng",
            Organization_address: "none",
            service_highlight_2: "none",
            service_highlight_3: "none",
            }
    }

    formatInfo = (info) => {
        info = info.replace(/'/g, '"');
        return JSON.parse(info);
      };
    
      renderItem = (info) => {
        if (Array.isArray(info)) {
          return (
            <div className='flex flex-col'>
              {info.map((item, index) => (
                <div key={index} className='flex items-center gap-2'>
                  <BsCheck className='text-blue-500 w-6 h-6' />
                  <p className='text-gray-700'>{item}</p>
                </div>
              ))}
            </div>
          );
        } else {
          return (
            <p className='text-gray-700'>{info}</p>
          );
        }
      };
    
      render() {
        let { dict_specific_info } = this.state;
        let { specificProduct, isError } = this.props;
        specificProduct = specificProduct.slice(0, -3);
        return (
          <div className='mt-6'>
            <h1 className='text-2xl font-bold mb-4'>Thông tin chi tiết</h1>
            {isError ? 
            (
              <div className='=space-y-4'>
                Thông tin đang được cập nhật
              </div>
            )
          : 
          (<div className='space-y-4'>
            {specificProduct.map((item) => (
              <div key={item[0]} className='flex items-start gap-4 border-b-2 border-gray-200 pb-2'>
                <p className='font-medium w-40 text-gray-800'>{dict_specific_info[item[0]]}</p>
                <div className='flex-1'>
                  {this.renderItem(item[1])}
                </div>
              </div>
            ))}
          </div>)}
          </div>
        );
      }
    }

export default SpecificInfo;