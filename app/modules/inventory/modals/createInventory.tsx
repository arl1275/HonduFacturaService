import { View, TextInput, Text, TouchableOpacity, Alert } from "react-native";
import styles from "@/assets/styles/styles";
import { inventoryWH } from "@/storage/modals/inventory";
import { useState, useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Switch } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { company } from "@/storage/modals/empresa";
import { getCompanies } from "@/storage/company.storage";
import { addWarehouse } from "@/storage/inventoryWH.storage";

type props = {
    //OpenModal: () => boolean;
    OnDelete: () => void;
}

const ModalCreateInvoiceWH = ({ OnDelete }: props) => {
    const [item, setSelectedValue] = useState<company | undefined>();
    const [SelectedList, setSelectedList] = useState<company[]>([]);
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

    const UpdateList = () => { setSelectedList(getCompanies()) }

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

    useEffect(() => {
        UpdateList();
    }, [])

    const _onSave_ = () => {
        if (NewInventory.name != "", NewInventory.code != "", NewInventory.ubication != "") {
            addWarehouse(NewInventory);
            OnDelete();
        } else {
            Alert.alert("INCOMPLETE", "Please, fill all the fields before create an inventory.")
        }
    }

    return (
        <View style={[{ backgroundColor: 'white', padding: 7, borderRadius: 5 }]}>
            <View>
                <View style={[styles.flexcomponentsRow,
                {
                    alignItems: 'center', justifyContent: 'space-between', marginTop: 0,
                    borderBottomWidth: 1, borderBottomColor: 'grey'
                }]}>
                    <Text style={[styles.paragraph, { color: 'black', fontWeight: 'bold' }]}>Create new Inventory</Text>
                    <View style={[{ marginLeft: 10 }]}>
                        <Ionicons name="close-circle" size={30} color="red" onPress={OnDelete} />
                    </View>
                </View>
                <Text style={[styles.smallText, styles.textalingleft]}>The inventory created, must be linked to a company previusly created. If the company is not
                    active this will not show up.
                </Text>
                <Picker
                    selectedValue={item?.rtn ?? "Select a Company"}
                    onValueChange={(itemValue) => {
                        if (itemValue === "Select a Company") {
                            setSelectedValue(undefined);
                        } else {
                            const selectedCompany = SelectedList.find(company => company.rtn === itemValue);
                            setSelectedValue(selectedCompany);
                        }
                    }}
                    style={[styles.rectanglebutton, { alignSelf: 'center', height: 'auto', marginTop: 10, marginBottom: 5 }]}
                >
                    <Picker.Item label={"Select a Company"} value={"Select a Company"} key={"000000"} />
                    {
                        SelectedList && SelectedList.map((company: company) => (
                            <Picker.Item label={company.companyname} value={company.rtn} key={company.rtn} />
                        ))
                    }
                </Picker>

                <TextInput placeholder="Insert Name" onChangeText={(e) => updateInventory("name", e)} style={[styles.textinput, { padding: 5, margin: 5 }]} />
                <TextInput placeholder="Insert Ubication" onChangeText={(e) => updateInventory("ubication", e)} style={[styles.textinput, { padding: 5, margin: 5 }]} />
                <TextInput placeholder="Insert Warehouse Code" onChangeText={(e) => updateInventory("code", e)} style={[styles.textinput, { padding: 5, margin: 5 }]} />

                <View>
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
                        <Text style={styles.smallText}>Physical Inventory</Text>
                        <Switch
                            value={NewInventory.type.physical}
                            onValueChange={() => UpdateTypeInventory("physical")}
                            thumbColor={NewInventory.type.physical ? "white" : "gray"}
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                        />
                    </View>

                    <View style={{ flexDirection: "row", alignItems: "center", margin: 0 }}>
                        <Text style={styles.smallText}>Virtual Inventory</Text>
                        <Switch
                            value={NewInventory.type.virtual}
                            onValueChange={() => UpdateTypeInventory("virtual")}
                            thumbColor={NewInventory.type.virtual ? "white" : "gray"}
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                        />
                    </View>
                </View>

                <TouchableOpacity onPress={()=>_onSave_()} style={[styles.squarebutton, { backgroundColor: 'green' }]}>
                    <Text style={[{ color: 'white' }]}>CREATE INVENTORY</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ModalCreateInvoiceWH;