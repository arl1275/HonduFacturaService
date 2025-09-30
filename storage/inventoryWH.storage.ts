import { MMKV } from 'react-native-mmkv';
import { inventoryWH } from './modals/inventory';

const storage = new MMKV();
const STORAGE_KEY = 'wharehouse';

export const getAllWareHouse= (): inventoryWH[] => {
  const json = storage.getString(STORAGE_KEY);
  return json ? JSON.parse(json) : [];
};

export const getWareHouses_by_id = (id : number) => {
  const Result = getAllWareHouse().filter(c => c.id_company === id);
  return Result
};

export const saveWareHouse = (saveWarehouse: inventoryWH[]) => {
  storage.set(STORAGE_KEY, JSON.stringify(saveWarehouse));
};

export const addWarehouse = (newWarehouse: inventoryWH) => {
  const companies = getAllWareHouse();
  companies.push(newWarehouse);
  saveWareHouse(companies);
};

export const updateWareHouse = (updated: inventoryWH) => {
  const Updated_ = getAllWareHouse().map(c =>
    c.id === updated.id ? updated : c
  );
  saveWareHouse(Updated_);
};

export const deleteWareHouse_by_ID = (id: number) => {
  const _NewArray_ = getAllWareHouse().filter(c => c.id !== id);
  saveWareHouse(_NewArray_);
};

// this is from the las copy

// export const getProducts_by_WH = (id_WH : number) =>{
//     const Products = getAllProducts().filter(c => c.id_inventory === id_WH);
//     return Products.length ? Products : ["NON PRODUCTS", false];
// }