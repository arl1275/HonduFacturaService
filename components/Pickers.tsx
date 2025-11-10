// Main
import { useEffect, useState } from "react";
import styles from "@/assets/styles/styles";

// components
import { supplier } from "@/storage/modals/supplier";
import { getAllSuppliers } from "@/storage/supplier.storage";
import { Picker } from "@react-native-picker/picker";


type props={ SelectSup : (val : supplier | undefined) => void}

export const PickerSupplier = ({SelectSup} : props) => {
    const [ListSupp, setListSupp] = useState<supplier[]>([]);
    const [SelectedValue, setSelectedValue] = useState<supplier | undefined>(undefined);

    useEffect(() => {
        setListSupp(getAllSuppliers());
    }, []);

    return (
        <Picker
            selectedValue={SelectedValue?.rtn ?? "Select a Company"}
            onValueChange={(itemValue) => {
                setSelectedValue(ListSupp.find(company => company.rtn === itemValue))
                if (itemValue != "Select a Company") {
                    const selectedCompany = ListSupp.find(company => company.rtn === itemValue);
                    selectedCompany === undefined ? null : SelectSup(selectedCompany);
                }
            }}
            style={[styles.rectanglebutton, { alignSelf: 'center', height: 'auto', marginTop: 10, marginBottom: 5, width: '70%' }]}
        >
            <Picker.Item label={"Select a Company"} value={"Select a Company"} key={"000000"} />
            {
                ListSupp && ListSupp.map((company: supplier) => (
                    <Picker.Item label={company.name} value={company.rtn} key={company.rtn} />
                ))
            }

        </Picker>
    )
}