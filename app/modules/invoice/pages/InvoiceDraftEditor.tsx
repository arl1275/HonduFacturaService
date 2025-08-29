import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Text, Button, FlatList, TextInput, Alert } from "react-native";
import { RootStackParamList } from "../indexInvoice";
import { invoice, invoicesconfig, lineafacturada } from "@/storage/invoice";
import styles from "@/assets/styles/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { formated_invoice_number, formated_invoice_number_maximum, formated_date_ } from "../utils/InvoiceNumberGenerator";
import { getCompany_by_ID } from "@/storage/company.storage";
import { getInvoicesconfig_by_id } from "@/storage/invoiceconfig.storage";
import { company, impuesto } from "@/storage/empresa";
import { updateInvoiceById } from "@/storage/invoices.storage";

type props = StackScreenProps<RootStackParamList, "InvoiceDraft">;

const InvoiceSDrafrEditor = ({ route, navigation }: props) => {
    const { item } = route.params;
    const [_invoice_, setInvoice] = useState<invoice>();
    const [comp, setComp] = useState<company>();
    const [invoc, setInvoiceConfig] = useState<invoicesconfig>();
    const [invoiceLines, setInvoiceLines] = useState<lineafacturada[]>([]);
    const [result, setResult] = useState({ total: 0, subtotal: 0 });

    useEffect(() => {
        setInvoice(item);
        GetCompany(item.formato_general.id_company);
        GetInvoiceConfig(item.id_invoice_config);
        setInvoiceLines(item.lineasfacturadas);
    }, [item]);

    const GetCompany = (value: number) => {
        let val = getCompany_by_ID(value);
        setComp(val);
    };

    const GetInvoiceConfig = (value: number) => {
        let val = getInvoicesconfig_by_id(value);
        setInvoiceConfig(val);
    };

    const oncancel = () => {
        setInvoice(undefined), navigation.navigate("HomeInvoice");
    };

    const UpdateResultValue = () => {
        let Subtotal: number;
        let total: number =
            invoiceLines.reduce((sum, item) => sum + item.cantidad * item.precio * (item.descuento === 0 ? 1 : (100 - item.descuento) / 100), 0);
        let x = total.toFixed(2)
        let _total_ = parseFloat(x);

        if (comp && _invoice_?.id_impuesto) {
            let btotal: number = _total_ * ((100 - _invoice_.id_impuesto[0].porcentaje) / 100);
            Subtotal = parseFloat(btotal.toFixed(2));
        }

        setResult(prev => ({
            ...prev,
            subtotal: Subtotal,
            total: _total_
        }));
    };

    const updateBuyer = (field: "comprador" | "comprador_rtn", value: string) => {
        setInvoice(prev =>
            prev ? {
                ...prev,
                formato_general: {
                    ...prev.formato_general,
                    [field]: value,
                },
            }
                : prev
        );
    };

    const updateLine = (id: number, field: keyof lineafacturada, value: string) => {
        const updated = invoiceLines.map(line =>
            line.id === id
                ? {
                    ...line,
                    [field]:
                        field === "cantidad" || field === "precio" || field === "descuento"
                            ? parseFloat(value) || 0
                            : value,
                }
                : line
        );
        setInvoiceLines(updated);
        setInvoice(prev => (prev ? { ...prev, lineasfacturadas: updated } : prev));
    };

    useEffect(() => {
        UpdateResultValue()
    }, [invoiceLines]);

    const updateInvoiceDRAFT = () => {
        setInvoice(prev => 
        (prev ? {
            ...prev,
            total : result.total,
            subtotal : result.subtotal
        } : prev)
        )

        // this is to save 
        if (_invoice_) {
            updateInvoiceById(_invoice_?.id, _invoice_)
        }
        oncancel();
        Alert.alert('DRAFT UPDATED', "The draft has been updated, look it up again, if you want to make an invoice from a draft")
    }

    return (
        <View style={[{ flex: 1 }]}>
            <View style={[styles.flexcomponentsRow, { margin: 5 }]}>
                <TouchableOpacity onPress={() => oncancel()}>
                    <Ionicons name="chevron-back" size={30} color="black" />
                </TouchableOpacity>
                <Text style={[styles.paragraph, styles.textalingleft, { color: "black" }]}>
                    Invoice Number DRAFT ( {_invoice_ ? formated_invoice_number(_invoice_.formato_general.numero_de_factura) : "N/A"} )
                </Text>
            </View>

            <View style={[styles.flexcomponentsRow, { justifyContent: 'space-between' }]}>
                <Button title="Print" color={"black"} />
                <Button title="Share" color={"black"} />
                <Button title="GEN INVOICE" color={"black"} />
                <Button title="CANCEL" color={"red"} />
            </View>

            <Text style={[styles.smallText, styles.textalingleft, { color: "black", width : '90%' }]}>
                This view is to modify the lines previusly added in the generation of the invoice, there is not posible to add new lines.
            </Text>

            <View style={[{ margin: 10 }]}>
                {!_invoice_ ? null : (
                    <View style={[{ borderWidth: 1, borderColor: "grey", borderRadius: 7, padding: 15 }]}>
                        <View style={[styles.flexcomponentsRow, { width: '100%', justifyContent: 'space-between', margin: 0, padding: 0, marginBottom: 5 }]}>
                            <Text style={[styles.paragraph, { color: "black", margin: 0, fontWeight: "bold", textAlignVertical: 'center' }]}>
                                {comp ? comp.companyname : "Waiting response"}
                            </Text>

                            <TouchableOpacity onPress={() => updateInvoiceDRAFT()} style={[styles.flexcomponentsRow, { margin: 0, padding: 5, borderRadius: 7, backgroundColor: 'black' }]}>
                                <Text style={[styles.smallText, { textAlignVertical: 'center', marginRight: 10, color: 'white' }]}>PRESS HERE TO SABE CHANGES</Text>
                                <Ionicons name="save-outline" size={25} color="white" />
                            </TouchableOpacity>
                        </View>

                        {invoc?.encabezado ? (
                            <Text style={[{ color: "black", fontStyle: "italic", fontSize: 17, marginBottom: 5 }]}>
                                {invoc.encabezado}
                            </Text>
                        ) : null}

                        <Text style={[{ fontWeight: "bold", marginBottom: 5 }]}>
                            {invoc ? `Invoice ${formated_invoice_number(_invoice_.formato_general.numero_de_factura)}` : null}
                        </Text>

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

                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 3 }}>
                            <Text>Comprador:</Text>
                            <TextInput
                                style={{ borderBottomWidth: 0.5, minWidth: "50%", backgroundColor: '#E0E0E0' }}
                                value={_invoice_.formato_general.comprador}
                                onChangeText={val => updateBuyer("comprador", val)}
                            />
                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 3 }}>
                            <Text>RTN Comprador:</Text>
                            <TextInput
                                style={{ borderBottomWidth: 0.5, minWidth: "50%", backgroundColor: '#E0E0E0' }}
                                value={_invoice_.formato_general.comprador_rtn}
                                onChangeText={val => updateBuyer("comprador_rtn", val)}
                            />
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
                                keyExtractor={item => item.id.toString()}
                                renderItem={({ item }) => (
                                    <View style={[styles.flexcomponentsRow, { borderTopWidth: 1, borderTopColor: "grey", marginVertical: 2 }]}>
                                        <TextInput
                                            style={[{ flex: 2, textAlign: 'left', backgroundColor: '#E0E0E0' }]}
                                            value={item.detalle}
                                            onChangeText={val => updateLine(item.id, "detalle", val)}
                                        />

                                        <TextInput
                                            style={[{ flex: 2, textAlign: 'left', backgroundColor: '#E0E0E0' }]}
                                            value={item.descuento.toString()}
                                            keyboardType="numeric"
                                            onChangeText={val => updateLine(item.id, "descuento", val)}
                                        />

                                        <TextInput
                                            style={[{ flex: 2, textAlign: 'left', backgroundColor: '#E0E0E0' }]}
                                            value={item.cantidad.toString()}
                                            keyboardType="numeric"
                                            onChangeText={val => updateLine(item.id, "cantidad", val)}
                                        />

                                        <TextInput
                                            style={[{ flex: 2, textAlign: 'left', backgroundColor: '#E0E0E0' }]}
                                            value={item.precio.toString()}
                                            keyboardType="numeric"
                                            onChangeText={val => updateLine(item.id, "precio", val)}
                                        />
                                    </View>
                                )}
                            />
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6, width: "35%" }}>
                            <Text style={{ fontWeight: 'bold' }}>Total</Text>
                            <Text>{result.total}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6, width: "35%" }}>
                            <Text style={{ fontWeight: 'bold' }}>Subtotal</Text>
                            <Text>{result.subtotal}</Text>
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
                )}
            </View>
        </View>
    );
};

export default InvoiceSDrafrEditor;
