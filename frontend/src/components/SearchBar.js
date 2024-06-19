import React, { Component } from 'react';
import { ProductContext } from '../context/ProductContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCamera, faTimes } from '@fortawesome/free-solid-svg-icons';
import 'tailwindcss/tailwind.css';
import axios from 'axios';

class SearchBar extends Component {
    static contextType = ProductContext;

    constructor(props) {
        super(props);
        this.state = {
            item: "",
            modalIsOpen: false,
            selectedImages: [],
        };
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleInputChange = (event) => {
        this.setState({ item: event.target.value });
    };


    onClickSematicSearch = async () => {
        const {item} = this.state
        const {findProductById} = this.context

        try {
            const response = await fetch("http://localhost:8000/api/semantic_seach", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    comments: item
                  })
            })
            const result = await response.json()
            let ai_search_products = []
            result.map((item, index) => {
                let product_id = item.product_id
                let product = findProductById(product_id)
                ai_search_products.push(product)
            })
            const ai_search_products_str = JSON.stringify(ai_search_products);
            localStorage.setItem('ai_search_products', ai_search_products_str);
            // localStorage.setItem('search_query', item);
            // localStorage.setItem('is_image', false)
            window.location.href = '/search';
        } catch (error) {
            console.error('Error sematic searching:', error);
        }
    };

    onImageSearch = () => {
        this.setState({ modalIsOpen: true });
    };

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.handleImageSearch();
        }
    };

    handleImageSearch = async () => {
        const { selectedImages } = this.state;
        const image = selectedImages[0]

        // try {
        //     // Fetch the blob and convert it to a File
        //     const response = await fetch(image);
        //     // console.log(22222222222, response)
        //     const blob = await response.blob();
        //     // console.log(3333333333333, blob)
        //     const file = new File([blob], 'image.jpg', { type: blob.type });
        //     // console.log(222222222222222, file)
        //     const formData = new FormData();
        //     formData.append('image', file);
        //     console.log('FormData:', formData);

        //     const apiResponse = await axios.post('http://localhost:8000/api/image_search', file);

        //     const result = apiResponse.data;
        //     const { findProductById } = this.context;
        //     findProductById(result);
        // } catch (error) {
        //     console.error('Error uploading image:', error);
        // }
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false, selectedImages: [] });
    };

    handleImageUpload = (event) => {
        const files = event.target.files;
        const images = [...this.state.selectedImages];
        for (let i = 0; i < files.length; i++) {
            images.push(URL.createObjectURL(files[i]));
        }
        this.setState({ selectedImages: images });
    };

    onConfirm = () => {
        console.log("Confirmed Images:", this.state.selectedImages);
        this.setState({ modalIsOpen: false});
    };

    render() {
        const { modalIsOpen, selectedImages, item } = this.state;
        return (
            <div className="ml-6 md:ml-0 flex flex-row gap-5 max-w-md">
                <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    value={item}
                    onChange={this.handleInputChange}
                    className="w-[300px] p-2 border border-gray-300 rounded-lg"
                />
                <button className="bg-stone-950 text-white py-2 px-4 rounded-lg" onClick={this.onClickSematicSearch}>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
                <button className="bg-stone-950 text-white py-2 px-4 rounded-lg" onClick={this.onImageSearch}>
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
                            <input type="file" accept="image/*" onChange={this.handleImageUpload} multiple className="mb-4" />
                            <div className="flex justify-between">
                                <button onClick={this.closeModal} className="bg-red-500 text-white py-2 px-4 rounded-lg mr-2">
                                    <FontAwesomeIcon icon={faTimes} className="mr-1" />
                                    Hủy
                                </button>
                                <button onClick={this.onConfirm} className="bg-green-500 text-white py-2 px-4 rounded-lg">
                                    Xác nhận
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default SearchBar;
