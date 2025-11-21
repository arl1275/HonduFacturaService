import { product } from "@/storage/modals/inventory";
import { View, Text, Pressable, TextInput, FlatList } from "react-native";
import styles from "@/assets/styles/styles";
import { useEffect, useState } from "react";
import { Dropdown } from 'react-native-element-dropdown';
import { getAllProducts } from "@/storage/product.storage";

type Props = {
  //WH_id: number;
  onSaveList: (value: product[]) => void;
};

const ItemRender = (val: product) => {
  return (
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

const RenderDropdown = (Item : product) => {
  return(
    <View style={[styles.flexcomponentsRow, styles.cardborder, 
    {justifyContent : 'space-between', marginTop : 0, marginBottom : 0, marginLeft : 10, marginRight : 10, borderRadius : 0}]}>
      <Text>{Item.barcode}</Text>
      <Text>{Item.name}</Text>
    </View>
  )
}


const ProductPicker = ({ onSaveList }: Props) => {
  const [ProdFinaList, setProdFinaList] = useState<product[]>([]);
  const [ProdsBrute, setProdsBrute] = useState<product[]>([]);
  const [Search, setSearch] = useState<string | null>(null);


  useEffect(() => {
    setProdsBrute(getAllProducts());
  }, []);

  return (
    <View>
      <View>
        <Dropdown
          placeholderStyle={[styles.paragraph, styles.cardborder, {margin : 5, color : 'black'}]}
          data={ProdsBrute}
          search
          labelField="label"
          valueField="value"
          placeholder="Select item"
          searchPlaceholder="Search..."
          onChange={e=> setSearch(e)}
          renderItem={(item)=> RenderDropdown(item)}
        />
      </View>

      <FlatList
        data={ProdFinaList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => ItemRender(item)}
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
