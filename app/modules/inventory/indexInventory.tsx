import { createStackNavigator } from '@react-navigation/stack';
import HomeInventory from './pages/homeinventory';
import HomePage from '@/app/_layoutHome';

export type StackParamList = {
  HomeInventory: undefined;
};

const InventoryStack = createStackNavigator<StackParamList>();

const IndexInventory = () => {
  return (
    <InventoryStack.Navigator initialRouteName="HomeInventory" screenOptions={{ headerShown: false }}>
      <InventoryStack.Screen name="HomeInventory" component={HomeInventory}/>
    </InventoryStack.Navigator>
  );
};

export default IndexInventory;
