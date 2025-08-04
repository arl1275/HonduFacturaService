import React, { useEffect, useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Switch, Alert } from "react-native";
import { impuesto } from "@/storage/empresa";
import styles from "@/assets/styles/styles";

type props = {
    item: impuesto | undefined,
    saveUpdate: (Up: impuesto) => void;
    onclose: () => void;
}

const ModalEditImpuesto = ({ item, saveUpdate, onclose }: props) => {
    const [NewImpuesto, setNewImpuesto] = useState<impuesto>({
        id: Date.now(),
        nombre: '',
        porcentaje: 0.0,
        active: false
    });
    const [placeholders, setPlaceholders] = useState({ procentajeItem: '', nombreitem: '' })

    useEffect(() => {
        if (typeof item != 'undefined') {
            setPlaceholders((prev) => ({ ...prev, procentajeItem: `% actual ${item.porcentaje}`, nombreitem: `name ${item.nombre}` }));
            setNewImpuesto(item);
        }
    }, [item])

    const OnUpdateValue = (e: string | number | boolean, field: string) => {
        setNewImpuesto((prev) => ({ ...prev, [field]: e }))
    }

    const AddImpuestoToCompany = () => {
        if (NewImpuesto.nombre.trim() === '' || NewImpuesto.porcentaje <= 0) {
            Alert.alert('ERR', 'Register a valid TAX');
            return;
        } else {
            saveUpdate(NewImpuesto);
            onclose();
        }
    }

    return (
        <View style={[{ alignSelf: 'center', justifyContent: 'space-between', padding: 5, borderBlockColor: 'black', borderWidth: 1, elevation: 10, borderRadius: 7, backgroundColor: 'white', marginBottom: 10 }]}>
            <Text style={[styles.paragraph, { color: 'black' }]}>CREATE A TAX</Text>
            <TextInput placeholder={placeholders.nombreitem}
                onChangeText={(e: string) => OnUpdateValue(e, "nombre")} style={[styles.textinput, { padding: 10, margin: 7 }]} />
            <TextInput
                placeholder={placeholders.procentajeItem}
                keyboardType="numeric"
                onChangeText={(e) => OnUpdateValue(parseFloat(e), "porcentaje")}
                style={[styles.textinput, { padding: 10, margin: 7 }]}
            />

            <View>
                <Switch
                    value={NewImpuesto.active}
                    onValueChange={(val: boolean) => OnUpdateValue(val, "active")}
                />
            </View>
            <View>
                <TouchableOpacity onPress={() => AddImpuestoToCompany()}>
                    <Text>Update TAX</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ModalEditImpuesto;