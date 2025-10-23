import { InsertLot } from "@/storage/modals/insertlot_modal";
import { inventoryWH } from "@/storage/modals/inventory";

const PreparationLot = ( invo : inventoryWH) => {
 let Prepared : InsertLot = {
     id: Date.now(),
     id_invo: invo.id,
     id_company: invo.id_company,
     inventory_destiny_id: 0,
     insert_lot_num: "",
     inserter: "",
     id_supplier: 0,
     created_at: new Date,
     validated_at: null,
     status: {
         draft: true,
         done: false
     },
     products: []
 }

 return Prepared;
}

export default PreparationLot;