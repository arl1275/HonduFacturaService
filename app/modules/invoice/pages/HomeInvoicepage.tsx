import { View, Text, Button, FlatList } from "react-native";
import styles from "@/assets/styles/styles";
import { Picker } from '@react-native-picker/picker';
import { getCompanies } from "@/storage/company.storage";
import { company } from "@/storage/empresa";
import React, { useEffect, useState } from "react";
import { invoice } from "@/storage/invoice";
import { getInvoices_by_ID, getInvoices_by_company } from "@/storage/invoices.storage";
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
        if (typeof item === 'object') {
            setListInvoices(getInvoices_by_company(item.id))
        } else {
            console.log('error', typeof item)
        }
    }

    const ValidateRoute = () => {
        item != undefined ? navigation.navigate("InvoiceGen", { item }) : null
    }

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
                <FlatList
                    data={ListInvoices}
                    style={[styles.flexcomponentsRow]}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={[styles.title]}>
                            <Text>{item.id}</Text>
                        </View>
                    )}
                    ListEmptyComponent={<Text>NONE DATA YET</Text>}
                />
            </View>

        </View>
    )
}

export default InvoiceHome;