import { Dimensions, StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function DraggableBox() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  // 1. 创建拖动手势
  const pan = Gesture.Pan()
    .onChange((e) => {
      const newX = translateX.value + e.changeX;
      const newY = translateY.value + e.changeY;
      translateX.value = Math.max(0, Math.min(width - 80, newX));
      translateY.value = Math.max(0, Math.min(height - 80, newY));
    })
    .onEnd(() => {
      // 松手回弹到中心（可选）
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    });

  // 2. 动画样式
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  // 3. 渲染
  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.box, animatedStyle]} />
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 80,
    height: 80,
    backgroundColor: '#f05',
    borderRadius: 12,
  },
});
