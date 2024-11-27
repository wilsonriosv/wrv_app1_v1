/* import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack />;
} */

  import { Slot } from "expo-router"; // Importar Slot para manejar las rutas
  import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
  import Icon from "react-native-vector-icons/MaterialIcons";
  
  const Tab = createBottomTabNavigator();
  
  export default function Layout() {
      return (
          <Tab.Navigator
              screenOptions={({ route }) => ({
                  tabBarIcon: ({ color, size }) => {
                      let iconName;
                      switch (route.name) {
                          case "home":
                              iconName = "home";
                              break;
                          case "records":
                              iconName = "list";
                              break;
                          case "weather":
                              iconName = "cloud";
                              break;
                          case "settings":
                              iconName = "settings";
                              break;
                          default:
                              iconName = "home"; // Valor predeterminado si no se encuentra coincidencia
                              break;
                      }
                      return <Icon name={iconName} size={size} color={color} />;
                  },
              })}
          >
              <Tab.Screen name="home" component={Slot} />
              <Tab.Screen name="records" component={Slot} />
              <Tab.Screen name="weather" component={Slot} />
              <Tab.Screen name="settings" component={Slot} />
          </Tab.Navigator>
      );
  }
  