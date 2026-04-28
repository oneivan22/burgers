import { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchProducts } from '../services/api';
import { categories } from '../data/products';

export function useMenuData() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Параметры запроса из URL
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const queryCategory = searchParams.get('category') || '';
  const searchQuery = searchParams.get('search') || '';

  // Фильтрация товаров по поиску
  const filteredProducts = useMemo(() => {
    let items = [...products];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      items = items.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }

    return items;
  }, [products, searchQuery]);

  // Загрузка товаров
  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Получение товаров по категории
  function getProductsByCategory(categoryId) {
    return filteredProducts.filter(product => product.category === categoryId);
  }

  // Получение товаров по подкатегории
  function getProductsBySub(subId) {
    return filteredProducts.filter(product => product.subcategory === subId);
  }

  return {
    products: filteredProducts,
    loading,
    error,
    queryCategory,
    searchQuery,
    loadProducts,
    getProductsByCategory,
    getProductsBySub,
    hasProducts: filteredProducts.length > 0,
  };
}