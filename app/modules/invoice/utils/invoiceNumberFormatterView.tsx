import { invoicesconfig, invoice } from "@/storage/invoice";
import { getInvoicesconfig_by_id } from "@/storage/invoiceconfig.storage";

function formaterNumberbyNumber(bruto :string, valor : string){
    const dif = bruto.length - valor.length;
    let result =  bruto.substring(0, dif) + valor
    return result.toString();
}

function formaterInvoiceNumberView(invo : invoice){
    let invoconf : invoicesconfig = getInvoicesconfig_by_id(invo.id_invoice_config);
    let ResultSplitted = invoconf.referencia_bruta.split("-");

    let Result : string[] = [];
    let ValoresInvoice = [
        invo.formato_general.numero_de_factura.numero_uno,
        invo.formato_general.numero_de_factura.numero_dos,
        invo.formato_general.numero_de_factura.numero_tres,
        invo.formato_general.numero_de_factura.numero_cuatro,
    ];

    for(let i = 0; i < ResultSplitted.length; i++ ){
        Result.push(formaterNumberbyNumber(ResultSplitted[i], ValoresInvoice[i].toString()));
    }

    return Result;
}

export default formaterInvoiceNumberView;