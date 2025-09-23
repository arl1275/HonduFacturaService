import React from "react";
import { View, Text } from "react-native";
import styles from "@/assets/styles/styles";
import { StackScreenProps } from '@react-navigation/stack';
import { HomeRoutingLinks } from "./_layoutHome";

type props = StackScreenProps<HomeRoutingLinks, "Homepage">

const HomepageAPP = ({ route, navigation }: props) =>{
    return(
        <View style={[{flex : 1, margin : 10}]}>
            <Text style={[styles.title, {color : 'black', textAlign : 'left', marginBottom : 3}]}>WELLCOME TO SCHUTZ</Text>       
            <Text style={[styles.smallText, {color : 'grey', textAlign: 'left'}]}>This is your app to manage your company, all you need for your business is here. 
                Follow the instrucctions added for your provider.</Text>    
            <View style={{ borderBottomColor: '#d5dbdb', borderBottomWidth: 1, marginLeft: 15, marginRight: 15 }} />        
            <Text style={[styles.paragraph, {color : 'black', textAlign: 'left'}]}>
                Select one of the main options of this app, or configure the company in the other options.
            </Text>

            <View></View>
        </View>
    )
}

export default HomepageAPP