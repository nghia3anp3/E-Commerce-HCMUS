import React from 'react'
import Logo from '../img/logo.png';

class LoginHeader extends React.Component{
    render () {
        return (
            <header className= "w-full bg-slate-200 py-4">
                <div className='container h-20 mx-auto px-4 flex items-center justify-between'>
                <div className="flex items-center">
                    <img className="w-16 h-auto" src={Logo} alt="Logo" />
                    <p className="ml-4 text-4xl text-blue-500">THƯƠNG MAI ĐIỆN TỬ 21TNT1</p>
                </div>
                </div>
            </header>
        )
    }
}

export default LoginHeader