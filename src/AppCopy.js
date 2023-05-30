/** @format */

import React, { useEffect, useState } from 'react';
import { Button } from 'antd';

function App() {
  const [domRoot, setDomRoot] = useState(null);

  useEffect(() => {
    setDomRoot(document.getElementById('root-div'));
  }, []);

  const fetchData = () => {
    return new Promise(resolve => {
      const res = {
        code: 200,
        msg: 'success',
        data: []
      };
      for (let i = 0; i < 400000; i++) {
        res.data.push(`content-${i + 1}`);
      }
      setTimeout(() => {
        resolve(res);
      }, 100);
    });
  };

  // 模拟时间分片
  const renderData = (data, total, page, pageCount) => {
    if (total <= 0) return;
    pageCount = Math.min(pageCount, total);
    // setTimeout(() => {
    //   const startIdx = page * pageCount;
    //   const endIdx = startIdx + pageCount;
    //   const data_list = data.slice(startIdx, endIdx);
    //   for (let i = 0; i < pageCount; i++) {
    //     const olItem = document.createElement('ol');
    //     olItem.innerText = data_list[i];
    //     domRoot.appendChild(olItem);
    //   }
    //   renderData(data, total - pageCount, page + 1, pageCount);
    // }, 0);
    requestAnimationFrame(() => {
      const startIdx = page * pageCount;
      const endIdx = startIdx + pageCount;
      const data_list = data.slice(startIdx, endIdx);
      for (let i = 0; i < pageCount; i++) {
        const olItem = document.createElement('ol');
        olItem.innerText = data_list[i];
        domRoot.appendChild(olItem);
      }
      renderData(data, total - pageCount, page + 1, pageCount);
    });
  };

  return (
    <>
      <div id={'root-div'}></div>
      <Button
        type={'primary'}
        onClick={() => {
          fetchData().then(res => {
            renderData(res.data, res.data.length, 0, 200); // 数据量越大越有效果
            // res.data.forEach(item => {
            //   const olItem = document.createElement('ol');
            //   olItem.innerText = item;
            //   domRoot.appendChild(olItem);
            // });
          });
        }}
      >
        测试button
      </Button>
    </>
  );
}

export default App;
