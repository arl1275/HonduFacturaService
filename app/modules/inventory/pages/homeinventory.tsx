import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import InvoButton from "../components/buttons";
import ModalCreateInvoiceWH from "../modals/createInventory";

const HomeInventory = () =>{
    const [openmodal, setOpenmodal] = useState<boolean>(false);

    const _OpenModal_ = () =>{
        setOpenmodal(!openmodal);
    }

    const returnState = () =>{return openmodal}

    return(
        <View style={[{flex : 1, margin : 10}]}>
            <ModalCreateInvoiceWH OpenModal={returnState} OnDelete={_OpenModal_}/>
            <TouchableOpacity style={[{width : '20%'}]} onPress={_OpenModal_}>
                <InvoButton title="Generate Inventory" color="black" iconname="archive"/>
            </TouchableOpacity>
        </View>
    )
}

export default HomeInventory;