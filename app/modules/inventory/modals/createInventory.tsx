import { View, Modal, TextInput, Text, TouchableOpacity, Alert } from "react-native";
import styles from "@/assets/styles/styles";
import { inventoryWH } from "@/storage/modals/inventory";
import { useState } from "react";
import { Icon } from "react-native-vector-icons/Icon";
import { Switch } from "react-native";
import { Picker } from '@react-native-picker/picker';

type props = {
    OpenModal: () => boolean;
    OnDelete: () => void;
}

const ModalCreateInvoiceWH = ({ OpenModal, OnDelete }: props) => {
    const [NewInventory, setNewInventory] = useState<inventoryWH>({
        id: Date.now(),
        id_company: 0,
        created_at: new Date(),
        active: false,
        name: "",
        code: "",
        type: {
            physical: false,
            virtual: true
        },
        ubication: "",
        block_edit: false
    });

    const updateInventory = (value: string, valueitem: string | number | boolean) => {
        setNewInventory((prev) => ({ ...prev, [value]: valueitem }));
    }

    const UpdateTypeINv = (nameType: string) => {
        setNewInventory((prev) => ({
            ...prev,
            type: ({
                physical: nameType === "physical" ? !prev.type.physical : prev.type.physical,
                virtual: nameType === "virtual" ? !prev.type.virtual : prev.type.virtual
            })
        }));
    }

    const UpdateTypeInventory = (TypeINV: string) => {
        if (TypeINV === "physical") {
            UpdateTypeINv("physical");
            UpdateTypeINv("virtual");
        } else {
            UpdateTypeINv("virtual");
            UpdateTypeINv("physical");
        }
    }

    const _onSave_ = () => {
        if (NewInventory.name != "", NewInventory.code != "", NewInventory.ubication != "") {
            //
        } else {
            Alert.alert("INCOMPLETE", "Please, fill all the fields before create an inventory.")
        }
    }

    return (
        <Modal visible={OpenModal()}>
            <View>
                <View style={[styles.flexcomponentsRow, {}]}>
                    <Text style={[styles.paragraph, { color: 'black', fontWeight: 'bold' }]}>Create new Inventory</Text>
                    <View style={[{ margin: 10, marginLeft: 20 }]}>
                        <Icon name={"delete"} size={40} color="white" onPress={OnDelete} />
                    </View>
                </View>

                {/* <Picker
                    selectedValue={item?.rtn ?? "Select a Company"}
                    onValueChange={(itemValue) => {
                        if (itemValue === "Select a Company") {
                            setSelectedValue(undefined);
                            setListInvoices([])
                        } else {
                            const selectedCompany = SelectedList.find(company => company.rtn === itemValue);
                            setSelectedValue(selectedCompany);
                        }
                    }}
                    style={[styles.rectanglebutton, { alignSelf: 'center', height: 50, aspectRatio: 7.0, marginTop: 10 }]}
                >
                    <Picker.Item label={"Select a Company"} value={"Select a Company"} key={"000000"} />
                    {
                        SelectedList && SelectedList.map((company: company) => (
                            <Picker.Item label={company.companyname} value={company.rtn} key={company.rtn} />
                        ))
                    }
                </Picker> */}

                <TextInput placeholder="Insert Name" onChangeText={(e) => updateInventory("name", e)} />
                <TextInput placeholder="Insert Ubication" onChangeText={(e) => updateInventory("ubication", e)} />
                <TextInput placeholder="Insert Warehouse Code" onChangeText={(e) => updateInventory("code", e)} />

                <View>
                    <View style={{ flexDirection: "row", alignItems: "center", margin: 10 }}>
                        <Text style={styles.smallText}>Physical Inventory</Text>
                        <Switch
                            value={NewInventory.type.physical}
                            onValueChange={() => UpdateTypeINv("physical")}
                            thumbColor={NewInventory.type.virtual ? "white" : "gray"}
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                        />
                    </View>

                    <View style={{ flexDirection: "row", alignItems: "center", margin: 10 }}>
                        <Text style={styles.smallText}>Virtual Inventory</Text>
                        <Switch
                            value={NewInventory.type.virtual}
                            onValueChange={() => UpdateTypeINv("virtual")}
                            thumbColor={NewInventory.type.virtual ? "white" : "gray"}
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                        />
                    </View>
                </View>

                <TouchableOpacity onPress={_onSave_}>
                    <Text>CREATE INVENTORY</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

export default ModalCreateInvoiceWH;