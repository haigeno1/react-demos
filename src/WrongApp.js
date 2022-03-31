import { useEffect, useState } from "react";
import "./styles.css";

export default function Wrong() {
  const [count, setCount] = useState(10);

  const otherFn = () => {
    console.log("otherFn");
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (count === 0) {
        clearInterval(timer);
        return;
      }
      console.log("count", count);
      setCount(count - 1);
    }, 1000);
    otherFn(); // 只需要调用一次的方法
    return () => {
      console.log("clean");
      clearInterval(timer);
    };
  }, []); // 避免otherFn多次运行，传入空数组

  return <div className="App">剩余{count}秒</div>;
}

// 运行后会发现count从10变成9之后就不再减一，从控制台打印的count看到，定时器其实一直在运行，只是count的值一直是10。
// 这是因为我们给useEffect的第二个参数传入了一个空数组，所以此hook只在组件挂载时运行一次，不会依赖count的变化再次运行。而函数组件每次渲染都会生成一个单独的版本（一个闭包），每个版本都有自己的count，Timer组件在首次的版本中count的值是10，不管定时器的delay时间是多久，它拿到的count永远是10。
// 将count写入依赖useEffect(() => {}, [count])似乎可以实现，事实也确实可以，但这样会导致定时器被频繁重置，如此setInterval就类似于setTimeout了。
// 而且我们只需要调用一次的方法otherFn也会被频繁调用。所以这种方法是不可取的。
