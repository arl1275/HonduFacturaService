import { invoice, rangos } from "@/storage/invoice";
import { invoicesconfig } from "@/storage/invoice";
import { getCurrent_by_company_id } from "@/storage/invoiceconfig.storage";
import { getCompany_by_ID } from "@/storage/company.storage";
import { company } from "@/storage/empresa";

function getLastconfig() {

}

function GenerateInvoiceNumber( basenumber : rangos, numerolimite : number, fechalimite : Date ) {
    if(Date.now() > fechalimite.getDate()){
        
    }else{
        return null
    }
}

// this function should send a draft invoice 

function Generate_Invoice_Item( company_id : number, id_invoice_company : number){
    const last : invoicesconfig = getCurrent_by_company_id(company_id);
    const company : company = getCompany_by_ID(company_id);

    const item: invoice = {
        id: Date.now(),
        id_invoice_config : id_invoice_company,
        
        formato_general: {
            RTN : company.rtn,
            encabezado: last.encabezado,
            piehoja: last.piedehoja,
            fecha_emision: new Date(),
            id_company: last.id_company,
            numero_de_factura: last.referencia_facturas,
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

}

    export default GenerateInvoiceNumber