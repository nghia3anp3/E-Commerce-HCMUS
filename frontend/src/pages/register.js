import React from 'react'
import { Navigate  , Link } from 'react-router-dom';
import Logo from '../img/logo.png'
import { AuthContext } from "../context/AuthContext";


class Register extends React.Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      user_id: "",
      account: "",
      email: "",
      password: "",
      confirm_password: "",
      address: "",
      phone: "",
      error: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { account, email, password, confirm_password, address, phone } = this.state;
    const { register } = this.context;
    if (password !== confirm_password) {
      this.setState({ error: "Mật khẩu không giống với nhập lại mật khẩu" }); 
    }
    else {
      try {
        const response = await register(account, email, password, address, phone);
        if (response) {
          this.setState({ error: response }); 
        }
      } catch (error) {
        console.error("An error occurred while registering:", error);
        alert("An error occurred while registering");
      }
    }
  }

  onChangeAccount = (event) => {
    this.setState({
      account: event.target.value
    })
  }

  onChangeEmail = (event) => {
    this.setState({
      email: event.target.value
    })
  }

  onChangePassword = (event) => {
    this.setState({
      password: event.target.value
    })
  }

  onChangeConfirmPassword = (event) => {
    this.setState({
      confirm_password: event.target.value
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

  render() {
    let { account, password, email, confirm_password, address, phone, error } = this.state;
    const { isLoggedIn } = this.context;
    if (isLoggedIn) {
      return <Navigate to="/" replace/>
    }
    return (
      <section className="min-h-screen flex items-center justify-center bg-blue-200">
        <div className="container h-5/6 px-6 py-12">
          <div className="g-6 flex h-2/3 items-center justify-center lg:justify-between">
            <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12 flex justify-center">
              <img src={Logo} className="w-full max-w-xs" alt="Logo" />
            </div>
            <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
              <form onSubmit={this.handleSubmit} className="w-full">
                {/* Error message box */}
                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-4 rounded-md">
                    {error}
                  </div>
                )}
                {/* Other form inputs */}
                <div className="md:flex md:items-center mb-6">
                  <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    type="text"
                    value={account}
                    onChange={(event) => this.onChangeAccount(event)}
                    placeholder="Tài khoản"
                  />
                </div>
                {/* Email */}
                <div className="md:flex md:items-center mb-6">
                  <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    type="text"
                    value={email}
                    onChange={(event) => this.onChangeEmail(event)}
                    placeholder="Email"
                  />
                </div>
                {/* Address */}
                <div className="md:flex md:items-center mb-6">
                  <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    type="text"
                    value={address}
                    onChange={(event) => this.onChangeAddress(event)}
                    placeholder="Địa chỉ"
                  />
                </div>
                {/* Phone number */}
                <div className="md:flex md:items-center mb-6">
                  <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    type="text"
                    value={phone}
                    onChange={(event) => this.onChangePhone(event)}
                    placeholder="Số điện thoại"
                  />
                </div>
                {/* Mật khẩu */}
                <div className="md:flex md:items-center mb-6">
                  <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    type="password"
                    onChange={(event) => this.onChangePassword(event)}
                    value={password}
                    placeholder="Mật khẩu"
                  />
                </div>
                <div className="md:flex md:items-center mb-6">
                  <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    type="password"
                    onChange={(event) => this.onChangeConfirmPassword(event)}
                    value={confirm_password}
                    placeholder="Xác nhận mật khẩu"
                  />
                </div>
                <div className="text-center lg:text-left">
                  <button type="submit"
                    className="inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  >
                    Register
                  </button>
                  <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                    Bạn đã có tài khoản?{" "}
                    <a
                      href="#!"
                      className="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                    >
                      <Link to='/login'>Đăng nhập</Link>
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Register