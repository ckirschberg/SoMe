import { Stack } from "expo-router";

export default function RootLayout() {
  // the tab bar is the app's top level chrome, so this stack only ever hosts the
  // (tabs) group - headerShown: false stops it drawing a header above the tabs'
  // own headers
  return <Stack screenOptions={{ headerShown: false }} />;
}
