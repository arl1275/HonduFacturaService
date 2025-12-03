import { useEffect, useState } from "react";
import { View, TextInput, Text, Pressable } from "react-native";
import styles from "@/assets/styles/styles";
import { product } from "@/storage/modals/inventory";
import Ionicons from "react-native-vector-icons/Ionicons";

type props = {
  val: product,
  UpdateProd: (prod: product) => void,
  DelteProd : (prod : product)=> void
}

const ItemRender = ({ val, UpdateProd, DelteProd}: props) => {
  const [cost, setCost] = useState(0);
  const [amount, setAmount] = useState(0);
  const [Local, setLocal] = useState<product>(val);
  const result = cost * amount;

  const OnUpdate = (value: string, field: string) => {
    field === "cost" ? handleCostChange(value) : handleAmountChange(value);
    setLocal((prev) => ({ ...prev, [field]: parseFloat(value), price: result }));
  }

  const handleCostChange = (e: string) => {
    setCost(parseFloat(e) || 0);
  };

  const handleAmountChange = (e: string) => {
    setAmount(parseFloat(e) || 0);
  };

  useEffect(() => {
    UpdateProd(Local);
  }, [cost, amount]);

  return (
    <View style={[styles.flexcomponentsRow, styles.cardborder,
    { justifyContent: 'space-between', margin: 0, alignItems: 'center', padding: 5 }]}>

      <Text style={[styles.smallText, { color: 'black', flex: 1 }]}>{val.barcode}</Text>
      <Text style={[styles.smallText, { color: 'black', flex: 1 }]}>{val.name}</Text>
      <Text style={[styles.smallText, { color: 'black', flex: 1 }]}>{val.type.consumible ? "CONSUMIBLE" : "STOCK"}</Text>

      <View style={[styles.flexcomponentsRow, { justifyContent: 'space-between', width: '30%', flex :1 }]}>
        <TextInput onChangeText={(e) => { OnUpdate(e, "cost") }}
          style={[styles.textinput, { width: '45%', height: 30, flex: 1 }]}
          placeholder="Cost" keyboardType="numeric" />

        <TextInput onChangeText={(e) => { OnUpdate(e, "amountStock") }}
          style={[styles.textinput, { width: '45%', height: 30, flex: 1 }]}
          placeholder="Amount" keyboardType="numeric" />

        <Text style={[{ width: '45%', height: 30, flex: 1, textAlign: 'center', textAlignVertical: 'center', fontSize: 20 }]}>{result.toFixed(2)}</Text>
      </View>
      
      <Pressable style={[{flex : 1}]} onPress={()=> DelteProd(val)}>
          <Ionicons name="close-circle-outline" size={30} color="red" />
      </Pressable>

    </View>
  );

}

export default ItemRender;