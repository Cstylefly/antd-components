/** @format */

import React from 'react';
import { Button } from 'antd';

function App() {
  const a = 'jaaad';

  const quotePropsDemo = {
    a: 1,
    'b-2': 2,
    c: 3
  };

  const name = x => {
    if (true) {
      console.log(a);
    }
    console.log('dasfsa');
  };

  const j = 1;

  const handleClick = () => 'a';

  return (
    <>
      <Button
        className={'das'}
        onClick={() => {}}
        id={'jak'}
      >
        测试button
      </Button>
    </>
  );
}

export default App;
