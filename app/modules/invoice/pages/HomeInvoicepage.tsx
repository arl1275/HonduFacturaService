import { View, Text } from "react-native";
import styles from "@/assets/styles/styles";

const InvoiceHome = () =>{

    return(
        <View>
            <Text style={[styles.title, { color : 'black', alignSelf : 'flex-start', marginLeft : 25}]}>Home Invoice</Text>
            <View style={{ borderBottomColor : 'grey', borderBottomWidth : 1, marginLeft : 20, marginRight : 20}}/>
            <Text style={[styles.paragraph, { color : 'black', alignSelf : 'flex-start', margin : 25}]}>
                Select the company which the Invoice would be generated for
            </Text>
        </View>
    )
}

export default InvoiceHome;