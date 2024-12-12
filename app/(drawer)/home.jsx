import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { getInterests, addInterest, removeInterest } from "../../custom/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Interests = () => {
  const [interests, setInterests] = useState([]);
  const [newInterest, setNewInterest] = useState("");
  const [userId, setUserId] = useState(null); 

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userId");
        setUserId(storedUserId);
      } catch (error) {
        console.error("Error fetching userId:", error);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        if (userId) {
          const fetchedInterests = await getInterests(userId);
          setInterests(fetchedInterests); 
        }
      } catch (error) {
        console.error("Error fetching interests:", error);
      }
    };

    fetchInterests();
  }, [userId]); 

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>What are your Interests?</Text>

        {/* Interest Input */}
        <View style={styles.inputGroup}>
          <TouchableOpacity onPress={async () => {
            if (newInterest.trim() !== "" && userId) {
              try {
                await addInterest(newInterest);
                setInterests((prevInterests) => [...prevInterests, newInterest]);
                setNewInterest("");
              } catch (error) {
                console.error("Error adding interest:", error);
              }
            }
          }}>
            <Ionicons
              style={styles.icon}
              name="add-circle-outline"
              size={24}
              color="#555"
            />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Interest"
            placeholderTextColor="#aaa"
            value={newInterest}
            onChangeText={(text) => setNewInterest(text)}
          />
        </View>

        {/* Display the list of interests */}
        <View style={styles.interestsList}>
          <Text style={styles.heading}>Interests:</Text>
          {interests.map((interest, index) => (
            <View style={styles.inputGroup} key={index}>
              <TouchableOpacity onPress={async () => {
                if (userId) {
                  try {
                    await removeInterest(interest);
                    setInterests((prevInterests) => {
                      const newInterests = [...prevInterests];
                      newInterests.splice(index, 1);
                      return newInterests;
                    });
                  } catch (error) {
                    console.error("Error removing interest:", error);
                  }
                }
              }}>
                <Ionicons
                  style={styles.icon}
                  name="remove-circle-outline"
                  size={24}
                  color="#555"
                />
              </TouchableOpacity>
              <Text style={styles.interestItem}>{interest}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default Interests;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "Top",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "#C5B4E3",
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
    marginBottom: 20,
    textAlign: "center",
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 1,
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
  interestsList: {
    marginTop: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  interestItem: {
    fontSize: 16,
    color: "#333",
    paddingVertical: 5,
  },
  icon: {
    marginRight: 10,
  },
});
