/* import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack />;
} */

  import { Slot } from "expo-router"; // Importar Slot para manejar las rutas
  import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
  import Icon from "react-native-vector-icons/MaterialIcons";
  
  // Importa las pantallas que corresponden a cada tab
import HomeScreen from "./home/index";
import RecordsScreen from "./records/index";
import WeatherScreen from "./weather/index";
import SettingsScreen from "./settings/index";

  const Tab = createBottomTabNavigator();
  
  export default function Layout() {
      return (
          <Tab.Navigator
              screenOptions={({ route }) => ({
                  tabBarIcon: ({ color, size }) => {
                      let iconName;
                      switch (route.name) {
                          case "Home":
                              iconName = "home";
                              break;
                          case "Records":
                              iconName = "list";
                              break;
                          case "Weather":
                              iconName = "cloud";
                              break;
                          case "Settings":
                              iconName = "settings";
                              break;
                          default:
                              iconName = "Home"; // Valor predeterminado si no se encuentra coincidencia
                              break;
                      }
                      return <Icon name={iconName} size={size} color={color} />;
                  },
              })}
          >
              <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Records" component={RecordsScreen} />
            <Tab.Screen name="Weather" component={WeatherScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
      );
  }
  