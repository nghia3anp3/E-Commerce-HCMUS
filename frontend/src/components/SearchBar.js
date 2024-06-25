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
            selectedFile: null,
            previewUrl: null,
            loading: false,
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
        const {item, previewUrl} = this.state
        const {findProductById} = this.context
        this.setState({ loading: true });
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
            localStorage.setItem('search_query', item)
            localStorage.setItem('is_image', JSON.stringify(false))
            window.location.href = '/search';
        } catch (error) {
            console.error('Error sematic searching:', error);
            this.setState({ loading: false });
        }
    };

    onImageSearch = () => {
        this.setState({ modalIsOpen: true });
    };

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.onClickSematicSearch();
        }
    };

    closeModal = () => {
        this.setState({ modalIsOpen: false, selectedFile: null });
    };

    handleImageUpload = (event) => {
        const file = event.target.files[0];

        this.setState({
            selectedFile: file,
            previewUrl: URL.createObjectURL(file)
        });
    };

    onConfirm = async () => {
        console.log("Confirmed Images:", this.state.selectedFile);
        const { selectedFile, previewUrl, item } = this.state;
        this.setState({ modalIsOpen: false, loading: true });      
        try {
            const formData = new FormData();
            formData.append('image', selectedFile);

            // Send POST request to the server
            const apiResponse = await axios.post('http://localhost:8000/api/image_search', formData);

            // Handle response data from the server
            const result = apiResponse.data;
            const { findProductById } = this.context;
            let image_search_products = []
            result.map((item, index) => {
                let product_id = item.product_id
                let product = findProductById(product_id)
                image_search_products.push(product)
            })
            const ai_products_str = JSON.stringify(image_search_products);
            localStorage.setItem('ai_search_products', ai_products_str);
            localStorage.setItem('search_query', item)
            localStorage.setItem('is_image', true)
            window.location.href = '/search';
        } catch (error) {
            console.error('Error uploading image:', error);
            this.setState({ loading: false });
        }
    };

    render() {
        const { modalIsOpen, item,  previewUrl, loading} = this.state;
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

                {loading && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <p className="text-lg font-semibold">Loading, vui lòng chờ...</p>
                        </div>
                    </div>
                )}

                {modalIsOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
                            <h2 className="text-xl mb-4">Upload Image</h2>
                            {previewUrl && (
                                <div className="mb-4">
                                <p className="font-semibold">Preview:</p>
                                <img src={previewUrl} alt="Preview" className="w-20 h-20" />
                                </div>
                            )}
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
