import Utils from '@/utils';
import { PropsWithChildren, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = PropsWithChildren<{
  showDrawer: boolean;
  setShowDrawer: (value: boolean) => void;
}>;
function Drawer(props: Props) {
  const process = useSharedValue(props.showDrawer ? -Utils.size.width / 2 : 0);

  const [visible, setVisible] = useState(props.showDrawer);

  useEffect(() => {
    if (props.showDrawer) setVisible(true);
    else {
      const t = setTimeout(() => setVisible(false), 700); // 动画时长
      return () => clearTimeout(t);
    }
  }, [props.showDrawer]);
  process.value = withTiming(
    props.showDrawer ? 0 : -Utils.size.width / 2,
    {
      duration: 500,
      easing: Easing.linear,
    },
    (finish) => {
      'worklet';
      if (finish) {
        // runOnJS(setDraw)(false);
      }
    }
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      left: process.value,
    };
  });

  if (!visible) return null; // 彻底卸载节点

  return (
    <Animated.View style={[styles.drawerMain]}>
      <Animated.View
        style={[
          {
            backgroundColor: 'white',
            width: Utils.size.width / 2,
            height: Utils.size.height,
            position: 'absolute',
            left: -Utils.size.width / 2,
            top: 0,
            zIndex: 1,
          },
          animatedStyle,
        ]}
      >
        {props.children}
      </Animated.View>

      <Pressable
        pointerEvents="auto"
        onPress={(e) => {
          props.setShowDrawer(false);
        }}
        style={{
          width: Utils.size.width,
          height: Utils.size.height,
          backgroundColor: '#000',
          position: 'absolute',
          left: 0,
          top: 0,
          opacity: 0.4,
        }}
      ></Pressable>
    </Animated.View>
  );
}
export default function Day9Screen() {
  const [showDrawer, setShowDrawer] = useState(true);
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <Pressable
        onPress={() => {
          console.log('ll');
          setShowDrawer(!showDrawer);
        }}
        pointerEvents={showDrawer ? 'none' : 'auto'}
      >
        <Text>Day9</Text>
      </Pressable>
      <Drawer showDrawer={showDrawer} setShowDrawer={setShowDrawer}>
        <Text>Drawer</Text>
      </Drawer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  drawerMain: { position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
