import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "https://6758a9a860576a194d11678e.mockapi.io";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Save userId to AsyncStorage
const saveUserId = async (userId) => {
  try {
    await AsyncStorage.setItem("userId", userId);
  } catch (error) {
    console.error("Error saving userId:", error);
  }
};

// Get userId from AsyncStorage
const getUserId = async () => {
  try {
    const userId = await AsyncStorage.getItem("userId");
    return userId;
  } catch (error) {
    console.error("Error getting userId:", error);
    return null;
  }
};

export const getUsers = async () => {
  try {
    const response = await api.get("/users");
    return response.data;
  } catch (error) {
    console.error("Error in fetching data from the server: " + error);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const users = await getUsers();
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      await saveUserId(user.id);
      return user;
    } else {
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

export const registerUser = async (name, email, password) => {
  try {
    const response = await api.post("/users", {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await AsyncStorage.removeItem("userId");
  } catch (error) {
    console.error("Error logging out user:", error);
    throw error;
  }
};

// Fetch interests for the current user
export const getInterests = async () => {
  try {
    const userId = await getUserId(); // Retrieve userId from AsyncStorage
    if (userId) {
      const response = await api.get(`/users/${userId}`);
      return response.data.interests || []; // Return interests array
    } else {
      throw new Error("User not logged in");
    }
  } catch (error) {
    console.error("Error in fetching interests from the server: " + error);
    throw error;
  }
};

// Add an interest for the current user
export const addInterest = async (interest) => {
  try {
    const userId = await getUserId(); // Retrieve userId from AsyncStorage
    if (userId) {
      const userResponse = await api.get(`/users/${userId}`);
      const user = userResponse.data;

      if (!user.interests) user.interests = []; // Initialize if undefined
      user.interests.push(interest);  // Add the new interest

      const response = await api.put(`/users/${userId}`, user); // Update the user
      return response.data;
    } else {
      throw new Error("User not logged in");
    }
  } catch (error) {
    console.error("Error adding interest: " + error);
    throw error;
  }
};

// Remove an interest for the current user
export const removeInterest = async (interest) => {
  try {
    const userId = await getUserId(); // Retrieve userId from AsyncStorage
    if (userId) {
      const userResponse = await api.get(`/users/${userId}`);
      const user = userResponse.data;

      if (user.interests) {
        user.interests = user.interests.filter((i) => i !== interest); // Remove the interest
        const response = await api.put(`/users/${userId}`, user); // Update the user
        return response.data;
      }

      throw new Error("No interests to remove");
    } else {
      throw new Error("User not logged in");
    }
  } catch (error) {
    console.error("Error removing interest: " + error);
    throw error;
  }
};

export const getEvents = async (interests) => {
  try {
    const response = await api.get("/events"); // Fetch all events
    const allEvents = response.data;

    // Filter events where the `interestType` matches any of the user's interests
    const filteredEvents = allEvents.filter((event) =>
      interests.includes(event.interestType)
    );

    return filteredEvents;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};
