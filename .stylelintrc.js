module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-prettier', // 关闭所有不必要或可能与Prettier冲突的规则
  ],
  plugins: ['stylelint-order'],
  rules: {
    // 'comment-no-empty':true,
    // 'block-no-empty':true,
    // 'color-named':'never',
    // //为插件stylelint-order提供选项 --- 此处相当于css中必须把display属性放置在margin前
    // 'order/properties-order':[
    //     'display',
    //     'margin'
    // ]
    'unit-no-unknown': true,
    'selector-id-pattern':'^([a-z][a-z0-9]*)([-|_][a-z0-9]+)*$' // 修改了stylelint-config-standard中id只可匹配短横线（可匹配短横线或者下划线）
  },
  overrides: [
    // 若项目中存在scss文件，添加以下配置
    {
      files: '**/*.scss',
      customSyntax: 'postcss-scss',
    },
    // 若项目中存在less文件，添加以下配置
    {
      files: '**/*.less',
      customSyntax: 'postcss-less',
    },
  ],
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx'],
};
