import { product } from "@/storage/modals/inventory";
import { View, Text, Pressable, TextInput, FlatList } from "react-native";
import styles from "@/assets/styles/styles";
import { useEffect, useState } from "react";

type Props = {
  products_of_this_wh: product[];
  onSaveList: (value: product[]) => void;
};

const ItemRender = ( val : product) => {
  return(
    <View style={[styles.flexcomponentsRow, styles.cardborder]}>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <View>

      </View>
    </View>
  )
}


const ProductPicker = ({ products_of_this_wh, onSaveList }: Props) => {
  const [ProdFinaList, setProdFinaList] = useState<product[]>([]);
  const [ProdsBrute, setProdsBrute] = useState<product[]>([]);

  useEffect(() => {
    setProdFinaList(products_of_this_wh);
  }, [products_of_this_wh]);  
  
  return(
    <View>
      <FlatList 
      data={ProdFinaList}
      keyExtractor={(item)=> item.id.toString()}
      renderItem={({item})=> ItemRender(item)}
      ListEmptyComponent={
      <View>
        <Text>CHOOSE A PRODUCT TO INSERT</Text>
      </View>
      }
      />

    </View>
  )
};

export default ProductPicker;
