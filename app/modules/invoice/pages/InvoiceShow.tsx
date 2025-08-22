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

            <View>
                {
                    !_invoice_ ? null :
                        <View style={[{ borderWidth: 1, borderColor: 'grey', borderRadius: 7 }]}>
                            <Text>{comp ? comp.companyname : 'Waiting response'}</Text>
                            <Text>{_invoice_.formato_general.encabezado}</Text>

                            <Text>{comp ? comp.direccion_company : null}</Text>
                            <Text>{comp ? comp.numero_telefono_compay : null}</Text>
                            <Text>{comp ? comp.rtn : null}</Text>
                            <Text>{_invoice_.formato_general.fecha_emision.toString()}</Text>
                            <Text>{invoc ? `Invoice ` : null}</Text>


                            <Text>{formated_invoice_number(_invoice_.formato_general.numero_de_factura)}</Text>
                            <Text>{_invoice_.formato_general.comprador}</Text>
                            <Text>{_invoice_.formato_general.comprador_rtn}</Text>

                            <FlatList
                                data={invoiceLines}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({item}) => (
                                    <View style={[styles.flexcomponentsRow, { borderBottomWidth: 1, borderBottomColor: 'grey' }]}>
                                        <Text style={{ flex: 2, textAlign: 'right' }}>{item.detalle}</Text>
                                        <Text style={{ flex: 2, textAlign: 'right' }}>{item.cantidad}</Text>
                                        <Text style={{ flex: 2, textAlign: 'right' }}>{item.descuento}</Text>
                                        <Text style={{ flex: 2, textAlign: 'right' }}>{item.precio}</Text>
                                    </View>
                                )}
                            />


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