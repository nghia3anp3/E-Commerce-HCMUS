import React, { useState, useContext, useEffect } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { ProductContext } from '../context/ProductContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCamera, faTimes } from '@fortawesome/free-solid-svg-icons';
import 'tailwindcss/tailwind.css';

const SearchBar = () => {
    const [item, setItem] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);

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
            const updatedItems = [...items, ...newItems.filter(newItem => !items.some(item => item.id === newItem.id))];
            setItems(updatedItems);
        }
    }, [products]);

    const handleOnSelect = (selectedItem) => {
        setItem(selectedItem);
    };

    const onClickSearch = () => {
        let temp = item.id;
        if (temp.includes('product')) {
            let product_id = parseInt(temp.split("-")[1]);
            window.location.href = `/product/${product_id}`;
        } else {
            let p_type = temp.split("-")[0];
            let type = item.name;
            let page = 1;
            window.location.href = `/${p_type}/${type}/${page}`;
        }
    };

    const onImageSearch = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedImages([]);
    };

    const handleImageUpload = (event) => {
        const files = event.target.files;
        const images = [...selectedImages];
        for (let i = 0; i < files.length; i++) {
            images.push(URL.createObjectURL(files[i]));
        }
        setSelectedImages(images);
    };

    const onConfirm = () => {
        // Handle confirmed images here
        console.log("Confirmed Images:", selectedImages);
        closeModal();
    };

    return (
        <div className="ml-6 md:ml-0 flex flex-row gap-5 max-w-md">
            <ReactSearchAutocomplete
                placeholder=" Tìm kiếm..."
                items={items}
                onSelect={handleOnSelect}
                className="w-[300px]"
            />
            <button className="bg-stone-950 text-white py-2 px-4 rounded-lg" onClick={onClickSearch}>
                <FontAwesomeIcon icon={faSearch} />
            </button>
            <button className="bg-stone-950 text-white py-2 px-4 rounded-lg" onClick={onImageSearch}>
                <FontAwesomeIcon icon={faCamera} />
            </button>

            {modalIsOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
                        <h2 className="text-xl mb-4">Upload Image</h2>
                        {selectedImages.length > 0 &&
                            <div className="flex flex-wrap gap-2 mb-4">
                                {selectedImages.map((image, index) => (
                                    <img key={index} src={image} alt={`Uploaded ${index}`} className="w-24 h-24 object-cover rounded-lg" />
                                ))}
                            </div>
                        }
                        <input type="file" accept="image/*" onChange={handleImageUpload} multiple className="mb-4" />
                        <div className="flex justify-between">
                            <button onClick={closeModal} className="bg-red-500 text-white py-2 px-4 rounded-lg mr-2">
                                <FontAwesomeIcon icon={faTimes} className="mr-1" />
                                Hủy
                            </button>
                            <button onClick={onConfirm} className="bg-green-500 text-white py-2 px-4 rounded-lg">
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchBar;
