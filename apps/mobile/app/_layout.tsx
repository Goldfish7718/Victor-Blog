import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "blue" },
          headerTintColor: "white",
        }}>
        <Stack.Screen name="index" options={{ headerTitle: "Victor Blog" }} />
        <Stack.Screen name="new" options={{ headerTitle: "New Blog" }} />
        <Stack.Screen
          name="blogs/[id]"
          options={{ headerTitle: "Edit Blog" }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
