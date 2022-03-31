import { useEffect } from "react";
import { useValuesRef } from "./useValuesRef";

export const useInterval = (callback, delay) => {
  const savedCallback = useValuesRef(callback);

  useEffect(() => {
    if (delay !== null) {
      const timer = setInterval(() => {
        savedCallback.current();
      }, delay);
      return () => {
        clearInterval(timer); // delay改变时，旧的timer会被清除
      };
    }
  }, [delay]);
};

//这里我们没有把timer保存到ref，而是将interval的函数入参变为可变的，这样每次获取的count值都是最新的，并且当delay改变时，我们的定时器会被清除，而如果我们传入delay为null时，定时器不会重新创建，改写代码如下：
