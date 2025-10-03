export interface product{
    id: number,
    created_at : Date,
    name : string, 
    code : string,
    barcode : string,
    extracode : string,
    specialTax : number,
    price : number,
    amountStock : number,
    type : {
        consumible : boolean,
        discret :boolean,
    },
    expiration_date : Date | null,
    id_inventory : number,
    active : boolean,
    active_POS : boolean,
    allow_negative_stock : boolean,
    block_edit : boolean
}

export interface inventoryWH{
    id : number,
    id_company : number,
    created_at : Date,
    active : boolean,
    name : string, 
    code : string,
    type : {
        physical : boolean,
        virtual : boolean
    }
    ubication : string,
    block_edit : boolean
}