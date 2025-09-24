import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "@/assets/styles/styles";
import { StackScreenProps } from '@react-navigation/stack';
import { HomeRoutingLinks } from "./_layoutHome";
import Icon from 'react-native-vector-icons/MaterialIcons';

type props = StackScreenProps<HomeRoutingLinks, "Homepage">

const HomepageAPP = ({ route, navigation }: props) => {
    return (
        <View style={[{ flex: 1, margin: 10 }]}>
            <Text style={[styles.title, { color: 'black', textAlign: 'left', marginBottom: 3 }]}>WELLCOME TO SCHUTZ</Text>
            <Text style={[styles.smallText, { color: 'grey', textAlign: 'left' }]}>This is your app to manage your company, all you need for your business is here.
                Follow the instrucctions added for your provider.</Text>
            <View style={{ borderBottomColor: '#d5dbdb', borderBottomWidth: 1, marginLeft: 15, marginRight: 15 }} />
            <Text style={[styles.paragraph, { color: 'black', textAlign: 'left' }]}>
                Select one of the main options of this app, or configure the company in the other options.
            </Text>

            <View>
                <TouchableOpacity 
                    onPress={()=> navigation.navigate("InventoryIndex")}
                    style={[styles.flexcomponentsRow, 
                    {justifyContent : 'space-between', alignItems : 'center', borderRadius : 7, marginTop : 5, marginBottom : 5, backgroundColor : 'black'}]}>
                    <View style={[{ margin: 10, marginLeft: 20 }]}>
                        <Icon name={"storage"} size={25} color="white" />
                    </View>
                    <Text style={[styles.paragraph, { color: 'white', marginRight: 20, fontSize: 20, fontWeight: 'semibold' }]}>Inventory Management</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.flexcomponentsRow, 
                    {justifyContent : 'space-between', alignItems : 'center' ,  borderRadius : 7, marginTop : 5, marginBottom : 5,backgroundColor : 'black'}]}>
                    <View style={[{ margin: 10, marginLeft: 20 }]}>
                        <Icon name={"storefront"} size={25} color="white" />
                    </View>
                    <Text style={[styles.paragraph, { color: 'white', marginRight: 20, fontSize: 20, fontWeight: 'semibold' }]}>Point of Sale</Text>
                </TouchableOpacity>
                
            </View>
        </View>
    )
}

export default HomepageAPP