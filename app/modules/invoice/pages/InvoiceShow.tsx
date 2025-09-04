import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Text, Button, FlatList, Alert } from "react-native";
import { RootStackParamList } from "../indexInvoice";
import { invoice, invoicesconfig, lineafacturada } from "@/storage/invoice";
import styles from "@/assets/styles/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { formated_invoice_number, formated_invoice_number_maximum, formated_date_ } from "../utils/InvoiceNumberGenerator";
import { getCompany_by_ID } from "@/storage/company.storage";
import { getInvoicesconfig_by_id } from "@/storage/invoiceconfig.storage";
import { company } from "@/storage/empresa";
import { updateInvoiceById } from "@/storage/invoices.storage";
import Preparation_CREDIT_NOTE from "../utils/Credit_Note_Generator"; // this function is to create a credit note

type props = StackScreenProps<RootStackParamList, "InvoiceShow">


const InvoiceShowPage = ({ route, navigation }: props) => {
    const { item } = route.params;
    const [_invoice_, setInvoice] = useState<invoice>();
    const [comp, setComp] = useState<company>()
    const [invoc, setInvoiceConfig] = useState<invoicesconfig>();
    const [invoiceLines, setInvoiceLines] = useState<lineafacturada[]>([])


    useEffect(() => {
        setInvoice(item);
        GetCompany(item.formato_general.id_company);
        GetInvoiceConfig(item.id_invoice_config);
        setInvoiceLines(item.lineasfacturadas);
    }, [item]);

    const GetCompany = (value: number) => {
        let val = getCompany_by_ID(value);
        setComp(val);
    }

    const GetInvoiceConfig = (value: number) => {
        let val = getInvoicesconfig_by_id(value);
        setInvoiceConfig(val);
    }

    const oncancel = () => { setInvoice(undefined), navigation.navigate("HomeInvoice") };

    const totalLine = (item: lineafacturada) => {
        let factorDiscont = item.descuento === 0 ? 1 : ((100 - item.descuento) / 100)
        let total = (item.cantidad * item.precio) * factorDiscont
        return total.toFixed(2).toString();
    }

    const UpdatetheInvoice = () => {
        if (_invoice_) {
            updateInvoiceById(_invoice_?.id, _invoice_)
        }

    }

    const CreateCreditNote = () => {
        Alert.alert("CREDIT NOTE", "Are u sure you want to create a credit note?", [{
            text: 'YES',
            onPress: () => { }
        }, {
            text: 'NO',
        }
        ])
    }



    return (
        <View style={[{ flex: 1 }]}>
            <View style={[styles.flexcomponentsRow, { margin: 5 }]}>
                <TouchableOpacity onPress={() => oncancel()}>
                    <Ionicons name="chevron-back" size={30} color="black" />
                </TouchableOpacity>
                <Text style={[styles.paragraph, styles.textalingleft, { color: 'black' }]}>Invoice Number ( {_invoice_ ? formated_invoice_number(_invoice_.formato_general.numero_de_factura) : 'N/A'} )</Text>
            </View>

            <View style={[styles.flexcomponentsRow, { width: '100%', justifyContent: 'space-between' }]}>
                <Button title="Print" color={'black'} />
                <Button title="Share" color={'black'} />
                <Button title="GEN CREDIT NOTE" color={'RED'} />
            </View>

            <View style={[{ margin: 10 }]}>
                {
                    !_invoice_ ? null :
                        <View style={[{ borderWidth: 1, borderColor: 'grey', borderRadius: 7, padding: 15 }]}>
                            <Text style={[styles.paragraph, { color: 'black', margin: 0, fontWeight: 'bold' }]}>{comp ? comp.companyname : 'Waiting response'}</Text>

                            {invoc?.encabezado ? <Text style={[{ color: 'black', fontStyle: 'italic', fontSize: 17, marginBottom: 5 }]}>{invoc.encabezado}</Text> : null}

                            <Text style={[{ fontWeight: 'bold', marginBottom: 5 }]}>{invoc ? `Invoice ${formated_invoice_number(_invoice_.formato_general.numero_de_factura)}` : null}</Text>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>
                                <Text>Dirección:</Text>
                                <Text>{comp ? comp.direccion_company : ""}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>
                                <Text>Teléfono:</Text>
                                <Text>{comp ? comp.numero_telefono_compay : ""}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>
                                <Text>RTN:</Text>
                                <Text>{comp ? comp.rtn : ""}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>
                                <Text>CAI:</Text>
                                <Text>{invoc ? invoc.cai.nombre : ""}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>
                                <Text>Fecha de emisión:</Text>
                                <Text>{formated_date_(_invoice_.formato_general.fecha_emision.toString())}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>
                                <Text>Comprador:</Text>
                                <Text>{_invoice_.formato_general.comprador}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>
                                <Text>RTN Comprador:</Text>
                                <Text>{_invoice_.formato_general.comprador_rtn}</Text>
                            </View>


                            <View style={[{ marginTop: 10, marginBottom: 10, borderTopWidth: 1, borderTopColor: 'black', borderBottomColor: 'black', borderBottomWidth: 1 }]}>

                                <View style={[styles.flexcomponentsRow, { justifyContent: 'space-between', width: '100%', margin: 0 }]}>
                                    <Text style={[styles.smallText, { flex: 2, textAlign: 'left', color: 'black', fontWeight: 'bold' }]}>Detail</Text>
                                    <Text style={[styles.smallText, { flex: 2, textAlign: 'left', color: 'black', fontWeight: 'bold' }]}>Discount</Text>
                                    <Text style={[styles.smallText, { flex: 2, textAlign: 'left', color: 'black', fontWeight: 'bold' }]}>Amount</Text>
                                    <Text style={[styles.smallText, { flex: 2, textAlign: 'left', color: 'black', fontWeight: 'bold' }]}>Price</Text>
                                </View>

                                <FlatList
                                    data={invoiceLines}
                                    keyExtractor={(item) => item.id.toString()}
                                    renderItem={({ item }) => (
                                        <View style={[styles.flexcomponentsRow, { borderTopWidth: 1, borderTopColor: 'grey', marginTop: 0, marginBottom: 0 }]}>
                                            <Text style={[{ flex: 2, textAlign: 'left' }]}>{item.detalle}</Text>
                                            <Text style={[{ flex: 2, textAlign: 'left' }]}>{item.descuento}</Text>
                                            <Text style={[{ flex: 2, textAlign: 'left' }]}>{item.cantidad}</Text>
                                            <Text style={[{ flex: 2, textAlign: 'left' }]}>{totalLine(item)}</Text>
                                        </View>
                                    )}
                                />
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6, width: "25%" }}>
                                <Text style={{ fontWeight: 'bold' }}>Total</Text>
                                <Text>{_invoice_.total.toFixed(2)}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6, width: "25%" }}>
                                <Text style={{ fontWeight: 'bold' }}>Subtotal</Text>
                                <Text>{_invoice_.subtotal.toFixed(2)}</Text>
                            </View>

                            <Text>{_invoice_.formato_general.piehoja}</Text>

                            <View style={[styles.flexcomponentsRow, { margin: 0, padding: 0, justifyContent: "space-between" }]}>
                                <Text>Rango de emision: </Text>
                                <Text>{formated_invoice_number(invoc?.referencia_facturas)} hasta {formated_invoice_number_maximum(invoc?.referencia_facturas, invoc?.numero_maximo)}</Text>
                            </View>

                            <View style={[styles.flexcomponentsRow, { margin: 0, padding: 0, justifyContent: "space-between" }]}>
                                <Text>Fecha de emision maxima:</Text>
                                <Text style={[{ textAlign: 'right' }]}>{formated_date_(invoc?.fechalimite.toString())}</Text>
                            </View>

                        </View>
                }

            </View>

        </View>
    )
}

export default InvoiceShowPage;