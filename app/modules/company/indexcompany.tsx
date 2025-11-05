import { createStackNavigator } from '@react-navigation/stack';

// pages 
import RegisterCompany from "./pages/registercompany";
import HomeCompany from "./pages/home";
import EditCompanyPage from "./pages/editcompany";
import { company } from "@/storage/modals/empresa";

const Stack = createStackNavigator<RootStackParamList>();

export type RootStackParamList = {
    HomeCompany: undefined;
    Settings: undefined;
    Editpage: { item: company };
    suppliers : undefined;
};

const IndexCompany = () => {
    return (
        <Stack.Navigator initialRouteName="HomeCompany" screenOptions={{ headerShown: false, }}>
            <Stack.Screen name="HomeCompany" component={HomeCompany}/>
            <Stack.Screen name="Settings" component={RegisterCompany} />
            <Stack.Screen name="Editpage" component={EditCompanyPage} />
        </Stack.Navigator>

    )
}
export default IndexCompany;