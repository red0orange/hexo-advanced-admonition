
var data = {
    content: "``` ad-info\ntitle: 测试标题\ncontent\n```"
};

function test(data) {
    let strData;
    let strRegExp = /(\s*)(```) *ad-(note|info|todo|warning|attention|caution|failure|missing|fail|error) *\n?(.*?)\n([\s\S]+?)\s*(\2)(\n+|$)/g

    if (strRegExp.test(data.content)) {
            strData = data.content.replace(strRegExp, function (raw, start, startQuote, type, title, content, endQuote, end) {
                if (title.startsWith("title: ")) {
                    title = title.slice("title: ".length);
                }
                console.log(title);
                console.log(content);
                console.log(type);
                return content;
            });
        data.content = strData;
    }

    return data.content;
}

let result = test(data);
// console.log(result);