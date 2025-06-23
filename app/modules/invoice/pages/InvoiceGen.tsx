import { View, Text, TouchableOpacity } from "react-native";
import { invoice } from "@/storage/invoice";
// route imports
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from "../indexInvoice";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "@/assets/styles/styles";


type props = StackScreenProps<RootStackParamList, "InvoiceGen">


const InvoiceGen = ({ route, navigation }: props) => {
    const { item } = route.params;
    const oncancel = () => { navigation.navigate("HomeInvoice") }

    return (
        <View style={[{flex : 1}]}>
            <View style={[styles.flexcomponentsRow, { margin: 5 }]}>
                <TouchableOpacity onPress={() => oncancel()}>
                    <Ionicons name="chevron-back" size={30} color="black" />
                </TouchableOpacity>
                <Text style={[styles.paragraph, styles.textalingleft, { color: 'black' }]}>Invoice Generation</Text>
            </View>
            <View style={{marginLeft : 20, marginRight : 20}}>
                <Text>This invoice is not done thill you press the button of done, meanwhile is created as DRAFT</Text>
            </View>
            <View>

            </View>


        </View>
    )
}

export default InvoiceGen;