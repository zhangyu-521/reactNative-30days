import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const { width: screenWidth } = Dimensions.get('window');

// 轮播数据
const carouselData = [
  {
    id: 1,
    title: '美丽的风景',
    description: '探索大自然的奇妙之美',
    image: 'https://picsum.photos/400/250?random=1',
    backgroundColor: '#FF6B6B',
  },
  {
    id: 2,
    title: '城市夜景',
    description: '感受都市的繁华与活力',
    image: 'https://picsum.photos/400/250?random=2',
    backgroundColor: '#4ECDC4',
  },
  {
    id: 3,
    title: '宁静海滩',
    description: '享受海边的宁静时光',
    image: 'https://picsum.photos/400/250?random=3',
    backgroundColor: '#45B7D1',
  },
  {
    id: 4,
    title: '山间小径',
    description: '漫步在山间的小路上',
    image: 'https://picsum.photos/400/250?random=4',
    backgroundColor: '#96CEB4',
  },
];

export default function Day2Screen() {
  const scrollViewRef = useRef<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useSharedValue(0);

  // 自动轮播
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % carouselData.length;
      scrollViewRef.current?.scrollTo({
        x: nextIndex * screenWidth,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    }, 3000); // 3秒切换一次

    return () => clearInterval(interval);
  }, [currentIndex]);

  // 滚动处理
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
      const index = Math.round(event.contentOffset.x / screenWidth);
      runOnJS(setCurrentIndex)(index);
    },
  });

  // 手动切换到指定页面
  const goToSlide = (index: number) => {
    scrollViewRef.current?.scrollTo({
      x: index * screenWidth,
      animated: true,
    });
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>轮播组件演示</Text>

      {/* 轮播容器 */}
      <View style={styles.carouselContainer}>
        <Animated.ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          style={styles.scrollView}
        >
          {carouselData.map((item, index) => (
            <CarouselItem
              key={item.id}
              item={item}
              index={index}
              scrollX={scrollX}
            />
          ))}
        </Animated.ScrollView>

        {/* 指示器 */}
        <View style={styles.indicatorContainer}>
          {carouselData.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.indicator,
                currentIndex === index && styles.activeIndicator,
              ]}
              onPress={() => goToSlide(index)}
            />
          ))}
        </View>
      </View>

      {/* 当前页面信息 */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>
          {carouselData[currentIndex]?.title}
        </Text>
        <Text style={styles.infoDescription}>
          {carouselData[currentIndex]?.description}
        </Text>
        <Text style={styles.pageInfo}>
          {currentIndex + 1} / {carouselData.length}
        </Text>
      </View>
    </View>
  );
}

// 轮播项组件
interface CarouselItemProps {
  item: (typeof carouselData)[0];
  index: number;
  scrollX: Animated.SharedValue<number>;
}

function CarouselItem({ item, index, scrollX }: CarouselItemProps) {
  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * screenWidth,
      index * screenWidth,
      (index + 1) * screenWidth,
    ];

    const scale = interpolate(
      scrollX.value,
      inputRange,
      [0.8, 1, 0.8],
      'clamp'
    );

    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0.6, 1, 0.6],
      'clamp'
    );

    return {
      transform: [{ scale }],
      opacity,
    };
  });

  return (
    <Animated.View style={[styles.carouselItem, animatedStyle]}>
      <View
        style={[styles.itemContent, { backgroundColor: item.backgroundColor }]}
      >
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemDescription}>{item.description}</Text>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  carouselContainer: {
    height: 300,
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  carouselItem: {
    width: screenWidth,
    paddingHorizontal: 20,
  },
  itemContent: {
    flex: 1,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  itemImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  itemTextContainer: {
    padding: 15,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#007AFF',
    width: 20,
  },
  infoContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  infoDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  pageInfo: {
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
  },
});
