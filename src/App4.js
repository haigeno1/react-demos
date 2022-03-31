import React, { useEffect, useState } from "react";
import { useInterval } from "./hooks/useInterval";

const Timer = () => {
  const [count, setCount] = useState(10);
  const otherFn = () => {
    console.log("otherFn");
  };

  //往userInterval传入两个参数
  useInterval(
    () => {
      setCount(count - 1); // 每次渲染都会走这里，所以count值为最新
    },
    count === 0 ? null : 1000
  );

  useEffect(() => {
    otherFn();
  }, []);

  return <div className="App">{count}</div>;
};

export default Timer;

//这样我们还可以实现更多功能，比如增加一个按钮实现定时器暂停和重置等等，童鞋们可以自己试一下。这种方式可以说一劳永逸，后面其他组件可以直接使用，方便快捷。
