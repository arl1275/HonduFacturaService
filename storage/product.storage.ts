import { MMKV } from 'react-native-mmkv';
import { product } from './modals/inventory';

const storage = new MMKV();
const STORAGE_KEY = 'products';

export const getAllProducts = (): product[] => {
  const json = storage.getString(STORAGE_KEY);
  return json ? JSON.parse(json) : [];
};

export const saveProduct = (newProduct: product[]) => {
  storage.set(STORAGE_KEY, JSON.stringify(newProduct));
};

export const addProduct = (company: product) => {
  const companies = getAllProducts();
  companies.push(company);
  saveProduct(companies);
};

export const updateProduct = (updated: product) => {
  const Updated_ = getAllProducts().map(c =>
    c.id === updated.id ? updated : c
  );
  saveProduct(Updated_);
};

export const deleteProduct_by_ID = (id: number) => {
  const _NewArray_ = getAllProducts().filter(c => c.id !== id);
  saveProduct(_NewArray_);
};

export const getProducts_by_WH = (id_WH : number) =>{
    const Products = getAllProducts().filter(c => c.id_inventory === id_WH);
    return Products.length ? Products : ["NON PRODUCTS", false];
}