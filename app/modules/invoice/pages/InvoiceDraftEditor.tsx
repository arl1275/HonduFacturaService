import React from "react";
import { View } from "react-native";
import { RootStackParamList } from "../indexInvoice";
import { StackScreenProps } from "@react-navigation/stack";

type props = StackScreenProps<RootStackParamList, "InvoiceDraft">

const InvoiceDraftEditorPage = ({ route, navigation } : props) =>{
    const { item } = route.params;
    return(
        <View></View>
    )
}

export default InvoiceDraftEditorPage;