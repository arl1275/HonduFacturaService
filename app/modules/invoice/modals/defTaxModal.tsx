import React, { useEffect, useState } from "react";
import { impuesto } from "@/storage/modals/empresa";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import styles from "@/assets/styles/styles";

type props = {
    taxes: impuesto[];
    SendSelected: (tax: impuesto) => void;
    On_Close : () => void;
}

const PickerTaxInvoice = ({ taxes, SendSelected, On_Close }: props) => {
    const [_taxes_, setTaxes] = useState<impuesto[]>([]);

    useEffect(() => {
        setTaxes(taxes)
    }, [taxes]);

    return (
        <View style={[{borderRadius : 7, width : '100%', backgroundColor : 'white'}]}>
            <Text style={[styles.paragraph, {color : 'black', fontWeight : 'bold', margin : 10}]}>SELECT A TAX TO APPLY</Text>
            <View>
                <FlatList
                    data={_taxes_}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={(item) => (
                        <TouchableOpacity onPress={()=>{SendSelected(item.item); On_Close()}}>
                            <View style={[styles.flexcomponentsRow, 
                                {width : '90%', borderBottomWidth: 0.5, borderBottomColor: 'grey', alignItems : 'center', justifyContent : 'space-between' }]}>
                                <Text>{item.item.nombre}</Text>
                                <Text>{item.item.porcentaje}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    )

}

export default PickerTaxInvoice;