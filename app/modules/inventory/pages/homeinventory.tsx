import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  LayoutAnimation,
  Platform,
  UIManager,
  Pressable,
} from "react-native";
import InvoButton from "../components/buttons";
import ModalCreateInvoiceWH from "../modals/createInventory";
import styles from "@/assets/styles/styles";

// Habilitar LayoutAnimation en Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const HomeInventory = () => {
  const [openmodal, setOpenmodal] = useState<boolean>(false);
  const [openFunctions, setOpenFunctions] = useState<boolean>(false);

  const toggleModal = () => setOpenmodal(v => !v);

  const toggleFunctions = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenFunctions(v => !v);
  };

  return (
    <View style={{ flex: 1, margin: 10 }}>
      {/* Modal controlado desde aquí */}
      <Modal visible={openmodal} transparent animationType="fade" onRequestClose={toggleModal}>
        <Pressable
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" }}
          onPress={toggleModal} // cerrar al tocar fuera
        >
          <Pressable
            style={{ width: "90%", maxWidth: 520, backgroundColor: "white", borderRadius: 12, padding: 16 }}
            onPress={() => {}} // evitar que se cierre al tocar dentro
          >
            <ModalCreateInvoiceWH OnDelete={toggleModal} />
          </Pressable>
        </Pressable>
      </Modal>

      <View
        style={{
          borderRadius: 7,
          backgroundColor: "black",
          padding: 6,
          alignItems: "center",
          alignSelf: "stretch",
          width: openFunctions ? "100%" : "14%", // animado con LayoutAnimation
        }}
      >
        <TouchableOpacity onPress={toggleFunctions} style={{ paddingVertical: 2 }}>
          <Text style={{ color: "white", fontSize: 36, lineHeight: 40 }}>
            {openFunctions ? "×" : "+"}
          </Text>
        </TouchableOpacity>

        {openFunctions && (
          <View style={[styles.flexcomponentsRow, { marginTop: 6 }]}>
            <TouchableOpacity style={{ width: "auto" }} onPress={toggleModal}>
              <InvoButton title="Generate Inventory" color="black" iconname="archive" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default HomeInventory;
