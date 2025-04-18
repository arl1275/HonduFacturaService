import { impuesto } from "./empresa";

export interface rangos {
  id: number;
  numero_uno: number;
  numero_dos: number;
  numero_tres: number;
  numero_cuatro: number;
  active: boolean;
}

export interface descuentos {
  id: number;
  nombre: string;
  porcentaje: number;
  active: boolean;
}

// this is not saved on invoices, it is use to check the values before save
export interface invoicesconfig {
  id: number;
  id_company: number; // this id, is related to the company
  encabezado: string;
  fechalimite: Date;
  rangodefacturas: number;
  cantidad_maxima_efectivo: number;
  piedehoja: string;
  active: boolean;
}

export interface lineafacturada{
    id: number,
    cantidad : number,
    detalle : string,
    descuento : number,
    precio : string,
}

//---------------------------- INVOICE ----------------------------//
export interface invoice {
  id: number;
  formato_general: {
    encabezado: string;
    piehoja: string;
    fecha_emision: Date;
    id_company: number;
    numero_de_factura: rangos; // register the id of rangos
    cai: string; // the cai of the company
  };
  lineasfacturadas : lineafacturada[],
  id_impuesto : impuesto[]
}
