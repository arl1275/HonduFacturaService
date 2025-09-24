import React from "react";
//import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomepageAPP from "./Homepage";
import IndexInventory from "./modules/inventory/indexInventory";

const StackHome = createStackNavigator<HomeRoutingLinks>();

export type HomeRoutingLinks = {
    Homepage: undefined,
    InventoryIndex : undefined
}

const HomePage = () => {
    return (
        <StackHome.Navigator
            initialRouteName="Homepage"
            screenOptions={{
                headerShown: false,
            }}>
            <StackHome.Screen name="Homepage" component={HomepageAPP} />
            <StackHome.Screen name="InventoryIndex" component={IndexInventory} />
        </StackHome.Navigator>
    )
}

export default HomePage;