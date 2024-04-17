import React from 'react'
import InfoMenu from './info_menu';


class Menu extends React.Component{

    state = {
        hoverStates: {},
        isHovered: false,
    }

    handleMouseEnter = (index) => {
        const { hoverStates } = this.state;
        this.setState({ 
            hoverStates: { ...hoverStates, [index]: true },
            isHovered: true 
        });
    };

    handleMouseLeave = (index) => {
        const { hoverStates } = this.state;
        this.setState({ 
            hoverStates: { ...hoverStates, [index]: false },
            isHovered: false
        });
    };
    
    render(){
        let {isHovered, hoverStates} = this.state
        return(
            <div className="flex">
                {/* ---------------------------------------------------------- */}
                <div className="w-1/5 mx-3 bg-gray-200 py-4 pr-4 justify-center items-center hover:bg-gray-300 transition duration-300" 
                onMouseEnter={() => this.handleMouseEnter(0)} onMouseLeave={() => this.handleMouseLeave(0)}>
                    <p className="text-center">Men's clothing</p>
                    {hoverStates[0] && <InfoMenu className ='p-4' isHovered = {isHovered} p_type = {'MenClothing'}/>}
                </div>
                {/* ---------------------------------------------------------- */}
                <div className="w-1/5 mr-3 bg-gray-200 py-4 pr-4 justify-center items-center hover:bg-gray-300 transition duration-300" 
                onMouseEnter={() => this.handleMouseEnter(1)} onMouseLeave={() => this.handleMouseLeave(1)}>
                    <p className="text-center">Women's clothing</p>
                    {hoverStates[1] && <InfoMenu className ='p-4' isHovered = {isHovered} p_type = {'WomenClothing'}/>}
                </div>
                {/* ---------------------------------------------------------- */}
                <div className="w-1/5 mr-3 bg-gray-200 py-4 pr-4 justify-center items-center hover:bg-gray-300 transition duration-300" 
                onMouseEnter={() => this.handleMouseEnter(2)} onMouseLeave={() => this.handleMouseLeave(2)}>
                    <p className="text-center">Jewelery</p>
                    {hoverStates[2] && <InfoMenu className ='p-4' isHovered = {isHovered} p_type = {'Jewelery'}/>}
                </div>
                {/* ---------------------------------------------------------- */}
                <div className="w-1/4 bg-gray-200 py-4 pr-4 justify-center items-center hover:bg-gray-300 transition duration-300" 
                onMouseEnter={() => this.handleMouseEnter(3)} onMouseLeave={() => this.handleMouseLeave(3)}>
                    <p className="text-center">Electronics</p>
                    {hoverStates[3] && <InfoMenu className ='p-4' isHovered = {isHovered} p_type = {'Electronics'}/>}
                </div>
            </div>
        )
    }
}

export default Menu;