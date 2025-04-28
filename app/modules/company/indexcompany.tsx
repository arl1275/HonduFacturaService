import { TouchableOpacity, Text } from "react-native";
//import ModuleSubbutton from "@/components/SubModuleButton"
import { createStackNavigator } from '@react-navigation/stack';
//import { NavigationContainer } from '@react-navigation/native';

// pages 
import RegisterCompany from "./pages/registercompany";
import HomeCompany from "./pages/home";
import EditCompanyPage from "./pages/editcompany";
import { company } from "@/storage/empresa";

const Stack = createStackNavigator<RootStackParamList>();

export type RootStackParamList = {
    HomeCompany: undefined;
    Settings: undefined;
    Editpage: { item: company };
};

const IndexCompany = () => {
    return (
        <Stack.Navigator initialRouteName="HomeCompany" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeCompany" component={HomeCompany} />
            <Stack.Screen name="Settings" component={RegisterCompany} />
            <Stack.Screen name="Editpage" component={EditCompanyPage} />
        </Stack.Navigator>

    )
}
export default IndexCompany;