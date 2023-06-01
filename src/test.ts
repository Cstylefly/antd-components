/**
 * @description 富文本编辑器
 * @author tangcong
 * @date 2023/05/31
 */
import React, {useEffect, useMemo, useRef, useState} from 'react'
import BraftEditor, {
  EditorState,
  ControlType,
  ExtendControlType,
  ImageControlType,
  HooksType
} from 'braft-editor'
// @ts-ignore
// 官方没提供 @types/braft-utils
import { ContentUtils } from 'braft-utils'
import { useMount } from "ahooks";
import { Button, Tooltip, Upload } from "antd";
import { PictureOutlined, StrikethroughOutlined } from "@ant-design/icons";
import 'braft-editor/dist/index.css'
import './editor.less'

export type RichTextEditorProps = {
  //默认值
  value?:EditorState,
  //额外添加的工具栏功能
  extraControls?: EditorState[],
  //工具栏指定不需要配置项
  excludeControls?: EditorState[],
  //内容区样式
  contentStyle?: React.CSSProperties,
  //自定义控件（组件自带了一个预览功能showPreview）
  extendControls?: ExtendControlType[], //支持button、dropdown、modal和component四种类型
  placeholder?: string | any,
  //ctrl+s 触发
  onEditorSave?: (editorState:EditorState) => void;
  readonly?:boolean,
  imageControls?:ImageControlType[],
  //校验从本地选择的媒体文件
  validateMediaFn?:(file:File) => boolean,
  //工具栏各种功能触发时提供的方法（见https://www.yuque.com/braft-editor/be/gz44tn#gug9gs）
  hookFn?:HooksType,
  onChange?:(editorState:EditorState) => void;
  showImgLoad:boolean
}

const RichTextEditor:React.FC<RichTextEditorProps> = (props) => {
  //编辑器内容
  const [editorState,setEditorState] = useState<EditorState>()
  //记录值
  const editorRef = useRef<EditorState>(null)

  //上传图片的组件
  const EditorUploadImage = useMemo(() => {
    return (
      <Upload
        accept={'image/*'}
        showUploadList={false}
        customRequest={(params) => {
          if(params?.file){
            setEditorState(ContentUtils.insertMedias(editorRef.current,[{
              type:'IMAGE',
              url:URL.createObjectURL(params.file as any)
            }]))
          }
        }}
      >
        <Tooltip title={'图片'} placement={'bottom'}>
          <Button icon={<PictureOutlined />} type={"link"} size={'small'} style={{color:'#6a6f7b'}}/>
        </Tooltip>
      </Upload>
    )
  },[])

  //默认工具栏配置（可不设置、输出的是原本的设置）
  const [defaultControls,setDefaultControls] = useState<ControlType[]>([
    'undo',//撤销
    'redo',//重做
    //自定义工具栏样式{key:string,title:string,text:React.ReactNode}
    {
      key: 'clear',
      title: '清空内容',
      text: '清空'
    },
    'separator',//分割线
    // 'font-family',//字体
    'headings',//标题
    'font-size',//字号
    'separator',
    'bold',//加粗
    'italic',//斜体
    'underline',//下划线
    {
      key: 'strike-through',
      title: '删除线',
      text: <StrikethroughOutlined />
    },
    'separator',
    'text-color',//文字颜色&文字背景色
    'separator',
    'text-indent',//缩进
    'text-align',//文字对齐
    'list-ul',//无序列表
    'list-ol',//有序列表
    'separator',
    'superscript',//上标
    'subscript',//下标
    'remove-styles',//清楚样式
    'blockquote',//引用
    'code',//代码快
    'hr',//水平线
    'separator',
    'emoji',//表情
    // 自定义一个图片上传功能
    // @ts-ignore
    props?.showImgLoad ? {
      key:'image-upload',
      type:'component',
      component:EditorUploadImage
     } : '',
    'link',//链接
    'separator',
    'separator',
    'fullscreen'//全屏
  ])

  //初始化editorState
  useMount(() => {
    setEditorState(BraftEditor.createEditorState(props?.value))
    editorRef.current = BraftEditor.createEditorState(props?.value)
  })

  useEffect(() => {
    //设置最新的工具栏
    if((props?.extraControls || []).length){
      setDefaultControls([...defaultControls,...(props?.extraControls || [])])
    }
  },[props?.extraControls])

  const handleEditorChange = (editorState:EditorState) => {
    editorRef.current = editorState //记录editor供预览组件使用，否则拿不到最新的值
    props?.onChange && props?.onChange(editorState)
    setEditorState(editorState)
  }

  return (
    // @ts-ignore
    <BraftEditor
      value={editorState}
      placeholder={props?.placeholder ?? '请输入'}
      contentStyle={props?.contentStyle ?? {minHeight:200}}
      readOnly={props?.readonly}
      controls={defaultControls}
      excludeControls={props?.excludeControls}
      extendControls={props?.extendControls}
      // media={{
      //   //上传功能（编辑器本身不带上传功能，需要通过uploadFn实现）
      //   uploadFn:handleUploadFn,
      //   validateFn:handleValidateFn,
      //   //支持的MIME类型
      //   accepts:{
      //     image: 'image/png,image/jpeg,image/gif,image/webp,image/apng,image/svg'
      //   }
      // }}
      hooks={{...props.hookFn}}
      imageControls={props?.imageControls}
      onChange={handleEditorChange}
      onSave={() => {
        props?.onEditorSave && props.onEditorSave(editorState)
      }}
    />
  )
}

