import { View, Text, TouchableOpacity, Pressable } from "react-native";
import { product } from "@/storage/modals/inventory";
import { inventoryWH } from "@/storage/modals/inventory";
import { useEffect, useState } from "react";
import styles from "@/assets/styles/styles";
import { StackScreenProps } from "@react-navigation/stack";
import { StackParamList } from "../indexInventory";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getAllProducts_by_WH_ID } from "@/storage/product.storage";
import { getInsertLots_by_idWH } from "@/storage/insertlot.storage";
import { InsertLot } from "@/storage/modals/insertlot_modal";

type props = StackScreenProps<StackParamList, "InsertingLot">;

const InsertLot = ({route, navigation} : props) =>{
    const [invoLocal, setInvoloca]= useState<inventoryWH>();
    const [ProducArray, setProducArray] = useState<product[]>([]);
    const [InsertingLots, setInsertingLots] = useState<InsertLot[]>([]);

    const GetAllproducts= () => {setProducArray(getAllProducts_by_WH_ID(route.params.invo.id_company))};
    const _GetInsertingLots_ = () => {setInsertingLots(getInsertLots_by_idWH(route.params.invo.id))}

    useEffect(()=>{
        setInvoloca(route.params.invo);
        GetAllproducts();
        _GetInsertingLots_();
    }, [route.params])
    
    return(
        <View>
            {/*--------------------- HEADER -------------------------*/}
            <View style={[styles.flexcomponentsRow, { margin: 5, alignItems: "center" }]}>
                <TouchableOpacity onPress={() => navigation.navigate("HomeInventory")}>
                    <Ionicons name="chevron-back" size={30} color="black" />
                </TouchableOpacity>
                <Text style={[styles.paragraph, styles.textalingleft, { color: "black" }]}>Inserting Lot</Text>
            </View>
            {/*------------------------------------------------------*/}

            <View>
                <Text style={[styles.smallText]}>This view is to show the format to insert an inserting lot</Text>
            </View>

            <View>
                <Pressable>Generate Insert Lot</Pressable>
            </View>
            <View>
                <Text></Text>
            </View>

        </View>
    )
}

export default InsertLot;