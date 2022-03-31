import React, { useEffect, useState, useRef } from "react";
import "./styles.css";

//React官方给出了三种解决思路：

//1. 使用函数式更新count
//setCount(c => c - 1)
//这种类似于this.setState(() => {})的写法可以在函数内部获取到最新的count.
//但是函数外面的定时器里的count仍然是10，无法通过判断count的值进行if (count === 0) {clearInterval(timer) return }这样的逻辑处理，所以这种方案pass。

//2. useReducer Hook 把 state 更新逻辑移到 effect 之外
// 参考 https://adamrackis.dev/state-and-use-reducer/
// 对于我们这种简单的逻辑，书写大量的模板代码有点杀鸡用牛刀了，所以这种方法也不是很推荐，在此不做赘述。

//3. 使用ref保存变量
// useRef 返回一个 可变的 ref 对象，我们将count的最新值保存到ref的current属性里，结合 第一条思路 修改代码如下：

export default function Timer() {
  const [count, setCount] = useState(10);
  const latestCount = useRef(count); // 定义一个ref，初始值是10

  const otherFn = () => {
    console.log("otherFn");
  };

  useEffect(() => {
    latestCount.current = count; // 更新
  });

  useEffect(() => {
    const timer = setInterval(() => {
      if (latestCount.current === 0) {
        // 此处判断latestCount.current，而不是count
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

//这里用到了 两个 useEffect，在第一个useEffect里我们将latestCount.current的值指向count，类似于class组件中的this.count，而在另一个useEffect里我们处理其他的逻辑，这样就可以实现我们的需求啦。
//我们知道hook其实是一个js函数，那么我们是不是可以将第一个useEffect提取出来，自定义一个hook呢？
