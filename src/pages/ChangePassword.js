import React from 'react'
import Logo from '../img/logo.png'
import axios from 'axios'

class ChangePassword extends React.Component {

    state = {
        account: "",
        password: "",
        new_password: "",
        confirm_newpassword: "",
        errors: "",
    }


    onChangeAccount = (event) => {
        this.setState({account: event.target.value})
    }

    onChangePassword = (event) => {
        this.setState({password: event.target.value})
    }

    onChangeNewPassword = (event) => {
        this.setState({new_password: event.target.value})
    }

    onChangeConfirmNewPassword = (event) => {
        this.setState({confirm_newpassword: event.target.value})
    }


    onKeyDownSbumit = (event) => {
        if (event.key === 'Enter'){
            this.handleClick();
        }
    }

    onClickChangePassword = async (event) => {
        event.preventDefault()
        let {account, password, new_password, confirm_newpassword, errors} = this.state
        if (account.trim() === "" || password.trim() === "") {
            errors = "Tài khoản hoặc mật khẩu không được bỏ trống";
          }
        
        if (Object.keys(errors).length > 0) {
            this.setState({ errors: errors });
        }
        else{
            this.setState({errors: ""})
        }

        try 
        {
            const response = await axios.post('http://localhost:8000/user/account/changePassword',{
                account, password, new_password, confirm_newpassword
            })
            if(response.status === 200){
                window.location.replace("/");
            }
        }
        catch(error)
        {
            if(error.response.status === 401){
                this.setState({errors: "Tài khoản hoặc mật khẩu không đúng"})
            }
            else if(error.response.status === 404){
                this.setState({errors: "Tài khoản không tồn tại"})
            }
            else{
                this.setState({errors: "Error occurred"})
            }
        }
    }
    
    render () {
        let {account, password, new_password, confirm_newpassword, errors} = this.state
        return (
            <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
                <div>
                    <img className='w-12 h-12 m-2' src = {Logo}/>
                </div>
                <div className='bg-gray-200 w-full rounded-lg px-4 shadow md:mt-0 sm:w-[400px]'>
                    <h1 className='py-4 text-4xl font-bold text-black'>Đổi mật khẩu</h1>
                    <div className='space-y-4'>
                        {/* account */}
                        <div className='space-y-2'>
                            <p className='text-2xl font-bold text-black'>Tài khoản</p>
                            <input className='bg-slate-100 border-2 rounded-lg border-black' type='text' placeholder='Tài khoản' onChange={this.onChangeAccount}/>
                        </div>
                        {/* password */}
                        <div className='space-y-2'>
                            <p className='text-2xl font-bold text-black'>Mật khẩu cũ</p>
                            <input className='bg-slate-100 border-2 rounded-lg border-black' type='text' placeholder='Mật khẩu cũ' onChange={this.onChangePassword}/>
                        </div>
                        {/* new password */}
                        <div className='space-y-2'>
                            <p className='text-2xl font-bold text-black'>Mật khẩu mới</p>
                            <input className='bg-slate-100 border-2 rounded-lg border-black' type='text' placeholder='Mật khẩu mới' onChange={this.onChangeNewPassword}/>
                        </div>
                        {/* confirm new password  */}
                        <div className='space-y-2'>
                            <p className='text-2xl font-bold text-black'>Xác nhận mật khẩu mới</p>
                            <input className='bg-slate-100 border-2 rounded-lg border-black' type='text' placeholder='Xác nhận mật khẩu mới' onChange={this.onChangeConfirmNewPassword}/>
                        </div>
                    </div>
                    {errors !== "" &&
                                (
                                <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-4 rounded-md">
                                    {errors}
                                </div>
                                )
                            }
                    <div className='flex my-4 justify-center'>
                        <button type = "submit" className='p-2 bg-blue-200 hover:bg-blue-400 rounded border-2 border-black ' onClick={this.onClickChangePassword} onKeyDown={this.onKeyDownSubmit}>Xác nhận</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ChangePassword