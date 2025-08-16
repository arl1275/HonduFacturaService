import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { View } from "react-native";
import { RootStackParamList } from "../indexInvoice";

type props = StackScreenProps<RootStackParamList, "InvoiceShow">


const InvoiceShowPage = ({ route, navigation } : props) =>{
    const { item } = route.params;
    return(
        <View></View>
    )
}

export default InvoiceShowPage;