const a = document.getElementsByTagName('a')[0]

document.cookie = 'name=zhangsan';
const quertObj = {}
const search = window.location.search
search.replace(/([^&=?]+)=([^&]+)/g, (_, $1, $2) => {
  quertObj[$1] = decodeURIComponent($2)
})

// a.href = quertObj.redirectUrl

// var script = document.createElement('script');
// script.async = true;
// script.src = 'remote.js';
// var s = document.getElementsByTagName('script')[0];
// s.parentNode.insertBefore(script, s);

document.write(quertObj.name)
// ?name=<script>window.alert(1)</script>