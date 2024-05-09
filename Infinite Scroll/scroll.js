document.addEventListener("DOMContentLoaded", () => {
  const get = (target) => {
    return document.querySelector(target);
  };

  let page = 1;
  let total = 10;
  const end = 10;
  let loading = false;
  let loaded = get('.loading')
  let container = get('.container')

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry=>{
        if(entry.isIntersecting && !loading){
            loading = true
            datapull()
        }
    })
  }, {rootMargin: "0px", threshold: 0.1})

  observer.observe(loaded)

  async function datapull(){
    try {
        const api = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${total}`)
        const response = await api.json()
        renderdata(response)
        
        page++
        loading = false;
        if(page <= end){
            container.appendChild(loaded)
        }else{
            observer.disconnect()
            loaded.style.display = 'none';
        }
    } catch (error) {
        console.log('error')
        loading = false;
    }
  }

  function renderdata(response){
    response.forEach((item) => {
        let itemBox = document.createElement('div')
        itemBox.classList.add('item')
        itemBox.innerHTML = 
        `<div class="header">
            <div class="id">${item.id}</div>    
            <div class="title">${item.title}</div>    
        </div>
        <div class="body">
            <div class="contents">${item.body}</div>
        </div>`;
        container.appendChild(itemBox)
    });
  }

});
