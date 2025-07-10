import { invoice, rangos } from "@/storage/invoice";
import { invoicesconfig } from "@/storage/invoice";
import { getCurrent } from "@/storage/invoiceconfig.storage";
import { getCompany_by_ID } from "@/storage/company.storage";
import { company } from "@/storage/empresa";

function getLastconfig() {

}

function GenerateInvoiceNumber() {

}

function Generate_Invoice_Item(){
    const last : invoicesconfig = getCurrent();
    const company : company = getCompany_by_ID(last.id_company);

    const item: invoice = {
        id: Date.now(),

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