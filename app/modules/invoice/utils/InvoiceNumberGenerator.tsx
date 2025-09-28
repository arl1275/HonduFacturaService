import { invoice, rangos } from "@/storage/modals/invoice";
import { invoicesconfig } from "@/storage/modals/invoice";
import { getCurrent_by_company_id } from "@/storage/invoiceconfig.storage";
//import { getCompany_by_ID } from "@/storage/company.storage";
import { company } from "@/storage/modals/empresa";
import { getInvoices_by_InvoiceConfig } from "@/storage/invoices.storage";

//----------------------------------------------------------------------------------------------------//
// GENERATE THE INVOICE NUMBERS
// This functions are for generate numbers of invoices. 
//----------------------------------------------------------------------------------------------------//

function GenerateInvoiceNumber_Plane(last: invoicesconfig) {
    const newlastnumber = {
        id: Date.now(),
        numero_uno: last.referencia_facturas.numero_uno,
        numero_dos: last.referencia_facturas.numero_dos,
        numero_tres: last.referencia_facturas.numero_tres,
        numero_cuatro: last.referencia_facturas.numero_cuatro + 1, // revisa esto según negocio
        active: false
    };
    return newlastnumber;
}

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

//----------------------------------------------------------------------------------------------------//
// GENERATE THE FORMATS
// this funcion is called when u want to formate invoices numbers or dates. 
//----------------------------------------------------------------------------------------------------//

export function formated_invoice_number(valor: rangos | undefined) {
    if (typeof valor === 'object') {
        return `${valor.numero_uno} - ${valor.numero_dos} - ${valor.numero_tres} - ${valor.numero_cuatro}`
    } else {
        return 'ERROR, number cannot be formated'
    }
}

export function formated_invoice_number_maximum(valor: rangos | undefined, maxnumber: number | undefined) {
    if (typeof valor === 'object' && typeof maxnumber === 'number') {
        return `${valor.numero_uno} - ${valor.numero_dos} - ${valor.numero_tres} - ${valor.numero_cuatro + maxnumber}`
    } else {
        return 'ERROR, number cannot be formated'
    }
}

export function formated_date_(value: string | undefined) {
    if (typeof value === 'string') {
        let date_ = value.split("T");
        let result = date_[0] + " " + date_[1].split(".")[0]
        return result
    }
    else {
        return 'error'
    }
}

//----------------------------------------------------------------------------------------------------//
// GENERATE THE INVOICE ITEM, WITH THE MINIMUM VALUES FOR A ITEM
// this funcion is called when u entrer into the generation invoice, or the InvoiceGen.tsx file. 
//----------------------------------------------------------------------------------------------------//

function Generate_Invoice_Item(company_: company): [invoice | string, boolean] {
    try {
        // this is to get the last invoice config created und active
        const LastInvoConfig: invoicesconfig | undefined = getCurrent_by_company_id(company_.id);

        // this get the last invoice created
        const LastInvoice: invoice | undefined = getInvoices_by_InvoiceConfig(LastInvoConfig.id);
        let newlastnumber: rangos;

        if (!LastInvoConfig || !company_) { return ["ERROR", false] }
        //this is to validate the date
        const limitDate = new Date(LastInvoConfig.fechalimite);
        if (limitDate.getTime() <= Date.now()) { return ["Over Date", false]; }


        //console.log(LastInvoice)
        if (!LastInvoice) {
            newlastnumber = GenerateInvoiceNumber_Plane(LastInvoConfig);
        } else {
            newlastnumber = GenerateInvoiceNumber(LastInvoice)
        }

        const item: invoice = {
            id: Date.now(),
            id_invoice_config: LastInvoConfig.id,

            formato_general: {
                RTN: company_.rtn,
                encabezado: LastInvoConfig.encabezado,
                piehoja: LastInvoConfig.piedehoja,
                fecha_emision: new Date(), // here is the error
                id_company: LastInvoConfig.id_company,
                numero_de_factura: newlastnumber,
                cai: LastInvoConfig.cai.nombre,
                comprador: "Cliente Final",
                comprador_rtn: "0000-0000-00000"
            },
            lineasfacturadas: [],
            id_impuesto: [],
            total: 0.0,
            subtotal: 0.0,

            status: {
                draft: true,
                done: false,
                creditnote: {
                    done: false,
                    creditnote_id: 0
                }
            }
        };

        return [item, true];
    } catch (error) {
        return ["ERROR", false]
    }
}


export default Generate_Invoice_Item;