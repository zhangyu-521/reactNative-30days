import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useRef } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function HomeScreen() {
  const router = useRouter();
  const isNavigatingRef = useRef(false);

  const days = [
    {
      icon: 'house.fill' as const,
      iconColor: 'green',
      title: 'Day 1',
      description: 'Introduction to React Native',
      route: '/day1' as const,
    },
    {
      icon: 'paperplane.fill' as const,
      iconColor: 'blue',
      title: 'Day 2',
      description: 'Components and Props',
      route: '/day2' as const,
    },
    {
      icon: 'chevron.right' as const,
      iconColor: 'orange',
      title: 'Day 3',
      description: 'State and Lifecycle',
      route: '/day3' as const,
    },
    {
      icon: 'chevron.left.forwardslash.chevron.right' as const,
      iconColor: 'purple',
      title: 'Day 4',
      description: 'Handling Events',
      route: '/day4' as const,
    },
  ];
  type getKey = (typeof days)[number]['route'];

  const handleMenuClick = (route: getKey) => {
    // 防止重复点击导致多次导航
    if (isNavigatingRef.current) {
      return;
    }

    isNavigatingRef.current = true;

    // 跳转到对应的页面
    router.push(route);

    // 500ms 后重置导航状态，防止正常使用受影响
    setTimeout(() => {
      isNavigatingRef.current = false;
    }, 500);
  };

  return (
    <ThemedView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
          <Image
            source={require('@/assets/images/partial-react-logo.png')}
            style={styles.reactLogo}
          />
        }
      >
        <ThemedView
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {days.map((item) => (
            <Pressable
              key={item.title}
              style={({ pressed }) => [
                styles.menu,
                {
                  opacity: pressed ? 0.7 : 1,
                  transform: [{ scale: pressed ? 0.98 : 1 }],
                },
              ]}
              onPress={() => handleMenuClick(item.route)}
            >
              <IconSymbol
                name={item.icon}
                color={item.iconColor}
                size={32}
                style={styles.titleContainer}
              />
              <ThemedText>{item.title}</ThemedText>
              <ThemedText type="defaultSemiBold" style={styles.description}>
                {item.description}
              </ThemedText>
            </Pressable>
          ))}
        </ThemedView>
      </ParallaxScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  menu: {
    width: '40%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    margin: 8,
    padding: 8,
    backgroundColor: '#f9f9f9',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    textAlign: 'center',
    color: '#666',
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
