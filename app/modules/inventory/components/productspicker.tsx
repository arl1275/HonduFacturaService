import { product } from "@/storage/modals/inventory";
import { View, Text, Pressable, TextInput, FlatList, Alert } from "react-native";
import styles from "@/assets/styles/styles";
import { useEffect, useState } from "react";
import { Dropdown } from 'react-native-element-dropdown';
import { getAllProducts } from "@/storage/product.storage";

type Props = {
  //WH_id: number;
  onSaveList: (value: product[]) => void;
};

interface DropdownItem {
    label: string;
    value: product;
}

const ItemRender = (val: product) => {
  return (
    <View style={[styles.flexcomponentsRow, styles.cardborder,
    { justifyContent: 'space-between', margin: 0, alignItems: 'center', padding: 5 }]}>

      <Text style={[styles.smallText, { color: 'black', flex: 1 }]}>{val.barcode}</Text>
      <Text style={[styles.smallText, { color: 'black', flex: 1 }]}>{val.name}</Text>
      <Text style={[styles.smallText, { color: 'black', flex: 1 }]}>{val.type.consumible ? "CONSUMIBLE" : "STOCK"}</Text>

      <View style={[styles.flexcomponentsRow, { justifyContent: 'space-between', width: '20%' }]}>
        <TextInput style={[styles.textinput, { width: '45%', height: 30, flex: 1 }]} placeholder="Cost" keyboardType="numeric" />
        <TextInput style={[styles.textinput, { width: '45%', height: 30, flex: 1 }]} placeholder="Amount" keyboardType="numeric" />
      </View>

    </View>
  )
}

const RenderDropdown = (Item: DropdownItem, OnSelectItem: (value: product) => void) => {
  return (
    <Pressable onPress={() => OnSelectItem(Item.value)}>
      <View
        style={[styles.flexcomponentsRow, styles.cardborder,
        { justifyContent: 'space-between', marginTop: 0, marginBottom: 0, marginLeft: 10, marginRight: 10, borderRadius: 0 }]}>
        <Text>{Item.value.barcode}</Text>
        <Text>{Item.value.name}</Text>
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


  const _AddProduct_ = (item: product) => {
    if (ProdFinaList.some(p => p.id === item.id)) {
      Alert.alert("Duplicated Item", "This item is already selected.")
      return;
    }
    setProdFinaList(prev => {
      const isItemInList = prev.some(p => p.id === item.id);

      if (isItemInList) {
        // Opción 1: Actualizar el ítem existente (reemplazándolo)
        return prev.map(p => 
          p.id === item.id ? item : p // Si el ID coincide, reemplaza 'p' con el nuevo 'item'
        );
      } else {
        // Opción 2: Insertar el ítem si es nuevo
        return [...prev, item];
      }
    });

    setSelectedProduct(null);
  }

  useEffect(() => {
    setProdsBrute(getAllProducts());
  }, []);

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
          onChange={item => {
            setSelectedProduct(item.value);
            _AddProduct_(item.value);
          }}
          renderItem={(item) => RenderDropdown(item, _AddProduct_)}
        />
      </View>

      <FlatList
        data={ProdFinaList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => ItemRender(item)}
        ListEmptyComponent={<View style={[styles.cardborder, { padding: 10 }]}><Text style={[styles.paragraph]}>CHOOSE A PRODUCT TO INSERT</Text></View>}
      />

    </View>
  )
};

export default ProductPicker;