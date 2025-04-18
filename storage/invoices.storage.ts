import { MMKV } from 'react-native-mmkv';
import { invoice } from './invoice';

const storage = new MMKV();
const invoice_KEY = 'invoices';

export const getinvoices = (): invoice[] => {
  const data = storage.getString(invoice_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveinvoices = (invoices: invoice[]) => {
  storage.set(invoice_KEY, JSON.stringify(invoices));
};

export const addinvoice = (invoice: invoice) => {
  const invoices = getinvoices();
  invoices.push(invoice);
  saveinvoices(invoices);
};

export const deleteinvoice = (id: number) => {
  const invoices = getinvoices().filter(inv => inv.id !== id);
  saveinvoices(invoices);
};

export const clearinvoices = () => {
  storage.delete(invoice_KEY);
};
