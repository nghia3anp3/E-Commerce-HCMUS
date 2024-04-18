import React from 'react'
import Logo from '../img/logo.png'
import axios from 'axios';

class ForgetPassword extends React.Component {

    state = {
        account: '',
        email : '',
        errors: ""
    }

    onChangeEmailInput = (event) => {
        event.preventDefault();
        this.setState({
            email: event.target.value
        })
    }

    onChangeAccountInput = (event) => {
        event.preventDefault();
        this.setState({
            account : event.target.value
        })
    }

    onKeyDownSentEmail = (event) => {
        if (event.key === 'Enter'){
            this.handleClick();
        }
    }

    onClickButton = async (event) => {
        event.preventDefault()
        const {account, email} = this.state
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let errors = "";
        if (email === ""){
            errors = "Bạn chưa nhập email"
        }
        else if (!emailRegex.test(email))
        {
            errors = "Sai cú pháp email"
        }
        else if(account===""){
            errors = "Bạn chưa nhập email"
        }
        //
        if (Object.keys(errors).length > 0) {
            this.setState({ errors: errors });
        }
        else{
            this.setState({errors: ""})
        }
        try
        {
            console.log("Account: ", account, " Email: ", email)
            const response = await axios.post("http://localhost:8000/forgetPassword",
                                    {
                                        account,
                                        email
                                    })
            if (response.status === 200) {
                console.log("Send request successful - forget password");
                window.location.replace("/login");
            }
        }
        catch(error)
        {
            if (error.response)
            {
                if (error.response.status === 403) {
                    this.setState({errors: "Email không khớp"})
                } 
                else if (error.response.status === 404 && error.response.data === "User not found") {
                    this.setState({errors: "Tài khoản không tồn tại"})
                } 
                else {
                  console.error("Error during login:", error);
                  // Handle other errors (e.g., network issues)
                  this.setState({ errors: "An error occurred" });
                }
              } 
              else {
                console.error("Error during login:", error);
                // Handle other errors (e.g., network issues)
                this.setState({ errors: "An error occurred" });
              }
        }
    }

    render () {
        let {account, email, errors} = this.state
        return(
            <section className='bg-gray-50 dark:bg-gray-900'>
                <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
                    <div>
                        <img className='w-12 h-12 m-2' src = {Logo}/>
                    </div>
                    <div className='w-full p-6 bg-gray-200 rounded-lg shadow md:mt-0 sm:w-[400px]'>
                        <h1 className=' text-4xl font-bold text-black'>Reset Password</h1>
                        <form className='mt-4 space-y-4'>
                            <div className='space-y-2'>
                                <p className='font-bold'>Tài khoản</p>
                                <input 
                                    className='bg-slate-200 border-2 rounded border-black' 
                                    type='text' 
                                    placeholder='Tài khoản' 
                                    value = {account} 
                                    onChange={this.onChangeAccountInput}>
                                </input>
                            </div>
                            <div className='space-y-2'>
                                <p className='font-bold'>Email</p>
                                <input 
                                    className='bg-slate-200 border-2 rounded border-black' 
                                    type='text' 
                                    placeholder='Email' 
                                    value = {email} 
                                    onChange={this.onChangeEmailInput}>
                                </input>
                            </div>
                            <button type = "submit" className='p-2 bg-blue-200 hover:bg-blue-400 rounded border-2 border-black ' onClick={this.onClickButton} onKeyDown={this.onKeyDownSentEmail}>Gửi</button>
                            {errors !== "" &&
                                (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-4 rounded-md">
                                    {errors}
                                </div>
                                )
                            }
                        </form>
                    </div>
                </div>
            </section>
        )
    }
}

export default ForgetPassword