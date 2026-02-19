import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import {
  fetchAllProducts,
  fetchCategories,
  fetchProductsByCategory,
} from "../api/storeApi";
import ProductCard from "../components/ProductCard";
import "./Products.css";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const [products, categories] = await Promise.all([
        selectedCategory
          ? fetchProductsByCategory(selectedCategory)
          : fetchAllProducts(),
        fetchCategories(),
      ]);
      setProducts(products);
      setCategories(categories);
      setLoading(false);
    };
    load();
  }, [selectedCategory]);

  return (
    <div className="products-container">
      <h2>Products</h2>
      <div className="products-controls">
        <input
          type="search"
          name="search"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="products-search"
        />
        <div className="products-categories">
          <button
            type="button"
            className={selectedCategory === null ? "active" : ""}
            onClick={() => setSelectedCategory(null)}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={selectedCategory === category ? "active" : ""}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      {loading ? (
        <p className="products-loading">Loading products…</p>
      ) : (
        <div className="products-list">
          {products
            .filter((p) =>
              p.title.toLowerCase().includes(search.toLowerCase().trim())
            )
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      )}
    </div>
  );
};
export default Products;
