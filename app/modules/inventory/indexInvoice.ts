import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator<RootStackParamList>();

export type RootStackParamList = {
    HomeInventory: undefined;
    SettingsInventory: undefined;
    Inventory: undefined;
};

const IndexInventory = () => {
    return (
        <Stack.Navigator initialRouteName="HomeInventory" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeInventory" component={}/>
        </Stack.Navigator>

    )
}
export default IndexInventory;