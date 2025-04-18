
export interface impuesto{
    id: number,
    nombre: string,
    porcentaje: number,
    active: boolean
}

export interface cais{
    id: number,
    nombre: string,
    active: boolean
}

//-------------------------------------- main company --------------------------------------//
export interface company{
    id : number,
    companyname : string,
    rtn : string,
    direccion_company : string,
    direccion_correo : string,
    numero_telefono_compay : string,
    cais : cais[],
    active : boolean
}
//--------------------------------------------------------------------------------------------//

