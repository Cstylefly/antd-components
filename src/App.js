/** @format */
/** @format */
import React, { useEffect, useState, useRef } from 'react';

import { ProCard, ProForm, ProFormItem, ProFormText } from '@ant-design/pro-components';

import { StrikethroughOutlined } from '@ant-design/icons';
import { Form } from 'antd';

// 引入编辑器组件
import BraftEditor from 'braft-editor';

// import Table from 'braft-extensions/dist/table';
// 引入编辑器样式
import 'braft-editor/dist/index.css';

import './editor.css';
import RichTextEditor from './RichTextEditor';
// import 'braft-extensions/dist/table.css';

// BraftEditor.use(
//   Table({
//     defaultColumns: 1,
//     defaultRows: 1,
//     withDropdown: true,
//     columnResizable: true,
//     exportAttrString: '表格'
//   })
// );

const EditorDemo = props => {
  const submitContent = value => {
    // 在编辑器获得焦点时按下ctrl+s会执行此方法
    // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
    // const htmlContent = editorState.toHTML();
    // const result = await saveEditorContent(htmlContent);
    // console.log(editorState.toHTML());
    console.log(value.announceContent.toHTML());
  };

  return (
    <ProCard title="新建公告" headerBordered>
      <ProForm layout="horizontal" onFinish={submitContent}>
        <ProFormText name="announceNm" label="公告名称" rules={[{ required: true, message: '请输入公告名称' }]} />
        <ProFormText name="announceAbs" label="公告摘要" rules={[{ required: true, message: '请输入公告摘要' }]} />
        <ProFormItem label="公告内容" name="announceContent" rules={[{ required: true, message: '请输入公告摘要' }]}>
          <RichTextEditor
            onSave={editorState => {
              console.log(editorState.toHTML());
            }}
          />
        </ProFormItem>
      </ProForm>
    </ProCard>
  );
};

export default EditorDemo;
