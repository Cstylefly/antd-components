module.exports = {
    extends:[
        "stylelint-config-standard",
        "stylelint-config-prettier" // 关闭所有不必要或可能与Prettier冲突的规则
    ],
    plugins:['stylelint-order'],
    rules:{
        // 'comment-no-empty':true,
        // 'block-no-empty':true,
        // 'color-named':'never',
        // //为插件stylelint-order提供选项 --- 此处相当于css中必须把display属性放置在margin前
        // 'order/properties-order':[
        //     'display',
        //     'margin'
        // ]
        'function-url-quotes': 'always',
        'selector-attribute-quotes': 'always',
        'unit-no-unknown':true,
        'value-keyword-case':'lower'
    },
    overrides:[
        // 若项目中存在scss文件，添加以下配置
        {
            files: '**/*.scss',
            customSyntax: 'postcss-scss'
        },
        // 若项目中存在less文件，添加以下配置
        {
            files: '**/*.less',
            customSyntax: 'postcss-less'
        }
    ],
    ignoreFiles:[]
}