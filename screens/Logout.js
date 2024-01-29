import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

const Logout=({navigation})=>{
    useEffect(() => {
        const logout = async () => {
          // Remove the value stored in AsyncStorage
          await AsyncStorage.removeItem('userId');
          await AsyncStorage.removeItem('username');
          
          // Redirect to the Login screen
          navigation.replace('Login');
        };
    
        logout();
      }, [navigation]);
    
      return null; // You can return null or a loading indicator if needed
}

export default Logout