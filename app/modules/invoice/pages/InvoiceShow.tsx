import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Text, Button, FlatList } from "react-native";
import { RootStackParamList } from "../indexInvoice";
import { invoice, invoicesconfig, lineafacturada } from "@/storage/invoice";
import styles from "@/assets/styles/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { formated_invoice_number } from "../utils/InvoiceNumberGenerator";
import { getCompany_by_ID } from "@/storage/company.storage";
import { getInvoicesconfig_by_id } from "@/storage/invoiceconfig.storage";
import { company } from "@/storage/empresa";

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
        setInvoiceConfig(val[0]);
    }

    const oncancel = () => { setInvoice(undefined), navigation.navigate("HomeInvoice") };

    const totalLine = ( item : lineafacturada) =>{
        let factorDiscont = item.descuento === 0 ? 1 : ((100 - item.descuento) / 100)
        let total = (item.cantidad * item.precio) * factorDiscont
        return total.toFixed(2).toString();
    }

    return (
        <View style={[{ flex: 1 }]}>
            <View style={[styles.flexcomponentsRow, { margin: 5 }]}>
                <TouchableOpacity onPress={() => oncancel()}>
                    <Ionicons name="chevron-back" size={30} color="black" />
                </TouchableOpacity>
                <Text style={[styles.paragraph, styles.textalingleft, { color: 'black' }]}>Invoice Number ( {_invoice_ ? formated_invoice_number(_invoice_.formato_general.numero_de_factura) : 'N/A'} )</Text>
            </View>

            <View style={[styles.flexcomponentsRow, {}]}>
                <Button title="Print" color={'black'} />
                <Button title="Share" color={'black'} />
            </View>

            <View style={[{ margin: 10 }]}>
                {
                    !_invoice_ ? null :
                        <View style={[{ borderWidth: 1, borderColor: 'grey', borderRadius: 7, padding: 15 }]}>
                            <Text style={[styles.paragraph, { color: 'black', margin: 0, fontWeight: 'bold' }]}>{comp ? comp.companyname : 'Waiting response'}</Text>
                            {
                                invoc?.encabezado ?
                                    <Text style={[{color : 'black'}]}>{invoc.encabezado}</Text>
                                    : null
                            }


                            <Text>Direccion: {comp ? comp.direccion_company : null}</Text>
                            <Text>Telefono: {comp ? comp.numero_telefono_compay : null}</Text>
                            <Text>RTN: {comp ? comp.rtn : null}</Text>
                            <Text>CAI: {invoc ? invoc.cai.nombre : null}</Text>
                            <Text>Fecha de emision {_invoice_.formato_general.fecha_emision.toString()}</Text>
                            <Text>{invoc ? `Invoice ${formated_invoice_number(_invoice_.formato_general.numero_de_factura)}` : null}</Text>

                            <Text>{_invoice_.formato_general.comprador}</Text>
                            <Text>{_invoice_.formato_general.comprador_rtn}</Text>

                            <View style={[{marginTop : 10, marginBottom : 10}]}>
                                <FlatList
                                    data={invoiceLines}
                                    keyExtractor={(item) => item.id.toString()}
                                    renderItem={({ item }) => (
                                        <View style={[styles.flexcomponentsRow, { borderBottomWidth: 1, borderBottomColor: 'grey', marginTop: 0, marginBottom: 0 }]}>
                                            <Text style={[{ flex: 2, textAlign: 'left' }]}>{item.detalle}</Text>
                                            <Text style={[{ flex: 2, textAlign: 'left' }]}>{item.descuento}</Text>
                                            <Text style={[{ flex: 2, textAlign: 'left' }]}>{item.cantidad}</Text>
                                            <Text style={[{ flex: 2, textAlign: 'left' }]}>{totalLine(item)}</Text>
                                        </View>
                                    )}
                                />
                            </View>

                            <Text>Total {_invoice_.total}</Text>
                            <Text>Subtotal {_invoice_.subtotal}</Text>
                            <Text>{_invoice_.formato_general.piehoja}</Text>
                        </View>
                }

            </View>

        </View>
    )
}

export default InvoiceShowPage;