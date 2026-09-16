import { Tabs } from "expo-router/js-tabs";
import { SymbolView } from "expo-symbols";

export default function TabsLayout() {
    return (
        // SDK 57 deprecates `import { Tabs } from "expo-router"` - same component,
        // it just moved to its own entry point so the native tabs can take the name
        <Tabs>
            <Tabs.Screen
                name="(feed)"
                options={{
                    title: "Feed",
                    // the feed tab has its own stack, and that stack draws the header -
                    // without this the screen would get two stacked headers
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <SymbolView name={{ ios: "list.bullet", android: "list", web: "list" }} size={28} tintColor={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: "Settings",
                    tabBarIcon: ({ color }) => (
                        <SymbolView name={{ ios: "gearshape", android: "settings", web: "settings" }} size={28} tintColor={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
