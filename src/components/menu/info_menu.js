import React from 'react'
import { ProductContext } from '../../context/ProductContext'
import { NavLink} from 'react-router-dom'


class InfoMenu extends React.Component {

    state = {
        MenClothing: ['Backpack', 'Jacket','Shirt', 'Slim Fit'],
        WomenClothing: ['Coats', 'RainCoat'],
        Jewelery: ['Bracelet'],
        Electronics: ['Hard Drive', 'Screen']
    }
    
    extractIdsAndTitles = (products) => {
        let products_info = [];
        products.forEach(product => {
            products_info.push({id: product.id, title: product.title, category: product.category})
        });
        return products_info;
      }

    getType = (p_type, products_info) => {
        let types
        if (p_type === 'MenClothing'){
            types = this.state.MenClothing
        }
        else if(p_type === 'WomenClothing'){
            types = this.state.WomenClothing
        }
        else if(p_type === 'Jewelery'){
            types = this.state.Jewelery
        }
        else if(p_type === 'Electronics'){
            types = this.state.Electronics
        }
        let type_array = []
        products_info.map((item, index) => {
            let type = types.find(i => item.title.includes(i));
            if(type!==undefined){
                if (!type_array.includes(type)) type_array.push(type)
            }
        })
        return type_array
    }

    render () {
        let {isHovered, p_type} = this.props
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
                                <NavLink to={`/${p_type}/${type}`} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">{type}
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