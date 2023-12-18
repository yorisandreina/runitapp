import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebaseConfig';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';

const MyAchievements = () => {
  const [userData, setUserData] = useState(null);
  const [achievements, setAchievements] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const getUserData = async () => {
          const userDoc = await getDoc(userDocRef);
          const userData = userDoc.data();
          setUserData((prevUserData) => ({
            ...prevUserData,
            uid: userData.uid,
          }));
        };
        getUserData();
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (userData) {
      const getAchievements = async () => {
        const q = query(
          collection(db, "usersCompletedRaces"),
          where("uid", "==", userData.uid)
        );

        const achievementsQuerySnapshot = await getDocs(q);

        const achievements = achievementsQuerySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setAchievements(achievements);

      };
      getAchievements();
    }
  }, [userData]);

  const handleLogout = async () => {
    try {
      navigation.navigate("Login");
      Alert.alert("Logged out successfully");
    } catch (error) {
      Alert.alert("Failed to log out");
    }
  };

  const handleBack = async () => {
    try {
        navigation.goBack();
    } catch (error) {
        Alert.alert("Failed to go back")
    }
  };

  const renderAchievement = (achievements) => {
    return (
      <View style={styles.item}>
        <Text style={styles.itemText}>{achievements.raceName}</Text>
        <Text>{achievements.raceDistance}</Text>
        <Text>{achievements.finishTime}</Text>
        <Text>{achievements.raceDate}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Achievements</Text>
      <FlatList
        data={achievements}
        renderItem={({ item }) => renderAchievement(item)}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.buttonContainers}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <SvgXml
            xml={`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H6M12 5l-7 7 7 7"/></svg>`}
            width={24}
            height={24}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 30,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    paddingTop: 40,
    paddingBottom: 20,
    marginHorizontal: 5,
    fontWeight: "600",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginVertical: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 20,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "600",
  },
  buttonContainers: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    backgroundColor: "#322eb8",
    alignItems: "center",
    marginVertical: 30,
    borderRadius: 20,
    width: "15%",
    padding: 15,
  },
  logoutButton: {
    alignItems: "center",
    width: "70%",
    backgroundColor: "#f2f2f2",
    padding: 15,
    borderRadius: 20,
  },
  logoutText: {
    color: "#000",
    fontWeight: "500",
    fontSize: 16,
  },
});

export default MyAchievements;