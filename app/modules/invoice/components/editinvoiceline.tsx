import { useState } from "react";
import { lineafacturada } from "@/storage/invoice";
import { View } from "react-native";

type props = {
    _onCancel_ : () => void,
    prop : lineafacturada,
    _onUpdate_ : ( value : lineafacturada) => void
}

const EditInvoiceLine = ({_onCancel_, prop, _onUpdate_} : props) =>{

    return(
        <View>
            
        </View>
    )

}

export default EditInvoiceLine;