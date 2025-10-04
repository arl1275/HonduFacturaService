import { createStackNavigator } from '@react-navigation/stack';
import { inventoryWH } from '@/storage/modals/inventory';

// pages
import HomeInventory from './pages/homeinventory';
import InventoryDetail from './pages/inventoryDetail';
import { company } from '@/storage/modals/empresa';

export type StackParamList = {
  HomeInventory: undefined;
  Inventorydetail : {invo : inventoryWH, comp : company | undefined}
};

const InventoryStack = createStackNavigator<StackParamList>();

const IndexInventory = () => {
  return (
    <InventoryStack.Navigator initialRouteName="HomeInventory" screenOptions={{ headerShown: false }}>
      <InventoryStack.Screen name="HomeInventory" component={HomeInventory}/>
      <InventoryStack.Screen name="Inventorydetail" component={InventoryDetail}/>
    </InventoryStack.Navigator>
  );
};

export default IndexInventory;
