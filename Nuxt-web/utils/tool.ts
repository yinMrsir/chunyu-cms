import {ElMessage} from "element-plus";

export function escapeHtml(str: string) {
  let temp = "";
  if(str.length === 0) return "";
  temp = str.replace(/&amp;/g,"&");
  temp = temp.replace(/&lt;/g,"<");
  temp = temp.replace(/&gt;/g,">");
  temp = temp.replace(/&nbsp;/g," ");
  temp = temp.replace(/&#39;/g,"\'");
  temp = temp.replace(/&quot;/g,"\"");
  return temp;
}

export function isArray(str: unknown) {
  return Object.prototype.toString.call(str) === '[object Array]'
}