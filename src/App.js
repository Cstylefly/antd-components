/**
 * @format
 * @auto tangcong
 * @date 2023/05/28
 */

import React from 'react';
import { Button } from 'antd';

function App() {
  return (
    <>
      <Button
        type={'primary'}
        onClick={() => {
          console.log('button');
        }}
      >
        测试button
      </Button>
    </>
  );
}

export default App;
