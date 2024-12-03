import axios from "axios";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

const NewBlog = () => {
  const [authorname, setAuthorname] = useState("");
  const [blog, setBlog] = useState("");

  const router = useRouter();

  const saveBlog = async () => {
    try {
      await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/new`, {
        authorname,
        blog,
      });

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const clearBlog = () => {
    setAuthorname("");
    setBlog("");
  };

  return (
    <View style={styles.parentContainer}>
      <Text style={styles.headerTitle}>New Blog</Text>

      <View style={styles.main}>
        <TextInput
          style={styles.input}
          placeholder="Author Name"
          placeholderTextColor="#9c9b9a"
          onChangeText={setAuthorname}
          value={authorname}
        />
        <TextInput
          style={[styles.input]}
          placeholder="Write your blog..."
          placeholderTextColor="#9c9b9a"
          multiline={true}
          onChangeText={setBlog}
          value={blog}
        />
      </View>

      <View style={styles.actions}>
        <Pressable style={styles.button} onPress={saveBlog}>
          <Text style={{ color: "blue", fontWeight: "700" }}>SAVE</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={clearBlog}>
          <Text style={{ color: "red", fontWeight: "700" }}>CLEAR</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    margin: 40,
  },
  headerTitle: {
    fontSize: 40,
    fontWeight: "700",
    color: "#2e2e2d",
  },
  main: {
    marginVertical: 25,
    gap: 12,
  },
  input: {
    borderRadius: 15,
    borderColor: "gray",
    backgroundColor: "#e3e3e3",
    padding: 15,
  },
  actions: {
    gap: 8,
    display: "flex",
    flexDirection: "row",
  },
  button: {
    padding: 20,
    borderRadius: 25,
    backgroundColor: "#e3e3e3",
  },
});

export default NewBlog;
