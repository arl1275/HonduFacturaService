// storage/invoicesconfigStorage.ts
import { MMKV } from 'react-native-mmkv';
import { invoicesconfig } from './invoice';

const storage = new MMKV();
const STORAGE_KEY = 'invoices_config';

export const getInvoicesconfigs = (): invoicesconfig[] => {
  const data = storage.getString(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveInvoiceconfigs = (configs: invoicesconfig[]) => {
  storage.set(STORAGE_KEY, JSON.stringify(configs));
};

export const addInvoiceconfig = (config: invoicesconfig) => {
  const configs = getInvoicesconfigs();
  configs.push(config);
  saveInvoiceconfigs(configs);
};

export const updateInvoicesconfig = (updated: invoicesconfig) => {
  const configs = getInvoicesconfigs().map(c =>
    c.id === updated.id ? updated : c
  );
  saveInvoiceconfigs(configs);
};

export const deleteInvoicesconfig = (id: number) => {
  const configs = getInvoicesconfigs().filter(c => c.id !== id);
  saveInvoiceconfigs(configs);
};

export const clearInvoicesconfigs = () => {
  storage.delete(STORAGE_KEY);
};
