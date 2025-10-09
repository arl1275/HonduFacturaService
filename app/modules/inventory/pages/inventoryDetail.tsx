import { View, Text, TouchableOpacity, Button, Modal, FlatList, TextInput } from "react-native";
import styles from "@/assets/styles/styles";
import { StackParamList } from "../indexInventory";
import { StackScreenProps } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useEffect, useState } from "react";

// functions
import { getAllProducts_by_WH_ID, updateProduct } from "@/storage/product.storage";

// componets importer
import ProductRender from "../components/productRender";
import ProductMagane from "../modals/createProduct";
import ProductModal from "../modals/productModal";

// modals
import { product } from "@/storage/modals/inventory";

type props = StackScreenProps<StackParamList, "Inventorydetail">;

const InventoryDetail = ({ route, navigation }: props) => {
    const inventory = route.params.invo;
    const [showModal, setShowModal] = useState<boolean>(false);
    const [productos, setProductos] = useState<product[]>([]);
    const [filteredProductos, setFilteredProductos] = useState<product[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const [Editproduct, setEditProd] = useState<product | undefined>(undefined)

    const toggleProductModal = () =>{ setShowModal(prev => !prev);}
    const ClearEdit = () => setEditProd(undefined);

    //------------------ MANAGE THE UPDATE PRODUCT-----------------------------//
    const SetUpdaterproduct = (item : product) => {setEditProd(item)}
    //-------------------------------------------------------------------------//

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllProducts_by_WH_ID(inventory.id);
            setProductos(data || []);
            setFilteredProductos(data || []);
        };
        fetchData();
    }, [inventory.id, showModal]);

    // -------------------- BUSCADOR --------------------
    const handleSearch = (text: string) => {
        setSearchQuery(text);
        if (text.trim() === "") {
            setFilteredProductos(productos);
            return;
        }
        const lowerText = text.toLowerCase();
        const filtered = productos.filter(
            (item) =>
                item.name.toLowerCase().includes(lowerText) ||
                item.barcode?.toLowerCase().includes(lowerText)
        );
        setFilteredProductos(filtered);
    };

    return (
        <View style={{ flex: 1, margin: 10 }}>
            {/*--------------------- MODAL -------------------------*/}
            <Modal visible={showModal} transparent={true} animationType="fade">
                <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)", justifyContent: "center", alignItems: "center" }}>
                    <View style={{ width: "70%" }}>
                        <ProductMagane id_invo={inventory.id} _product_={Editproduct != undefined ? Editproduct : undefined} onCancel={toggleProductModal} 
                        _comp_={route.params.comp} UpdaterFunc={updateProduct} clearprd={ClearEdit} />
                    </View>
                </View>
            </Modal>

            {/*--------------------- HEADER -------------------------*/}
            <View style={[styles.flexcomponentsRow, { margin: 5, alignItems: "center" }]}>
                <TouchableOpacity onPress={() => navigation.navigate("HomeInventory")}>
                    <Ionicons name="chevron-back" size={30} color="black" />
                </TouchableOpacity>
                <Text style={[styles.paragraph, styles.textalingleft, { color: "black" }]}>Inventory Page</Text>
            </View>

            {/*--------------------- INVENTORY INFO -------------------------*/}
            <View style={[styles.cardborder]}>
                <Text style={[styles.paragraph, styles.textalingleft, { color: "black" }]}>{inventory.name}</Text>
                <Text style={[styles.smallText, styles.textalingleft, { fontSize: 15 }]}>{inventory.code}</Text>
                <Text style={[styles.smallText, styles.textalingleft, { fontSize: 15 }]}>{inventory.ubication}</Text>
                <Text style={[styles.smallText, styles.textalingleft, { fontSize: 15 }]}>
                    {inventory.type.physical ? "PHYSICAL" : "VIRTUAL"}
                </Text>

                <View style={[styles.flexcomponentsRow, { justifyContent: "space-between" }]}>
                    <Button title="Create Product" color={"green"} onPress={toggleProductModal} />
                    <Button title="Insertion Lot" color={"black"} />
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
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <ProductRender prod={item} />}
                ListHeaderComponent={(item) => (
                    <TouchableOpacity onPress={() => {SetUpdaterproduct(item), toggleProductModal() }}>
                        <View style={[styles.flexcomponentsRow, { justifyContent: 'space-between' }]}>
                            <Text>Name</Text>
                            <Text>Code</Text>
                            <Text>Amount</Text>
                            <Text>Price</Text>
                        </View>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={
                    <View style={{ alignSelf: "center", marginTop: 20 }}>
                        <Text style={[styles.smallText, { color: "gray" }]}>NO PRODUCTS FOUND</Text>
                    </View>
                }
            />
        </View>
    );
};

export default InventoryDetail;
