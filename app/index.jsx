import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
  } from "react-native";
  import React from "react";
  import { useNavigation } from "expo-router";
  
  const Index = () => {
    const navigation = useNavigation();
  
    return (
      <ImageBackground
        style={styles.background}
        source={{
          uri: "https://wallpaperaccess.com/full/6875927.jpg",
        }}
      >
        <View style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.heading}>Welcome To</Text>
            <Text style={styles.appName}>Where2</Text>
            <Text style={styles.subHeading}>Your Community Event Finder</Text>
  
            {/* Enter App Button */}
            <TouchableOpacity
              style={styles.enterButton}
              onPress={() => navigation.navigate("login")}
            >
              <Text style={styles.enterButtonText}> Enter </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  };
  
  export default Index;
  
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
      borderRadius: 15,
      padding: 20,
    },
    heading: {
      color: "white",
      fontSize: 50,
      fontWeight: "bold",
      marginBottom: 5,
      textAlign: "center",
    },
    appName: {
      color: "white",
      fontSize: 50,
      fontWeight: "bold",
      marginBottom: 40,
      textAlign: "center",
    },
    subHeading: {
      color: "white",
      fontSize: 20,
      marginBottom: 40,
      textAlign: "center",
    },
    enterButton: {
      backgroundColor: "white",
      borderRadius: 8,
      paddingVertical: 14,
      alignItems: "center",
      marginVertical: 10,
    },
    enterButtonText: {
      color: "black",
      fontSize: 16,
      fontWeight: "bold",
    },
  });