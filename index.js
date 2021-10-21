'use strict';

var md = require('@upupming/hexo-renderer-markdown-it-plus/node_modules/markdown-it')();
md.use(require('@neilsustc/markdown-it-katex'));
md.use(require('markdown-it-deflist'));
md.use(require('markdown-it-emoji'));
md.use(require('markdown-it-footnote'));
md.use(require('markdown-it-mark'));
md.use(require('markdown-it-sub'));
md.use(require('markdown-it-toc'));

const path = require('path')
const fs = require('hexo-fs')
const STYLE_PATH = path.resolve(__dirname, './style.css')

hexo.extend.filter.register('before_post_render', function (data) {
  const style_content = fs.readFileSync(STYLE_PATH).toString()

  let strData;
  let strRegExp = /(\s*)(```) *ad-(note|info|todo|warning|attention|caution|failure|missing|fail|error) *\n?(.*?)\n([\s\S]+?)\s*(\2)(\n+|$)/g

  if (strRegExp.test(data.content)) {
    strData = data.content.replace(strRegExp, function (raw, start, startQuote, type, title, content, endQuote, end) {
      if (title.startsWith("title: ")) {
          title = title.slice("title: ".length);
      }
      let result = '\n\n<style>' + style_content + '</style>\n\n' +  
              '<div class="admonition ' + type.toLowerCase() + '"><p class="admonition-title">' + title + '</p>' + md.render(content) + '</div>\n\n';
      return result;
    });
    data.content = strData;
  }
  return data;
}, 9);
