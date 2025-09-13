import { invoice, invoicesconfig, rangos } from "@/storage/modals/invoice";
import { getCurrent_by_company_id } from "@/storage/invoiceconfig.storage";
import { getInvoices_by_InvoiceConfig } from "@/storage/invoices.storage";
//import { formated_invoice_number } from "./InvoiceNumberGenerator";

function Preparation_CREDIT_NOTE(_invoice_: invoice,) {
    const last: invoicesconfig | undefined = getCurrent_by_company_id(_invoice_.formato_general.id_company);
    const LastInvoice: invoice | undefined = getInvoices_by_InvoiceConfig(last.id);
    //console.log("las: ", last );
    
    if (typeof last != 'undefined'  && typeof LastInvoice != 'undefined') {

        const limitDate = new Date(last.fechalimite);

        if (limitDate.getTime() <= Date.now()) {return ["Over Date", false]}


        let newlastnumber: rangos = {
            id: Date.now(),
            numero_uno: last.referencia_facturas.numero_uno,
            numero_dos: last.referencia_facturas.numero_dos,
            numero_tres: last.referencia_facturas.numero_tres,
            numero_cuatro: LastInvoice.formato_general.numero_de_factura.numero_cuatro + 1,
            active: false
        };


        //console.log("Nuevo numero", formated_invoice_number(newlastnumber));
        let NewInvoice: invoice = {
            id: _invoice_.id + 1,
            id_invoice_config: _invoice_.id_invoice_config,

            formato_general: {
                encabezado: _invoice_.formato_general.encabezado,
                RTN: _invoice_.formato_general.RTN,
                piehoja: _invoice_.formato_general.piehoja,
                fecha_emision: _invoice_.formato_general.fecha_emision,
                id_company: _invoice_.formato_general.id_company,
                numero_de_factura: newlastnumber,
                cai: _invoice_.formato_general.cai, // the cai of the company
                comprador: _invoice_.formato_general.comprador,
                comprador_rtn: _invoice_.formato_general.comprador_rtn
            },

            lineasfacturadas: _invoice_.lineasfacturadas,
            id_impuesto: _invoice_.id_impuesto,
            total: _invoice_.total,
            subtotal: _invoice_.subtotal,

            status: {
                draft: false,
                done: false,
                creditnote: {
                    done: true,
                    creditnote_id: _invoice_.id
                },
            }
        }

        return [NewInvoice, true];
    } else {
        return ["An ERROR OCURR", false];
    }
}

export default Preparation_CREDIT_NOTE;