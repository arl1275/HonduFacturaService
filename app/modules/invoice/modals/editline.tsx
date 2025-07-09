import React, { useState, useEffect } from "react";
import { Modal, View, TextInput, Text, Button } from "react-native";
import { lineafacturada } from "@/storage/invoice";
import styles from "@/assets/styles/styles";

type props = {
    _onCancel_: () => void;
    _onSave_: (item: lineafacturada) => void;
    value: lineafacturada | undefined;
};

function EditlineFacturada({ _onCancel_, _onSave_, value }: props) {
    const [item, setItem] = useState<lineafacturada>({
        id: Date.now(),
        cantidad: 0,
        detalle: "",
        descuento: 0,
        precio: 0,
    });

    const handleChange = (key: keyof lineafacturada, value: string) => {
        const numericKeys: (keyof lineafacturada)[] = ["cantidad", "descuento", "precio", "id"];
        setItem({
            ...item,
            [key]: numericKeys.includes(key) ? parseFloat(value) || 0 : value,
        });
    };

    useEffect(() => {
        value != undefined && setItem(value);
    }, [value])

    return (
        <View style={[styles.fixedbox, { backgroundColor: 'white' }]}>
            <View>
                <Text style={[styles.title, { color: 'black' }]}>Editar Línea Facturada</Text>

                <View style={[styles.textinput,styles.flexcomponentsRow, { padding: 10 }]}>
                    <TextInput
                        placeholder="Cantidad"
                        keyboardType="numeric"
                        value={item.cantidad.toString()}
                        onChangeText={(text) => handleChange("cantidad", text)}
                    />
                </View>

                <View style={[styles.textinput, { padding: 10 }]}>
                    <TextInput
                        placeholder="Detalle"
                        value={item.detalle}
                        onChangeText={(text) => handleChange("detalle", text)}
                    />
                </View>

                <View style={[styles.textinput, { padding: 10 }]}>
                    <TextInput
                        placeholder="Descuento"
                        keyboardType="numeric"
                        value={item.descuento.toString()}
                        onChangeText={(text) => handleChange("descuento", text)}
                    />
                </View>

                <View style={[styles.textinput, { padding: 10 }]}>
                    <TextInput
                        placeholder="Precio"
                        keyboardType="numeric"
                        value={item.precio.toString()}
                        onChangeText={(text) => handleChange("precio", text)}
                    />
                </View>

                <View style={[styles.flexcomponentsRow, { justifyContent: 'space-between' }]}>
                    <Button title="Cancelar" onPress={_onCancel_} />
                    <Button title="Guardar" onPress={() => _onSave_(item)} />
                </View>
            </View>
        </View>
    );
}

export default EditlineFacturada;
