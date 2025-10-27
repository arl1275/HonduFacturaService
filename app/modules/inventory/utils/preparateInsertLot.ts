import { getInsertLots_by_idWH } from "@/storage/insertlot.storage";
import { InsertLot } from "@/storage/modals/insertlot_modal";
import { inventoryWH } from "@/storage/modals/inventory";

const get_last_insertlot = (inventory_id: number): InsertLot | null => {
  const lots: InsertLot[] = getInsertLots_by_idWH(inventory_id);
  if (!lots || lots.length === 0) return null;

  const toTime = (v: Date | string) =>
    v instanceof Date ? v.getTime() : new Date(v).getTime();

  return lots.reduce((latest, curr) => {
    if (!latest) return curr;
    return toTime(curr.created_at) > toTime(latest.created_at) ? curr : latest;
  }, null as InsertLot | null);
};

const ReturnNewNum = (lastNum: string): string => {
  const m = lastNum.match(/^(.*?)-(\d+)$/);
  if (!m) throw new Error("Formato inválido. Se esperaba algo como 'PREFIJO-00000'.");

  const prefix = m[1];
  const numStr = m[2];
  const width = numStr.length;

  const next = parseInt(numStr, 10) + 1;
  const nextStr = next.toString();

  if (nextStr.length > width) {
    throw new Error(`Se superó el máximo (${"9".repeat(width)}).`);
  }

  const padded = nextStr.padStart(width, "0");
  return `${prefix}-${padded}`;
};

const PreparationLot = (invo: inventoryWH) => {
  const value: InsertLot | null = get_last_insertlot(invo.id);
    let lastNumber : string = "";
    value != null ? lastNumber = ReturnNewNum(value.insert_lot_num) : lastNumber = invo.code.toString() + "-00001" 


    let Prepared: InsertLot = {
      id: Date.now(),
      id_invo: invo.id,
      id_company: invo.id_company,
      inventory_destiny_id: 0,
      insert_lot_num: lastNumber,
      inserter: "", // this will be updated...
      id_supplier: 0, // this will be updated
      created_at: new Date(),
      validated_at: null,
      status: {
        draft: true,
        done: false,
      },
      products: [],
    };

    return Prepared;
};

export default PreparationLot;
