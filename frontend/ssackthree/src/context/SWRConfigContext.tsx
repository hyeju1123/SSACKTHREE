import React from 'react';
import {SWRConfig} from 'swr';
import axios from 'axios';

type Props = {
  children: React.ReactNode;
};

export default function SWRConfigContext({children}: Props) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => axios.get(url).then(res => res.data),
      }}>
      {children}
    </SWRConfig>
  );
}
