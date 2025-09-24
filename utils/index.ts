import * as Haptics from 'expo-haptics';
import { Dimensions, PixelRatio, Platform } from 'react-native';

const scale = PixelRatio.get(); // 1 逻辑 px = 2 物理像素（@2x） 当前设备的逻辑像素密度因子 逻辑像素 = 你在代码里写的 width: 100 物理像素 = 屏幕实际发光的像素点数量

const hairLine = 1 / scale;   // 真实 1 物理像素细线  返回值越大 → 屏幕越细腻 → 需要更高倍图 / 更细边框。

const {width, height} = Dimensions.get('window'); // 返回的是 当前应用窗口的逻辑像素尺寸（不含状态栏、不含底部导航栏），单位是 dp（逻辑像素）。


class Utils {
    /**
     * 屏幕尺寸
     * 返回的是 当前应用窗口的逻辑像素尺寸（不含状态栏、不含底部导航栏），单位是 dp（逻辑像素）。
     */
    static size = {width, height}
    /**
     * 屏幕像素密度
     * 1 逻辑 px = 2 物理像素（@2x） 当前设备的逻辑像素密度因子 逻辑像素 = 你在代码里写的 width: 100 物理像素 = 屏幕实际发光的像素点数量
     */
    static scale = scale
    /**
     * 屏幕像素密度细线
     * 返回值越大 → 屏幕越细腻 → 需要更高倍图 / 更细边框。
     */
    static hairLine = hairLine
    /**
     * 震动
     * @param type: 震动类型
     */
    static Haptics (type: Haptics.NotificationFeedbackType) {
        Haptics.notificationAsync(type)
    }

    static platform = Platform.OS
}


export default Utils