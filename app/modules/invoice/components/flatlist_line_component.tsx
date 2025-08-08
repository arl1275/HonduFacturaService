import styles from "@/assets/styles/styles";
import { lineafacturada } from "@/storage/invoice";
import React from "react";
import { View, Text, TouchableOpacity} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

type props = {
    item : lineafacturada,
    Select_to_Edit : (item : lineafacturada) => void;
    delete_linea : (item : number) => void;
}


const LineFlatlist = ({item, Select_to_Edit, delete_linea} : props) => {

    return (
        <View
            style={[
                styles.flexcomponentsRow,
                styles.textinput,
                {
                    flexDirection: 'row',
                    paddingVertical: 8,
                    paddingHorizontal: 10,
                    alignItems: 'center',
                    marginHorizontal: 20,
                },
            ]}
        >
            <Text style={{ flex: 3 }}>{item.detalle}</Text>
            <Text style={{ flex: 2, textAlign: 'right' }}>{item.descuento}%</Text>
            <Text style={{ flex: 2, textAlign: 'right' }}>{item.cantidad}</Text>
            <Text style={{ flex: 2, textAlign: 'right' }}>{item.precio}</Text>

            {/* Botones de acción */}
            <View style={{ flex: 1, alignItems: 'center' }}>
                <TouchableOpacity onPress={() => Select_to_Edit(item)}>
                    <Ionicons name="pencil-outline" color="green" size={18} />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <TouchableOpacity onPress={() => delete_linea(item.id)}>
                    <Ionicons name="close-circle-outline" color="red" size={18} />
                </TouchableOpacity>
            </View>
        </View>
    )

}

export default LineFlatlist;