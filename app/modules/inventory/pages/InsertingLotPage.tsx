import styles from "@/assets/styles/styles";
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { StackParamList } from "../indexInventory";
import { StackScreenProps } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import PreparationLot from "../utils/preparateInsertLot";
import { InsertLot } from "@/storage/modals/insertlot_modal";

type props = StackScreenProps<StackParamList, "InsertingLotPage">;

const InsertingLotPage = ({ route, navigation }: props) => {
    const [InsertingLotDraft, setInsertingLotDraft] = useState<InsertLot | undefined>(undefined);

    const OnCancel = () => {
        Alert.alert("Cancel Insert Lot", "Are you sure; u want to cancel the insert lot?", [
            {
                text: 'YES',
                onPress: () => navigation.navigate("InsertingLotPage", { invo: undefined })
            },
            { text: "NO" }
        ])
    }

    const Onpreparate = () => {
        if (typeof route.params.invo === "object") {
            const Result = PreparationLot(route.params.invo, "Inserter", 0, route.params.invo?.id)
            setInsertingLotDraft(Result);
        }
    }

    useEffect(() => {
        Onpreparate()
    }, [route]);

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

        </View>
    )
}

export default InsertingLotPage;