/**
 * @format
 *
 * */

import React, { useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // 配合用户传入的theme来切换主题
import quillEmoji from 'quill-emoji';
import 'quill-emoji/dist/quill-emoji.css';

function App() {
  const [value, setValue] = useState('');
  const { EmojiBlot, ShortNameEmoji, ToolbarEmoji, TextAreaEmoji } = quillEmoji;

  const fonts = ['SimSun', 'SimHei', 'Microsoft-YaHei', 'KaiTi', 'FangSong', 'Arial', 'Times-New-Roman', 'sans-serif'];

  const Font = Quill.import('formats/font');
  Font.whitelist = fonts;
  Quill.register(
    {
      Font,
      'formats/emoji': EmojiBlot, // 'formats/video': VideoBlot,
      'modules/emoji-shortname': ShortNameEmoji,
      'modules/emoji-toolbar': ToolbarEmoji,
      'modules/emoji-textarea': TextAreaEmoji
      // 'modules/ImageExtend': ImageExtend, //拖拽图片扩展组件
      // 'modules/ImageDrop': ImageDrop // 复制粘贴组件
    },
    true
  );
  const modules = {
    toolbar: [
      [{ font: [] }], // 显示字体选择
      [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
      ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
      [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
      [{ align: [] }, { list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image', 'video', 'formula'], // 链接、图片、视频
      [{ size: [] }],
      ['clean'],
      ['emoji']
    ]
  };
  return <ReactQuill theme="snow" modules={modules} value={value} onChange={setValue} placeholder={'请输入文章内容'} />;
}

export default App;
