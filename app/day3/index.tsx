import { IconSymbol } from '@/components/ui/IconSymbol';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

/** 全屏遮罩动画组件 */
function AnView({ onOver }: { onOver: (status: string) => void }) {
  const progress = useSharedValue(0); // 0 开始，1 结束

  useEffect(() => {
    //  线性放大+淡出
    const t = setTimeout(() => {
      progress.value = withTiming(
        1,
        {
          duration: 1200,
          easing: Easing.linear,
        },
        (finish) => {
          'worklet';
          if (finish) {
            runOnJS(onOver)('finish');
          }
        }
      );
    }, 1000);
    return () => clearTimeout(t);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const scale = 1 + progress.value * 30; // 从 1 放大到 2.5
    return {
      transform: [{ scale }],
      opacity: progress.value === 1 ? 0 : 1,
      display: progress.value === 1 ? 'none' : 'flex',
    };
  });

  return (
    <Animated.View
      style={[styles.anbg, animatedStyle]}
      pointerEvents="none" // 动画层不接受点击
    >
      <IconSymbol size={50} color="#fff" name="0.circle.hi" />
    </Animated.View>
  );
}

export default function Day3Screen() {
  const fontProgress = useSharedValue(0);

  const [data, setData] = useState(['Day1', 'Day2']);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    // 模拟网络请求
    setTimeout(() => {
      setData((d) => [...d, `Day${d.length + 1}`]);
      setRefreshing(false);
    }, 1500);
  }, []);

  const AnViewOver = (over: string) => {
    console.log('over', over);

    fontProgress.value = withTiming(1, {
      duration: 2000,
      easing: Easing.linear,
    });
  };

  const fontAnStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: fontProgress.value * 1.2 }],
    };
  });

  return (
    <View>
      <FlatList
        data={data}
        contentContainerStyle={{ flexGrow: 1 }} // 不足一屏也能拉
        style={{
          height: height,
        }}
        renderItem={(item) => (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: height,
              borderBottomWidth: 1,
            }}
          >
            <Animated.Text style={[styles.tx, fontAnStyle]}>
              {item.item}
            </Animated.Text>
            <Text style={{ color: '#000', marginTop: 10 }}>
              {refreshing ? '刷新中' : '下拉刷新'}
            </Text>
          </View>
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#0051ffff']} // 安卓圈圈颜色
            tintColor="#ff0055" // ios 圈圈颜色
          />
        }
      ></FlatList>
      <AnView onOver={AnViewOver} />
    </View>
  );
}

const styles = StyleSheet.create({
  tx: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  anbg: {
    position: 'absolute',
    left: 0,
    top: 0,
    width,
    height,
    backgroundColor: '#1d8dfe',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
