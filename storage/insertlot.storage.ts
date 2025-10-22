import { MMKV } from 'react-native-mmkv';
import { InsertLot } from './modals/insertlot_modal';

const storage = new MMKV();
const STORAGE_KEY = 'InsertLots';

export const getInsertLots = (): InsertLot[] => {
  const json = storage.getString(STORAGE_KEY);
  return json ? JSON.parse(json) : [];
};

export const saveLotsInserted = (companies: InsertLot[]) => {
  storage.set(STORAGE_KEY, JSON.stringify(companies));
};

export const addinsertlot = (insertlot: InsertLot) => {
  const companies = getInsertLots();
  companies.push(insertlot);
  saveLotsInserted(companies);
};

export const updateinsertlot = (updated: InsertLot) => {
  const companies = getInsertLots().map(c =>
    c.id === updated.id ? updated : c
  );
  saveLotsInserted(companies);
};

export const deleteinsertlot = (id: number) => {
  const companies = getInsertLots().filter(c => c.id !== id);
  saveLotsInserted(companies);
};

export const clearLotsInserted = () => {
  storage.delete(STORAGE_KEY);
};

export const getInsertLots_by_idWH = (id : number) =>{
   const companies = getInsertLots().filter(c => c.id_invo === id);
   return companies;
}
