import React from 'react';
import Logo from '../img/logo.png';
import { AuthContext } from '../context/AuthContext';

class ForgetPassword extends React.Component {
    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            account: '',
            email: '',
            errors: '',
            is_successfull: false
        };
        this.onClickButton = this.onClickButton.bind(this);
    }

    onChangeEmailInput = (event) => {
        this.setState({ email: event.target.value });
    }

    onChangeAccountInput = (event) => {
        this.setState({ account: event.target.value });
    }

    onKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.onClickButton(event);
        }
    }

    onClickButton = async (event) => {
        event.preventDefault();
        const { account, email } = this.state;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let errors = "";
        const { reset_password } = this.context;

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
            const response = await reset_password(account, email);
            this.setState({ is_successfull: true });
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    closeSuccessMessage = () => {
        this.setState({ is_successfull: false });
        window.location.replace("/login");
    }

    render() {
        let { account, email, errors, is_successfull } = this.state;
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
                                onKeyDown={this.onKeyDown}
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
                                onKeyDown={this.onKeyDown}
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
                {is_successfull && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-8 rounded-lg shadow-md text-center">
                            <h2 className="text-2xl font-bold mb-4">Thành công</h2>
                            <p className="mb-4">Mật khẩu đã được đặt lại thành công. Vui lòng kiểm tra email của bạn.</p>
                            <button
                                className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                onClick={this.closeSuccessMessage}
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                )}
            </section>
        );
    }
}

export default ForgetPassword;
