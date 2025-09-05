import { View, Text, Button, FlatList, TouchableOpacity, Alert, TextInput } from "react-native";
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
    const [ListInvoices, setListInvoices] = useState<invoice[]>([]);
    const [filterText, setFilterText] = useState<string>("");
    const [filterType, setFilterType] = useState<"all" | "draft" | "invoice">("all");
    const [onSelectedInvoice, setOnSeltectedInvoie] = useState<invoice>();

    const UpdateList = () => { setSelectedList(getCompanies()) }
    const navigation = useNavigation<InvoiceNavigator>();

    const OnlongPressInvoice = (item: invoice) => {
        setOnSeltectedInvoie(item);
    }

    const UpdateInvoices = () => {
        if (typeof item === 'object') {
            setListInvoices(getInvoices_by_company(item.id))
        }
    }

    const ValidateRoute = () => {
        item != undefined ?
            navigation.navigate("InvoiceGen", { item }) :
            Alert.alert('Detail', 'Select a Company before create an invoice')
    }

    useEffect(() => {
        UpdateList();
    }, []);

    useEffect(() => {
        UpdateInvoices()
    }, [item]);

    const OnSelectInvoice = (item: invoice, type: string) => {
        if (type === 'invoice') {
            navigation.navigate("InvoiceShow", { item })
        } else {
            navigation.navigate("InvoiceDraft", { item });
        }
    }

    const filteredInvoices = ListInvoices.filter(inv => {
        const text = filterText.toLowerCase();
        const matchesText =
            inv.formato_general.comprador.toLowerCase().includes(text) ||
            inv.total.toString().includes(text) ||
            formated_invoice_number(inv.formato_general.numero_de_factura).toLowerCase().includes(text);

        // filtro por tipo
        const matchesType =
            filterType === "all" ? true :
                filterType === "draft" ? inv.status.draft === true :
                    filterType === "invoice" ? inv.status.done === true : true;

        return matchesText && matchesType;
    });

    return (
        <View style={{ flex: 1 }}>
            <Text style={[styles.title, { color: 'black', alignSelf: 'flex-start', marginLeft: 25 }]}>Home Invoice</Text>
            <View style={{ borderBottomColor: '#d5dbdb', borderBottomWidth: 1, marginLeft: 15, marginRight: 15 }} />
            <Text style={[styles.smallText, { color: 'black', textAlign: 'left', margin: 25 }]}>
                Select the company which the Invoice would be generated for (INVOICES REGISTRED : {ListInvoices.length})
            </Text>

            {/* Picker de compañías */}
            <Picker
                selectedValue={item?.rtn ?? "Select a Company"}
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

            <View style={{ borderBottomColor: '#d5dbdb', borderBottomWidth: 1, marginTop: 10 }} />

            <View style={[styles.flexcomponentsRow, { justifyContent: 'space-between', marginBottom: 0 }]}>
                <Button title="GENERATE INVOICE" color={"black"} onPress={() => ValidateRoute()} />
                <Button title="ANULATE INVOICE" color={"red"} />
            </View>

            <View style={{ borderBottomColor: '#d5dbdb', borderBottomWidth: 1, marginTop: 5 }} />

            <View style={[styles.flexcomponentsRow, { justifyContent: 'space-between', marginTop: 0, marginBottom: 0, marginLeft: 10, marginRight: 10, alignItems: 'center' }]}>
                <TextInput
                    placeholder="Buscar"
                    value={filterText}
                    onChangeText={setFilterText}
                    style={{ width: '50%', fontSize: 15, padding: 15, borderWidth: 1, borderColor: 'grey', borderRadius: 5 }}
                />

                <View style={[styles.flexcomponentsRow, { justifyContent: 'space-around', marginBottom: 10, width: '50%' }]}>
                    <TouchableOpacity style={[{ borderRadius: 5, padding: 10, backgroundColor: ListInvoices.length ? "black" : 'grey' }]} onPress={() => setFilterType("all")}
                        disabled={ListInvoices.length ? false : true}>
                        <Text style={[styles.smallText, { color: 'white' }]}>ALL</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[{ borderRadius: 5, padding: 10, backgroundColor: ListInvoices.length ? "black" : 'grey' }]} onPress={() => setFilterType("draft")}
                        disabled={ListInvoices.length ? false : true}>
                        <Text style={[styles.smallText, { color: 'white' }]}>DRAFT</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[{ borderRadius: 5, padding: 10, backgroundColor: ListInvoices.length ? "black" : 'grey' }]} onPress={() => setFilterType("invoice")}
                        disabled={ListInvoices.length ? false : true}>
                        <Text style={[styles.smallText, { color: 'white' }]}>INVOICE</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ borderBottomColor: '#d5dbdb', borderBottomWidth: 1, marginTop: 0 }} />

            <View>
                {
                    filteredInvoices.length > 0 &&
                    <View style={[styles.flexcomponentsRow, { marginLeft: 15, marginRight: 20, justifyContent: 'space-between', marginBottom: 0, marginTop: 0 }]}>
                        <Text style={{ flex: 2, textAlign: 'right' }}>invoice</Text>
                        <Text style={{ flex: 2, textAlign: 'right' }}>status</Text>
                        <Text style={{ flex: 2, textAlign: 'right' }}>total</Text>
                        <Text style={{ flex: 2, textAlign: 'right' }}>client</Text>
                    </View>
                }

                <FlatList
                    data={filteredInvoices}
                    style={{ marginTop: 0 }}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onLongPress={() => OnlongPressInvoice(item)}
                            onPress={() =>{ 
                                OnSelectInvoice(item, item.status.draft ? "draft" : "invoice")}}>
                            <View style={[styles.flexcomponentsRow,
                            {
                                marginLeft: 15, marginRight: 15, borderWidth: 1, padding: 10, borderColor: 'grey', borderRadius: 5, justifyContent: 'space-between', marginTop: 0, marginBottom: 5,
                                backgroundColor: onSelectedInvoice ? (onSelectedInvoice.id === item.id ? "#57534D" : "white") : "white"
                            }]}>
                                <Text style={{ color : onSelectedInvoice ? (onSelectedInvoice.id === item.id ? "white" : "none") : "none", flex: 2, textAlign: 'right' }}>{item.id} // </Text>
                                <Text style={{ color : onSelectedInvoice ? (onSelectedInvoice.id === item.id ? "white" : "none") : "none", flex: 3 }}>{formated_invoice_number(item.formato_general.numero_de_factura)}</Text>
                                <Text style={{ color : onSelectedInvoice ? (onSelectedInvoice.id === item.id ? "white" : "none") : "none", flex: 2, textAlign: 'right' }}>{item.status.draft ? "DRAFT" : item.status.creditnote.done ? "CREDIT NOTE" : 'INVOICE'}</Text>
                                <Text style={{ color : onSelectedInvoice ? (onSelectedInvoice.id === item.id ? "white" : "none") : "none", flex: 2, textAlign: 'right' }}>{item.total}</Text>
                                <Text style={{ color : onSelectedInvoice ? (onSelectedInvoice.id === item.id ? "white" : "none") : "none", flex: 2, textAlign: 'right' }}>{item.formato_general.comprador}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    ListEmptyComponent={<Text style={[styles.smallText, { color: 'black', textAlign: 'left', margin: 15 }]}>NONE DATA YET: select a company to show the invoices and draft</Text>}
                />
            </View>
        </View>
    )
}

export default InvoiceHome;
