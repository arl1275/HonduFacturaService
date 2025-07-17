import { invoice, rangos } from "@/storage/invoice";
import { invoicesconfig } from "@/storage/invoice";
import { getCurrent_by_company_id } from "@/storage/invoiceconfig.storage";
import { getCompany_by_ID } from "@/storage/company.storage";
import { company } from "@/storage/empresa";
import { get_last_invoice_by_company } from "@/storage/invoices.storage";

function GenerateInvoiceNumber(LastInvoice: invoice) {
    let _new_rango_: rangos = {
        id: Date.now(),
        numero_uno: LastInvoice.formato_general.numero_de_factura.numero_uno,
        numero_dos: LastInvoice.formato_general.numero_de_factura.numero_dos,
        numero_tres: LastInvoice.formato_general.numero_de_factura.numero_tres,
        numero_cuatro: LastInvoice.formato_general.numero_de_factura.numero_cuatro + 1,
        active: false
    }

    return _new_rango_;
}

function Generate_Invoice_Item(company_id: number): [invoice | string, boolean] {
    const last: invoicesconfig = getCurrent_by_company_id(company_id);
    const LastInvoice: invoice = get_last_invoice_by_company(company_id);
    const company: company = getCompany_by_ID(company_id);
    let newlastnumber : rangos;

    if (typeof LastInvoice === undefined) {
        newlastnumber = {
            id: Date.now(),
            numero_uno: last.referencia_facturas.numero_uno,
            numero_dos: last.referencia_facturas.numero_dos,
            numero_tres: last.referencia_facturas.numero_tres,
            numero_cuatro: last.referencia_facturas.numero_cuatro + 1,
            active: false
        }
    }else if(typeof LastInvoice != undefined){
        newlastnumber = GenerateInvoiceNumber(LastInvoice);
    }
    
    const item: invoice = {
        id: Date.now(),
        id_invoice_config: last.id,

        formato_general: {
            RTN: company.rtn,
            encabezado: last.encabezado,
            piehoja: last.piedehoja,
            fecha_emision: new Date(),
            id_company: last.id_company,
            numero_de_factura: newlastnumber,
            cai: last.cai.nombre, // the cai of the company
            comprador: "Cliente Final",
            comprador_rtn: "0000-0000-00000",
        },

        lineasfacturadas: [],
        id_impuesto: [],
        total: 0,
        subtotal: 0,

        status: {
            draft: true,
            done: false,
            creditnote: {
                done: false,
                creditnote_id: 0
            },
        }
    }

    return [item, true];

}

export default Generate_Invoice_Item;