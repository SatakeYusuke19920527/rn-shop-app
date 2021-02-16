import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

type Props = {
  onPress: (event: GestureResponderEvent) => void;
  name:
    | 'link'
    | 'search'
    | 'image'
    | 'menu'
    | 'radio'
    | 'key'
    | 'code'
    | 'map'
    | 'video'
    | 'circle'
    | 'filter'
    | 'minus'
    | 'plus'
    | 'info'
    | 'check'
    | 'book'
    | 'pause'
    | 'frown'
    | 'mail'
    | 'x'
    | 'camera'
    | undefined;
  color?: string;
};

export const IconButton: React.FC<Props> = ({
  onPress,
  name,
  color = '#000',
}: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Feather name={name} color={color} size={32} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 8,
  },
});
