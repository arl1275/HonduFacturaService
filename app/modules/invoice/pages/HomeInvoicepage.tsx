import { View, Text, Button, FlatList, TouchableOpacity, Alert } from "react-native";
import styles from "@/assets/styles/styles";
import { Picker } from '@react-native-picker/picker';
import { getCompanies } from "@/storage/company.storage";
import { company } from "@/storage/empresa";
import React, { useEffect, useState } from "react";
import { invoice } from "@/storage/invoice";
import { getInvoices_by_company } from "@/storage/invoices.storage";
import { formated_invoice_number } from "../utils/InvoiceNumberGenerator";
// router imports 
import { RootStackParamList } from "../indexInvoice";
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

type InvoiceNavigator = StackNavigationProp<RootStackParamList, "HomeInvoice">

const InvoiceHome = () => {
    const [item, setSelectedValue] = useState<company | undefined>();
    const [SelectedList, setSelectedList] = useState<company[]>([]);
    const [ListInvoices, setListInvoices] = useState<invoice[]>([])
    const UpdateList = () => { setSelectedList(getCompanies()) }
    const navigation = useNavigation<InvoiceNavigator>();

    const UpdateInvoices = () => {
        if (typeof item === 'object') { setListInvoices(getInvoices_by_company(item.id)) }
    }

    const ValidateRoute = () => { item != undefined ? navigation.navigate("InvoiceGen", { item }) : Alert.alert('Detail', 'Select a Company before create an invoice') }

    useEffect(() => {
        UpdateList();
    }, []);

    useEffect(() => {
        UpdateInvoices()
    }, [item]);


    return (
        <View style={{ flex: 1 }}>
            <Text style={[styles.title, { color: 'black', alignSelf: 'flex-start', marginLeft: 25 }]}>Home Invoice</Text>
            <View style={{ borderBottomColor: '#d5dbdb', borderBottomWidth: 1, marginLeft: 15, marginRight: 15 }} />
            <Text style={[styles.paragraph, { color: 'black', alignSelf: 'flex-start', margin: 25 }]}>
                Select the company which the Invoice would be generated for (INVOICES REGISTRED : {ListInvoices.length})
            </Text>

            <Picker
                selectedValue={item?.rtn ?? "Select a Company"} // Usamos el rtn del objeto actual o el valor por defecto
                onValueChange={(itemValue) => {
                    if (itemValue === "Select a Company") {
                        setSelectedValue(undefined);
                    } else {
                        const selectedCompany = SelectedList.find(company => company.rtn === itemValue);
                        setSelectedValue(selectedCompany);
                    }
                }}
                style={[styles.rectanglebutton, { alignSelf: 'center', height: 50, aspectRatio: 7.0, marginTop: 10 }]}
            >
                <Picker.Item label={"Select a Company"} value={"Select a Company"} key={"000000"} />
                {
                    SelectedList && SelectedList.map((company: company) => (
                        <Picker.Item label={company.companyname} value={company.rtn} key={company.rtn} />
                    ))
                }
            </Picker>


            <View style={{ borderBottomColor: '#d5dbdb', borderBottomWidth: 1, marginTop: 15 }} />

            <View style={[styles.flexcomponentsRow, { justifyContent: 'space-between' }]}>
                <Button title="GENERATE INVOICE" color={"black"} onPress={() => ValidateRoute()} />
                <Button title="ANULATE INVOICE" color={"red"} />
            </View>

            <View>
                {
                    ListInvoices.length > 0 &&
                    <View style={[styles.flexcomponentsRow, { marginLeft: 15, marginRight: 20, justifyContent: 'space-between', marginBottom: 0, marginTop: 0 }]}>
                        <Text style={{ flex: 2, textAlign: 'right' }}>invoice</Text>
                        <Text style={{ flex: 2, textAlign: 'right' }}>status</Text>
                        <Text style={{ flex: 2, textAlign: 'right' }}>total</Text>
                        <Text style={{ flex: 2, textAlign: 'right' }}>client</Text>
                    </View>
                }


                <FlatList
                    data={ListInvoices}
                    style={{ marginTop: 0 }}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={[styles.flexcomponentsRow,
                        { marginLeft: 15, marginRight: 15, borderWidth: 1, padding: 10, borderColor: 'grey', borderRadius: 7, justifyContent: 'space-between', marginTop: 0 }]}>
                            <Text style={{ flex: 3 }}>{formated_invoice_number(item.formato_general.numero_de_factura)}</Text>
                            <Text style={{ flex: 2, textAlign: 'right' }}>{item.status.draft ? "DRAFT" : item.status.done ? "INVOICE" : item.status.creditnote.done ? "CREDIT NOTE" : 'UNDEFINED'}</Text>
                            <Text style={{ flex: 2, textAlign: 'right' }}>{item.total}</Text>
                            <Text style={{ flex: 2, textAlign: 'right' }}>{item.formato_general.comprador}</Text> 
                        </View>
                    )}
                    ListEmptyComponent={<Text>NONE DATA YET</Text>}
                /></View>

        </View>
    )
}

export default InvoiceHome;