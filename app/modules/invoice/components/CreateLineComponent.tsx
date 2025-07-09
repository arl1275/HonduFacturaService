import styles from "@/assets/styles/styles"
import { lineafacturada } from "@/storage/invoice";
import { useEffect, useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"

type props = {
    UpdateLine: (value: any, detalle: string) => void;
    addFacturaline: () => void;
    CleanLine: () => void;
    vAlue: lineafacturada 
}

const CreateLineInvoice = ({ UpdateLine, addFacturaline, CleanLine, vAlue }: props) => {
    const [Linea, setValue] = useState<lineafacturada>();
    
    useEffect(() => {
        setValue(vAlue);
    }, [CleanLine])

    return (
        <View>
            <View
                style={[
                    styles.flexcomponentsRow,
                    {
                        marginTop: 0,
                        paddingTop: 0,
                        flexDirection: 'row',
                        alignItems: 'center',
                        flexWrap: 'nowrap',
                        paddingHorizontal: 10,
                    },
                ]}
            >
                {/* Detalle */}
                <View style={[styles.textinput, { padding: 8, flex: 4 }]}>
                    <TextInput
                        onChangeText={(e) => UpdateLine(e, 'detalle')}
                        placeholder="Detalle"
                        multiline={true}
                        value={Linea?.detalle !== "" ? Linea?.detalle.toString() : ""}
                        style={{ width: '100%' }}
                    />
                </View>

                {/* Cantidad */}
                <View style={[styles.textinput, { padding: 8, flex: 2 }]}>
                    <TextInput
                        placeholder="Amo."
                        onChangeText={(e) => UpdateLine(e, 'cantidad')}
                        value={Linea?.cantidad !== 0 ? Linea?.cantidad.toString() : ""}
                        keyboardType="numeric"
                        style={{ width: '100%', textAlign: 'right' }}
                    />
                </View>

                {/* Precio */}
                <View style={[styles.textinput, { padding: 8, flex: 2 }]}>
                    <TextInput
                        placeholder="Precio"
                        onChangeText={(e) => UpdateLine(e, 'precio')}
                        keyboardType="numeric"
                        value={Linea?.precio !== 0 ? Linea?.precio.toString() : ""}
                        style={{ width: '100%', textAlign: 'right' }}
                    />
                </View>

                {/* Descuento */}
                <View style={[styles.textinput, { padding: 8, flex: 2 }]}>
                    <TextInput
                        placeholder="Disco."
                        onChangeText={(e) => UpdateLine(e, 'descuento')}
                        value={Linea?.descuento !== 0 ? Linea?.descuento.toString() : ""}
                        keyboardType="numeric"
                        style={{ width: '100%', textAlign: 'right' }}
                    />
                </View>

                {/* Botón de agregar */}
                <View style={{ padding: 8, flex: 1, alignItems: 'center' }}>
                    <TouchableOpacity onPress={addFacturaline}>
                        <Ionicons name="checkbox-outline" color="green" size={20} />
                    </TouchableOpacity>
                </View>

                {/* Botón de limpiar */}
                <View style={{ padding: 8, flex: 1, alignItems: 'center' }}>
                    <TouchableOpacity onPress={CleanLine}>
                        <Ionicons name="trash-outline" color="red" size={20} />
                    </TouchableOpacity>
                </View>
            </View>


        </View>
    )
}

export default CreateLineInvoice