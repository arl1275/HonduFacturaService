import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Switch, Alert } from "react-native";
import { impuesto } from "@/storage/modals/empresa";
import styles from "@/assets/styles/styles";
import { Button } from "@react-navigation/elements";
import Ionicons from "react-native-vector-icons/Ionicons";

type props = {
    addImpuesto: (value: impuesto) => void;
    onclose: () => void;
}

const ModalCreateImpuesto = ({ addImpuesto, onclose }: props) => {
    const [NewImpuesto, setNewImpuesto] = useState<impuesto>({
        id: Date.now(),
        nombre: '',
        porcentaje: 0.0,
        active: false,
        defaultTax : false,
    });

    const OnUpdateValue = (e: string | number | boolean, field: string) => {
        setNewImpuesto((prev) => ({ ...prev, [field]: e }))
    }

    const AddImpuestoToCompany = () => {
        if (NewImpuesto.nombre.trim() === '' || NewImpuesto.porcentaje <= 0) {
            Alert.alert('ERR', 'Register a valid TAX');
            return;
        } else {
            addImpuesto(NewImpuesto);
            onclose();
        }
    }

    return (
        <View style={[{ width: '100%', alignSelf: 'center', justifyContent: 'space-between', padding: 5, borderBlockColor: 'black', borderWidth: 1, elevation: 10, borderRadius: 7, backgroundColor: 'white', marginBottom: 10 }]}>
            
            <View style={[styles.flexcomponentsRow, {margin : 5, alignItems : 'center', justifyContent : 'space-between'}]}>
                <Text style={[styles.paragraph, { color: 'black' }]}>UPDATE A TAX</Text>
                <TouchableOpacity style={[{ marginLeft: 5, marginRight: 5 }]} onPress={() => onclose()}>
                    <Ionicons name={"close-circle-outline"} size={25} color={"red"} />
                </TouchableOpacity>
            </View>

            <TextInput placeholder="TAX's NAME" onChangeText={(e: string) => OnUpdateValue(e, "nombre")} style={[styles.textinput, { padding: 10, margin: 7 }]} />
            <TextInput
                placeholder="% of the TAX"
                keyboardType="numeric"
                onChangeText={(e) => OnUpdateValue(parseFloat(e), "porcentaje")}
                style={[styles.textinput, { padding: 10, margin: 7 }]}
            />

            <View style={[styles.flexcomponentsRow, { alignSelf: 'flex-end', margin: 0 }]}>
                <Text style={[styles.smallText]}>Active the TAX</Text>
                <Switch
                    value={NewImpuesto.active}
                    onValueChange={(val: boolean) => OnUpdateValue(val, "active")}
                />
            </View>

            <View style={[styles.flexcomponentsRow, { alignSelf: 'flex-end', margin: 0 }]}>
                <Text style={[styles.smallText]}>Is this the default TAx</Text>
                <Switch
                    value={NewImpuesto.defaultTax}
                    onValueChange={(val: boolean) => OnUpdateValue(val, "defaultTax")}
                />
            </View>

            <View>
                <TouchableOpacity onPress={() => AddImpuestoToCompany()} style={[{ padding : 10, backgroundColor : 'black', borderRadius : 50}]}>
                    <Text style={[{color : 'white', alignSelf : 'center'}]}>CREATE TAX</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ModalCreateImpuesto;