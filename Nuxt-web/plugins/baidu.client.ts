export default defineNuxtPlugin(() => {
  const hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?9edadaa49ae4e9c979c6724865c04b05";
  const s = document.getElementsByTagName("script")[0];
  s.parentNode?.insertBefore(hm, s);
})
