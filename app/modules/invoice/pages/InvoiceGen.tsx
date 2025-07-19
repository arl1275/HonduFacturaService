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
import Generate_Invoice_Item from "../utils/InvoiceNumberGenerator";

import EditlineFacturada from "../modals/editline";
import CreateLineInvoice from "../components/CreateLineComponent";
import LineFlatlist from "../components/flatlist_line_component";


type props = StackScreenProps<RootStackParamList, "InvoiceGen">


const InvoiceGen = ({ route, navigation }: props) => {
    const { item } = route.params;
    const [Comprador, setComprador] = useState({ comprador: 'Cliente Final', comprador_rtn: '0000-0000-00000' });
    const [RegisterComprador, setRegisterComprador] = useState<boolean>(false); // is is to save the buyer
    const [SelectedtoEdit, setSelectedtoEdit] = useState<lineafacturada | undefined>();
    const [ViewModal, setViewModal] = useState<boolean>(false);
    const [LineasFacutas, setLineasFacturas] = useState<lineafacturada[]>([]);
    const [_invoice_, setInvoice] = useState<invoice>();

    useEffect(() => {
        const Result: [invoice | string | undefined, boolean] = Generate_Invoice_Item(item);
        if(Result[0] === "ERROR"){
            alert('NO SE OBTUVO EL INVOICE CONFIG');
        }else if(Result[0] === "ERROR2"){
            alert('NO SE OBTUVO la COMPANY');
        }else if(typeof Result[0] === "object"){
            setInvoice(Result[0])
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

    //------ this is to update the line of the invoicelist----//
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

    //----- this add a line in the invoicelines array-------//
    const addFacturaLine = () => {
        if (Linea.detalle === "") {
            alert('Register a line to save in this Invoice');
            return
        }

        setLineasFacturas((prev) => [...prev, Linea]);
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

            <Text style={{color : 'black'}}>{_invoice_? _invoice_.formato_general.RTN : "no existe"}</Text>

            <View>
                <View>
                    {RegisterComprador ?
                        <View style={[styles.flexcomponentsRow, { marginLeft: 20, marginRight: 20, borderWidth: 1, borderColor: 'grey', borderRadius: 7 }]}>
                            <Text  style={{ width: '100%', textAlign: 'left', textAlignVertical: 'center' }}>{Comprador.comprador}</Text>
                            <Text  style={{ width: '100%', textAlign: 'left', textAlignVertical: 'center' }}>{Comprador.comprador_rtn}</Text>
                            <TouchableOpacity style={[{ alignSelf: 'center', alignContent: 'center' }]} onPress={oncancel_Comprador}>
                                <Ionicons name="close-circle-outline" color="green" size={25} />
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
                    <CreateLineInvoice UpdateLine={UpdateLine} addFacturaline={addFacturaLine} CleanLine={CleanFinea} vAlue={Linea} />
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
                <Button title="GENERATE INVOICE" color={"black"} />
                <Button title="DRAFT" color={"black"} />
                <Button title="CANCEL" color={"red"} />
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