import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Text, Button } from "react-native";
import { RootStackParamList } from "../indexInvoice";
import { invoice } from "@/storage/invoice";
import styles from "@/assets/styles/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { formated_invoice_number } from "../utils/InvoiceNumberGenerator";

type props = StackScreenProps<RootStackParamList, "InvoiceShow">


const InvoiceShowPage = ({ route, navigation } : props) =>{
    const { item } = route.params;
    const [_invoice_, setInvoice] = useState<invoice>();

    useEffect(()=>{
        setInvoice(item);
    }, [item]);

    const oncancel = () => { setInvoice(undefined), navigation.navigate("HomeInvoice") };

    return(
        <View style={[{flex : 1}]}>
            <View style={[styles.flexcomponentsRow, { margin: 5 }]}>
                <TouchableOpacity onPress={() => oncancel()}>
                    <Ionicons name="chevron-back" size={30} color="black" />
                </TouchableOpacity>
                <Text style={[styles.paragraph, styles.textalingleft, { color: 'black' }]}>Invoice Number ( {_invoice_? formated_invoice_number(_invoice_.formato_general.numero_de_factura) : 'N/A'} )</Text>
            </View>

            <View>
                <Button title="Print" color={'black'}/>
                <Button title="Share" color={'black'}/>
            </View>
            
            <View>

            </View>

        </View>
    )
}

export default InvoiceShowPage;