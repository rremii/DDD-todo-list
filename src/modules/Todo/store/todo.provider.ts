import { createContext } from "react";

export const TodoContext = createContext<RootStoreModel>({} as RootStoreModel);

export type StoreComponent = FC<{
  store: RootStoreModel;
  children: ReactNode;
}>;

export const StoreProvider: StoreComponent = ({
  children,
  store,
}): ReactElement => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
