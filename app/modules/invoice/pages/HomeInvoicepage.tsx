import { View, Text, Button} from "react-native";
import styles from "@/assets/styles/styles";
import { Picker } from '@react-native-picker/picker';
import { getCompanies } from "@/storage/company.storage";
import { company } from "@/storage/empresa";
import React, { useEffect, useState } from "react";
import { invoice } from "@/storage/invoice";
import { getInvoices_by_ID } from "@/storage/invoices.storage";
// router imports 
import { RootStackParamList } from "../indexInvoice";
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

type InvoiceNavigator = StackNavigationProp<RootStackParamList, "HomeInvoice">

const InvoiceHome = () => {
    const [item, setSelectedValue] = useState<company>();
    const [SelectedList, setSelectedList] = useState<company[]>([]);
    const [ListInvoices, setListInvoices] = useState<invoice[]>([])
    const UpdateList = () => { setSelectedList(getCompanies()) }
    const UpdateInvoices = () => {item && setListInvoices(getInvoices_by_ID(item?.id))}
    const navigation = useNavigation<InvoiceNavigator>();

    const ValidateRoute = () =>{
        item != undefined ? navigation.navigate("InvoiceGen", {item}) : null
    }

    useEffect(() => {
        UpdateList();
    }, []);

    useEffect(()=>{
        UpdateInvoices()
    }, [item]);

    return (
        <View style={{flex : 1}}>
            <Text style={[styles.title, { color: 'black', alignSelf: 'flex-start', marginLeft: 25 }]}>Home Invoice</Text>
            <View style={{ borderBottomColor: '#d5dbdb', borderBottomWidth: 1, marginLeft: 15, marginRight: 15 }} />
            <Text style={[styles.paragraph, { color: 'black', alignSelf: 'flex-start', margin: 25 }]}>
                Select the company which the Invoice would be generated for
            </Text>

            <Picker
                selectedValue={item}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                style={[ styles.rectanglebutton, {alignSelf : 'center', height : 50, aspectRatio: 7.0, marginTop : 10 }]}
            >
                <Picker.Item label={"Select a Company"} value={"Select a Company"} key={"000000"} />
                {
                    SelectedList &&
                    (
                        SelectedList.map((item: company) => (
                            <Picker.Item label={item.companyname} value={item.rtn} key={item.rtn} />
                        ))
                    )
                }
            </Picker>

            <View style={{ borderBottomColor: '#d5dbdb', borderBottomWidth: 1, marginTop : 15}} />

            <View style={[styles.flexcomponentsRow, { justifyContent : 'space-between'}]}>
                <Button title="GENERATE INVOICE"color={"black"} onPress={()=> ValidateRoute()}/>
                <Button title="ANULATE INVOICE" color={"red"}/>
            </View>

        </View>
    )
}

export default InvoiceHome;