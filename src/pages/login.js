import React, { useState } from "react";
import {TERipple } from "tw-elements-react";
import LoginLogo from '../img/login_logo2.webp'
import { Link } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash  } from "react-icons/fa";
import axios from "axios";

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      password: "",
      show_password: false,
      errors: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.handleClick();
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { account, password } = this.state;
    let errors = {};
    if (account.trim() === "" || password.trim() === "") {
      errors = "Tài khoản hoặc mật khẩu không được bỏ trống";
    }
    if (Object.keys(errors).length > 0) {
      // If there are errors, update state and return
      this.setState({ errors });
      return;
    }
  
    try {
      // console.log("Account: ", account, "Password: ", password)
      const response = await axios.post("http://localhost:8000/login", {
        account,
        password,
      });
      if (response.status === 200) {
        console.log("Login successful");
        // Perform actions upon successful login (e.g., redirect user)
        const { token } = response.data; // Assuming the token is returned from the server
        // Store the token in localStorage or sessionStorage
        localStorage.setItem("token", token);
        window.location.replace("/");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401 && error.response.data === "Invalid credentials") {
          console.log("Unauthorized: Incorrect credentials");
          this.setState({ errors: "Sai mật khẩu hoặc tài khoản" });
        } else if (error.response.status === 404 && error.response.data === "User not found") {
          console.log("User not found");
          this.setState({ errors: "Tài khoản không tồn tại" });
        } else {
          console.error("Error during login:", error);
          // Handle other errors (e.g., network issues)
          this.setState({ errors: "An error occurred" });
        }
      } else {
        console.error("Error during login:", error);
        // Handle other errors (e.g., network issues)
        this.setState({ errors: "An error occurred" });
      }
    }
  };  

    onChangeAccount = (event) => {
      this.setState({
        account: event.target.value
      })
    }

    onChangePassword = (event) => {
      this.setState({
        password: event.target.value
      })
    }

    togglePasswordVisibility = (event) => {
      event.preventDefault();
      this.setState(prevState => ({
        showPassword: !prevState.showPassword
      }));
    }


    render () {
      let {account, password, showPassword, errors} = this.state
        return (
          <div className="pt-20 pb-12 lg-py-25 h-auto">
            <section className="h-fit">
              <div className="container h-5/6 px-6 py-12">
                <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
                  {/* <!-- Left column container with background--> */}
                  <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
                    <img
                      src= {LoginLogo}
                      className="w-2/3 h-auto ml-8"
                      alt="Login Logo"
                    />
                  </div>
        
                  {/* <!-- Right column container with form --> */}
                  <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
                    <form onSubmit={this.handleSubmit}>
                      {/* Error message box */}
                      {errors && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-4 rounded-md">
                          {errors}
                        </div>
                      )}
                    <div class="md:flex md:items-center mb-6">
                          <input className="bg-gray-200 appearance-none border-2
                           border-gray-200 rounded w-full py-2 px-4
                            text-gray-700 leading-tight focus:outline-none
                             focus:bg-white focus:border-purple-500" 
                             type="text"
                             onChange={(event) => this.onChangeAccount(event)}
                             value={account}
                          placeholder="Tài khoản"/>
                      </div>
                      {/* <!--Password input--> */}
                      <div className="md:flex md:items-center mb-6">
                      <input 
                        className="bg-gray-200 appearance-none border-none rounded-l w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 "
                        type={showPassword ? "text" : "password"}
                        onChange={(event) => this.onChangePassword(event)}
                        value={password}
                        placeholder="Mật khẩu"
                      />
                      <button
                        type="button"
                        className="rounded-r bg-gray-200 py-3 px-4 cursor-pointer border-2 border-gray-200"
                        onClick={this.togglePasswordVisibility}
                      >
                        {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                      </button>
                    </div>
                      {/* <!-- Change password --> */}
                      <div className="mb-6 flex items-center justify-between">
                        <div className="mb-[0.125rem] block min-h-[1.5rem]">
                          <Link
                            className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                            to = {'/change_password'}
                          >
                            Đổi mật khẩu
                          </Link>
                        </div>
        
                        {/* <!-- Forgot password link --> */}
                        <Link
                          to = {'/forgetPassword'}
                          className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                        >
                          Quên mật khẩu?
                        </Link>
                      </div>
        
                      {/* <!-- Submit button --> */}
      
                      <button type="submit"
                        className="inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                        onKeyDown={this.handleKeyDown}
                      >
                        Sign in
                      </button>
        
                      {/* <!-- Divider --> */}
                      <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                        <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                          OR
                        </p>
                      </div>
                      <div className="items-center justify-center">
                        Bạn chưa có tài khoản. 
                        <Link to = {'/register'} className={`m-2 px-4 py-2 rounded-md text-white bg-gray-500`}>Đăng kí</Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </div>
        );  
    }
}

export default Login;
