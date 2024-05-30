import React from 'react';
import Logo from '../img/logo.png';
import axios from 'axios';

class ForgetPassword extends React.Component {
    state = {
        account: '',
        email: '',
        errors: ""
    }

    onChangeEmailInput = (event) => {
        this.setState({
            email: event.target.value
        });
    }

    onChangeAccountInput = (event) => {
        this.setState({
            account: event.target.value
        });
    }

    onKeyDownSentEmail = (event) => {
        if (event.key === 'Enter') {
            this.onClickButton(event);
        }
    }

    onClickButton = async (event) => {
        event.preventDefault();
        const { account, email } = this.state;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let errors = "";

        if (email.trim() === "") {
            errors = "Bạn chưa nhập email";
        } else if (!emailRegex.test(email)) {
            errors = "Sai cú pháp email";
        } else if (account.trim() === "") {
            errors = "Bạn chưa nhập tài khoản";
        }

        if (errors) {
            this.setState({ errors });
            return;
        } else {
            this.setState({ errors: "" });
        }

        try {
            const response = await axios.post("http://localhost:8000/user/account/forgetPassword", { account, email });
            if (response.status === 200) {
                window.location.replace("/changePassword");
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 403) {
                    this.setState({ errors: "Email không khớp" });
                } else if (error.response.status === 404 && error.response.data === "User not found") {
                    this.setState({ errors: "Tài khoản không tồn tại" });
                } else {
                    this.setState({ errors: "An error occurred" });
                }
            } else {
                this.setState({ errors: "An error occurred" });
            }
        }
    }

    render() {
        const { account, email, errors } = this.state;
        return (
            <section className='bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col items-center justify-center'>
                <div className='flex flex-col items-center mb-6'>
                    <img className='w-20 h-20' src={Logo} alt="Logo" />
                    <h1 className='text-4xl font-bold text-gray-900'>Quên mật khẩu</h1>
                </div>
                <div className='bg-white shadow-md rounded-lg p-8 w-full max-w-md'>
                    <form className='space-y-6' onSubmit={this.onClickButton}>
                        <div>
                            <label className='block text-sm font-medium text-gray-700'>Tài khoản</label>
                            <input
                                className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                                type='text'
                                placeholder='Tài khoản'
                                value={account}
                                onChange={this.onChangeAccountInput}
                                onKeyDown={this.onKeyDownSentEmail}
                            />
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-700'>Email</label>
                            <input
                                className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                                type='email'
                                placeholder='Email'
                                value={email}
                                onChange={this.onChangeEmailInput}
                                onKeyDown={this.onKeyDownSentEmail}
                            />
                        </div>
                        <button
                            type='submit'
                            className='w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                        >
                            Gửi
                        </button>
                        {errors && (
                            <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md">
                                {errors}
                            </div>
                        )}
                    </form>
                </div>
            </section>
        );
    }
}

export default ForgetPassword;
