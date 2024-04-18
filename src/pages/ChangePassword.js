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
        try 
        {
            const response = await axios.post('http://localhost:8000/change_password',{
                account, password, new_password, confirm_newpassword
            })
            
        }
        catch(error)
        {

        }
    }
    
    render () {
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
                            <input className='bg-slate-100 border-2 rounded-lg border-black' type='text' onChange={this.onChangeAccount}/>
                        </div>
                        {/* password */}
                        <div className='space-y-2'>
                            <p className='text-2xl font-bold text-black'>Mật khẩu cũ</p>
                            <input className='bg-slate-100 border-2 rounded-lg border-black' type='text' onChange={this.onChangePassword}/>
                        </div>
                        {/* new password */}
                        <div className='space-y-2'>
                            <p className='text-2xl font-bold text-black'>Mật khẩu mới</p>
                            <input className='bg-slate-100 border-2 rounded-lg border-black' type='text' onChange={this.onChangeNewPassword}/>
                        </div>
                        {/* confirm new password  */}
                        <div className='space-y-2'>
                            <p className='text-2xl font-bold text-black'>Xác nhận mật khẩu mới</p>
                            <input className='bg-slate-100 border-2 rounded-lg border-black' type='text' onChange={this.onChangeConfirmNewPassword}/>
                        </div>
                    </div>
                    <div className='flex my-4 justify-center'>
                        <button type = "submit" className='p-2 bg-blue-200 hover:bg-blue-400 rounded border-2 border-black ' onClick={this.onClickChangePassword} onKeyDown={this.onKeyDownSubmit}>Xác nhận</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ChangePassword