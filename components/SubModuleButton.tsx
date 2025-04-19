import styles from "@/assets/styles/styles";
import { Text, View, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

type props = {
    title: string,
    iconname: string,
    _onclick_: (value: string) => (void);
}

const ModuleSubbutton = ({ title, iconname, _onclick_ }: props) => {
    return (
        <TouchableOpacity style={[styles.mainbuttonstyle, { alignItems: 'center', height : 50, width : 50 }]} onPress={() => _onclick_(title)}>
            <View style={[{ margin: 10, marginLeft: 20 }]}>
                <Icon name={iconname} size={40} color="white" />
            </View>

            <Text style={[{ color: 'white', marginRight: 20, fontSize: 30, fontWeight: 'semibold' }]}>{title}</Text>
            
        </ TouchableOpacity>
    )
}

export default ModuleSubbutton;