import styles from "@/assets/styles/styles";
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Pressable } from "react-native";
import { StackParamList } from "../indexInventory";
import { StackScreenProps } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import PreparationLot from "../utils/preparateInsertLot";
import { InsertLot } from "@/storage/modals/insertlot_modal";
import { supplier } from "@/storage/modals/supplier";
import { PickerSupplier } from "@/components/Pickers";
import { product } from "@/storage/modals/inventory";
import { getCompany_by_ID } from "@/storage/company.storage";

import ProductPicker from "../components/productspicker";
import { company } from "@/storage/modals/empresa";
//import { addProduct } from "@/storage/product.storage";

type props = StackScreenProps<StackParamList, "InsertingLotPage">;

const InsertingLotPage = ({ route, navigation }: props) => {
    const [InsertingLotDraft, setInsertingLotDraft] = useState<InsertLot | undefined>(undefined);
    const [SuppLierSelected, setSuppLierSelected] = useState<supplier | undefined>(undefined);
   // const [ProductsWH, setProductsWH] = useState<product[]>([]);                                    // this are the products of this wh
    const [ProdSelectedList, setProdSelectedList] = useState<product[]>([]);                        // this are the products selected for the Inserting lot
    const [Results, setResults] = useState({
            total : 0.0,
            subtotal : 0.0,
            qty : 0.0
        });

    const OnSelectSupplier = (Seleccted: supplier | undefined) => { setSuppLierSelected(Seleccted) };
    const ExistLot = () => { return InsertingLotDraft === undefined ? false : true };

    const CalculateValues =  () => {
        let TaxDef : company | number | undefined = route.params.invo != undefined ? getCompany_by_ID(route.params.invo?.id_company) : 0;
        let TaxApplied = typeof TaxDef === 'object' ? TaxDef.impuestos.find((e)=> e.defaultTax === true)?.porcentaje : 0;

        setResults((prev)=>({...prev, 
            total :  ProdSelectedList.reduce((sum, prd)=> sum + prd.price, 0),
            qty : ProdSelectedList.reduce((sum, prd)=> sum + prd.amountStock, 0),
            subtotal : ProdSelectedList.reduce((sum, prd)=> sum + prd.price, 0) * (typeof TaxApplied != "undefined" ? TaxApplied : 0)
        }))
    }

    const OnCancel = () => {
        Alert.alert("Cancel Insert Lot", "Are you sure; u want to cancel the insert lot?", [
            {
                text: 'YES',
                onPress: () => { route.params.invo && navigation.navigate("InsertingLot", { invo: route.params.invo }) }
            },
            { text: "NO" }
        ])
    }

    // This function is to prepare the things of the inserting lot
    const Onpreparate = () => {
        if (typeof route.params.invo === "object") {
            const Result = PreparationLot(route.params.invo, "Inserter", 0, route.params.invo?.id)
            setInsertingLotDraft(Result);
        }
        // if (route.params.producsList != undefined) {
        //     setProductsWH(route.params.producsList);
        // }
    };

    //this function is to add one product to the insertinglot
    const _Add_product_in_InsertingLot_ = (newVal: product[]) => { setProdSelectedList(newVal) }

    const UpdateInsertingLot = (field: string, value: supplier | product[] | string | number) => {
        if (InsertingLotDraft != undefined) {
            setInsertingLotDraft(prev => (prev ? { ...prev, [field]: [value] } as InsertLot : prev))
        }
    }

    useEffect(() => {
        Onpreparate()
    }, [route.params.invo]);

    useEffect(() => {
        UpdateInsertingLot("id_supplier", SuppLierSelected != undefined ? SuppLierSelected.id : 0);
    }, [SuppLierSelected?.id]);

    useEffect(() => {
        CalculateValues();
        
    }, [ProdSelectedList]);


    return (
        <View style={[{ flex: 1 }]}>
            {/*--------------------- HEADER -------------------------*/}
            <View style={[styles.flexcomponentsRow, { margin: 5, alignItems: "center" }]}>
                <TouchableOpacity onPress={() => OnCancel()}>
                    <Ionicons name="chevron-back" size={30} color="black" />
                </TouchableOpacity>
                <Text style={[styles.paragraph, styles.textalingleft, { color: "black" }]}>Inserting Lot Page</Text>
            </View>
            {/*------------------------------------------------------*/}

            <View>
                <View style={[styles.cardborder, { margin: 10, padding: 15, backgroundColor: 'white' }]}>
                    <Text style={[styles.paragraph, { color: 'black', margin: 0, fontWeight: 'bold' }]}>Insert Lot: {ExistLot() ? InsertingLotDraft?.insert_lot_num : "Waiting Number"}</Text>
                    <Text style={[styles.paragraph, { color: 'grey', margin: 0 }]}>Date: {ExistLot() ? InsertingLotDraft?.created_at.toString() : "Waiting Response"}</Text>
                    <Text style={[styles.paragraph, { color: 'grey', margin: 0 }]}>Warehouse: {route.params.invo?.name}</Text>
                    <View style={[styles.flexcomponentsRow, { justifyContent: 'space-between' }]}>
                        <View style={[styles.textinput, styles.cardborder, { width: '40%' }]}>
                            <TextInput style={[styles.smallText, {}]} placeholder="Insert Inserter" />
                        </View>
                        <View style={[{ width: '50%' }]}>
                            <PickerSupplier SelectSup={OnSelectSupplier} />
                        </View>
                    </View>
                </View>

                <View style={[{ margin: 10 }]}>
                    <ProductPicker onSaveList={_Add_product_in_InsertingLot_} />
                </View>

            </View>

            <View>

            </View>

            <View style={[styles.flexcomponentsRow, { justifyContent: 'space-between', bottom: 0, position: "absolute", width : '95%' }]}>
                <Pressable style={[styles.rectanglebutton, { width: "20%", backgroundColor: 'green' }]}><Text style={[{ color: 'white', fontWeight: 'bold' }]}>CONFIRM</Text></Pressable>
                <Pressable style={[styles.rectanglebutton, { width: "20%", backgroundColor: 'black' }]}><Text style={[{ color: 'white', fontWeight: 'bold' }]}>SAVE</Text></Pressable>
                <Pressable style={[styles.rectanglebutton, { width: "20%", backgroundColor: 'red' }]}><Text style={[{ color: 'white', fontWeight: 'bold' }]}>CANCEL</Text></Pressable>
            </View>

        </View>
    )
}

export default InsertingLotPage;