// storage/invoicesconfigStorage.ts
import { MMKV } from 'react-native-mmkv';
import { invoicesconfig } from './invoice';

const storage = new MMKV();
const STORAGE_KEY = 'invoices_config';

export const getInvoicesconfigs = (): invoicesconfig[] => {
  const data = storage.getString(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const getInvoicesconfig_by_id = (term: number) => {
  const configs = getInvoicesconfigs().filter(c =>
    c.id_company === term
  );
  return configs;
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

//---------------------------------------------------------//
//functions of invoiceconfigs

export const getCurrent_by_company_id = ( id : number) => {
  const configs = getInvoicesconfigs();

    if(configs.length === 1) return configs[0];
    
    else
    configs.filter(c => c.active === true && c.id_company === id)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    
  return configs[0]; // Devuelve solo la más reciente y activa
}
