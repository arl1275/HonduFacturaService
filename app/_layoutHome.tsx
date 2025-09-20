import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "@/assets/styles/styles";
import { StackParamList } from "./modules/inventory/indexInventory";
import Modulebutton from "@/components/ModuleButton";
import { StackScreenProps } from "@react-navigation/stack";
import { useNavigation } from '@react-navigation/native';

const HomePage = () =>{
    const navigation = useNavigation<any>();

    return(
        <View style={[{flex : 1, marginLeft : 10}]}>
            <Text style={[styles.paragraph, {color : 'black', justifyContent : 'center', fontWeight : 'bold'}]}>WELLCOME TO RECHNUNG</Text>
            <Text>This is app, will help your pymes to build a huge company.</Text>
            <View>
                <TouchableOpacity onPress={navigation.navigate('Inventory', { screen: 'HomeInventory' })}>
                    <Modulebutton title="INVENTORY" iconname="storage"/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default HomePage;