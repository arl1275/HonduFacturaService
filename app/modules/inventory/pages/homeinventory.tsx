import React, { useState } from "react";
import { View, TouchableOpacity, Modal, Pressable} from "react-native";
import InvoButton from "../components/buttons";
import ModalCreateInvoiceWH from "../modals/createInventory";
import styles from "@/assets/styles/styles";
import PickerCompany from "../components/selectCompany";
import { company } from "@/storage/modals/empresa";


const HomeInventory = () => {
  const [openmodal, setOpenmodal] = useState<boolean>(false);
  const [SelectedCompany, setSelectedCompany] = useState<company | undefined>();

  const SetCOMPANY = (value: company | undefined) => { setSelectedCompany(value) };
  const toggleModal = () => setOpenmodal(v => !v);

  return (
    <View style={{ flex: 1, margin: 10 }}>
      {/*/---THIS IS THE MODAL SIDE OF THE CODE---/*/}
      <Modal visible={openmodal} transparent animationType="fade" onRequestClose={toggleModal}>
        <Pressable style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" }} onPress={toggleModal}>
          <Pressable
            style={{ width: "90%", maxWidth: 520, backgroundColor: "white", borderRadius: 12, padding: 16 }}
            onPress={() => { }}>
            <ModalCreateInvoiceWH OnDelete={toggleModal} />
          </Pressable>
        </Pressable>
      </Modal>

      {/*/---THIS IS THE HEAD SIDE OF THE VIEW---/*/}
      <View style={[styles.flexcomponentsRow, { width: 'auto', borderWidth : 0.5, borderColor : 'grey', borderRadius : 5}]}>
        <View style={[{ width : '50%'}]}>
          <TouchableOpacity style={{ width: "auto" }} onPress={toggleModal}>
            <InvoButton title="Generate Inventory" color="black" iconname="archive" />
          </TouchableOpacity>
        </View>

        <View style={[{width : '50%'}]}>
          <PickerCompany ToSelect={SetCOMPANY} />
        </View>

      </View>
    </View>
  );
};

export default HomeInventory;
