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
      console.log("Account: ", account, "Password: ", password)
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
          <div className="pt-20 pb12 lg-py-25 h-auto">
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
                      {/* <!-- Remember me checkbox --> */}
                      <div className="mb-6 flex items-center justify-between">
                        <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                          <input
                            className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                            type="checkbox"
                            value=""
                            id="exampleCheck3"
                            defaultChecked
                          />
                          <label
                            className="inline-block pl-[0.15rem] hover:cursor-pointer"
                            htmlFor="exampleCheck3"
                          >
                            Remember me
                          </label>
                        </div>
        
                        {/* <!-- Forgot password link --> */}
                        <a
                          href="#!"
                          className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                        >
                          Forgot password?
                        </a>
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
        
                      {/* <!-- Social login buttons --> */}
                      <TERipple rippleColor="light" className="w-full">
                        <a
                          className="mb-3 flex w-full items-center justify-center rounded bg-primary px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                          style={{ backgroundColor: "#3b5998" }}
                          href="#!"
                          role="button"
                        >
                          {/* <!-- Facebook --> */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="mr-2 h-3.5 w-3.5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                          </svg>
                          Continue with Facebook
                        </a>
                      </TERipple>
                      <TERipple rippleColor="light" className="w-full">
                        <a
                          className="mb-3 flex w-full items-center justify-center rounded bg-info px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]"
                          style={{ backgroundColor: "#55acee" }}
                          href="#!"
                          role="button"
                        >
                          {/* <!-- Twitter --> */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="mr-2 h-3.5 w-3.5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                          </svg>
                          Continue with Twitter
                        </a>
                      </TERipple>
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
