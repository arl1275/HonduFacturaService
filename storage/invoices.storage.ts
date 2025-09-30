import { MMKV } from "react-native-mmkv";
import { invoice } from "./modals/invoice";

const storage = new MMKV();
const invoice_KEY = "invoices";

export const getinvoices = (): invoice[] => {
  const data = storage.getString(invoice_KEY);
  return data ? JSON.parse(data) : [];
};

// this update the draft
export const updateInvoiceById = (id: number, updatedInvoice: invoice) => {
  const invoices = getinvoices();

  const updated = invoices.map((inv) =>
    inv.id === id ? { ...inv, ...updatedInvoice } : inv
  );

  storage.set(invoice_KEY, JSON.stringify(updated));
  return [true, "UPDATED INVOICE"];
};

export const DraftToInvoice = (id: number, _invoice_: Partial<invoice>) => {
  const invoices = getinvoices();

  const updated = invoices.map((inv) =>
    inv.id === id
      ? {
          ...inv,
          ..._invoice_,
          status: {
            ...inv.status,
            ...(_invoice_.status ?? {}), // por si viene status en _invoice_
            draft: false,
            done: true,
          },
        }
      : inv
  );

  storage.set(invoice_KEY, JSON.stringify(updated));
};


export const saveinvoices = (invoices: invoice[]) => {
  storage.set(invoice_KEY, JSON.stringify(invoices));
  //console.log(getinvoices())
};

export const addinvoice = (invoice: invoice) => {
  const invoices = getinvoices();
  invoices.push(invoice);
  saveinvoices(invoices);
};

export const deleteinvoice = (id: number) => {
  const invoices = getinvoices().filter((inv) => inv.id !== id);
  saveinvoices(invoices);
};

export const getInvoices_by_ID = (id: number) => {
  const invoices = getinvoices().filter((inv) => inv.id === id);
  return invoices;
};



export const get_last_invoice_by_company = (id_company: number) => {
  const invoices = getinvoices()
    .filter(inv => inv?.formato_general?.id_company === id_company)
    .map(inv => ({
      ...inv,
      formato_general: {
        ...inv.formato_general,
        fecha_emision: new Date(inv.formato_general.fecha_emision), 
      }
    }))
    .sort(
      (a, b) =>
        a.formato_general.fecha_emision.getTime() -
        b.formato_general.fecha_emision.getTime()
    );
  //console.log(invoices);
  //console.log("ULTIMO VALOR: ", invoices[0])
  return invoices[invoices.length - 1]; 
};

export const clearinvoices = () => {
  storage.delete(invoice_KEY);
};

export const getInvoices_by_InvoiceConfig = (id : number) =>{
  const invoices = getinvoices()
    .filter(inv => inv?.id_invoice_config === id)
    .map(inv => ({
      ...inv,
      formato_general: {
        ...inv.formato_general,
        fecha_emision: new Date(inv.formato_general.fecha_emision), 
      }
    }))
    .sort(
      (a, b) =>
        a.formato_general.numero_de_factura.numero_cuatro -
        b.formato_general.numero_de_factura.numero_cuatro
    );
    //console.log(invoices);
    
  return invoices[invoices.length - 1]
}

export const getInvoices_by_InvoiceConfig_ID = (id : number) =>{
  const invoices = getinvoices()
    .filter(inv => inv?.id_invoice_config === id).sort(
      (a, b) =>
        a.formato_general.numero_de_factura.numero_cuatro -
        b.formato_general.numero_de_factura.numero_cuatro
    );
    //console.log(invoices);
    
  return invoices;
}
