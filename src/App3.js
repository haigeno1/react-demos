import { useEffect, useState, useRef } from "react";

export default function Timer() {
  const [count, setCount] = useState(10);
  const timer = useRef(null);

  const otherFn = () => {
    console.log("otherFn");
  };

  useEffect(() => {
    otherFn();
    timer.current = setInterval(() => {
      setCount((c) => c - 1);
    }, 1000);
    return () => {
      clearInterval(timer.current);
    };
  }, []);

  useEffect(() => {
    if (count === 0) {
      clearInterval(timer.current); // 这里可以成功清除定时器
      return;
    }
  }, [count]);

  return <div className="App">剩余{count}秒</div>;
}

//我们同样可以尝试将 第二个useEffect挪出去，使组件里只有一个useEffect，这就需要 一种 全新的思路：
