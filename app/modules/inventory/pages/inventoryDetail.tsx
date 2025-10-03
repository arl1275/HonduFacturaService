import { View, Text, TouchableOpacity, Button, Modal } from "react-native";
import styles from "@/assets/styles/styles";
import { StackParamList } from "../indexInventory";
import { StackScreenProps } from "@react-navigation/stack";
import { inventoryWH } from "@/storage/modals/inventory";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useState } from "react";

//--------- MODAL DESIG
import ProductMagane from "../modals/createProduct";

type props = StackScreenProps<StackParamList, "Inventorydetail">;

const InventoryDetail = ({ route, navigation }: props) => {
    const inventory = route.params.invo;
    const [ShowModal, setShowModal] = useState<boolean>(false);

    const OpenMaganeProduct = () => {setShowModal(!ShowModal)};
    return (
        <View style={[{ flex: 1, margin: 10 }]}>
            {/*--------------------- THIS IS THE MODALS OF THE VIEW-------------------------*/}
            <Modal visible={ShowModal} transparent={true} animationType="fade" >
                <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={[{ width: '70%' }]}>
                        <ProductMagane id_invo={inventory.id} _product_={undefined} onCancel={OpenMaganeProduct}/>
                    </View>
                </View>
            </Modal>

            {/*--------------------- THIS IS THE HEAD OF THE VIEW-------------------------*/}
            <View style={[styles.flexcomponentsRow, { margin: 5, alignItems: 'center' }]}>
                <TouchableOpacity onPress={() => { navigation.navigate("HomeInventory") }}>
                    <Ionicons name="chevron-back" size={30} color="black" />
                </TouchableOpacity>
                <Text style={[styles.paragraph, styles.textalingleft, { color: "black" }]}>Inventory Page</Text>
            </View>


            <View style={[styles.cardborder, {}]}>
                <Text style={[styles.paragraph, styles.textalingleft, { color: 'black' }]}>{inventory.name}</Text>
                <Text style={[styles.smallText, styles.textalingleft, { fontSize: 15 }]}>{inventory.code}</Text>
                <Text style={[styles.smallText, styles.textalingleft, { fontSize: 15 }]}>{inventory.ubication}</Text>
                <Text style={[styles.smallText, styles.textalingleft, { fontSize: 15 }]}>{inventory.type.physical ? "PHYSICAL" : 'VIRTUAL'}</Text>

                <View style={[styles.flexcomponentsRow, { justifyContent: 'space-between' }]}>
                    <Button title="Create Product" color={'green'}  onPress={()=> OpenMaganeProduct()}/>
                    <Button title="Insertion Lot" color={'black'} />
                </View>
            </View>

        </View>
    )
}

export default InventoryDetail;