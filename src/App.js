/**
 * @format
 * @auto tangcong
 * @date 2023/05/28
 */

import React, { useEffect, useState } from 'react';
import { Button } from 'antd';

function App() {
  const [domRoot, setDomRoot] = useState(null);

  useEffect(() => {
    setDomRoot(document.getElementById('root-div'));
    console.log('测试');
  }, []);

  const fetchData = () => {
    return new Promise(resolve => {
      const res = {
        code: 200,
        msg: 'success',
        data: []
      };
      for (let i = 0; i < 100000; i++) {
        res.data.push(`content-${i + 1}`);
      }
      setTimeout(() => {
        resolve(res);
      }, 1000);
    });
  };

  return (
    <>
      <div id={'root-div'}></div>
      <Button
        type={'primary'}
        onClick={() => {
          fetchData().then(res => {
            res.data.forEach(item => {
              const olItem = document.createElement('li');
              olItem.innerText = item;
              domRoot.appendChild(olItem);
            });
          });
        }}
      >
        测试button
      </Button>
    </>
  );
}

export default App;
