import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// 共享的头部背景组件
const SharedHeaderBackground = () => (
  <View
    style={{
      backgroundColor: 'skyblue',
      flex: 1,
    }}
  />
);

// 共享的页面头部配置
const createPageOptions = (title: string) => ({
  headerShown: true,
  title,
  headerBackground: () => <SharedHeaderBackground />,
  headerBackTitle: 'Back',
  headerStyle: {
    backgroundColor: 'skyblue',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold' as const,
    fontSize: 20,
  },
  animation: 'fade' as const,
  animationDuration: 80,
  gestureEnabled: false,
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          // 默认不显示 header，只在需要的页面显示
          headerShown: false,
          // 使用快速淡入淡出动画
          animation: 'fade',
          animationDuration: 100,
          // 禁用手势返回，使用按钮返回更可控
          gestureEnabled: false,
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
            // 禁用动画，立即切换
            animation: 'none',
          }}
        />
        <Stack.Screen name="day1" />
        <Stack.Screen name="day2" options={createPageOptions('轮播图')} />
        <Stack.Screen name="day3" />
        <Stack.Screen
          name="day4"
          options={createPageOptions('Day 4 - Events')}
        />
        <Stack.Screen name="day5" options={createPageOptions('拖动')} />
        <Stack.Screen name="day6" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export { SharedHeaderBackground };
