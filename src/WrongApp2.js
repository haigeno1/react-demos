import { useEffect, useState } from "react";

export default function Wrong() {
  const [count, setCount] = useState(10);

  const otherFn = () => {
    console.log("otherFn");
  };

  let timer;

  //定义定时器
  useEffect(() => {
    otherFn();
    timer = setInterval(() => {
      setCount((c) => c - 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  //处理逻辑
  useEffect(() => {
    if (count === 0) {
      clearInterval(timer); // 此处可以清除定时器吗？
      return;
    }
  }, [count]);

  return <div className="App">剩余{count}秒</div>;
}

//上述代码犯了和开头代码同样的错误，函数组件每次渲染都会产生一个新的timer，所以在第二个useEffect里并不能清除第一次渲染时设置的定时器。解决方案同样是使用ref：
