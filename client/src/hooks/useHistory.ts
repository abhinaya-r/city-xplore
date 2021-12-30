import { useHistory } from "react-router-dom";
import { useState } from "react";

function useHistoryState<T>(key: string, initialValue: T): [T, (t: T) => void] {
  const history = useHistory();
  const [rawState, rawSetState] = useState<T>(() => {
    const value = (history.location.state as any)?.[key];
    return value ?? initialValue;
  });
  function setState(value: T) {
    history.replace({
      ...history.location,
      state: {
        ...history.location.state,
        [key]: value
      }
    });
    rawSetState(value);
  }
  return [rawState, setState];
}