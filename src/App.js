import React, { useEffect, useState } from 'react';

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to get query parameters
  const getQueryParams = () => {
    const params = new URLSearchParams(window.location.search);
    return {
      productId: params.get('productId'),
    };
  };

  // Function to fetch product details
  const fetchProductDetails = async () => {
    const { productId } = getQueryParams();
    try {
      const response = await fetch(`https://dummyjson.com/products/${productId}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const productData = await response.json();
      setProduct(productData);
      setError(false);
    } catch (error) {
      console.error('Failed to fetch product details:', error);
      setError(true);
    }
  };

  // Auto-slider functionality
  const startSlider = (imageCount) => {
    setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageCount);
    }, 5000);
  };

  useEffect(() => {
    fetchProductDetails();
  }, []);

  useEffect(() => {
    if (product && product.images) {
      startSlider(product.images.length);
    }
  }, [product]);

  const backToAll = () => {
    window.location.href = 'extra.html';
  };

  if (error) {
    return (
      <div className="product-detail">
        <p>Failed to load product details. Please try again later.</p>
        <button className="back-button" onClick={fetchProductDetails}>
          Retry
        </button>
      </div>
    );
  }

  if (!product) {
    return <div className="product-detail">Loading...</div>;
  }

  return (
    <div className="product-detail" id="product-detail">
      <div className="c">
        <h1>Product Details</h1>
      </div>
      <div className="flex">
        <div className="im">
          <div className="slider">
            <div className="slides" style={{ transform: `translateX(-${currentIndex * 100}%)`, display: 'flex' }}>
              {product.images.map((img, index) => (
                <div key={index} className="slide" style={{ minWidth: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <img src={img} alt={`${product.title} image`} style={{ width: '500px', height: '500px' }} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="data">
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p className="price"><b>₹{product.price}</b></p>
          <p><b>Brand:</b> {product.brand}</p>
          <p><b>Category:</b> {product.category}</p>
          <p><b>Stock:</b> {product.stock}</p>
          <p><b>Dimensions:</b> Width: {product.dimensions?.width}, Height: {product.dimensions?.height}, Depth: {product.dimensions?.depth}</p>
          <p><b>Warranty:</b> {product.warrantyInformation}</p>
          <p><b>Shipping:</b> {product.shippingInformation}</p>
          <button className="back-button c" aria-label="Back to product list" onClick={backToAll}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
