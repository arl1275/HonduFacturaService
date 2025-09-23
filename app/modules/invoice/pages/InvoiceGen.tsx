import { View, Text, TouchableOpacity, Button, FlatList, Alert, Modal } from "react-native";
import { invoice, lineafacturada } from "@/storage/modals/invoice";
import { addinvoice } from "@/storage/invoices.storage";
import PreparationInvoice from "../utils/invoice_preparation";

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from "../indexInvoice";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "@/assets/styles/styles";
import { useEffect, useState } from "react";
import EditConsumer from "../components/ConsumerComponent";
import Generate_Invoice_Item, { formated_date_ } from "../utils/InvoiceNumberGenerator";

import EditlineFacturada from "../modals/editline";
import CreateLineInvoice from "../components/CreateLineComponent";
import LineFlatlist from "../components/flatlist_line_component";

//import { formated_invoice_number } from "../utils/InvoiceNumberGenerator";
import { impuesto } from "@/storage/modals/empresa";

import PickerTaxInvoice from "../modals/defTaxModal";
import formaterInvoiceNumberView from "../utils/invoiceNumberFormatterView";

type props = StackScreenProps<RootStackParamList, "InvoiceGen">


const InvoiceGen = ({ route, navigation }: props) => {
    const { item } = route.params; // this is a company item
    const [Comprador, setComprador] = useState({ comprador: 'Cliente Final', comprador_rtn: '0000-0000-00000' });
    const [RegisterComprador, setRegisterComprador] = useState<boolean>(false); // is is to save the buyer
    const [SelectedtoEdit, setSelectedtoEdit] = useState<lineafacturada | undefined>();
    const [ViewModal, setViewModal] = useState<boolean>(false);
    const [LineasFacutas, setLineasFacturas] = useState<lineafacturada[]>([]);
    const [_invoice_, setInvoice] = useState<invoice | undefined>(undefined);

    const [ShowModalTax, setShowModalTax] = useState<boolean>(false);
    const [Listtax, setListTax] = useState<impuesto[]>([]);
    const [OnSelectTax, setOnSelectTax] = useState<impuesto>()
    const [result, setResult] = useState({ total: 0, subtotal: 0 });

    useEffect(() => {
        const Result: [invoice | string | undefined, boolean] = Generate_Invoice_Item(item);
        if (Result[0] === "ERROR") {
            alert('NO SE OBTUVO EL INVOICE CONFIG');
        } else if (Result[0] === "ERROR2") {
            alert('NO SE OBTUVO la COMPANY');
        } else if (typeof Result[0] === "object") {
            setInvoice(Result[0]);
            setListTax(item.impuestos);
        }
    }, [item]);

    const SelectedTax = (value: impuesto) => {
        setOnSelectTax(value)
    };

    const UpdateResultValue = () => {
        // this is to set the total
        let total: number = LineasFacutas.reduce((sum, item) => sum + item.cantidad * item.precio * (item.descuento === 0 ? 1 : (100 - item.descuento) / 100), 0);
        let x = total.toFixed(2)
        let _total_ = parseFloat(x);
        let sub_total_ = CalculateSubTax();
        setResult(prev => ({
            ...prev,
            total: _total_,
            subtotal : typeof sub_total_ === 'string' ? 0 : parseFloat(sub_total_)
        }));
    };

    useEffect(() => {
        UpdateResultValue()
    }, [LineasFacutas])

    const [Linea, setLinea] = useState<lineafacturada>({
        id: Date.now(),
        cantidad: 0,
        detalle: "",
        descuento: 0,
        precio: 0,
        total : 0,
        subtotal : 0
    });

    //------ this is to clean the line to reset the object ----//
    const CleanFinea = () => {
        setLinea({
            id: Date.now(),
            cantidad: 0,
            detalle: "",
            descuento: 0,
            precio: 0,
            total : 0,
            subtotal : 0
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
    const ShowViewModalTax = () => { setShowModalTax(!ShowModalTax) };

    const CalculateSubTax = () => {
        if (OnSelectTax) {
            let factor = OnSelectTax.porcentaje / 100
            let res: number = result.total - (result.total * factor);
            return res.toFixed(2).toString();
        } else {
            return '...waiting'
        }
    }

    const Calculatetax = () => {
        if (OnSelectTax) {
            let factor = OnSelectTax.porcentaje / 100
            let res: number = (result.total * factor);
            return res.toFixed(2).toString();
        } else {
            return '...waiting'
        }
    }


    //-------this select a flatlist item to edit ------------//
    const SelectToEdit = (item: lineafacturada) => {
        setSelectedtoEdit(item);
        ShowViewModal();
    }

    //------- this function is when u affirm the buyer -------//
    const _On_SETComprador_ = () => { setRegisterComprador(!RegisterComprador) }

    //------- this is when u cancel an invoice---------------//
    const oncancel = () => { setInvoice(undefined), navigation.navigate("HomeInvoice") };

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

    const save_invoice_inStorage = ( tipe : string ) => {
        if (typeof _invoice_ === "object" && typeof _invoice_ === 'object' && 
            typeof OnSelectTax != "undefined") {
            let ReadyInvoice : invoice;

            ReadyInvoice = PreparationInvoice(tipe, _invoice_, LineasFacutas, OnSelectTax, Comprador, result, item );

            addinvoice(ReadyInvoice);
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
        if (!OnSelectTax) {
            Alert.alert('Invoice generation', 'Add a TAX to generate a Invoice');
            return;
        }

        Alert.alert('Please select an option',
            `Every option of the next ones, case u are not sure select draft
            DRAFT   > Create a draft of the invoice, not a finished.
            INVOICE > Create a invoice.`,
            [
                {
                    text: " INVOICE",
                    onPress: () => { save_invoice_inStorage("invoice") },
                    style: 'default'
                }, {
                    text: "DRAFT",
                    onPress: () => { save_invoice_inStorage("draft") }
                },
                { text: "NO" }
            ],
            { cancelable: false })
    }

    return (
        <View style={[{ flex: 1 }]}>

            {/*-------------------THIS IS TO MODALS-------------------*/}

            <Modal visible={ShowModalTax} transparent={true} animationType="fade" >
                <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={[{ width: '70%' }]}>
                        <PickerTaxInvoice taxes={Listtax} SendSelected={SelectedTax} On_Close={ShowViewModalTax} />
                    </View>
                </View>
            </Modal>



            <View style={[styles.flexcomponentsRow, { margin: 5, alignItems : 'center'}]}>
                <TouchableOpacity onPress={() => oncancel()}>
                    <Ionicons name="chevron-back" size={30} color="black" />
                </TouchableOpacity>
                <Text style={[styles.paragraph, styles.textalingleft, { color: 'black' }]}>Invoice Generation ( {item.companyname} )</Text>
            </View>

            <View style={{ marginLeft: 20, marginRight: 20 }}>
                <Text>This invoice is not done thill you press the button of done, meanwhile is created as DRAFT</Text>
            </View>

            <View style={{ marginLeft: 20, marginRight: 20 }}>
                <Text style={[styles.paragraph, styles.textalingleft, {color : 'black'}]}>{_invoice_ ? formaterInvoiceNumberView(_invoice_) : "non formater"}</Text>
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
                    <Text style={[styles.smallText, styles.textalingleft]}>{_invoice_ ? _invoice_.formato_general.fecha_emision.toString() : 'N/A'}</Text>
                </View>

                <View>
                    <CreateLineInvoice addFacturaline={addFacturaLine} CleanLine={CleanFinea} vAlue={Linea} />
                </View>

                <View>
                    {
                        LineasFacutas.length > 0 &&
                        <View style={[styles.flexcomponentsRow, { justifyContent: 'space-between', width: '90%', margin: 0, alignSelf: 'center', alignItems : 'center' }]}>
                            <Text style={[ styles.smallText, { flex: 3, textAlign: 'left', color : 'grey' }]}>Detail</Text>
                            <Text style={[ styles.smallText,{ flex: 2, textAlign: 'right', color : 'grey' }]}>Discount</Text>
                            <Text style={[ styles.smallText,{ flex: 2, textAlign: 'right', color : 'grey' }]}>Amount</Text>
                            <Text style={[ styles.smallText,{ flex: 2, textAlign: 'right', color : 'grey' }]}>Price</Text>
                            <Text style={[ styles.smallText,{ flex: 2, textAlign: 'right', color : 'grey' }]}>Dis. applied</Text>
                            <Text style={[ styles.smallText,{ flex: 2, textAlign: 'right', color : 'grey' }]}>total</Text>
                            <Text style={[ styles.smallText,{ flex: 2, textAlign: 'right', color : 'grey' }]}></Text>
                        </View>
                    }


                    <FlatList
                        data={LineasFacutas}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <LineFlatlist item={item} Select_to_Edit={SelectToEdit} delete_linea={deleteLineaFacturada} />
                        )}
                    />

                </View>
            </View>

            <View style={[{ marginLeft: 20, marginRight: 20, borderWidth: 1, borderColor: 'grey', borderRadius: 7, justifyContent: 'space-between' }]}>

                <View style={[styles.flexcomponentsRow, { justifyContent: 'space-between', width: '90%', marginBottom: 0 }]}>
                    <Button title="GENERATE INVOICE" color={"black"} onPress={() => _on_save_invoice()} />
                    <Button title="CANCEL" color={"red"} onPress={_on_cancel_invoice_generation} />
                    <Button title="CHOOSE TAX" color={"black"} onPress={() => ShowViewModalTax()} />
                </View>

                <View style={[styles.flexcomponentsRow, { justifyContent: 'space-between', marginTop: 0, marginBottom: 0 }]}>

                    <View>
                        <Text style={[{ color: 'black', fontWeight: 'bold' }]}>Total (LPS)</Text>
                        <Text>Sub total</Text>
                        <Text>Total en impuestos</Text>
                        <Text>Impuesto aplicado</Text>
                    </View>

                    <View>
                        <Text style={[{ color: 'black', fontWeight: 'bold' }]}>{result.total}</Text>
                        <Text>{CalculateSubTax()}</Text>
                        <Text>{Calculatetax()}</Text>
                        <Text>{!OnSelectTax ? "...waiting" : OnSelectTax.nombre + " - " + OnSelectTax.porcentaje}</Text>
                    </View>

                </View>

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