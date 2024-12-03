import {
  Animated,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import axios from "axios";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useRouter } from "expo-router";

interface Blog {
  id: number;
  blog: string;
  authorname: string;
}

export default function Index() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const router = useRouter();

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(process.env.EXPO_PUBLIC_API_URL as string);
      setBlogs(res.data.blogs);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBlog = async (id: number) => {
    try {
      const res = await axios.delete(
        `${process.env.EXPO_PUBLIC_API_URL}/delete/${id}`
      );
      setBlogs(res.data.blogs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <SafeAreaView style={styles.parentContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Blogs</Text>
        <Pressable style={styles.button} onPress={() => router.push("/new")}>
          <Text>New Blog</Text>
          <AntDesign name="plus" size={18} color="black" />
        </Pressable>
      </View>

      <FlatList
        data={blogs}
        keyExtractor={(blog) => blog.id.toString()}
        contentContainerStyle={{ flexGrow: 1 }}
        renderItem={({ item }) => (
          <View style={styles.blogCard}>
            <Text>{item.blog}</Text>
            <Text style={{ marginTop: 20, fontWeight: "700" }}>
              - {item.authorname}
            </Text>

            <View style={styles.blogCardFooter}>
              <Pressable
                style={[styles.button, { padding: 10, borderRadius: 10 }]}>
                <Text>Edit</Text>
                <FontAwesome5 name="pencil-alt" size={18} color="black" />
              </Pressable>
              <Pressable
                style={[styles.button, { padding: 10, borderRadius: 10 }]}
                onPress={() => deleteBlog(item.id)}>
                <Text>Delete</Text>
                <FontAwesome5 name="trash" size={18} color="black" />
              </Pressable>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  parentContainer: {
    margin: 40,
    flex: 1,
  },
  headerContainer: {
    display: "flex",
    gap: 20,
    marginBottom: 20,
  },
  button: {
    padding: 20,
    backgroundColor: "#e6e8e6",
    borderRadius: 25,
    alignSelf: "flex-start",
    display: "flex",
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
  },
  title: {
    fontSize: 48,
    fontWeight: "600",
  },
  blogCard: {
    backgroundColor: "#cccfcd",
    borderRadius: 15,
    padding: 25,
    marginVertical: 10,
  },
  blogCardFooter: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
  },
});
