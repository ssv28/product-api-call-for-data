import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaShoppingCart } from "react-icons/fa";

const ProductCards = () => {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // Fetch the data from the API
  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((res) => setProducts(res.data.products))
      .catch((err) => console.log(err));

    // Retrieve cart count from localStorage if it exists
    const savedCartCount = localStorage.getItem("cartCount");
    if (savedCartCount) {
      setCartCount(Number(savedCartCount)); // Convert string to number
    }
  }, []);

  // handle adding items to the cart
  const handleAddToCart = () => {
    const updateCartCount = cartCount + 1;
    setCartCount(updateCartCount);

    // Store the count in localStorage
    localStorage.setItem("cartCount", updateCartCount);
  };

  // open new tab with product details
  const openProduct = (product) => {
    const { images, title, price, brand, category, rating, stock } = product;
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(`
        <html>
          <head>
            <title>${title}</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                padding: 20px;
                background-color: #f9f9f9;
                color: #333;
              }
              header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px;
                background-color: #f0f0f0;
                color: white;
              }
                header a{
                text-decoration : none;
                }
              .title {
                font-size: 2rem;
                color:#2874f0;
              }
              .cart-icon {
                position: relative;
                font-size: 1.5rem;
                cursor: pointer;
              }
              .container{
              width : 1140px;
              margin : auto;
              }
              .flex{
              display : flex;
              justify-content : center
              }
              .cart-count {
                position: absolute;
                top: -8px;
                right: -8px;
                background: red;
                color: white;
                border-radius: 50%;
                padding: 5px 5px;
                font-size: 0.9rem;
              }
              .details p {
                font-size: 1.1rem;
                margin: 5px 0;
              }
              .images {
                display: flex;
                justify-content: start;
                flex-wrap: wrap;
                gap: 10px;
              }
              img {
                width: 300px;
                height: 300px;
                object-fit: cover;
                border-radius: 10px;
                margin: 10px;
              }
              .add-to-cart {
                background-color: #ff9f00;
                color: white;
                padding: 10px 20px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                margin-top: 20px;
              }
                .buy-now {
                background-color: green;
                color: white;
                padding: 10px 20px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                margin-top: 20px;
              }
            </style>
          </head>
          <body>
            <header>
            <a href="/"><h1 class="title">Product Details</h1></a>
              
              <div class="cart-icon" onclick="alert('Carted prodects!')">
                🛒    <span id="cart-count" class="cart-count">
                  ${window.opener ? window.opener.cartCount : localStorage.getItem("cartCount") || 0}
                </span>
              </div>
            </header>
            <h1>${title}</h1>
            <div class="details">
              <p><strong>Price:</strong> ₹${price}</p>
              <p><strong>Brand:</strong> ${brand}</p>
              <p><strong>Category:</strong> ${category}</p>
              <p><strong>Rating:</strong> ${rating} ★</p>
              <p><strong>Stock:</strong> ${stock}</p>
            </div>
            <div class="images">
              ${images.map((img) => `<img src="${img}" alt="Product Image" />`).join('')}
            </div>
            <button class="add-to-cart" onclick="addToCart()">Add to Cart</button>
            <button class="buy-now">Buy Now</button>
            <script>
              function addToCart() {
                if (window.opener && window.opener.handleAddToCart) {
                  window.opener.handleAddToCart();
                  const cartCountElement = document.getElementById('cart-count');
                  cartCountElement.textContent = parseInt(cartCountElement.textContent, 10) + 1;
                } 
              }
            </script>
          </body>
        </html>
      `);
      newWindow.document.close();
    }
  };

  window.handleAddToCart = handleAddToCart; //  new window

  return (
    <div style={styles.container}>
      {/* Header with Cart Count */}
      <header style={styles.header}>
        <h1 style={styles.title}>Products</h1>
        <div style={styles.cartIcon}>
          <FaShoppingCart size={30} />
          <span style={styles.cartCount}>{cartCount}</span>
        </div>
      </header>

      <div className="card-container" style={styles.cardContainer}>
        {products.map((product) => (
          <div key={product.id} className="card" style={styles.card}>
            <div style={styles.imageWrapper}>
              <img
                src={product.thumbnail}
                alt="Thumbnail"
                style={styles.productImage}
                onClick={() => openProduct(product)}
              />
              <span style={styles.discountBadge}>
                {product.discountPercentage}% OFF
              </span>
            </div>
            <h2 style={styles.productTitle}>{product.title}</h2>
            <p style={styles.productDescription}>
              {product.description.slice(0, 80)}...
            </p>
            <div style={styles.priceSection}>
              <p style={styles.price}>
                <b style={{ color: "#ff6200" }}>₹{product.price}</b>
              </p>
              <p style={styles.originalPrice}>
                ₹{(
                  product.price /
                  (1 - product.discountPercentage / 100)
                ).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#f1f3f6"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },

  title: {
    fontSize: "2rem",
    color: "#2874f0"
  },

  cartIcon: { position: "relative" },

  cartCount: {
    position: "absolute",
    top: "-14px",
    right: "-14px",

    background: "red",
    color: "#fff",
    borderRadius: "50%",
    padding: "3px 5px",

  },

  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
    gap: "20px"
  },

  card: {
    backgroundColor: "#fff",
    padding: "15px",
    // borderRadius: "5px 5px 60px 60px"
    borderRadius: "10px",

  },

  imageWrapper: {
    position: "relative"
  },

  productImage: {
    width: "100%",
    height: "200px",
    cursor: "pointer"
  },

  discountBadge: {
    position: "absolute",
    top: "10px",
    left: "10px",
    padding: "5px",
    borderRadius: "10px",
    backgroundColor: "orange",
    color: "#fff"
  },

  productTitle: {
    fontSize: "1.3rem",
    marginBottom: "10px"
  },

  priceSection: {
    display: "flex",
    justifyContent: "space-between"
  },

  price: {
    fontSize: "1.5rem",
    color: "#2874f0"
  },

  originalPrice: {
    textDecoration: "line-through",
    color: "#999"
  },

};

export default ProductCards;



