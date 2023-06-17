import {createContext, useContext, useState} from 'react';
import useMenu from '../api/useMenu';

type OptionContextValue = {
  [index: string]: string | string[];
  SORT: string;
  BARGAIN: string;
  PRODUCT: string[];
};

let optionTypes: OptionContextValue = {
  SORT: '최신순',
  BARGAIN: '흥정없음',
  PRODUCT: [],
};

export const OptionContext = createContext<OptionContextValue>({
  SORT: optionTypes.SORT,
  BARGAIN: optionTypes.BARGAIN,
  PRODUCT: optionTypes.PRODUCT,
  handleOptions: () => {},
});

export const OptionProvider: React.FC = ({children}) => {
  const {mutate} = useMenu();
  const [options, setOptions] = useState<OptionContextValue>(optionTypes);

  const handleOptions = (option: string, value: string | string[]) => {
    setOptions(prevOptions => ({
      ...prevOptions,
      [option]: value,
    }));
    mutate();
  };

  return (
    <OptionContext.Provider value={{...options, handleOptions}}>
      {children}
    </OptionContext.Provider>
  );
};

export const useOption = () => useContext(OptionContext);
