import { View, Text, TouchableOpacity, Button, TextInput, FlatList, Alert, Modal } from "react-native";
import { invoice, lineafacturada } from "@/storage/invoice";
import { addinvoice, saveinvoices } from "@/storage/invoices.storage";
//import { company } from "@/storage/empresa";
//import EditInvoiceLine from "../components/editinvoiceline";
// route imports
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from "../indexInvoice";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "@/assets/styles/styles";
import { useEffect, useState } from "react";
import EditConsumer from "../components/ConsumerComponent";
import Generate_Invoice_Item from "../utils/InvoiceNumberGenerator";

import EditlineFacturada from "../modals/editline";
import CreateLineInvoice from "../components/CreateLineComponent";
import LineFlatlist from "../components/flatlist_line_component";

import { formated_invoice_number } from "../utils/InvoiceNumberGenerator";

type props = StackScreenProps<RootStackParamList, "InvoiceGen">


const InvoiceGen = ({ route, navigation }: props) => {
    const { item } = route.params;
    const [Comprador, setComprador] = useState({ comprador: 'Cliente Final', comprador_rtn: '0000-0000-00000' });
    const [RegisterComprador, setRegisterComprador] = useState<boolean>(false); // is is to save the buyer
    const [SelectedtoEdit, setSelectedtoEdit] = useState<lineafacturada | undefined>();
    const [ViewModal, setViewModal] = useState<boolean>(false);
    const [LineasFacutas, setLineasFacturas] = useState<lineafacturada[]>([]);
    const [_invoice_, setInvoice] = useState<invoice | undefined>(undefined);

    useEffect(() => {
        const Result: [invoice | string | undefined, boolean] = Generate_Invoice_Item(item);
        if (Result[0] === "ERROR") {
            alert('NO SE OBTUVO EL INVOICE CONFIG');
        } else if (Result[0] === "ERROR2") {
            alert('NO SE OBTUVO la COMPANY');
        } else if (typeof Result[0] === "object") {
            setInvoice(Result[0]);
        }
    }, [item])

    const [Linea, setLinea] = useState<lineafacturada>({
        id: Date.now(),
        cantidad: 0,
        detalle: "",
        descuento: 0,
        precio: 0,
    });

    //------ this is to clean the line to reset the object ----//
    const CleanFinea = () => {
        setLinea({
            id: Date.now(),
            cantidad: 0,
            detalle: "",
            descuento: 0,
            precio: 0,
        })
    };

    //----- this add a line in the invoicelines array-------//
    const addFacturaLine = (value: lineafacturada) => {
        if (value.detalle === "") {
            alert('Register a line to save in this Invoice');
            return
        }
        setLineasFacturas((prev) => [...prev, value]);
        CleanFinea();
    }

    //------- this is to show the modal of edit line --------//
    const ShowViewModal = () => { setViewModal(!ViewModal) }

    //-------this select a flatlist item to edit ------------//
    const SelectToEdit = (item: lineafacturada) => {
        setSelectedtoEdit(item);
        ShowViewModal();
    }

    //------- this function is when u affirm the buyer -------//
    const _On_SETComprador_ = () => { setRegisterComprador(!RegisterComprador) }

    //------- this is when u cancel an invoice---------------//
    const oncancel = () => { navigation.navigate("HomeInvoice") };

    //------- cancel comprador ---------------//
    const oncancel_Comprador = () => {
        setComprador({ comprador: 'Cliente Final', comprador_rtn: '0000-0000-00000' });
        _On_SETComprador_();
    };

    //------- function to update one element of the list --------//
    const updateLineaFacturada = (updatedItem: lineafacturada) => {
        ShowViewModal();
        setLineasFacturas(prev =>
            prev.map(item => item.id === updatedItem.id ? updatedItem : item)
        );
    };

    //------ Delete item from line in the array of invoices lines ------//
    const deleteLineaFacturada = (idToDelete: number) => {
        ShowViewModal();
        setLineasFacturas(prev =>
            prev.filter(item => item.id !== idToDelete)
        );
    };

    const save_invoice_inStorage = (isDraft: boolean) => {
        if (typeof _invoice_ === "object" && typeof _invoice_ === 'object') {
            // this part if to add the lines in the invoice object
            setInvoice(prev => {
                if (!prev) return prev;
                    return {
                        ...prev,
                        lineasfacturadas : LineasFacutas
                    };
            })


            if (isDraft) {
                addinvoice(_invoice_);
                Alert.alert("FINISH", "Invoice is well generated");
            } else {
                setInvoice(prev => {
                    if (!prev) return prev;
                    return {
                        ...prev,
                        status: {
                            ...prev.status,
                            draft: false,
                            done: true,
                            creditnote: {
                                ...prev.status.creditnote
                            }
                        }
                    };
                });
                addinvoice(_invoice_);
            }
            oncancel();
        } else {
            Alert.alert("ERROR", "Invoice is not well generated");
        }
    };


    const _on_cancel_invoice_generation = () => {
        Alert.alert('CANCEL INVOICE',
            'You pressed cancel Invoice, Are you sure u want to delete the invoice? (the invoice is going to be deleted and u cannot recover it)',
            [
                {
                    text: "NO",
                    onPress: () => { },
                    style: "cancel"
                },
                {
                    text: "YES",
                    onPress: () => { setInvoice(undefined), oncancel() }
                }
            ],
            { cancelable: false })
    }

    const _on_save_invoice = () => {
        Alert.alert('Please select an option',
            `Every option of the next ones, case u are not sure select draft
            DRAFT   > Create a draft of the invoice, not a finished.
            INVOICE > Create a invoice.`,
            [
                {
                    text: " INVOICE",
                    onPress: () => {save_invoice_inStorage(false)},
                    style: 'default'
                }, {
                    text: "DRAFT",
                    onPress: () => {save_invoice_inStorage(true)}
                },
                { text: "NO" }
            ],
            { cancelable: false })
    }

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

            <View style={{ marginLeft: 20, marginRight: 20 }}>
                <Text style={[styles.smallText, styles.textalingleft]}>{formated_invoice_number(_invoice_?.formato_general.numero_de_factura)}</Text>
            </View>

            <View>
                <View>
                    {RegisterComprador ?
                        <View style={[styles.flexcomponentsRow, { marginLeft: 20, marginRight: 20, borderWidth: 1, borderColor: 'grey', borderRadius: 7, justifyContent: 'space-between' }]}>
                            <View style={[styles.flexcomponentsRow, { width: '70%' }]}>
                                <Text style={{ width: '50%', textAlign: 'left', textAlignVertical: 'center', fontWeight: 'bold' }}>{Comprador.comprador}</Text>
                                <Text style={{ width: '50%', textAlign: 'left', textAlignVertical: 'center' }}>{Comprador.comprador_rtn}</Text>
                            </View>


                            <TouchableOpacity style={[{ alignSelf: 'center', alignContent: 'center' }]} onPress={oncancel_Comprador}>
                                <Ionicons name="close-circle-outline" color="red" size={25} />
                            </TouchableOpacity>
                        </View>
                        :
                        <EditConsumer setComprador={setComprador} _onSet_={_On_SETComprador_} />
                    }

                </View>

                <View style={{ marginLeft: 20, marginRight: 20 }}>
                    <Text style={[styles.smallText, styles.textalingleft]}>Register one invoice line, then it will be show in the list</Text>
                </View>

                <View>
                    <CreateLineInvoice addFacturaline={addFacturaLine} CleanLine={CleanFinea} vAlue={Linea} />
                </View>
                <View style={[{ borderBottomWidth: 1, borderColor: 'grey', marginLeft: 20, marginRight: 20, width: '40%', alignSelf: 'center', marginTop: 0 }]} />

                <View>
                    <FlatList
                        data={LineasFacutas}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <LineFlatlist item={item} Select_to_Edit={SelectToEdit} delete_linea={deleteLineaFacturada} />
                        )}
                    />

                </View>
            </View>
            <View style={[{ borderBottomWidth: 1, borderColor: 'grey', marginLeft: 20, marginRight: 20, width: '40%', alignSelf: 'center', marginTop: 10 }]} />
            <View style={[styles.flexcomponentsRow, { justifyContent: 'space-between', width: '90%' }]}>
                <Button title="GENERATE INVOICE" color={"black"} onPress={_on_save_invoice} />
                <Button title="CANCEL" color={"red"} onPress={_on_cancel_invoice_generation} />
            </View>

            <Modal visible={ViewModal} transparent={true} animationType="slide" onRequestClose={ShowViewModal}>
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center' }}>
                    <EditlineFacturada _onCancel_={ShowViewModal} _onSave_={(item) => { updateLineaFacturada(item); }} value={SelectedtoEdit} />
                </View>
            </Modal>

        </View>
    )
}

export default InvoiceGen;