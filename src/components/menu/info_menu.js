import React from 'react'
import { ProductContext } from '../../context/ProductContext'
import { NavLink} from 'react-router-dom'
// Icon
import { FaApple } from "react-icons/fa";


class InfoMenu extends React.Component {

    state = {
        Phone: ['Samsung', 'Panasonic','Apple', 'Kindle', 'Nokia', 'Xiaomi'],
        Laptop: ['Asus', 'Lenovo'],
    }
    
    extractIdsAndTitles = (products) => {
        let products_info = [];
        products.forEach(product => {
            products_info.push({id: product.id, name: product.name, brand_name: product.brand_name})
        });
        return products_info;
      }

    getType = (p_type, products_info) => {
        let types
        if (p_type === 'phone'){
            types = this.state.Phone
        }
        else if(p_type === 'laptop'){
            types = this.state.Laptop
        }
        let type_array = []
        products_info.map((item, index) => {
            let type = types.find(i => item.brand_name === i);
            if(type!==undefined ){
                if (!type_array.includes(type)) type_array.push(type)
            }
        })
        return type_array
    }

    render () {
        let {isHovered, p_type, page} = this.props
        return (
            <ProductContext.Consumer>
            {({ products }) => {
                const products_info = this.extractIdsAndTitles(products);
                let type_array = this.getType(p_type, products_info)
                return (
                    <div className= {`absolute ${(isHovered) ? '' : 'hidden'} mt-4 w-48 bg-white rounded-md shadow-lg`}>
                    <ul>                
                        {
                        type_array.map((type, i) => {
                            return (
                                <li>                            
                                <NavLink to={`/${p_type}/${type}/${page}`} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">{type}
                                </NavLink>
                                </li>
                            )
                        }) 
                        }
                    </ul>             
            </div>
                )
            }}
            </ProductContext.Consumer>
     )
    }
}

export default InfoMenu;