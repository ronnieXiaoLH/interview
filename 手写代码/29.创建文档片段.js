const ul = document.createElement('ul')
const fragment = document.createDocumentFragment()
for (let i = 0; i < 100; i++) {
  const li = document.createElement('li')
  li.innerHTML = `index: ${i}`
  // 正序插入
  // fragment.appendChild(li)
  // 倒序插入
  fragment.insertBefore(li, fragment.childNodes[0])
}
ul.appendChild(fragment)