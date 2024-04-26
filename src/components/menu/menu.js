import React from 'react'
import InfoMenu from './info_menu';


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
                <div className="w-1/5 mx-3 bg-gray-200 py-4 pr-4 justify-center items-center hover:bg-gray-300 transition duration-300" 
                onMouseEnter={() => this.handleMouseEnter(0)} onMouseLeave={() => this.handleMouseLeave(0)}>
                    <p className="text-center">Điện thoại</p>
                    {hoverStates[0] && <InfoMenu className ='p-4' isHovered = {isHovered} p_type = {'phone'} page = {1}/>}
                </div>
                {/* ---------------------------------------------------------- */}
                <div className="w-1/5 mr-3 bg-gray-200 py-4 pr-4 justify-center items-center hover:bg-gray-300 transition duration-300" 
                onMouseEnter={() => this.handleMouseEnter(1)} onMouseLeave={() => this.handleMouseLeave(1)}>
                    <p className="text-center">Laptop</p>
                    {hoverStates[1] && <InfoMenu className ='p-4' isHovered = {isHovered} p_type = {'laptop'} page = {1}/>}
                </div>
            </div>
        )
    }
}

export default Menu;