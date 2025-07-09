import { View, Text, TouchableOpacity, Button, TextInput, FlatList, Alert, Modal } from "react-native";
import { invoice, lineafacturada } from "@/storage/invoice";
//import { company } from "@/storage/empresa";
//import EditInvoiceLine from "../components/editinvoiceline";
// route imports
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from "../indexInvoice";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "@/assets/styles/styles";
import { useEffect, useState } from "react";
import EditConsumer from "../components/ConsumerComponent";

import EditlineFacturada from "../modals/editline";
import CreateLineInvoice from "../components/CreateLineComponent";


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

    const _On_SETComprador_ = () => {/* THIS IS TO SAVE CONSUMER */ }
    const oncancel = () => { navigation.navigate("HomeInvoice") };

    //------- function to update one element of the list --------//
    const updateLineaFacturada = (updatedItem: lineafacturada) => {
        ShowViewModal();
        setLineasFacturas(prev =>
            prev.map(item => item.id === updatedItem.id ? updatedItem : item)
        );
    };

    //------ Delete item from line ------//
    const deleteLineaFacturada = (idToDelete: number) => {
        ShowViewModal();
        setLineasFacturas(prev =>
            prev.filter(item => item.id !== idToDelete)
        );
    };


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
                <View>
                    <EditConsumer setComprador={setComprador} _onSet_={_On_SETComprador_} />
                </View>

                <View style={{ marginLeft: 20, marginRight: 20 }}>
                    <Text style={[styles.smallText, styles.textalingleft]}>Register one invoice line, then it will be show in the list</Text>
                </View>

                <View>
                    <CreateLineInvoice UpdateLine={UpdateLine} addFacturaline={addFacturaLine} CleanLine={CleanFinea} vAlue={Linea}/>
                </View>
                <View style={[{ borderBottomWidth: 1, borderColor: 'grey', marginLeft: 20, marginRight: 20, width: '40%', alignSelf: 'center', marginTop: 0 }]} />

                <View>
                    <FlatList
                        data={LineasFacutas}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View
                                style={[
                                    styles.flexcomponentsRow,
                                    styles.textinput,
                                    {
                                        flexDirection: 'row',
                                        paddingVertical: 8,
                                        paddingHorizontal: 10,
                                        alignItems: 'center',
                                        marginHorizontal: 20,
                                    },
                                ]}
                            >
                                <Text style={{ flex: 3 }}>{item.detalle}</Text>
                                <Text style={{ flex: 2, textAlign: 'right' }}>{item.descuento}</Text>
                                <Text style={{ flex: 2, textAlign: 'right' }}>{item.cantidad}</Text>
                                <Text style={{ flex: 2, textAlign: 'right' }}>{item.precio}</Text>

                                {/* Botones de acción */}
                                <View style={{ flex: 1, alignItems: 'center' }}>
                                    <TouchableOpacity onPress={() => SelectToEdit(item)}>
                                        <Ionicons name="pencil-outline" color="green" size={18} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 1, alignItems: 'center' }}>
                                    <TouchableOpacity onPress={() => deleteLineaFacturada(item.id)}>
                                        <Ionicons name="close-circle-outline" color="red" size={18} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />

                </View>
            </View>
            <View style={[{ borderBottomWidth: 1, borderColor: 'grey', marginLeft: 20, marginRight: 20, width: '40%', alignSelf: 'center', marginTop: 10 }]} />
            <View style={[styles.flexcomponentsRow, { justifyContent: 'space-between', width: '90%' }]}>
                <Button title="GENERATE INVOICE" color={"black"} />
                <Button title="DRAFT" color={"black"} />
                <Button title="CANCEL" color={"red"} />
            </View>

            <Modal
                visible={ViewModal}
                transparent={true}
                animationType="slide"
                onRequestClose={ShowViewModal}
            >

                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center' }}>
                    <EditlineFacturada _onCancel_={ShowViewModal} _onSave_={(item) => { updateLineaFacturada(item); }} value={SelectedtoEdit} />
                </View>
            </Modal>

        </View>
    )
}

export default InvoiceGen;