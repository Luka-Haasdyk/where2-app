import { useEffect } from "react";
import { useNavigation } from "expo-router";
import { logoutUser } from "../../custom/api";

const Logout = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const handleLogout = async () => {
      await logoutUser(); // Perform the logout action
      navigation.navigate("index"); // Navigate back to the index screen
    };

    handleLogout(); // Trigger logout when the component is mounted
  }, [navigation]);

  return (null); // No need to render anything
};

export default Logout;