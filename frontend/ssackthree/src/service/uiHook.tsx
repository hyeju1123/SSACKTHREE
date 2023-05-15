import React from 'react';
import FaIcon from 'react-native-vector-icons/FontAwesome';

export const handleStar = (num: number) => {
  const arr = Array.from({length: 5}, (_, i) => {
    if (i < num) {
      return <FaIcon key={i} name="star" size={10} color={'black'} />;
    } else {
      return <FaIcon key={i} name="star-o" size={10} color={'black'} />;
    }
  });
  return arr;
};