export default React.memo(RichTextEditor)



/**
* @author tangcong
* @date 2023/06/01
*/
import React from 'react'
import { ProFormItem , ProFormInstance, ProFormItemProps } from "@ant-design/pro-form";
import { ColProps, FormItemProps, RowProps } from "antd";
import RichTextEditor, { RichTextEditorProps } from "@/components/RichTextEditor/RichTextEditor";

type ExtendsProps = {
  secondary?: boolean;
  allowClear?: boolean;
  bordered?: boolean;
  colSize?: number;
  params?: ((form: ProFormInstance) => Record<string, any>) | Record<string, any>;
  ignoreFormItem?: boolean;
  readonly?: boolean;
  convertValue?: any;
  formItemProps?: FormItemProps;
  filedConfig?: any;
  fieldRef?: any;
};

type ProFormGridConfig = {
  grid?: boolean;
  colProps?: ColProps;
  rowProps?: RowProps;
}

type ProFormFieldItemProps = {
  fieldProps?:{
    style?: React.CSSProperties;
    width?: string;
    ref?: React.Ref<any>;
  };
  placeholder?: string | string[];
  secondary?: boolean;
  cacheForSwr?: boolean;
  disabled?: boolean;
  width?: number | 'sm' | 'md' | 'xl' | 'xs' | 'lg';
  proFieldProps?:{
    light?: boolean;
    emptyText?: React.ReactNode;
    label?: React.ReactNode;
    mode?: 'read' | 'edit';
    proFieldKey?: string;
    render?: any;
    readonly?: boolean;
  };
  footerRender?: ((
    onConfirm?: (e?: React.MouseEvent) => void,
    onClear?: (e?: React.MouseEvent) => void) => JSX.Element | false) | false;
  children?: React.ReactNode;
}

export type ProFormRichTextEditorProps = {
  richTextEditorProps:RichTextEditorProps
} & ProFormFieldItemProps
  & Omit<ProFormItemProps, 'valueType'>
  & Pick<ProFormGridConfig, 'colProps'>
  & ExtendsProps;

//将RichTextEditor设置成表单项
const ProFormRichTextEditor:React.FC<ProFormRichTextEditorProps> = (props) => {
  const {richTextEditorProps,...formProps} = props
  return (
    <ProFormItem {...formProps}>
      <RichTextEditor {...richTextEditorProps} {...formProps}/>
    </ProFormItem>
  )
}

export default React.memo(ProFormRichTextEditor)


.bf-container{
  border: 1px solid rgba(0,0,0,.1);
  border-radius: 2px;
}
.bf-controlbar{
  box-shadow: inset 0 -1px 0 0 rgba(0,0,0,.1);
  .component-wrapper{
    display: flex;
    flex-direction: column;
    justify-content: center;
    float: left;
    height: 36px;
    margin: 5px 0 5px 3px;
    border-radius: 2px;
    cursor: pointer;
  }
}
.bf-editor-antd-btn{
  color: #86909C;
}
bf-editor-antd-btn:hover{
  color: #86909C;
}