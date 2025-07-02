import { View, Text, TouchableOpacity, Button, TextInput, FlatList, Alert } from "react-native";
import { invoice, lineafacturada } from "@/storage/invoice";
//import { company } from "@/storage/empresa";
//import EditInvoiceLine from "../components/editinvoiceline";
// route imports
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from "../indexInvoice";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "@/assets/styles/styles";
import { useEffect, useState } from "react";

import EditlineFacturada from "../modals/editline";


type props = StackScreenProps<RootStackParamList, "InvoiceGen">


const InvoiceGen = ({ route, navigation }: props) => {
    const { item } = route.params;
    const [Comprador, setComprador] = useState({ comprador: 'Cliente Final', comprador_rtn: '0000-0000-00000' });
    const [RegisterComprador, setRegisterComprador] = useState<boolean>(false);
    const [SelectedtoEdit, setSelectedtoEdit] = useState<lineafacturada | undefined>();
    const [ViewModal, setViewModal] = useState<boolean>(false);
    const [LineasFacutas, setLineasFacturas] = useState<lineafacturada[]>([]);
    const [Linea, setLinea] = useState<lineafacturada>({
        id: Date.now(),
        cantidad: 0,
        detalle: "",
        descuento: 0,
        precio: 0,
    });

    const CleanFinea = () => {
        setLinea({
            id: Date.now(),
            cantidad: 0,
            detalle: "",
            descuento: 0,
            precio: 0,
        })
    };

    const UpdateLine = (value: string, field: string) => {
        if (typeof Linea === "undefined") return;
        const parsedValue = !isNaN(Number(value)) && value.trim() !== ""
            ? Number(value)
            : value;

        setLinea((prev) => ({
            ...prev,
            [field]: parsedValue
        }));
    };

    const addFacturaLine = () => {
        if (Linea.detalle === "") {
            alert('Register a line to save in this Invoice');
            return
        }

        setLineasFacturas((prev) => [...prev, Linea]);
        CleanFinea();
    }

    const ShowViewModal = () => { setViewModal(!ViewModal) }

    const SelectToEdit = (item: lineafacturada) => {
        setSelectedtoEdit(item);
        ShowViewModal();
    }

    const _RegisterComprador_ = () => { setRegisterComprador(!RegisterComprador) }
    const oncancel = () => { navigation.navigate("HomeInvoice") };


    return (
        <View style={[{ flex: 1 }]}>
            <View style={[styles.flexcomponentsRow, { margin: 5 }]}>
                <TouchableOpacity onPress={() => oncancel()}>
                    <Ionicons name="chevron-back" size={30} color="black" />
                </TouchableOpacity>
                <Text style={[styles.paragraph, styles.textalingleft, { color: 'black' }]}>Invoice Generation</Text>
            </View>

            <View style={{ marginLeft: 20, marginRight: 20 }}>
                <Text>This invoice is not done thill you press the button of done, meanwhile is created as DRAFT</Text>
            </View>

            <View>
                <View style={[styles.flexcomponentsRow, { marginLeft: 20, marginRight: 20, borderWidth: 1, borderColor: 'grey', borderRadius: 7 }]}>
                    <View style={[{ margin: 10 }]}>
                        <Button title={!RegisterComprador ? "WITH RTN ?" : "<"} color={RegisterComprador ? "blue" : "black"} onPress={_RegisterComprador_} />
                    </View>

                    {
                        RegisterComprador &&
                        <View style={[styles.flexcomponentsRow, { margin: 0 }]}>
                            <View style={[styles.textinput, { padding: 10, width: '40%' }]}>
                                <TextInput
                                    onChangeText={(e) => setComprador((prev: any) => ({ ...prev, comprador: e }))}
                                    placeholder="BUYER" style={{ width: '100%', textAlign: 'left', textAlignVertical: 'center' }}
                                />
                            </View>

                            <View style={[styles.textinput, { padding: 10, width: '40%' }]}>
                                <TextInput
                                    placeholder="RTN"
                                    onChangeText={(e) => setComprador((prev: any) => ({ ...prev, comprador_rtn: e }))}
                                    keyboardType="numeric"
                                    style={{ width: '100%', textAlign: 'left', textAlignVertical: 'center' }}
                                />
                            </View>
                        </View>
                    }
                </View>

                <View style={[{ borderBottomWidth: 1, borderColor: 'grey', marginLeft: 20, marginRight: 20 }]} />
                <View style={{ marginLeft: 20, marginRight: 20 }}>
                    <Text style={[styles.smallText, styles.textalingleft]}>Register one invoice line, then it will be show in the list</Text>
                </View>


                <View style={[styles.flexcomponentsRow, {
                    marginTop: 0,
                    paddingTop: 0,
                    flexDirection: 'row',
                    alignItems: 'center',
                    flexWrap: 'nowrap'
                }]}>
                    <View style={[styles.textinput, { padding: 10, width: '30%' }]}>
                        <TextInput
                            onChangeText={(e) => UpdateLine(e, 'detalle')}
                            placeholder="Detalle de factura"
                            value={Linea.detalle != "" ? Linea.detalle.toString() : ""}
                            style={{ width: '100%' }}
                        />
                    </View>

                    <View style={[styles.textinput, { padding: 10, width: '15%' }]}>
                        <TextInput
                            placeholder="Amo."
                            onChangeText={(e) => UpdateLine(e, 'cantidad')}
                            value={Linea.cantidad != 0 ? Linea.cantidad.toString() : ""}
                            keyboardType="numeric"
                            style={{ width: '100%' }}
                        />
                    </View>

                    <View style={[styles.textinput, { padding: 10, width: '15%' }]}>
                        <TextInput
                            placeholder="PRICE"
                            onChangeText={(e) => UpdateLine(e, 'precio')}
                            keyboardType="numeric"
                            value={Linea.precio != 0 ? Linea.precio.toString() : ""}
                            style={{ width: '100%' }}
                        />
                    </View>

                    <View style={[styles.textinput, { padding: 10, width: '15%' }]}>
                        <TextInput
                            placeholder="Disco."
                            onChangeText={(e) => UpdateLine(e, 'descuento')}
                            value={Linea.descuento != 0 ? Linea.descuento.toString() : ""}
                            keyboardType="numeric"
                            style={{ width: '100%' }}
                        />
                    </View>

                    <View style={{ padding: 10, width: '10%', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => addFacturaLine()}>
                            <Ionicons name="checkbox-outline" color="green" size={24} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ padding: 10, width: '10%', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => CleanFinea()}>
                            <Ionicons name="trash-outline" color="red" size={24} />
                        </TouchableOpacity>
                    </View>
                </View>

                {
                    !LineasFacutas && <View style={[{ borderBottomWidth: 1, borderColor: 'grey', marginLeft: 20, marginRight: 20 }]} />
                }


                <View>
                    <FlatList
                        data={LineasFacutas}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={[styles.flexcomponentsRow, styles.textinput, { marginLeft: 20, marginRight: 20, padding: 5, justifyContent: 'space-between' }]}>
                                <Text>{item.detalle}</Text>
                                <Text>{item.descuento}</Text>
                                <Text>{item.cantidad}</Text>
                                <Text>{item.precio}</Text>
                                <View style={{ padding: 10, width: '10%', alignItems: 'center' }}>
                                    <TouchableOpacity onPress={() => SelectToEdit(item)}>
                                        <Ionicons name="pencil-outline" color="green" size={15} />
                                    </TouchableOpacity>
                                </View>

                                <View style={{ padding: 10, width: '10%', alignItems: 'center' }}>
                                    <TouchableOpacity>
                                        <Ionicons name="close-circle-outline" color="red" size={15} />
                                    </TouchableOpacity>
                                </View>


                            </View>
                        )}
                    />
                </View>
            </View>

            <View style={[styles.flexcomponentsRow, { justifyContent: 'space-between', width: '60%' }]}>
                <Button title="GENERATE INVOICE" color={"black"} />
                <Button title="DRAFT" color={"black"} />
                <Button title="CANCEL" color={"red"} />
            </View>

            {/* <EditlineFacturada _onCancel_={} _onSave_={} value={SelectedtoEdit} _ViewModal_={false} /> */}
        </View>
    )
}

export default InvoiceGen;