import { TouchableOpacity, Text } from "react-native";
//import ModuleSubbutton from "@/components/SubModuleButton"
import { createStackNavigator } from '@react-navigation/stack';

// pages 
import RegisterCompany from "./pages/registercompany";
import HomeCompany from "./pages/home";

const Stack = createStackNavigator();

const IndexCompany = () => {

    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{ 
                headerShown: false,
            }}
        >
            <Stack.Screen name="Home" component={HomeCompany}/>
            <Stack.Screen name="Settings" component={RegisterCompany}/>
        </Stack.Navigator>
    )
}

export default IndexCompany;