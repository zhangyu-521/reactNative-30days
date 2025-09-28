import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useEffect, useState } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.75;
const MAX_OPACITY = 0.6;
const items = [
  { key: 'Home', icon: 'table', text: '我的音频', line: false },
  { key: 'Profile', icon: 'bank', text: '我的钱包', line: false },
  { key: 'bell', icon: 'bells', text: '我的消息', line: true },
  { key: 'bold', icon: 'stepbackward', text: '我的收藏', line: false },
  { key: 'book', icon: 'book', text: '我的笔记', line: false },
] as const;

export default function CustomDrawer() {
  const [open, setOpen] = useState(false);
  const [ellips, setEllips] = useState(true);
  const translateX = useSharedValue(-DRAWER_WIDTH);
  const opacity = useSharedValue(0); // 遮罩透明度

  // 1. 同一个 Pan 手势驱动抽屉 + 遮罩
  const pan = Gesture.Pan()
    .onUpdate((e) => {
      const newX = e.translationX - DRAWER_WIDTH;
      translateX.value = Math.max(-DRAWER_WIDTH, Math.min(0, newX)); // 边界
      // 透明度 = 位移比例（线性）
      opacity.value = Math.max(
        0,
        Math.min(MAX_OPACITY, (newX + DRAWER_WIDTH) / DRAWER_WIDTH)
      );
    })
    .onEnd((e) => {
      if (e.translationX > DRAWER_WIDTH / 3) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    });

  // 2. 动画到目标状态
  useEffect(() => {
    translateX.value = withTiming(open ? 0 : -DRAWER_WIDTH, {
      duration: 250,
      easing: Easing.out(Easing.cubic),
    });
    opacity.value = withTiming(open ? MAX_OPACITY : 0, {
      duration: 250,
      easing: Easing.out(Easing.cubic),
    });
  }, [open]);

  // 3. 样式绑定
  const drawerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const maskStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <GestureDetector gesture={pan}>
      <View style={styles.container}>
        {/* 主内容 */}
        <View style={styles.main}>
          <Pressable onPress={() => setOpen(true)}>
            <Text>Open Drawer</Text>
          </Pressable>
        </View>

        {/* 遮罩：跟随手指淡入淡出 */}
        <Animated.View
          style={[styles.mask, maskStyle]}
          pointerEvents={open ? 'auto' : 'none'}
        >
          <Pressable
            style={StyleSheet.absoluteFillObject}
            onPress={() => setOpen(false)}
          />
        </Animated.View>

        {/* 抽屉 */}
        <Animated.View style={[styles.drawer, drawerStyle]}>
          <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 18 }}>ZhangYu</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 20,
              }}
            >
              <Text
                style={{ fontSize: 16, width: '80%' }}
                {...(ellips ? { ellipsizeMode: 'clip', numberOfLines: 1 } : {})}
              >
                fasgasdgsfsfasfasd@qqaf.cong.baidufdsgagsdfhdfgfdgsdfgsgfgdgsd
              </Text>
              <AntDesign
                onPress={() => setEllips((pre) => !pre)}
                name={ellips ? 'down' : 'up'}
                size={18}
              ></AntDesign>
            </View>
          </View>

          {items.map((item) => (
            <Pressable
              key={item.key}
              style={({ pressed }) =>
                pressed
                  ? {
                      backgroundColor: '#e4e4f9',
                      ...styles.drawerItem,
                      borderBottomWidth: item.line ? 1 : 0,
                    }
                  : {
                      ...styles.drawerItem,
                      borderBottomWidth: item.line ? 1 : 0,
                    }
              }
              onPress={() => setOpen(false)}
            >
              <AntDesign name={item.icon} size={18}></AntDesign>
              <Text style={{ fontSize: 18, marginLeft: 10 }}>{item.text}</Text>
            </Pressable>
          ))}
        </Animated.View>
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  main: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  drawer: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: DRAWER_WIDTH,
    height: '100%',
    backgroundColor: '#fff',
    zIndex: 10,
  },
  mask: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
    zIndex: 9,
  },
  drawerItem: {
    flexDirection: 'row',
    height: 30,
    padding: 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderColor: '#ccc',
  },
});
