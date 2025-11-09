import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Modal, Pressable } from "react-native";
import { supplier } from "@/storage/modals/supplier";
import { getAllSuppliers, addSupplier, updateSupplier } from "@/storage/supplier.storage";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../indexcompany";
import { useNavigation } from "expo-router";
import SupplierCard from "../components/suppliersCard";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "@/assets/styles/styles";
import ModalEditSupplier from "../modals/EditSupplier";
import ModalCreateSupplier from "../modals/CreateSupplier";

type HomeCompanyNavigationProp = StackNavigationProp<RootStackParamList, "suppliers">;

const SuppliersHomePage = () => {
    const navigation = useNavigation<HomeCompanyNavigationProp>();
    const [EditSupplier, setEditSupplier] = useState<boolean>(false);
    const [ShowModalsupp, setShowModalsupp] = useState<boolean>(false);
    const [ShowModalsuppCREATE, setShowModalsuppCREATE] = useState<boolean>(false);
    const [SuppliersList, setSuppliersList] = useState<supplier[]>([]);
    const [SelectedSupp, setSelectedSupp] = useState<supplier | undefined>(undefined);

    const oncancel = () => { navigation.navigate("HomeCompany") }
    const ModalView = () => { setShowModalsupp(!ShowModalsupp) };
    const ModalViewCreate = () => { setShowModalsuppCREATE(!ShowModalsuppCREATE) };
    const ToEditSupplier = (ToEd: supplier) => { setSelectedSupp(ToEd); ModalView(); }

    useEffect(() => {
        setSuppliersList(getAllSuppliers());
    }, [EditSupplier, ShowModalsupp, ShowModalsuppCREATE]);

    return (
        <View style={[{ flex: 1, margin: 10 }]}>
            {/*-------------------HEAD----------------------------------- */}
            <View style={[styles.flexcomponentsRow, { margin: 5, alignItems: 'center' }]}>
                <TouchableOpacity onPress={() => oncancel()}>
                    <Ionicons name="chevron-back" size={30} color="black" />
                </TouchableOpacity>
                <Text style={[styles.paragraph, styles.textalingleft, { color: "black" }]}>GO BACK</Text>
            </View>

            {/*-------------------MODAL----------------------------------- */}
            <Modal visible={ShowModalsupp} transparent={true} animationType="fade" >
                <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={[{ width: '70%' }]}>
                        <ModalEditSupplier item={SelectedSupp} saveUpdate={updateSupplier} onclose={ModalView} />
                    </View>
                </View>
            </Modal>

            <Modal visible={ShowModalsuppCREATE} transparent={true} animationType="fade" >
                <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={[{ width: '70%' }]}>
                        <ModalCreateSupplier saveNewSupp={addSupplier} onclose={ModalViewCreate} />
                    </View>
                </View>
            </Modal>

            {/*-------------------BODY----------------------------------- */}
            <View>
                <Pressable style={[styles.rectanglebutton, { width: '20%', backgroundColor: 'black' }]} onPress={ModalViewCreate}>
                    <Text style={{ color: 'white' }}>CREATE SUPPLIER</Text>
                </Pressable>

                <FlatList
                    data={SuppliersList}
                    keyExtractor={(item) => item.id.toString()}
                    ListHeaderComponent={(
                        <View style={[ styles.flexcomponentsRow ,{ justifyContent : 'space-between', marginLeft : 10, marginRight : 10}]}>
                            <Text style={[styles.smallText, styles.textalingleft, { color: 'grey' }]}>Code</Text>
                            <Text style={[styles.smallText, styles.textalingleft, { color: 'grey' }]}>Name</Text>
                            <Text style={[styles.smallText, styles.textalingleft, { color: 'grey' }]}>Phone</Text>
                            <Text style={[styles.smallText, styles.textalingleft, { color: 'grey' }]}>E-mail</Text>
                            <Text style={[styles.smallText, styles.textalingleft, { color: 'grey' }]}>Active</Text>
                        </View>
                    )}
                    renderItem={({ item }) => (
                        <View>
                            <SupplierCard val={item} onEditPress={ToEditSupplier} />
                        </View>
                    )}
                    ListEmptyComponent={(
                        <View style={[{ alignSelf: 'center' }]}>
                            <Text style={[styles.smallText, { color: 'grey' }]}>There is not Suppliers yet, please press the button of create to register one.</Text>
                        </View>
                    )}
                />
            </View>
        </View>
    )
}

export default SuppliersHomePage;