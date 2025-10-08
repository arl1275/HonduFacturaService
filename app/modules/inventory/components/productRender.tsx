import { View, Text } from "react-native";
import { product } from "@/storage/modals/inventory";
import styles from "@/assets/styles/styles";

type props={ prod : product}

const ProductRender = ({ prod } : props) =>{
    return(
        <View style={[styles.cardborder, styles.flexcomponentsRow, {marginBottom : 3, marginTop : 0 , justifyContent : 'space-between', padding : 10}]}>
            <Text style={[{textAlign : 'right'}]}>{prod.name}</Text>
            <Text style={[{textAlign : 'right'}]}>{prod.code}</Text>
            <Text style={[{textAlign : 'right'}]}>{prod.amountStock}</Text>
            <Text style={[{textAlign : 'right'}]}>{prod.price}</Text>
        </View>
    )
}

export default ProductRender;