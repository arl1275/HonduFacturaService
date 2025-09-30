import { View, Text } from "react-native";
import styles from "@/assets/styles/styles";
import { inventoryWH } from "@/storage/modals/inventory";

type props ={
    inv : inventoryWH
}

const InventoryCard = ({inv} : props) =>{
    return(
    <View style={[{borderRadius : 3, borderWidth :1, borderColor : '#DDDCD9', padding :10, marginLeft : 10, marginRight : 10}]}>
        <Text style={[styles.paragraph, {textAlign : 'left', color : 'black'}]}>{inv.code}</Text>
        <Text style={[styles.smallText, {textAlign : 'left'}]}>{inv.name}</Text>
        <Text style={[styles.smallText, {textAlign : 'left'}]}>{inv.ubication}</Text>
    </View>
    )
}

export default InventoryCard;