import { product } from "@/storage/modals/inventory";
import { View, Text, Pressable } from "react-native";
import styles from "@/assets/styles/styles";

type props = {
    products_of_this_wh : product[];
}

const ProductPicker = ({products_of_this_wh} : props) =>{

    return (
    <View >
      
      <Pressable >
      </Pressable>
      {}
    </View>
  );
}

export default ProductPicker;