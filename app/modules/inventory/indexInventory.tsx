import { createStackNavigator } from '@react-navigation/stack';
import HomeInventory from './pages/homeinventory';
import { inventoryWH } from '@/storage/modals/inventory';

export type StackParamList = {
  HomeInventory: undefined;
  Inventorydetail : {invo : inventoryWH}
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
