import React, { useState, useContext, useEffect} from 'react';
import { Link} from 'react-router-dom';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { ProductContext } from '../context/ProductContext';

const SearchBar = () => {
    const [item, setItem] = useState("");

    const [items, setItems] = useState([
        { id: 'phone-0', name: 'Samsung' },
        { id: 'phone-1', name: 'Panasonic' },
        { id: 'phone-2', name: 'Apple' },
        { id: 'phone-3', name: 'Kindle' },
        { id: 'phone-4', name: 'Nokia' },
        { id: 'phone-5', name: 'Xiaomi' },
        { id: 'laptop-0', name: 'Asus' },
        { id: 'laptop-1', name: 'Lenovo' }
    ]);

    const { products } = useContext(ProductContext);

    useEffect(() => {
        if (products.length > 0) {
            const newItems = products.map((product) => ({
                id: `product-${product.product_id}`,
                name: product.name,
            }));
            // Tạo một danh sách mới từ items cũ và newItems, và loại bỏ các mục trùng lặp
            const updatedItems = [...items, ...newItems.filter(newItem => !items.some(item => item.id === newItem.id))];
            setItems(updatedItems);
        }
    }, [products]);



    const handleOnSelect = (selectedItem) => {
        setItem(selectedItem);
    };


    const onClickSearch = () => {
        let temp = item.id
        if (temp.includes('product')){
            let product_id = parseInt(temp.split("-")[1]);
            window.location.href = `/product/${product_id}`;
        }
        else{
            let p_type = temp.split("-")[0];
            let type = item.name
            let page = 1
            window.location.href = `/${p_type}/${type}/${page}`;
        }
    };

    return (
        <div className="ml-6 md:ml-0 flex-grow max-w-md">
            <ReactSearchAutocomplete
                placeholder=" Tìm kiếm..."
                items={items}
                onSelect={handleOnSelect}
            />
            <button className="bg-stone-950 text-white py-2 px-4 rounded-lg" onClick={onClickSearch}>Tìm kiếm</button>
        </div>
    );
};

export default SearchBar;
