import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductCards = () => {
  const [products, setProducts] = useState([]);

  // Fetch the data from the API
  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Products</h1>
      <div className="card-container" style={styles.cardContainer}>
        {products.map((product) => (
          <div key={product.id} className="card" style={styles.card}>
            {/* Product Image and Discount */}
            <div style={styles.imageWrapper}>
              <img src={product.thumbnail} alt="Thumbnail" style={styles.productImage} />
              <span style={styles.discountBadge}>{product.discountPercentage}% OFF</span>
            </div>

            {/* Title and Description */}
            <h2 style={styles.productTitle}>{product.title}</h2>
            <p style={styles.productDescription}>{product.description.slice(0, 80)}...</p>

            {/* Price, Original Price, and Rating */}
            <div style={styles.priceSection}>
              <p style={styles.price}><b style={{ color: "#ff6200" }}>₹{product.price}</b></p>
              <p style={styles.originalPrice}>
                ₹{(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
              </p>
            </div>

            <div style={styles.flex}>
              <div style={styles.rating}>
                <span style={styles.ratingBadge}>{product.rating} ★</span>
              </div>
              <p><b style={{ color: "red" }}>Stock:</b> {product.stock}</p>
            </div>

            {/* Additional Product Information */}
            <div style={styles.additionalInfo}>
              <p><b style={{ color: "#ff6200" }}>Brand:</b> {product.brand}</p>
              <p><b style={{ color: "#ff6200" }}>Category:</b> {product.category}</p>
              <p><b style={{ color: "#ff6200" }}>Tags:</b> {product.tags.join(", ")}</p>
            </div>

            {/* Dimensions Section */}
            <h4 style={styles.sectionTitle}>Dimensions:</h4>
            <div style={styles.flex}>
              <p><b style={{ color: "#ff6200" }}>Width:</b> {product.dimensions.width}</p>
              <p><b style={{ color: "#ff6200" }}>Height:</b> {product.dimensions.height}</p>
              <p><b style={{ color: "#ff6200" }}>Depth:</b> {product.dimensions.depth}</p>
            </div>

            {/* Warranty and Shipping Information */}
            <h4 style={styles.sectionTitle}>Warranty & Shipping Info:</h4>
            <p><b style={{ color: "#ff6200" }}>Warranty:</b> {product.warrantyInformation}</p>
            <p><b style={{ color: "#ff6200" }}>Shipping:</b> {product.shippingInformation}</p>

            {/* Meta Section */}
            <h4 style={styles.sectionTitle}>Product Meta:</h4>
            <p><b style={{ color: "#ff6200" }}>Created At:</b> {product.meta.createdAt }</p>
            <p><b style={{ color: "#ff6200" }}>Updated At:</b> {product.meta.updatedAt }</p>

            {/* Barcodes and Product Images */}
            <div style={styles.flex}>
              <span>
                {product.meta.barcode && <img src={product.meta.barcode} alt="Barcode" style={styles.image} />}
              </span>
              <span>
                {product.meta.qrCode && <img src={product.meta.qrCode} alt="QR Code" style={styles.image} />}
              </span>
            </div>

            <div style={styles.flex}>
              <span>
                {product.images && <img src={product.images[0]} alt="Product" style={styles.productImage} />}
              </span>
            </div>

            {/* Buy Now Button */}
            <button style={styles.buyButton}>Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#f1f3f6",
    padding: "20px 50px",
    minHeight: "100vh",
  },
  title: {
    textAlign: "center",
    fontSize: "2rem",
    marginBottom: "20px",
    color: "#2874f0",
  },
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "15px",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    position: "relative",
    overflow: "hidden",
    textAlign: "center",
  },
  cardHover: {
    transform: "scale(1.05)",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
  },
  imageWrapper: {
    position: "relative",
    marginBottom: "10px",
  },
  productImage: {
    width: "100%",
    height: "200px",
    objectFit: "contain",
  },
  discountBadge: {
    position: "absolute",
    top: "10px",
    left: "10px",
    backgroundColor: "#ff6161",
    color: "#fff",
    padding: "5px 10px",
    borderRadius: "5px",
    fontSize: "0.8rem",
    fontWeight: "bold",
  },
  productTitle: {
    fontSize: "1.3rem",
    fontWeight: "600",
    marginBottom: "10px",
    color: "#333",
  },
  productDescription: {
    color: "#666",
    fontSize: "0.9rem",
    marginBottom: "15px",
  },
  priceSection: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    marginBottom: "15px",
  },
  price: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#2874f0",
  },
  originalPrice: {
    textDecoration: "line-through",
    color: "#999",
    fontSize: "1rem",
  },
  flex: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
  },
  rating: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  ratingBadge: {
    backgroundColor: "#388e3c",
    color: "#fff",
    padding: "5px 8px",
    borderRadius: "5px",
    fontWeight: "bold",
  },
  additionalInfo: {
    padding: "10px 0",
    fontSize: "0.9rem",
  },
  sectionTitle: {
    marginTop: "10px",
    fontSize: "1.1rem",
    fontWeight: "bold",
    color: "#333",
  },
  image: {
    width: "80px",
    height: "80px",
  },
  buyButton: {
    backgroundColor: "#ff9f00",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  buyButtonHover: {
    backgroundColor: "#fb641b",
  },
};

export default ProductCards;
