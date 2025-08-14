import { company, impuesto } from "@/storage/empresa";
import { invoice, invoicesconfig, lineafacturada } from "@/storage/invoice";
import { getInvoicesconfig_by_id } from "@/storage/invoiceconfig.storage";

function PreparationInvoice(
    _type_: string,
    _invoice_: invoice,
    _lineasfacturadas_: lineafacturada[],
    _impuesto_: impuesto,
    _comprador_: any,
    _result_: any,
    _company_ : company,
   // _invoice_config_ : invoicesconfig
) {
    let _invoice_config : invoicesconfig[] = getInvoicesconfig_by_id(_invoice_.id_invoice_config);
    let Impuestos: impuesto[] = [];
    Impuestos.push(_impuesto_);


    let NewInvoice: invoice = {
        id: _invoice_.id,
        id_invoice_config: _invoice_.id_invoice_config,

        formato_general: {
            encabezado: _invoice_config[0].encabezado,
            RTN: _company_.rtn,
            piehoja: _invoice_config[0].piedehoja,
            fecha_emision: _invoice_.formato_general.fecha_emision,
            id_company: _invoice_.formato_general.id_company,
            numero_de_factura: _invoice_.formato_general.numero_de_factura, // register the id of rangos
            cai: _invoice_.formato_general.cai, // the cai of the company
            comprador: _comprador_.comprador,
            comprador_rtn: _comprador_.comprador_rtn
        },

        lineasfacturadas: _lineasfacturadas_,
        id_impuesto: Impuestos,
        total: _result_.total,
        subtotal: _result_.subtotal,

        status: {
            draft: _type_ === 'draft' ? true : false,
            done:  _type_ === 'invoice' ? true : false,
            creditnote: {
                done: false,
                creditnote_id: 0
            },
        }
    }

    return NewInvoice;
}

export default PreparationInvoice;