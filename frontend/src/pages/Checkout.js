import React from 'react';
import { Link} from "react-router-dom";
import CartItem from '../components/CartItem';
import { CartContext } from '../context/CartContext';
//image
import { FaPhone } from 'react-icons/fa';
import { OrderContext } from '../context/OrderContext';
import { AuthContext } from '../context/AuthContext';
import { DetailProductContext } from '../context/DetailProductContext';
import { UserContext } from '../context/UserContext';
import { ProductContext } from '../context/ProductContext';
class Checkout extends React.Component {
    state = {
        address: "", 
        email: "", 
        phone: "",
        total: "",
        shipping_method: "Fast Ship",
        ship_fee: 30000,
        success: false,
    }

    onChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    onChangeAddress = (event) => {
        this.setState({
            address: event.target.value
        })
    }


    onChangePhone = (event) => {
        this.setState({
            phone: event.target.value
        })
    }


    onClickFastShip = () => {
        this.setState({
            shipping_method: "Fast Ship",
            ship_fee: 30000
        })
    }

    onClickNormalShip = () => {
        this.setState({
            shipping_method: "Normal Ship",
            ship_fee: 10000
        })
    }


    componentDidMount() {
        // Cuộn lên đầu trang
        window.scrollTo(0, 0);
    }

    onClickSubmit = (user, address, email, phone, total, shipping_method, cartContext, orderContext, detailProductContext, userContext, productContext ) => {
        const new_order_id = orderContext.orders.length
        const new_order = {
            order_id: new_order_id,
            customer_id: user.user_id,
            date: new Date(),
            address: address,
            detail_product_ids: null,
            email: email,
            phone: phone,
            status: "Pending",
            total: total,
            shipping_method: shipping_method,
        }
        orderContext.addOrder(new_order)
        let detail_product_ids = []
        let id = detailProductContext.detailProducts.length
        cartContext.cart.map((item, index) => {
            let new_json_product_i_id = id + index
            let json_product_i = {
                    detail_product_id: new_json_product_i_id,
                    order_id: new_order_id,
                    product_id: item.product_id,
                    type: item.type,
                    quantity: item.amount,
            }
            detailProductContext.addDetailProduct(json_product_i)
            detail_product_ids.push(new_json_product_i_id)
            let product = productContext.findProductById(item.product_id)
            let new_stock_item_qty = product.stock_item_qty - item.amount
            productContext.updateProduct(item.product_id,{...productContext.findProductById(item.product_id),  stock_item_qty: new_stock_item_qty})
        })
        console.log(new_order_id)
        // new_order.detail_product_ids = detail_product_ids
        console.log({...new_order, detail_product_ids: detail_product_ids})
        orderContext.updateOrder(new_order_id, {...new_order, detail_product_ids: detail_product_ids})
        userContext.updateUser(user.user_id, {...user, cart: []})
        this.setState({success: true})
        setTimeout(() => {
            window.location.replace("/");
        }, 3000);
    }

