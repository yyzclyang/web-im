import { useSelector, shallowEqual } from "react-redux";

const useShallowEqualSelector = <TState, TSelected>(
  selector: (state: TState) => TSelected
): TSelected => {
  return useSelector(selector, shallowEqual);
};

export default useShallowEqualSelector;
