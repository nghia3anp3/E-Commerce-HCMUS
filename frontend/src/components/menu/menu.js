import React from 'react'
import InfoMenu from './info_menu';
// Icon
import { CiLaptop } from "react-icons/ci";
import { MdOutlineSmartphone } from "react-icons/md";


class Menu extends React.Component{

    state = {
        hoverStates: {1: false, 2: false},
        isHovered: false,
    }

    handleMouseEnter = (index) => {
        const { hoverStates } = this.state;
        hoverStates[index] = true
        this.setState({ 
            isHovered: true 
        });
    };

    handleMouseLeave = (index) => {
        const { hoverStates } = this.state;
        hoverStates[index] = false
        this.setState({ 
            isHovered: false
        });
    };
    
    render(){
        let {isHovered, hoverStates} = this.state
        return(
            <div className="flex justify-center items-center">
                {/* ---------------------------------------------------------- */}
                <div className="w-1/5 mx-3 bg-gray-200 py-4 pr-4 hover:bg-gray-300 transition duration-300" 
                onMouseEnter={() => this.handleMouseEnter(0)} onMouseLeave={() => this.handleMouseLeave(0)}>
                    <div className='flex flex-row justify-center items-center gap-4'>
                        <MdOutlineSmartphone className='h-6 w-6' />
                        <p className="text-center">Điện thoại</p>
                    </div>
                    {hoverStates[0] && <InfoMenu className ='p-4' isHovered = {isHovered} p_type = {'phone'} page = {1}/>}
                </div>
                {/* ---------------------------------------------------------- */}
                <div className="w-1/5 mr-3 bg-gray-200 py-4 pr-4  hover:bg-gray-300 transition duration-300" 
                onMouseEnter={() => this.handleMouseEnter(1)} onMouseLeave={() => this.handleMouseLeave(1)}>
                    <div className='flex flex-row justify-center items-center gap-4'>
                        <CiLaptop className='h-6 w-6' />
                        <p className="text-center">Laptop</p>
                    </div>
                    {hoverStates[1] && <InfoMenu className ='p-4' isHovered = {isHovered} p_type = {'laptop'} page = {1}/>}
                </div>
            </div>
        )
    }
}

export default Menu;