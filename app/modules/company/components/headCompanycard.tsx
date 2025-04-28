import { View, Text } from "react-native";
import { FC, useState } from "react";
import { company } from "@/storage/empresa";
import { updatecompany } from "@/storage/company.storage";
import styles from "@/assets/styles/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import CircularImage from "./image";

type Props = {
    value: company,
}

const Homecardcompany: FC<Props> = (props) => {
    return (
        <View style={[styles.rectanglebutton, styles.flexcomponentsRow, { height: 'auto', justifyContent: 'space-between', marginTop : 5, marginBottom : 5 }]}>
            <View style={[styles.flexcomponentsRow, { alignItems : 'center'}]}>
                <CircularImage base64Image={props.value.image} />
                <View>
                    <Text style={[styles.smallText, styles.textalingleft, { color: 'black', fontWeight : 'bold' }]}>{props.value.companyname ? props.value.companyname : 'NON YET'}</Text>
                    <Text style={[styles.smallText, styles.textalingleft, { color: 'black' }]}>{props.value.direccion_correo ? props.value.direccion_company : 'NON YET'}</Text>
                    <Text style={[styles.smallText, styles.textalingleft, { color: 'black' }]}>{props.value.direccion_company ? props.value.direccion_correo : 'NON YET'}</Text>
                    <Text style={[styles.smallText, styles.textalingleft, { color: 'black' }]}>{props.value.rtn ? props.value.rtn : 'NON YET'}</Text>
                </View>

            </View>
            <Ionicons name={"chevron-forward"} size={25} color={"black"} />
        </View>
    )
}

export default Homecardcompany;