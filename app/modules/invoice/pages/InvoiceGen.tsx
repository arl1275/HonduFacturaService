import { View, Text, TouchableOpacity, Button, TextInput } from "react-native";
import { invoice, lineafacturada } from "@/storage/invoice";
import { company } from "@/storage/empresa";
// route imports
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from "../indexInvoice";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "@/assets/styles/styles";
import { useState } from "react";


type props = StackScreenProps<RootStackParamList, "InvoiceGen">


const InvoiceGen = ({ route, navigation }: props) => {
    const { item } = route.params;
    const [LineasFacutas, setLineasFacturas] = useState<lineafacturada[]>([]);
    const [Linea, setLinea] = useState<lineafacturada>({
        id: Date.now(),
        cantidad: 0,
        detalle: "",
        descuento: 0,
        precio: 0,
    });

    const CleanFinea = () => {
        setLinea({
            id: Date.now(),
            cantidad: 0,
            detalle: "",
            descuento: 0,
            precio: 0,
        })
    };

    const UpdateLine = (value: string, field: string) => {
        if (typeof Linea === "undefined") return;

        // Convertir a número si es numérico
        const parsedValue = !isNaN(Number(value)) && value.trim() !== ""
            ? Number(value)
            : value;

        setLinea((prev) => ({
            ...prev,
            [field]: parsedValue
        }));
    };




    const oncancel = () => { navigation.navigate("HomeInvoice") }

    return (
        <View style={[{ flex: 1 }]}>
            <View style={[styles.flexcomponentsRow, { margin: 5 }]}>
                <TouchableOpacity onPress={() => oncancel()}>
                    <Ionicons name="chevron-back" size={30} color="black" />
                </TouchableOpacity>
                <Text style={[styles.paragraph, styles.textalingleft, { color: 'black' }]}>Invoice Generation</Text>
            </View>

            <View style={{ marginLeft: 20, marginRight: 20 }}>
                <Text>This invoice is not done thill you press the button of done, meanwhile is created as DRAFT</Text>
            </View>

            <View>
                <View style={[styles.flexcomponentsRow]}>
                    <View style={[styles.textinput, { padding: 10, width: '35%' }]}>
                        <TextInput
                            onChangeText={(e) => UpdateLine(e, 'detalle')}
                            placeholder="Detalle de factura"
                            style={{ width: '100%' }}
                        />
                    </View>

                    <View style={[styles.textinput, { padding: 10, width: "17%" }]}>
                        <TextInput
                            placeholder="Amount"
                            onChangeText={(e) => UpdateLine(e, 'cantidad')}
                            keyboardType="numeric"
                            style={{ width: '100%' }}
                        />
                    </View>

                    <View style={[styles.textinput, { padding: 10, width: "17%" }]}>
                        <TextInput
                            placeholder="PRICE"
                            onChangeText={(e) => UpdateLine(e, 'precio')}
                            style={{ width: '100%' }}
                        />
                    </View>

                    <View style={[styles.textinput, { padding: 10, width: "19%" }]}>
                        <TextInput
                            placeholder="Discount"
                            onChangeText={(e) => UpdateLine(e, 'descuento')}
                            keyboardType="numeric"
                            style={{ width: '100%' }}
                        />
                    </View>
                </View>

                <View>

                </View>
            </View>

            <View style={[styles.flexcomponentsRow, { justifyContent: 'space-between', width: '60%' }]}>
                <Button title="GENERATE INVOICE" color={"black"} />
                <Button title="DRAFT" color={"black"} />
                <Button title="CANCEL" color={"red"} />
            </View>
        </View>
    )
}

export default InvoiceGen;