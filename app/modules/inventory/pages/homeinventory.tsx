import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import InvoButton from "../components/buttons";

const Homeinvoice = () =>{
    
    return(
        <View style={[{flex : 1, margin : 10}]}>
            <TouchableOpacity style={[{width : '20%'}]}>
                <InvoButton title="Generate Inventory" color="black" iconname="archive"/>
            </TouchableOpacity>
        </View>
    )
}

export default Homeinvoice;