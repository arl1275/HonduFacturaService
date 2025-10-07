import { View, Text } from "react-native";
import { product } from "@/storage/modals/inventory";
import styles from "@/assets/styles/styles";

type props={ prod : product}

const ProductRender = ({ prod } : props) =>{
    return(
        <View style={[styles.cardborder, {}]}>
            <Text>{prod.name}</Text>
        </View>
    )
}

export default ProductRender;