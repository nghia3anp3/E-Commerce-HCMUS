import React from 'react';
// Icon
import { CiLaptop } from 'react-icons/ci';
import { MdOutlineSmartphone } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';

class Menu extends React.Component {
  state = {
    hoverStates: { 1: false, 2: false },
    isHovered: false,
    Phone: ['Samsung', 'Panasonic', 'Apple', 'Kindle', 'Nokia', 'Xiaomi'],
    Laptop: ['Asus', 'Lenovo'],
  };

  handleMouseEnter = (index) => {
    const { hoverStates } = this.state;
    hoverStates[index] = true;
    this.setState({
      isHovered: true,
    });
  };

  handleMouseLeave = (index) => {
    const { hoverStates } = this.state;
    hoverStates[index] = false;
    this.setState({
      isHovered: false,
    });
  };

  getType = (p_type, products_info) => {
    const { Phone, Laptop } = this.state;
    let types;
    if (p_type === 'phone') {
      types = Phone;
    } else if (p_type === 'laptop') {
      types = Laptop;
    }
    const typeArray = [];
    products_info.forEach((item) => {
      const type = types.find((i) => item.brand_name === i);
      if (type !== undefined && !typeArray.includes(type)) {
        typeArray.push(type);
      }
    });
    return typeArray;
  };

  render() {
    const { isHovered, hoverStates } = this.state;
    return (
      <ProductContext.Consumer>
        {({ products }) => {
          const extractIdsAndTitles = (products) => {
            const productsInfo = [];
            products.forEach((product) => {
              productsInfo.push({ id: product.id, name: product.name, brand_name: product.brand_name });
            });
            return productsInfo;
          };

          const productsInfo = extractIdsAndTitles(products);

          return (
            <div className="flex justify-center items-center">
              <div
                className="w-1/5 mx-3 bg-gray-200 py-4 pr-4 hover:bg-gray-300 transition duration-300"
                onMouseEnter={() => this.handleMouseEnter(0)}
                onMouseLeave={() => this.handleMouseLeave(0)}
              >
                <div className="flex flex-row justify-center items-center gap-4">
                  <MdOutlineSmartphone className="h-6 w-6" />
                  <p className="text-center">Điện thoại</p>
                </div>
                {hoverStates[0] && (
                  <div className={`absolute ${(isHovered) ? '' : 'hidden'} mt-4 w-48 bg-white rounded-md shadow-lg`}>
                    <ul>
                      {this.getType('phone', productsInfo).map((type, i) => (
                        <li key={i}>
                          <NavLink to={`/phone/${type}/1`} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                            {type}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div
                className="w-1/5 mr-3 bg-gray-200 py-4 pr-4  hover:bg-gray-300 transition duration-300"
                onMouseEnter={() => this.handleMouseEnter(1)}
                onMouseLeave={() => this.handleMouseLeave(1)}
              >
                <div className="flex flex-row justify-center items-center gap-4">
                  <CiLaptop className="h-6 w-6" />
                  <p className="text-center">Laptop</p>
                </div>
                {hoverStates[1] && (
                  <div className={`absolute ${(isHovered) ? '' : 'hidden'} mt-4 w-48 bg-white rounded-md shadow-lg`}>
                    <ul>
                      {this.getType('laptop', productsInfo).map((type, i) => (
                        <li key={i}>
                          <NavLink to={`/laptop/${type}/1`} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                            {type}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          );
        }}
      </ProductContext.Consumer>
    );
  }
}

export default Menu;
