import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "@/assets/styles/styles";
import { product } from "@/storage/modals/inventory";

type props = { 
    prod : product,
    updateProd : (upd : product) => void;
}

const ProductModal = ({prod, updateProd} : props) =>{

    return(
        <View style={[styles.cardborder, { margin: 10, backgroundColor: "white", padding: 12, borderRadius: 8 }]}>

        </View>
    )
}

export default ProductModal;