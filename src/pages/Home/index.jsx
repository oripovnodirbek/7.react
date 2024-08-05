import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import Card from "../../components/Card";

function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  async function getDataFromApi(url) {
    try {
      const resp = await fetch(url);
      let data = [];
      if (resp.status === 200) {
        data = await resp.json();
      }
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  useEffect(() => {
    getDataFromApi(`https://cars-pagination.onrender.com/products`)
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleChange(event) {
    const category = event.target.value;
    if (category) {
      const filtered = products.filter(
        (product) => product.category === category
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }

  return (
    <div>
      <div style={{ margin: "20px 100px" }}>
        <select name="category" id="category" onChange={handleChange}>
          <option value="">Barcha mahsulotlar</option>
          <option value="не популярен">не популярен</option>
          <option value="известный">известный</option>
          <option value="средний">средний</option>
        </select>
      </div>
      <div className={styles.cards}>
        {filteredProducts.length > 0 &&
          filteredProducts.map((product, index) => (
            <Card key={index} product={product} />
          ))}
      </div>
    </div>
  );
}

export default Home;
