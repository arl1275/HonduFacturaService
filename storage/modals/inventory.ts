type product={
    id: number,
    name : string, 
    code : string,
    barcode : string,
    extracode : string,
    specialTax : number,
    price : number,
    amountStock : number,
    active : boolean
}

type inventoryWH={
    id : number,
    created_at : Date,
    active : boolean,
    name : string, 
    code : string,
    ubication : string,
}