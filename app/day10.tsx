import Utils from '@/utils';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Text, View } from 'react-native';
import Animated, {
  clamp,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';

const MAX_UP = 100;

export default function Day10() {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  // 1. **图片平移动画样式 (Parallax Effect)**
  // 保持图片在滚动 0 到 100 像素时向上移动
  const bgImgViewStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: -clamp(scrollOffset.value, 0, MAX_UP),
        },
      ],
      height: scrollOffset.value >= MAX_UP ? 0 : 150,
    };
  });

  const anotherImgViewStyle = useAnimatedStyle(() => {
    return {
      height: scrollOffset.value >= MAX_UP ? 150 : 0,
    };
  });

  const iconStyleAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(scrollOffset.value, [0, MAX_UP], [1, 0.6]),
        },
        { translateY: interpolate(scrollOffset.value, [0, MAX_UP], [0, 25]) },
      ],
    };
  });

  return (
    <View style={{ flex: 1, backgroundColor: 'white', position: 'relative' }}>
      <Animated.Image
        style={[
          {
            height: 150,
            width: Utils.size.width,
            backgroundColor: 'white',
            position: 'absolute', // 关键: 使图片脱离文档流
            top: 0,
            left: 0,
            zIndex: 10,
            transform: [{ translateY: -MAX_UP }],
          },
          anotherImgViewStyle,
        ]}
        resizeMode="stretch"
        source={require('@/assets/images/partial-react-logo.png')}
      />
      <Animated.Image
        style={[
          {
            height: 150,
            width: Utils.size.width,
            backgroundColor: 'white',
            position: 'absolute', // 关键: 使图片脱离文档流
            top: 0,
            left: 0,
          },
          bgImgViewStyle, // 应用图片平移动画
        ]}
        resizeMode="stretch"
        source={require('@/assets/images/partial-react-logo.png')}
      />

      {/* 滚动容器: 
        - 确保其覆盖整个屏幕
        - 滚动内容应从图片底部（150 像素）开始
      */}
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        // 关键: 在顶部添加一个与图片高度相同的占位空间
        contentContainerStyle={{ paddingTop: 150 }}
        style={[{ flex: 1 }]}
      >
        <View
          style={[
            {
              padding: 15,
              paddingVertical: 8,
              height: 1000, // 确保内容足够长以滚动
            },
          ]}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View>
              <Animated.View style={[iconStyleAnimatedStyle]}>
                <AntDesign
                  style={[
                    {
                      position: 'absolute',
                      top: -50,
                      backgroundColor: 'white',
                    },
                  ]}
                  name="github"
                  size={70}
                  color="black"
                />
              </Animated.View>
            </View>
            <View>
              <Text style={{ fontSize: 20 }}>React Native</Text>
            </View>
          </View>
          <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 20 }}>
            GitHub
          </Text>
          <Text style={{ fontSize: 12, color: 'gray' }}>@GitHub</Text>
          <View style={{ flexDirection: 'row', gap: 15 }}>
            <Text style={{ fontSize: 12, color: 'gray' }}>
              <Text
                style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}
              >
                183
              </Text>
              正在关注
            </Text>
            <Text style={{ fontSize: 12, color: 'gray' }}>
              <Text
                style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}
              >
                830K
              </Text>
              关注者
            </Text>
            <View></View>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
}
