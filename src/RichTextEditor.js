/**
 * @format
 * @description 富文本编辑器
 * @author tangcong
 * @date 2023/05/31
 */

import React, { useRef, useState } from 'react';
import BraftEditor, { EditorState, ControlType, ExtendControlType } from 'braft-editor';
import { useMount } from 'ahooks';
import { StrikethroughOutlined } from '@ant-design/icons';

// export type RichTextEditorProps = {
//   controls?:EditorState[],
//   //工具栏指定不需要配置项
//   excludeControls?:EditorState[],
//   //内容区样式
//   contentStyle?:React.CSSProperties,
//   //自定义控件
//   extendControls?:ExtendControlType[], //支持button、dropdown、modal和component四种类型
//   placeholder?:string
// }

const RichTextEditor = props => {
  // 默认工具栏配置（可不设置、输出的是原本的设置）
  const defaultControls = [
    'undo', // 撤销
    'redo', // 重做
    // 自定义工具栏样式{key:string,title:string,text:React.ReactNode}
    {
      key: 'clear',
      title: '清空内容',
      text: '清空'
    },
    'separator', // 分割线
    'font-family', // 字体
    'headings', // 标题
    'font-size', // 字号
    'separator',
    'bold', // 加粗
    'italic', // 斜体
    'underline', // 下划线
    {
      key: 'strike-through',
      title: '删除线',
      text: <StrikethroughOutlined />
    },
    'separator',
    'text-color', // 文字颜色&文字背景色
    'separator',
    'text-indent', // 缩进
    'text-align', // 文字对齐
    'list-ul', // 无序列表
    'list-ol', // 有序列表
    'separator',
    'superscript', // 上标
    'subscript', // 下标
    'remove-styles', // 清楚样式
    'blockquote', // 引用
    'code', // 代码快
    'hr', // 水平线
    'separator',
    'emoji', // 表情
    'media', // 媒体资源
    'link', // 链接
    'separator',
    'fullscreen' // 全屏
  ];
  // 编辑器内容
  const [editorState, setEditorState] = useState();
  const editorRef = useRef(null);

  // 工具栏
  const [controls] = useState(defaultControls);

  // 初始化editorState
  useMount(() => {
    setEditorState(BraftEditor.createEditorState(null));
  });

  const handleEditorChange = editorState => {
    console.log(editorState);
    editorRef.current = editorState;
    setEditorState(editorState);
  };

  const onSave = () => {
    props?.onSave && props.onSave(editorState);
  };

  // 自定义上传媒体文件的方法
  const handleUploadFn = params => {
    console.log(params, '---params---');
  };

  // 自定义上传文件的校验方法
  const handleValidateFn = async file => {
    if (props?.validateMediaFn) {
      return props?.validateMediaFn(file);
    }
    return true;
  };

  const preview = () => {
    // const htmll = buildPreViewHtml()
    if (window.previewWindow) {
      window.previewWindow.close();
    }

    window.previewWindow = window.open();
    window.previewWindow.document.write(buildPreViewHtml());
    window.previewWindow.document.close();
  };

  const [preViewExtendControls] = useState([
    {
      key: 'custom-button',
      type: 'button',
      text: '预览',
      onClick: preview
    }
  ]);

  const buildPreViewHtml = () => {
    console.log(editorState?.toHTML());

    return `
      <!Doctype html>
      <html>
        <head>
          <title>Preview Content</title>
          <style>
            html,body{
              height: 100%;
              margin: 0;
              padding: 0;
              overflow: auto;
              background-color: #f1f2f3;
            }
            .container{
              box-sizing: border-box;
              width: 1000px;
              max-width: 100%;
              min-height: 100%;
              margin: 0 auto;
              padding: 30px 20px;
              overflow: hidden;
              background-color: #fff;
              border-right: solid 1px #eee;
              border-left: solid 1px #eee;
            }
            .container img,
            .container audio,
            .container video{
              max-width: 100%;
              height: auto;
            }
            .container p{
              white-space: pre-wrap;
              min-height: 1em;
            }
            .container pre{
              padding: 15px;
              background-color: #f1f1f1;
              border-radius: 5px;
            }
            .container blockquote{
              margin: 0;
              padding: 15px;
              background-color: #f1f1f1;
              border-left: 3px solid #d1d1d1;
            }
          </style>
        </head>
        <body>
          <div class="container">${editorRef.current?.toHTML()}</div>
        </body>
      </html>
    `;
  };

  return (
    // @ts-ignore
    <BraftEditor
      value={editorState}
      defaultValue={props?.defaultValue}
      readOnly={props?.readOnly}
      onChange={handleEditorChange}
      placeholder={props?.placeholder ?? '请输入'}
      contentStyle={props?.contentStyle ?? { minHeight: 400 }}
      controls={props?.controls ?? controls}
      excludeControls={props?.excludeControls}
      extendControls={preViewExtendControls}
      onSave={onSave}
      media={{
        // 上传功能（编辑器本身不带上传功能，需要通过uploadFn实现）
        // uploadFn: handleUploadFn,
        validateFn: handleValidateFn,
        accepts: {
          image: 'image/png,image/jpeg,image/gif,image/webp,image/apng,image/svg',
          video: 'video/mp4,video/webm,video/ogg', // 默认只支持 video/mp4格式
          audio: 'audio/mp3,audio/ogg,audio/mpeg' // 默认只支持 audio/mp3格式
        }
      }}
      hooks={{ ...props.hookFn }}
    />
  );
};

export default React.memo(RichTextEditor);
