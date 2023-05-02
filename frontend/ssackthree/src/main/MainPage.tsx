import React from 'react';
import Header from './Header';
import OptionTags from './OptionTags';
import LatestProducts from './LatestProducts';

export default function MainPage(): JSX.Element {
  return (
    <>
      <Header />
      <OptionTags />
      <LatestProducts />
    </>
  );
}
