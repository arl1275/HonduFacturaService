import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Modal, Pressable, FlatList } from "react-native";
import InvoButton from "../components/buttons";
import ModalCreateInvoiceWH from "../modals/createInventory";
import styles from "@/assets/styles/styles";
import PickerCompany from "../components/selectCompany";
import { company } from "@/storage/modals/empresa";
import { getWareHouses_by_id } from "@/storage/inventoryWH.storage";
import { useNavigation } from '@react-navigation/native';

// this are navite componentes from this module
import InventoryCard from "../components/InventoryCard";
import { inventoryWH } from "@/storage/modals/inventory";
import { StackScreenProps } from "@react-navigation/stack";
import { StackParamList } from "../indexInventory";

// this is to navigatge
type props = StackScreenProps<StackParamList, "HomeInventory">;

const HomeInventory = ({navigation} : props) => {
  const [openmodal, setOpenmodal] = useState<boolean>(false);
  const [SelectedCompany, setSelectedCompany] = useState<company | undefined>();
  const [inventories, setInventories] = useState<inventoryWH[]>([]);

  const SetCOMPANY = (value: company | undefined) => { setSelectedCompany(value) };
  const toggleModal = () => setOpenmodal(v => !v);
  const navigateInventory = (inventory : inventoryWH) =>{navigation.navigate("Inventorydetail", {invo : inventory, comp : SelectedCompany})};

  useEffect(() => {
    SelectedCompany != undefined && setInventories(getWareHouses_by_id(SelectedCompany?.id))
  }, [SelectedCompany]);

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
      <View style={[styles.flexcomponentsRow, { width: 'auto', borderWidth: 0.5, borderColor: 'grey', borderRadius: 5 }]}>
        <View style={[{ width: '50%' }]}>
          <TouchableOpacity style={{ width: "auto" }} onPress={toggleModal}>
            <InvoButton title="Generate Inventory" color="black" iconname="archive" />
          </TouchableOpacity>
        </View>

        <View style={[{ width: '50%' }]}>
          <PickerCompany ToSelect={SetCOMPANY} />
        </View>

      </View>

      <View>
        {
          inventories &&
          <FlatList
            data={inventories}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={()=>{navigateInventory(item)}}>
                <InventoryCard inv={item}/>
              </TouchableOpacity>
            )}
          />
        }
      </View>


    </View>
  );
};

export default HomeInventory;
