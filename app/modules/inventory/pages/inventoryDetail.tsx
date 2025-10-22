import { View, Text, TouchableOpacity, Button, Modal, FlatList, TextInput } from "react-native";
import { useEffect, useState, useCallback } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { StackScreenProps } from "@react-navigation/stack";

import styles from "@/assets/styles/styles";
import { StackParamList } from "../indexInventory";

// funciones
import { getAllProducts_by_WH_ID, updateProduct } from "@/storage/product.storage";

// componentes
import ProductRender from "../components/productRender";
import ProductManage from "../modals/createProduct"; // corregido

// tipos
import { product } from "@/storage/modals/inventory";

type Props = StackScreenProps<StackParamList, "Inventorydetail">;

const InventoryDetail = ({ route, navigation }: Props) => {
    const inventory = route.params.invo;

    const [showModal, setShowModal] = useState<boolean>(false);
    const [productos, setProductos] = useState<product[]>([]);
    const [filteredProductos, setFilteredProductos] = useState<product[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const [editProduct, setEditProduct] = useState<product | undefined>(undefined);

    //------------------ FUNCIONES DE MODAL -----------------------------//
    const toggleProductModal = useCallback(() => setShowModal((prev) => !prev), []);
    const clearEdit = () =>{setEditProduct(undefined)};
    const setUpdaterProduct = useCallback((item: product) => setEditProduct(item), []);
    //------------------------------------------------------------------//

    //------------------ Navigate to insert lot page -------------------//
    const GotoInsertingLot = () => {navigation.navigate("InsertingLot", {invo : inventory})}

    //------------------ CARGAR PRODUCTOS -----------------------------//
    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllProducts_by_WH_ID(inventory.id);
            setProductos(data || []);
            setFilteredProductos(data || []);
        };
        fetchData();
    }, [inventory.id, showModal]);
    //------------------------------------------------------------------//

    //------------------ BUSCADOR -----------------------------//
    const handleSearch = useCallback(
        (text: string) => {
            setSearchQuery(text);
            const query = text.trim().toLowerCase();

            if (query === "") {
                setFilteredProductos(productos);
                return;
            }

            const filtered = productos.filter(
                (item) =>
                    item.name.toLowerCase().includes(query) ||
                    item.barcode?.toLowerCase().includes(query)
            );

            setFilteredProductos(filtered);
        },
        [productos]
    );
    //------------------------------------------------------------------//

    return (
        <View style={{ flex: 1, margin: 10 }}>
            {/*--------------------- MODAL -------------------------*/}
            <Modal visible={showModal} transparent animationType="fade">
                <View
                    style={{
                        flex: 1,
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <View style={{ width: "70%" }}>
                        <ProductManage
                            id_invo={inventory.id}
                            _product_={editProduct}
                            onCancel={toggleProductModal}
                            _comp_={route.params.comp}
                            UpdaterFunc={updateProduct}
                            clearprd={clearEdit}
                        />
                    </View>
                </View>
            </Modal>

            {/*--------------------- HEADER -------------------------*/}
            <View style={[styles.flexcomponentsRow, { margin: 5, alignItems: "center" }]}>
                <TouchableOpacity onPress={() => navigation.navigate("HomeInventory")}>
                    <Ionicons name="chevron-back" size={30} color="black" />
                </TouchableOpacity>
                <Text style={[styles.paragraph, styles.textalingleft, { color: "black" }]}>
                    Inventory Page
                </Text>
            </View>

            {/*--------------------- INVENTORY INFO -------------------------*/}
            <View style={[styles.cardborder, { padding: 10 }]}>
                <Text style={[styles.paragraph, styles.textalingleft, { color: "black" }]}>
                    {inventory.name}
                </Text>
                <Text style={[styles.smallText, { fontSize: 15 }]}>{inventory.code}</Text>
                <Text style={[styles.smallText, { fontSize: 15 }]}>{inventory.ubication}</Text>
                <Text style={[styles.smallText, { fontSize: 15 }]}>
                    {inventory.type.physical ? "PHYSICAL" : "VIRTUAL"}
                </Text>

                <View style={[styles.flexcomponentsRow, { justifyContent: "space-between", marginTop: 10 }]}>
                    <Button title="Create Product" color={"green"} onPress={toggleProductModal} />
                    <Button title="Insertion Lot" color={"black"} onPress={GotoInsertingLot}/>
                </View>
            </View>

            {/*--------------------- BUSCADOR -------------------------*/}
            <View style={{ marginVertical: 10 }}>
                <TextInput
                    placeholder="Search by name or barcode..."
                    value={searchQuery}
                    onChangeText={handleSearch}
                    style={{
                        backgroundColor: "#fff",
                        borderColor: "#ccc",
                        borderWidth: 1,
                        borderRadius: 8,
                        padding: 8,
                        fontSize: 16,
                        color: "black",
                    }}
                    placeholderTextColor="#888"
                />
            </View>

            {/*--------------------- LISTA DE PRODUCTOS -------------------------*/}
            <FlatList
                data={filteredProductos}
                keyExtractor={(item) => String(item.id)}
                keyboardShouldPersistTaps="handled"
                ListHeaderComponent={
                    <View
                        style={[
                            styles.flexcomponentsRow,
                            { justifyContent: "space-between", paddingVertical: 5 },
                        ]}
                    >
                        <Text style={{ fontWeight: "bold" }}>Name</Text>
                        <Text style={{ fontWeight: "bold" }}>Code</Text>
                        <Text style={{ fontWeight: "bold" }}>Amount</Text>
                        <Text style={{ fontWeight: "bold" }}>Price</Text>
                    </View>
                }
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => {
                            setUpdaterProduct(item);
                            toggleProductModal();
                        }}
                    >
                        <ProductRender prod={item} />
                    </TouchableOpacity>
                )}
                ListEmptyComponent={
                    <View style={{ alignSelf: "center", marginTop: 20 }}>
                        <Text style={[styles.smallText, { color: "gray" }]}>
                            NO PRODUCTS FOUND
                        </Text>
                    </View>
                }
            />
        </View>
    );
};

export default InventoryDetail;
