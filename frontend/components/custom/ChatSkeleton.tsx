import { useEffect, useRef } from "react";
import { View, Animated } from "react-native";

const ChatSkeleton = () => {
  const pulseAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.3,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
    );
    pulse.start();

    return () => pulse.stop();
  }, [pulseAnim]);

  return (
    <>
      {Array.from({ length: 8 }).map((_, i) => (
        <View
          key={i}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            flexDirection: "row",
            padding: 10,
          }}
        >
          <View
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 20,
              flexDirection: "row",
            }}
          >
            <Animated.View
              style={{
                width: 60,
                height: 60,
                backgroundColor: "#e6e6e6",
                borderRadius: 100,
                opacity: pulseAnim,
              }}
            />
            <View
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                flexDirection: "column",
                gap: 6,
              }}
            >
              <Animated.View
                style={{
                  width: 100,
                  height: 10,
                  backgroundColor: "#e6e6e6",
                  opacity: pulseAnim,
                }}
              />
              <Animated.View
                style={{
                  width: 60,
                  height: 10,
                  backgroundColor: "#e6e6e6",
                  opacity: pulseAnim,
                }}
              />
            </View>
          </View>
          <View
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              gap: 8,
              flexDirection: "row",
            }}
          >
            <Animated.View
              style={{
                width: 40,
                height: 40,
                backgroundColor: "#e6e6e6",
                borderRadius: 100,
                opacity: pulseAnim,
              }}
            />
            <Animated.View
              style={{
                width: 40,
                height: 40,
                backgroundColor: "#e6e6e6",
                borderRadius: 100,
                opacity: pulseAnim,
              }}
            />
          </View>
        </View>
      ))}
    </>
  );
};

export default ChatSkeleton;
