import React from "react";
import { View, Text } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from "@/assets/styles/styles";

type props = {
    title : string,
    iconname : string,
    color : string
}

const InvoButton = ({ title, iconname, color }: props) => {
    return (
        <View style={[ styles.flexcomponentsRow, { padding : 5, borderRadius : 5,alignItems: 'center', backgroundColor : color, alignContent : 'center'}]}>
            <View style={[{ margin: 10, marginLeft: 20 }]}>
                <Icon name={iconname} size={40} color="white" />
            </View>

            <Text style={[{ color: 'white', marginRight: 20, fontSize: 30, fontWeight: 'semibold' }]}>{title}</Text>
            
        </ View>
    )
}

export default InvoButton;