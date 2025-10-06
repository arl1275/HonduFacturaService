import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { impuesto } from "@/storage/modals/empresa";
import styles from "@/assets/styles/styles";

type Props = {
  impuestos?: impuesto[];
  ToSelect: (value: impuesto | undefined) => void;
};

const PickerTax = ({ ToSelect, impuestos }: Props) => {
  const [list, setList] = useState<impuesto[]>([]);
  const [selectedId, setSelectedId] = useState<number | 0>(0); // 0 = ninguno

  useEffect(() => {
    if (impuestos && Array.isArray(impuestos)) {
      setList(impuestos);
      // si solo hay uno, lo preseleccionamos
      if (impuestos.length === 1) {
        setSelectedId(impuestos[0].id);
        ToSelect(impuestos[0]);
      }
    } else {
      setList([]);
      setSelectedId(0);
      ToSelect(undefined);
    }
  }, [impuestos, ToSelect]);

  const onChange = (value: number | 0) => {
    setSelectedId(value);
    const tax = list.find((t) => t.id === value);
    ToSelect(tax); // undefined si value === 0
  };

  return (
    <View>
      <Picker
        selectedValue={selectedId}
        onValueChange={onChange}
        style={[
          styles.rectanglebutton,
          { alignSelf: "center", marginTop: 10, marginBottom: 5, width: "70%" },
        ]}
      >
        <Picker.Item label="Select a TAX" value={0} key="placeholder" />
        {list.map((tx) => (
          <Picker.Item label={tx.nombre} value={tx.id} key={String(tx.id)} />
        ))}
      </Picker>
    </View>
  );
};

export default PickerTax;
