import React from 'react';
import Logo from '../img/logo.png';
import { AuthContext } from '../context/AuthContext';

class ChangePassword extends React.Component {

    static contextType = AuthContext;

    state = {
        password: "",
        new_password: "",
        confirm_newpassword: "",
        is_successfull: false,
        errors: "",
    }

    onChangePassword = (event) => {
        this.setState({ password: event.target.value });
    }

    onChangeNewPassword = (event) => {
        this.setState({ new_password: event.target.value });
    }

    onChangeConfirmNewPassword = (event) => {
        this.setState({ confirm_newpassword: event.target.value });
    }

    onKeyDownSubmit = (event) => {
        if (event.key === 'Enter') {
            this.handleClick();
        }
    }

    onClickChangePassword = async (event) => {
        event.preventDefault();
        let { password, new_password, confirm_newpassword, errors } = this.state;
        if (password.trim() === "" || new_password.trim() === "" || confirm_newpassword.trim() === "") {
            errors = "Không được bỏ trống thông tin";
            this.setState({ errors: errors });
            return;
        }

        if (new_password !== confirm_newpassword) {
            errors = "Mật khẩu mới và xác nhận mật khẩu không khớp";
            this.setState({ errors: errors });
            return;
        }
        this.setState({ errors: "" });
        const {user, change_password } = this.context;
        const account = user.account
        try {
            const response = await change_password(account, password, new_password, confirm_newpassword)
            if (response){
                this.setState({errors: response})
            }
            else{
                this.setState({is_successfull: true})
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    closeSuccessMessage = () => {
        this.setState({ is_successfull: false });
        window.location.replace("/");
    }

    render() {
        let { errors, is_successfull } = this.state;
        return (
            <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
                {is_successfull ? (
                    <div className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md max-w-md'>
                        <span>Mật khẩu đã được thay đổi thành công!</span>
                        <div className='mt-4 flex justify-center'>
                            <button
                                className='py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                onClick={this.closeSuccessMessage}
                            >
                                OK
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className='flex flex-col items-center mb-6'>
                            <img className='w-20 h-20' src={Logo} alt="Logo" />
                            <h1 className='text-4xl font-bold text-gray-900'>Đổi mật khẩu</h1>
                        </div>
                        <div className='bg-white shadow-md rounded-lg p-8 w-full max-w-md'>
                            <div className='space-y-6'>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700'>Mật khẩu cũ</label>
                                    <input
                                        className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                                        type='password'
                                        placeholder='Mật khẩu cũ'
                                        onChange={this.onChangePassword}
                                    />
                                </div>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700'>Mật khẩu mới</label>
                                    <input
                                        className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                                        type='password'
                                        placeholder='Mật khẩu mới'
                                        onChange={this.onChangeNewPassword}
                                    />
                                </div>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700'>Xác nhận mật khẩu mới</label>
                                    <input
                                        className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                                        type='password'
                                        placeholder='Xác nhận mật khẩu mới'
                                        onChange={this.onChangeConfirmNewPassword}
                                    />
                                </div>
                                {errors && (
                                    <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md">
                                        {errors}
                                    </div>
                                )}
                                <div className='flex justify-center'>
                                    <button
                                        type='submit'
                                        className='w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                        onClick={this.onClickChangePassword}
                                        onKeyDown={this.onKeyDownSubmit}
                                    >
                                        Xác nhận
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        );
    }
}

export default ChangePassword;
