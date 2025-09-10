import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Day1Screen() {
  // 状态定义: 0-未开始, 1-进行中, 2-已暂停
  const [status, setStatus] = useState(0);
  const [time, setTime] = useState<number>(0);
  const [list, setList] = useState<{ time: number }[]>([]);

  const scrollViewRef = useRef<ScrollView>(null);
  const timer = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0); // 开始时间

  // 计算当前间隔时间
  const currentInterval = useMemo(() => {
    if (list.length === 0) {
      return time;
    } else {
      const totalPreviousTime = list.reduce((sum, item) => sum + item.time, 0);
      return time - totalPreviousTime;
    }
  }, [time, list]);

  // 组件卸载时清理定时器
  useEffect(() => {
    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    };
  }, []);

  const handleCount = () => {
    if (status === 2) {
      // 复位操作
      setTime(0);
      setStatus(0);
      setList([]);
      startTimeRef.current = 0;
      timer.current && clearInterval(timer.current);
      timer.current = null;
    } else if (status === 1) {
      // 计数操作：记录当前间隔时间
      setList((prevList) => [
        ...prevList,
        { time: Number(currentInterval.toFixed(2)) },
      ]);

      // 滚动到底部
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const start = () => {
    if (status === 0) {
      // 首次启动
      startTimeRef.current = Date.now(); // 1
    } else if (status === 2) {
      // 从暂停恢复
      startTimeRef.current = Date.now() - time * 1000; // 假设1秒暂停，当前是4秒  === 》4 - 1 = 3
    }

    timer.current = setInterval(() => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000; // 4.1 - 3 = 1.1
      setTime(Number(elapsed.toFixed(2)));
    }, 100); // 更高精度的更新频率

    setStatus(1);
  };

  const handleStart = () => {
    if (status === 1) {
      setStatus(2);
      timer.current && clearInterval(timer.current);
      return;
    }
    if (status === 0 || status === 2) {
      start();
      return;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={{ fontSize: 66, fontWeight: 200 }}>{time.toFixed(2)}</Text>
        <Text style={{ fontSize: 20, color: '#666', marginTop: 10 }}>
          间隔: {currentInterval.toFixed(2)}s
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => handleCount()}
          style={[styles.btn, status === 2 && styles.resetBtn]}
        >
          <Text style={styles.btnText}>{status === 2 ? '复位' : '计数'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleStart()}
          style={[
            styles.btn,
            (status === 0 || status === 2) && styles.startBtn,
            status === 1 && styles.pauseBtn,
          ]}
        >
          <Text
            style={[
              styles.btnText,
              (status === 1 || status === 0 || status === 2) && {
                color: '#fff',
              },
            ]}
          >
            {status === 0 || status === 2 ? '启动' : '暂停'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView ref={scrollViewRef} style={styles.list}>
        {list.map((item, idx) => (
          <View style={styles.listItem} key={idx}>
            <Text style={{ fontSize: 20, color: '#ccc' }}>计次{idx + 1}</Text>
            <Text style={{ fontSize: 24 }}>{item.time.toFixed(2)}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  content: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: '30%',
    width: '100%',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    height: 120, // 固定最小高度，防止布局跳动
    // backgroundColor: 'blue',
  },

  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: 80,
    height: 80,
    borderRadius: 50,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  btnText: {
    fontSize: 16,
    fontWeight: '600',
  },

  resetBtn: {
    backgroundColor: '#ff6b6b',
  },

  pauseBtn: {
    backgroundColor: '#ff6b6b',
  },

  startBtn: {
    backgroundColor: '#4ecdc4',
  },

  list: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  listItem: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: 10,
    borderBottomColor: '#ccc',
  },
});
