import styles from "@/assets/styles/styles";
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { StackParamList } from "../indexInventory";
import { StackScreenProps } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import PreparationLot from "../utils/preparateInsertLot";
import { InsertLot } from "@/storage/modals/insertlot_modal";
import { supplier } from "@/storage/modals/supplier";
import { PickerSupplier } from "@/components/Pickers";
import { product } from "@/storage/modals/inventory";

type props = StackScreenProps<StackParamList, "InsertingLotPage">;

const InsertingLotPage = ({ route, navigation }: props) => {
    const [InsertingLotDraft, setInsertingLotDraft] = useState<InsertLot | undefined>(undefined);
    const [SuppLierSelected, setSuppLierSelected] = useState<supplier | undefined>(undefined);

    const OnSelectSupplier = (Seleccted: supplier | undefined) => { setSuppLierSelected(Seleccted) };
    const ExistLot = () => { return InsertingLotDraft === undefined ? false : true };

    const OnCancel = () => {
        Alert.alert("Cancel Insert Lot", "Are you sure; u want to cancel the insert lot?", [
            {
                text: 'YES',
                onPress: () => {route.params.invo && navigation.navigate("InsertingLot", { invo : route.params.invo})}
            },
            { text: "NO" }
        ])
    }

    const Onpreparate = () => {
        if (typeof route.params.invo === "object") {
            const Result = PreparationLot(route.params.invo, "Inserter", 0, route.params.invo?.id)
            setInsertingLotDraft(Result);
        }
    };

    const UpdateInsertingLot = (field : string, value : supplier | product[] | string) => {
        if(InsertingLotDraft != undefined){
            setInsertingLotDraft(prev =>(prev ? {...prev, [field] : [value]} as InsertLot : prev))
        }
    }
    
    useEffect(() => {
        Onpreparate()
    }, [route.params.invo]);

    useEffect(() => {
        //UpdateInsertingLot("products", )
    }, [SuppLierSelected?.id]);


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
                <View style={[styles.cardborder, { padding: 10 }]}>
                    <Text style={[styles.paragraph]}>Insert Lot: {ExistLot() ? InsertingLotDraft?.insert_lot_num : "Waiting Number"}</Text>
                    <Text style={[styles.paragraph]}>Date: {ExistLot() ? InsertingLotDraft?.created_at.toString() : "Waiting Response"}</Text>
                    <Text style={[styles.paragraph]}>Warehouse: {route.params.invo?.name}</Text>
                    <View>
                        <TextInput style={[styles.textinput]} placeholder="Insert Inserter" />
                    </View>
                    <View>
                        <PickerSupplier SelectSup={OnSelectSupplier} />
                    </View>
                </View>

            </View>

        </View>
    )
}

export default InsertingLotPage;