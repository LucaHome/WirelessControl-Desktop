export const getAreaState = (store: any) => store.areaReducer;
export const getAreaList = (store: any) => getAreaState(store) ? getAreaState(store).areas : [];
export const getSelectedArea = (store: any) => getAreaState(store) ? getAreaState(store).areaSelected : undefined;
