export interface supplier{
    id: number, 
    name : string, 
    code : string,
    active : boolean
}

export interface InsertLot {
  id: number;
  id_invo : number,
  id_company : number,
  inventory_destiny_id : number,
  insert_lot_num: string; // sequence: [InventoryCode-xxxxx]
  inserter: string;
  id_supplier: number;
  created_at: Date;
  validated_at: Date | null;     
  status: {
    draft: boolean;
    done: boolean;               
  };
  products: { id_prod: number; cost: number }[];
}
