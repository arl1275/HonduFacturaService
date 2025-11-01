import styles from "@/assets/styles/styles";
import { InsertLot } from "@/storage/modals/insertlot_modal";
import React from "react";
import { View, Text } from "react-native";

type props={
    val : InsertLot
}

const RenderInsertingLotItem = ({ val } : props ) => {
    
    return(
        <View style={[styles.flexcomponentsRow, {justifyContent : 'space-between'}]}>
            <Text style={[styles.paragraph]}>{val.insert_lot_num}</Text>
            <Text style={[styles.paragraph]}>{val.status.done ? "DONE" : 'DRAFT'}</Text>
            <Text style={[styles.paragraph]}>{val.id_supplier}</Text>
            <Text style={[styles.paragraph]}>{val.total}</Text>
            <Text style={[styles.paragraph]}>{val.subtotal}</Text>
        </View>
    )
};

export default RenderInsertingLotItem;