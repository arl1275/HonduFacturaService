import { MMKV } from 'react-native-mmkv';
import { company } from './empresa';

const storage = new MMKV();
const STORAGE_KEY = 'companies';

export const getCompanies = (): company[] => {
  const json = storage.getString(STORAGE_KEY);
  return json ? JSON.parse(json) : [];
};

export const saveCompanies = (companies: company[]) => {
  storage.set(STORAGE_KEY, JSON.stringify(companies));
};

export const addcompany = (company: company) => {
  const companies = getCompanies();
  companies.push(company);
  saveCompanies(companies);
};

export const updatecompany = (updated: company) => {
  const companies = getCompanies().map(c =>
    c.id === updated.id ? updated : c
  );
  saveCompanies(companies);
};

export const deletecompany = (id: number) => {
  const companies = getCompanies().filter(c => c.id !== id);
  saveCompanies(companies);
};

export const clearCompanies = () => {
  storage.delete(STORAGE_KEY);
};
