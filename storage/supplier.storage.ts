import { MMKV } from 'react-native-mmkv';
import { supplier } from './modals/supplier';

const storage = new MMKV();
const STORAGE_KEY = 'supplier';

export const getAllSuppliers = (): supplier[] => {
  const json = storage.getString(STORAGE_KEY);
  return json ? JSON.parse(json) : [];
};

export const saveSupplier = (newSupplier: supplier[]) => {
  storage.set(STORAGE_KEY, JSON.stringify(newSupplier));
};

export const addSupplier = (company: supplier) => {
  const companies = getAllSuppliers();
  companies.push(company);
  saveSupplier(companies);
};

export const updateSupplier = (updated: supplier) => {
  const Updated_ = getAllSuppliers().map(c =>
    c.id === updated.id ? updated : c
  );
  saveSupplier(Updated_);
};

export const deleteSupplier_by_ID = (id: number) => {
  const _NewArray_ = getAllSuppliers().filter(c => c.id !== id);
  saveSupplier(_NewArray_);
};

// export const getAllSuppliers_by_WH_ID = (id: number) => {
//   const _NewArray_ = getAllSuppliers().filter(c => c.id == id);
//   return _NewArray_;
// };

// export const getSuppliers_by_WH = (id_WH : number) =>{
//     const Suppliers = getAllSuppliers().filter(c => c.id_inventory === id_WH);
//     return Suppliers.length ? Suppliers : ["NON SUPPLIERS", false];
// }