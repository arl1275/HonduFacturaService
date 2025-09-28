import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { company } from "@/storage/modals/empresa";
import styles from "@/assets/styles/styles";
import { getCompanies } from "@/storage/company.storage";

type props = {
    ToSelect: (value: company) => void;
}

const PickerCompany = ({ ToSelect }: props) => {
    const [item, setSelectedValue] = useState<company | undefined>();
    const [SelectedList, setSelectedList] = useState<company[]>([]);

    const UpdateList = () => { setSelectedList(getCompanies()) }

    useEffect(() => {
        UpdateList();
    }, [])

    return (
        <View>
            <Picker
                selectedValue={item?.rtn ?? "Select a Company"}
                onValueChange={(itemValue) => {
                    setSelectedValue(SelectedList.find(company => company.rtn === itemValue))
                    if (itemValue != "Select a Company") {
                        const selectedCompany = SelectedList.find(company => company.rtn === itemValue);
                        selectedCompany === undefined ? null : ToSelect(selectedCompany);
                    }
                }}
                style={[styles.rectanglebutton, { alignSelf: 'center', height: 'auto', marginTop: 10, marginBottom: 5, width: '70%'}]}
            >
                <Picker.Item label={"Select a Company"} value={"Select a Company"} key={"000000"} />
                {
                    SelectedList && SelectedList.map((company: company) => (
                        <Picker.Item label={company.companyname} value={company.rtn} key={company.rtn} />
                    ))
                }
            </Picker>
        </View>
    )
}

export default PickerCompany;