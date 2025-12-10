import { product } from "@/storage/modals/inventory";
import { View, Text, Pressable, TextInput, FlatList, Alert } from "react-native";
import styles from "@/assets/styles/styles";
import { useEffect, useState } from "react";
import { Dropdown } from 'react-native-element-dropdown';
import { getAllProducts } from "@/storage/product.storage";
import ItemRender from "./productpicker_renderItem";

type Props = {
  //WH_id: number;
  onSaveList: (value: product[]) => void;
};

interface DropdownItem {
  label: string;
  value: product;
}

const RenderDropdown = (Item: DropdownItem, OnSelectItem: (value: product, isUpdate : boolean) => void) => {
  return (
    <Pressable onPress={() => OnSelectItem(Item.value, false)}>
      <View
        style={[styles.flexcomponentsRow, styles.cardborder,
        { justifyContent: 'space-between', marginTop: 0, marginBottom: 0, marginLeft: 10, marginRight: 10, borderRadius: 0 }]}>
        <Text style={[styles.smallText, { color: 'black' }]}>{Item.value.barcode}</Text>
        <Text style={[styles.smallText, { color: 'black' }]}>{Item.value.name}</Text>
      </View>
    </Pressable>
  )
}


const ProductPicker = ({ onSaveList }: Props) => {
  const [ProdFinaList, setProdFinaList] = useState<product[]>([]);
  const [ProdsBrute, setProdsBrute] = useState<product[]>([]);
  const [SelectedProduct, setSelectedProduct] = useState<product | null>(null);

  const DropdownData: DropdownItem[] = ProdsBrute.map(p => ({
    label: `${p.barcode} - ${p.name}`,
    value: p,
  }));

  const OnDel = (val: product) => {
    setProdFinaList(prevList => prevList.filter((d) => d.id !== val.id));
  }

  const _AddProduct_ = (item: product, isUpdate : boolean) => {
    if (ProdFinaList.some(p => p.id === item.id) && isUpdate === false) {
      Alert.alert("Duplicated Item", "This item is already selected.")
      return;
    }
    setProdFinaList(prev => {
      const isItemInList = prev.some(p => p.id === item.id);
      if (isItemInList) {
        return prev.map(p =>
          p.id === item.id ? item : p
        );
      } else {
        return [...prev, item];
      }
    });
    setSelectedProduct(null);
  }

  useEffect(() => {
    setProdsBrute(getAllProducts());
  }, []);

  useEffect(() => {
    onSaveList(ProdFinaList);
  }, [ProdFinaList]);

  return (
    <View>
      <View>
        <Dropdown
          placeholderStyle={[styles.paragraph, styles.cardborder, { margin: 5, color: 'black', backgroundColor: 'white' }]}
          data={DropdownData}
          search={true}
          value={SelectedProduct ? SelectedProduct.id.toString() : null}
          labelField="label"
          valueField="value.id"
          placeholder="Select item"
          searchPlaceholder="Search..."
          onChange={item => { setSelectedProduct(item.value); _AddProduct_(item.value, false); }}
          renderItem={(item) => RenderDropdown(item, _AddProduct_)}
        />
      </View>

      <FlatList
        data={ProdFinaList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) =>
          <View key={item.id.toString()}>
            <ItemRender val={item} UpdateProd={_AddProduct_} DelteProd={OnDel} />
          </View>}
        ListEmptyComponent={<View style={[styles.cardborder, { padding: 10 }]}><Text style={[styles.paragraph]}>CHOOSE A PRODUCT TO INSERT</Text></View>}
      />

    </View>
  )
};

export default ProductPicker;