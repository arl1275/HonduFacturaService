import { MMKV } from "react-native-mmkv";
import { invoice } from "./invoice";

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

// this take consideration the invoice config
/*export const getInvoices_by_company_id = (id: number, id_invoice_config : number) => {
  const invoices = getinvoices().filter(inv => inv.formato_general.id_company === id
    && inv.id_invoice_config === id_invoice_config
  ).sort((a, b) => 
      b.formato_general.fecha_emision.getTime() - a.formato_general.fecha_emision.getTime() // Orden descendente
    );
  return invoices;
};*/

export const getInvoices_by_company = (id: number) => {
  //console.log('Companya', id)
  const invoices = getinvoices().filter(
    (inv) => inv.formato_general.id_company === id
  );
  return invoices;
};

export const get_last_invoice_by_company = (id_company: number) => {
  const toMs = (d: unknown): number => {
    const t = new Date(d as any).getTime(); // convierte Date, string o número
    return Number.isFinite(t) ? t : 0; // si es inválido, devuelve 0
  };

  const invoices = getinvoices()
    .filter((inv) => inv?.formato_general?.id_company === id_company)
    .sort(
      (a, b) =>
        toMs(b?.formato_general?.fecha_emision) -
        toMs(a?.formato_general?.fecha_emision)
    );

  return invoices[0];
};

export const clearinvoices = () => {
  storage.delete(invoice_KEY);
};
