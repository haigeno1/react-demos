import React, { useEffect, useState } from "react";
import { useValuesRef } from "./hooks/useValuesRef";

//如此我们的代码就可以用useValueRef进一步改写，删除第一个useEffect：

export default function Timer() {
  const [count, setCount] = useState(10);

  const latestCount = useValuesRef(count); // useValuesRef

  const otherFn = () => {
    console.log("otherFn");
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (latestCount.current === 0) {
        clearInterval(timer);
        return;
      }
      setCount((c) => c - 1);
    }, 1000);

    otherFn();

    return () => {
      clearInterval(timer);
    };
  }, []);

  return <div className="App">{count}</div>;
}

//我们回到之前使用两个useEffect的代码再次思考，可不可以在一个useEffect里 定义定时器，另一个useEffect里 处理逻辑 呢？
