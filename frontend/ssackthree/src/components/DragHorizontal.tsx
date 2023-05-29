import React, {useRef} from 'react';
import {
  View,
  PanResponder,
  Animated,
  Dimensions,
  StyleSheet,
  Text,
} from 'react-native';
import {convertToKilometers} from '../service/calculator';

const squareWidth = 10;

type Props = {
  distance: number;
  handleDistance: React.Dispatch<React.SetStateAction<number>>;
};

export default function DragHorizontal({handleDistance, distance}: Props) {
  const {width: screenWidth} = Dimensions.get('window');

  const maxDragDistance = screenWidth - 60;

  const pan = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return (
          Math.abs(gestureState.dx) > 5 &&
          Math.abs(gestureState.dx) > Math.abs(gestureState.dy) &&
          (gestureState.dx < 0 || pan._value < maxDragDistance)
        );
      },
      onPanResponderMove: (_, gestureState) => {
        let newPanValue = gestureState.dx;

        if (newPanValue < 0) {
          newPanValue = 0;
        } else if (newPanValue > maxDragDistance) {
          newPanValue = maxDragDistance;
        }

        pan.setValue(newPanValue);

        Animated.event([{dx: pan}], {useNativeDriver: false})({
          dx: newPanValue,
        });

        const ratio = newPanValue / maxDragDistance;
        const distanceValue = 10 + ratio * (5000 - 10); // 10m부터 5Km까지의 범위로 변환
        handleDistance(convertToKilometers(distanceValue));
      },
    }),
  ).current;

  return (
    <>
      <View style={styles.container}>
        <View style={styles.line} />
        <Animated.View
          style={{
            transform: [{translateX: pan}],
          }}
          {...panResponder.panHandlers}>
          <View style={styles.point} />
        </Animated.View>
      </View>
      <View style={styles.distanceInfoBar}>
        <Text style={styles.distanceInfoText}>10m</Text>
        <Text style={styles.distanceInfoText}>5km</Text>
      </View>
      <Text>{distance}km 거리 내의 가게만 볼래요.</Text>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center',
  },
  line: {
    position: 'absolute',
    width: '100%',
    height: 2,
    borderTopColor: '#79B53E',
    borderTopWidth: 2,
  },
  point: {
    width: squareWidth,
    height: squareWidth,
    borderRadius: squareWidth / 2,
    backgroundColor: '#79B53E',
  },
  distanceInfoBar: {
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  distanceInfoText: {
    fontFamily: 'Inter-Medium',
    color: '#3C6117',
  },
});
