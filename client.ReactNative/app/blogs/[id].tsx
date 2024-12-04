import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

const EditBlog = () => {
  const { id } = useLocalSearchParams();
  const [authorname, setAuthorname] = useState("");
  const [blog, setBlog] = useState("");

  const router = useRouter();

  const fetchBlog = async () => {
    try {
      const res = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/${id}`);
      const { blog, authorname } = res.data.blog;

      setBlog(blog);
      setAuthorname(authorname);
    } catch (error) {
      console.log(error);
    }
  };

  const saveBlog = async () => {
    try {
      await axios.put(`${process.env.EXPO_PUBLIC_API_URL}/update/${id}`, {
        blog,
        authorname,
      });

      router.back();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  return (
    <View style={styles.parentContainer}>
      <Text style={styles.headerTitle}>Edit Blog</Text>

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

export default EditBlog;
