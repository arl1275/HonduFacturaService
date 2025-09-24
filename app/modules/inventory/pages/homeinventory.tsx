import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import InvoButton from "../components/buttons";
import ModalCreateInvoiceWH from "../modals/createInventory";

const HomeInventory = () => {
    const [openmodal, setOpenmodal] = useState<boolean>(false);

    const _OpenModal_ = () => { setOpenmodal(!openmodal) }

    const returnState = () => { return openmodal }

    return (
        <View style={[{ flex: 1, margin: 10 }]}>
            <Modal visible={openmodal} transparent={true} animationType="fade" >
                <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={[{ width: '80%' }]}>
                        <ModalCreateInvoiceWH OnDelete={_OpenModal_} />
                    </View>
                </View>
            </Modal>

            <TouchableOpacity style={[{ width: '100%' }]} onPress={() => _OpenModal_()}>
                <InvoButton title="Generate Inventory" color="black" iconname="archive" />
            </TouchableOpacity>
        </View>
    )
}

export default HomeInventory;