    render (){
        const {address, email, phone, shipping_method, ship_fee, success} = this.state
        // console.log(address, email, phone)

        return (
            <CartContext.Consumer>
                {(cartContext) => (
                    cartContext.itemAmount === 0 ?
                    (
                    <div className="text-center py-20 mt-36">
                        <h2 className="text-2xl font-semibold mb-4">Bạn chưa mua hàng</h2>
                        <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Home</Link>
                    </div>
                    )
                    : 
                    (
                        <div className='mt-40'>
                        <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
                            <div className="px-4 pt-8">
                            <p className="text-xl font-medium">Tóm tắt đơn hàng</p>
                            <p className="text-gray-400">Kiểm tra các mặt hàng của bạn Và lựa chọn phương thức vận chuyển phù hợp.</p>
                            <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
                                {cartContext.cart.map((item, index) => (
                                    <CartItem item={item} key={item.product_id} images = {item.images} />
                                ))}
                            </div>
        
                            <p className="mt-8 text-lg font-medium">Cách thức giao hàng</p>
                            <form className="mt-5 grid gap-6">
                                <div className="relative">
                                <input className="peer hidden" id="radio_1" type="radio" name="radio" defaultChecked />
                                <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                                <label
                                    className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                                    htmlFor="radio_1"
                                    onClick= {this.onClickFastShip}
                                >
                                    <img className="w-14 object-contain" src="/images/naorrAeygcJzX0SyNI4Y0.png" alt="" />
                                    <div className="ml-5">
                                    <span className="mt-2 font-semibold">Giao hàng siêu tốc</span>
                                    <p className="text-slate-500 text-sm leading-6">1-3 ngày</p>
                                    </div>
                                </label>
                                </div>
                                <div className="relative">
                                <input className="peer hidden" id="radio_2" type="radio" name="radio" />
                                <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                                <label
                                    className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                                    htmlFor="radio_2"
                                    onClick={this.onClickNormalShip}
                                >
                                    <img className="w-14 object-contain" src="/images/oG8xsl3xsOkwkMsrLGKM4.png" alt="" />
                                    <div className="ml-5">
                                    <span className="mt-2 font-semibold">Giao hàng bình thường</span>
                                    <p className="text-slate-500 text-sm leading-6">2-4 ngày</p>
                                    </div>
                                </label>
                                </div>
                            </form>
                            </div>
                            <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
                            <p className="text-xl font-medium">Thông tin khách hàng</p>
                            <p className="text-gray-400">Hoàn tất việc đặt hàng bằng cách cung cấp chi tiết thanh toán</p>
                            <div className="">
                                <label htmlFor="email" className="mt-4 mb-2 block text-sm font-medium">
                                Email
                                </label>
                                <div className="relative">
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={this.onChangeEmail}
                                    className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="your.email@gmail.com"
                                />
                                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                    />
                                    </svg>
                                </div>
                                </div>
                                <label htmlFor="card-holder" className="mt-4 mb-2 block text-sm font-medium">
                                Số điện thoại 
                                </label>
                                <div className="relative">
                                <input
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    value = {phone}
                                    onChange={this.onChangePhone}
                                    className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="Số điện thoại"
                                />
                                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                    <FaPhone/>
                                </div>
                                </div>
                                <label htmlFor="card-no" className="mt-4 mb-2 block text-sm font-medium">
                                Địa chỉ
                                </label>
                                <div className="flex">
                                <div className="relative w-full flex-shrink-0">
                                    <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value = {address}
                                    onChange={this.onChangeAddress}
                                    className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="Địa chỉ"
                                    />
                                    <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path d="M12 2L3 9v12h6v-7h6v7h6V9l-9-7zm0 0V9m0 0L4 9" />
                                    </svg>
                                    </div>
                                </div>
                                </div>
                                
                                <div className="mt-6 border-t border-b py-2">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-gray-900">Tiền đơn hàng</p>
                                    <p className="font-semibold text-gray-900">{cartContext.total} VNĐ</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-gray-900">Phí ship</p>
                                    <p className="font-semibold text-gray-900">{this.state.ship_fee} VNĐ</p>
                                </div>
                                </div>
                                <div className="mt-6 flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900">Tổng tiền</p>
                                <p className="text-2xl font-semibold text-gray-900">{(cartContext.total + this.state.ship_fee).toLocaleString()} VNĐ</p>
                                </div>
                            </div>
                            <UserContext.Consumer>
                                {(userContext) => {
                                    return (
                                        <AuthContext.Consumer>
                                            {(authContext) => {
                                                return (
                                                    <CartContext.Consumer>
                                                        {(cartContext) => {
                                                            return (
                                                                <OrderContext.Consumer>
                                                                    {(orderContext) => {
                                                                        return (
                                                                            <DetailProductContext.Consumer>
                                                                                {(detailProductContext) => {
                                                                                    return (
                                                                                        <ProductContext.Consumer>
                                                                                            {(productContext) => {
                                                                                                const user = authContext.user;
                                                                                                const total = cartContext.total + ship_fee;  // Ensure `ship_fee` is defined and accessible

                                                                                                return (
                                                                                                    <button 
                                                                                                        className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
                                                                                                        onClick={() => this.onClickSubmit(user, address, email, phone, total, shipping_method, cartContext, orderContext, detailProductContext, userContext, productContext)}
                                                                                                    >    
                                                                                                    Đặt hàng
                                                                                                    </button>
                                                                                                );
                                                                                            }}
                                                                                        </ProductContext.Consumer>
                                                                                    );
                                                                                }}
                                                                            </DetailProductContext.Consumer>
                                                                        );
                                                                    }}
                                                                </OrderContext.Consumer>
                                                            );
                                                        }}
                                                    </CartContext.Consumer>
                                                );
                                            }}
                                        </AuthContext.Consumer>
                                    );
                                }}
                            </UserContext.Consumer>                       
                            </div>
                        </div>
                        {success && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                <div className="bg-white p-8 rounded shadow-lg text-center">
                                    <h2 className="text-2xl font-semibold mb-4">Đặt hàng thành công!</h2>
                                    <p className="text-gray-700">Cảm ơn bạn đã mua hàng. Bạn sẽ được chuyển hướng về trang chủ.</p>
                                </div>
                            </div>
                        )}

                    </div>
                    )
                )}
                </CartContext.Consumer>
        );
    }
};

export default Checkout;
