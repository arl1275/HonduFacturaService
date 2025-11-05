import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { supplier } from "@/storage/modals/supplier";
import styles from "@/assets/styles/styles";

type props = {
    val: supplier,
    onEditPress: (Valor: supplier) => void;
}

const SupplierCard = ({ val, onEditPress }: props) => {
    return (
        <TouchableOpacity onPress={()=> onEditPress(val)}>
            <View style={[styles.flexcomponentsRow, styles.cardborder]}>
                <Text style={[styles.smallText, { color: 'black' }]}>{val.code}</Text>
                <Text style={[styles.smallText, { color: 'black' }]}>{val.name}</Text>
                <Text style={[styles.smallText, { color: 'black' }]}>{val.phone_num}</Text>
                <Text style={[styles.smallText, { color: 'black' }]}>{val.email}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default SupplierCard;