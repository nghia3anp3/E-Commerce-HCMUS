import React from 'react'
import { TEInput, TERipple } from "tw-elements-react";
import axios from "axios"
import { Navigate  , Link } from 'react-router-dom';
import Logo from '../img/logo.png'

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      email: "",
      password: "",
      confirm_password: "",
      error: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { account, email, password, confirm_password } = this.state;
    
    if (password !== confirm_password) {
      this.setState({ error: "Passwords do not match" }); 
    } else {
      try {
        const response = await axios.post("http://localhost:8000/user/register", {
          account,
          password,
          email
        });
        if (response.status === 200) {
          const data = response.data;
          if (data === "exist") {
            alert("User already exists");
          } else if (data === "notexist") {
            window.location.href = '/login';
          } else {
            alert("Unexpected response from server");
          }
        } else {
          console.log("Unexpected response status: " + response.status);
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

  render() {
    let { account, password, email, confirm_password, error } = this.state;
    return (
      <section className="min-h-screen flex items-center justify-center bg-blue-200">
        <div className="container h-5/6 px-6 py-12">
          <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
            <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
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
                <div className="md:flex md:items-center mb-6">
                  <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    type="text"
                    value={email}
                    onChange={(event) => this.onChangeEmail(event)}
                    placeholder="Email"
                  />
                </div>
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
                <div className="mb-6 flex items-center justify-between">
                  <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                    <input
                      className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                      type="checkbox"
                      value=""
                      id="exampleCheck2"
                    />
                    <label
                      className="inline-block pl-[0.15rem] hover:cursor-pointer"
                      htmlFor="exampleCheck2"
                    >
                      Remember me
                    </label>
                  </div>
                  <a href="#!" className="ml-4">Terms and conditions</a>
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