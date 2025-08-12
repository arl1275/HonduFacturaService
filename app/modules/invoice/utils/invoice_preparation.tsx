import { impuesto } from "@/storage/empresa";
import { invoice, lineafacturada } from "@/storage/invoice";
import React, { useState } from "react";

function PreparationInvoice(
    _type_: string,
    _invoice_: invoice,
    _lineasfacturadas_: lineafacturada[],
    _impuesto_: impuesto,
    _comprador_: any,
    _result_: any) {

    let Invoice = _invoice_;
    let Impuestos: impuesto[] = [];
    Impuestos.push(_impuesto_);

    Invoice.lineasfacturadas = _lineasfacturadas_;
    Invoice.formato_general.comprador = _comprador_.comprador;
    Invoice.formato_general.comprador_rtn = _comprador_.comprador_rtn;
    Invoice.total = _result_.total;
    Invoice.status = _result_.subtotal

    // setInvoice(prev => {
    //     if (!prev) return prev;
    //     return {
    //         ...prev,
    //         lineasfacturadas: _lineasfacturadas_,
    //         formato_general: {
    //             ...prev.formato_general,
    //             comprador: _comprador_.comprador,
    //             comprador_rtn: _comprador_.comprador_rtn
    //         },
    //         total: _result_.total,
    //         subtotal: _result_.subtotal,
    //         id_impuesto: Impuestos
    //     };
    // });

    // if (_type_ === 'invoice') {
    //      setInvoice(prev => {
    //         if (!prev) return prev;
    //         return {
    //             ...prev,
    //             status: {
    //                 ...prev.status, 
    //                 done: true,
    //             },
    //         };
    //     });
    // }

    return Invoice;
}

export default PreparationInvoice;