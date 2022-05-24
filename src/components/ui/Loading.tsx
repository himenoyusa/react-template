import React from 'react';

/**
 * 组件加载 pending
 */
const Loading = () => {
  const [lazy, setLazy] = React.useState(false);

  // 加载时间超过0.3秒再显示
  React.useEffect(() => {
    window.setTimeout(() => {
      setLazy(true);
    }, 300);
  }, []);

  return (
    <div className="text-center pt-2 w-full">
      {lazy && <button className="btn btn-ghost btn-lg loading">加载中...</button>}
    </div>
  );
};

export default Loading;
