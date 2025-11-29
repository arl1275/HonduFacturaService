import { useState } from "react";
import { View, TextInput, Text } from "react-native";
import styles from "@/assets/styles/styles";
import { product } from "@/storage/modals/inventory";

type props = {
    val : product,
    UpdateProd : (prod : product) => void
}

const ItemRender = ({ val, UpdateProd }: props) => {
  const [cost, setCost] = useState(0);
  const [amount, setAmount] = useState(0);

  const result = cost * amount;

  const handleCostChange = (e: string) => {
    setCost(parseFloat(e) || 0); 
  };

  const handleAmountChange = (e: string) => {
    setAmount(parseFloat(e) || 0);
  };

  return (
    <View style={[styles.flexcomponentsRow, styles.cardborder,
    { justifyContent: 'space-between', margin: 0, alignItems: 'center', padding: 5 }]}>

      <Text style={[styles.smallText, { color: 'black', flex: 1 }]}>{val.barcode}</Text>
      <Text style={[styles.smallText, { color: 'black', flex: 1 }]}>{val.name}</Text>
      <Text style={[styles.smallText, { color: 'black', flex: 1 }]}>{val.type.consumible ? "CONSUMIBLE" : "STOCK"}</Text>

      <View style={[styles.flexcomponentsRow, { justifyContent: 'space-between', width: '30%' }]}>
        <TextInput onChangeText={handleCostChange}
          style={[styles.textinput, { width: '45%', height: 30, flex: 1 }]} 
          placeholder="Cost" keyboardType="numeric" />

        <TextInput onChangeText={handleAmountChange}
          style={[styles.textinput, { width: '45%', height: 30, flex: 1 }]} 
          placeholder="Amount" keyboardType="numeric" />

        <Text style={[{ width: '45%', height: 30, flex: 1, textAlign : 'center', textAlignVertical : 'center', fontSize : 20 }]}>{result.toFixed(2)}</Text>
      </View>
    </View>
  );

}

export default ItemRender;