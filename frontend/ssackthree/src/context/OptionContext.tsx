import {createContext, useCallback, useContext, useState} from 'react';

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
  const [options, setOptions] = useState<OptionContextValue>(optionTypes);

  const handleOptions = useCallback((option: string, value: string) => {
    setOptions(prevOptions => ({
      ...prevOptions,
      [option]: value,
    }));
  }, []);

  return (
    <OptionContext.Provider value={{...options, handleOptions}}>
      {children}
    </OptionContext.Provider>
  );
};

export const useOption = () => useContext(OptionContext);
