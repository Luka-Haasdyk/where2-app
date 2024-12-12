import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { registerUser } from "../custom/api";

const RegisterPage = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ImageBackground
      style={styles.background}
      source={{
        uri: "https://wallpaperaccess.com/full/6875927.jpg",
      }}
    >
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.heading}>Create Account</Text>
          {/* Username Input */}
          <View style={styles.inputGroup}>
            <Ionicons
              style={styles.icon}
              name="person-outline"
              size={24}
              color="#555"
            />
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={userName}
              placeholderTextColor="#aaa"
              onChangeText={(text) => setUserName(text)}
            />
          </View>

          {/* Email Input */}
          <View style={styles.inputGroup}>
            <Ionicons
              style={styles.icon}
              name="mail-outline"
              size={24}
              color="#555"
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              placeholderTextColor="#aaa"
              onChangeText={(text) => setEmail(text)}
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputGroup}>
            <MaterialCommunityIcons
              style={styles.icon}
              name="lock-outline"
              size={24}
              color="#555"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              placeholderTextColor="#aaa"
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
            />
          </View>

          {/* Create Account Button */}
          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => {
              registerUser(userName, email, password);
              navigation.navigate("login");
              setName("");
              setEmail("");
              setPassword("");
            }}
          >
            <Text style={styles.registerButtonText}> Create Account </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default RegisterPage;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
  },
  heading: {
    color: "black",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingBottom: 10,
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 50,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
    color: "#333",
  },
  icon: {
    marginRight: 10,
  },
  loginButton: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginVertical: 10,
  },
  registerButton: {
    backgroundColor: "#007BFF",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginVertical: 20,
  },
  loginButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    fontSize: 16,
    color: "#007BFF",
    textAlign: "center",
    marginTop: 10,
  },
});
