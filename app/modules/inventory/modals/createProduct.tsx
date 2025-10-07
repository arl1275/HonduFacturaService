import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Switch, TouchableOpacity, Alert } from "react-native";
import styles from "@/assets/styles/styles";
import { product } from "@/storage/modals/inventory";
import { company, impuesto } from "@/storage/modals/empresa";
import PickerTax from "../components/SelectTax";
import { addProduct } from "@/storage/product.storage";

type props = {
    id_invo: number;
    _product_: product | undefined;
    _comp_: company | undefined;
    onCancel: () => void;
};

const ProductMagane = ({ id_invo, _product_, _comp_, onCancel }: props) => {
    const [imp, setImp] = useState<impuesto[]>([]);
    const [NewProduct, setNewProduct] = useState<product>({
        id: Date.now(),
        created_at: new Date(),
        name: "",
        code: "",
        barcode: "",
        extracode: "",
        specialTax: 0,
        price: 0,
        amountStock: 0.0,
        type: {
            consumible: false,
            discret: true,
        },
        expiration_date: null,
        id_inventory: id_invo,
        active: false,
        active_POS: false,
        allow_negative_stock: false,
        block_edit: false,
    });

    const UpdateData = ( valuename: string, value: string | number | Date | boolean, isType: boolean) => {
        if (!isType) {
            setNewProduct((prev) => ({ ...prev, [valuename]: value }));
        } else {
            setNewProduct((prev) => ({
                ...prev,
                type: { ...prev.type, [valuename]: value },
            }));
        }
    };

    const UpdateTAX = (valor: impuesto | undefined) => {
        if (valor) { setNewProduct((prev) => ({ ...prev, specialTax: valor?.id })); }
    }

    const OnSaveProduct = () => {
        if (NewProduct.name && NewProduct.code && NewProduct.barcode && NewProduct.specialTax && NewProduct.type && NewProduct.id_inventory) {
            addProduct(NewProduct);
            onCancel();
        } else {
            Alert.alert("Missing Fields", "Please Fill up all the fields to save a product.")
        }

    }

    useEffect(() => {
        if (_product_) setNewProduct(_product_);
        if (_comp_ != undefined) { setImp(_comp_.impuestos) }
    }, [_product_]);

    return (
        <View style={[styles.cardborder, { margin: 10, backgroundColor: "white", padding: 12, borderRadius: 8 }]}>
            <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 8, color: "black" }}>
                {_product_ ? "EDIT PRODUCT" : "NEW PRODUCT"}
            </Text>

            {/* Name */}
            <TextInput
                style={[styles.textinput, { padding: 10, marginBottom: 10 }]}
                placeholder="Product name"
                value={NewProduct.name}
                onChangeText={(v) => UpdateData("name", v, false)}
            />

            <TextInput
                style={[styles.textinput, { padding: 10, marginBottom: 10 }]}
                placeholder="Code"
                value={NewProduct.code}
                onChangeText={(v) => UpdateData("code", v, false)}
            />

            <TextInput
                style={[styles.textinput, { padding: 10, marginBottom: 10 }]}
                placeholder="Barcode"
                value={NewProduct.barcode}
                onChangeText={(v) => UpdateData("barcode", v, false)}
            />

            <TextInput
                style={[styles.textinput, { padding: 10, marginBottom: 10 }]}
                placeholder="Extra code"
                value={NewProduct.extracode}
                onChangeText={(v) => UpdateData("extracode", v, false)}
            />

            {/* Price (numeric) */}
            <View style={[styles.flexcomponentsRow, { alignItems: 'center', justifyContent: 'space-between' }]}>
                <Text style={{ color: "black", width: '10%', fontWeight: 'bold', fontSize: 20 }}>Price</Text>
                <TextInput
                    style={[styles.textinput, { padding: 10, marginBottom: 0, width: '90%' }]}
                    placeholder="0.00"
                    keyboardType="numeric"
                    value={NewProduct.price.toString()}
                    onChangeText={(v) => UpdateData("price", parseFloat(v) || 0, false)}
                />
            </View>


            {/* Amount in stock (numeric) */}
            <Text style={{ color: "black", marginBottom: 4 }}>Amount in Stock</Text>
            <TextInput
                style={[styles.textinput, { padding: 10, marginBottom: 10 }]}
                placeholder="0"
                keyboardType="numeric"
                value={NewProduct.amountStock.toString()}
                onChangeText={(v) => UpdateData("amountStock", parseFloat(v) || 0, false)}
            />

            {
                NewProduct.type.consumible && (<View>
                    <Text style={{ color: "black", marginBottom: 4 }}>Expiration Date (YYYY-MM-DD) </Text>
                    <TextInput
                        style={[styles.textinput, { padding: 10, marginBottom: 10 }]}
                        placeholder=" this will be changed 2026-12-31"
                        value={NewProduct.expiration_date ? new Date(NewProduct.expiration_date).toISOString().slice(0, 10) : ""}
                        onChangeText={(v) => {
                            // guardamos como Date o null si viene vacío
                            const d = v.trim() ? new Date(v) : null;
                            UpdateData("expiration_date", d as any, false);
                        }}
                    /></View>)
            }

            {/* TYPE toggles */}
            <View style={[styles.cardborder, { marginTop: 4, marginBottom: 8 }]}>
                <Text style={{ color: "black", marginBottom: 6, fontWeight: "600" }}>Type</Text>

                <View style={[styles.flexcomponentsRow, { justifyContent: "space-between", marginBottom: 8 }]}>
                    <Text style={{ color: "black" }}>Consumible</Text>
                    <Switch
                        value={NewProduct.type.consumible}
                        onValueChange={(val) => UpdateData("consumible", val, true)}
                    />
                </View>

                <View style={[styles.flexcomponentsRow, { justifyContent: "space-between" }]}>
                    <Text style={{ color: "black" }}>Discrete</Text>
                    <Switch
                        value={NewProduct.type.discret}
                        onValueChange={(val) => UpdateData("discret", val, true)}
                    />
                </View>
            </View>

            {/* Flags */}
            <View style={[styles.cardborder, { marginTop: 5 }]}>
                <View style={[styles.flexcomponentsRow, { justifyContent: "space-between", marginBottom: 6 }]}>
                    <Text style={{ color: "black" }}>Active</Text>
                    <Switch
                        value={NewProduct.active}
                        onValueChange={(val) => UpdateData("active", val, false)}
                    />
                </View>

                <View style={[styles.flexcomponentsRow, { justifyContent: "space-between", marginBottom: 0 }]}>
                    <Text style={{ color: "black" }}>Active in POS</Text>
                    <Switch
                        value={NewProduct.active_POS}
                        onValueChange={(val) => UpdateData("active_POS", val, false)}
                    />
                </View>

                <View style={[styles.flexcomponentsRow, { justifyContent: "space-between" }]}>
                    <Text style={{ color: "black" }}>Allow Negative Stock</Text>
                    <Switch value={NewProduct.allow_negative_stock} onValueChange={(val) => UpdateData("allow_negative_stock", val, false)} />
                </View>
            </View>


            {/* TAX SELECTOR */}
            <View style={[styles.flexcomponentsRow, { alignItems: 'center', justifyContent: 'space-between' }]}>
                <Text style={{ color: "black", width: '10%', fontWeight: 'bold', fontSize: 20 }}>Select Tax</Text>
                <PickerTax ToSelect={UpdateTAX} impuestos={imp} />
            </View>


            <View style={[styles.flexcomponentsRow, { justifyContent: "space-between" }]}>
                <TouchableOpacity
                    style={{ marginTop: 12, backgroundColor: "black", padding: 12, borderRadius: 8, width: "45%" }}
                    onPress={OnSaveProduct}>
                    <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>SAVE PRODUCT</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ marginTop: 12, backgroundColor: "red", padding: 12, borderRadius: 8, width: "45%" }}
                    onPress={onCancel}>
                    <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>CANCEL</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

export default ProductMagane;
