import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "@/assets/styles/styles";

const HomePage = () =>{
    return(
        <View style={[{flex : 1}]}>
            <Text style={[styles.paragraph, {color : 'black'}]}>WELLCOME TO RECHNUNG</Text>
        </View>
    )
}

export default HomePage;