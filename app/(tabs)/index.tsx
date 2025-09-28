import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useRef } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import Utils from '@/utils';

export default function HomeScreen() {
  const router = useRouter();
  const isNavigatingRef = useRef(false);

  const days = [
    {
      icon: 'house.fill' as const,
      iconColor: 'green',
      title: 'Day 1',
      description: '计秒器',
      route: '/day1' as const,
    },
    {
      icon: 'paperplane.fill' as const,
      iconColor: 'blue',
      title: 'Day 2',
      description: '轮播图',
      route: '/day2' as const,
    },
    {
      icon: 'chevron.right' as const,
      iconColor: 'orange',
      title: 'Day 3',
      description: '进入app的动画',
      route: '/day3' as const,
    },
    {
      icon: 'chevron.left.forwardslash.chevron.right' as const,
      iconColor: 'purple',
      title: 'Day 4',
      description: '相机',
      route: '/day4' as const,
    },
    {
      icon: 'house.fill' as const,
      iconColor: 'yellow',
      title: 'Day 5',
      description: '拖动',
      route: '/day5' as const,
    },
    {
      icon: 'house.fill' as const,
      iconColor: 'skyblue',
      title: 'Day 6',
      description: '本地存储',
      route: '/day6' as const,
    },
    {
      icon: 'house.fill' as const,
      iconColor: 'skyblue',
      title: 'Day 7',
      description: '图片选择',
      route: '/day7' as const,
    },
    {
      icon: 'house.fill' as const,
      iconColor: 'skyblue',
      title: 'Day 8',
      description: '系统震动',
      route: '/day8' as const,
    },
    {
      icon: 'house.fill' as const,
      iconColor: 'skyblue',
      title: 'Day 9',
      description: '抽屉',
      route: '/day9' as const,
    },
    {
      icon: 'house.fill' as const,
      iconColor: 'skyblue',
      title: 'Day 10',
      description: '头部',
      route: '/day10' as const,
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
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
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
        </View>
      </ParallaxScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  menu: {
    width: Utils.size.width / 3,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: Utils.hairLine,
    borderColor: '#ccc',
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
