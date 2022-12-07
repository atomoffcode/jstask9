function GetProducts(){
    fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(data=>{
                let html = ''
                data.map(element => {
                    html += `
                    <div class="col-lg-3">
                    <div class="card">
                    <div class="ig">
                    <img src=${element.image} class="card-img-top" alt="...">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${element.title.slice(0,20)}</h5>
                        <p class="card-text">${element.description.slice(0,90)}...</p>
                        <span class="price">${element.price} AZN</span>
                    </div>
                    </div>
                    </div>`

                });
                document.getElementById('products').innerHTML = html
            })
        


}
GetProducts()

var input = document.querySelector('#int')

input.addEventListener('keyup',async ()=>{
    let value = input.value
    fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(data=>{
                let newdata = data.filter(x=>x.title.toLowerCase().includes(value.toLowerCase()))
                console.log(newdata);
                let html = ''
                newdata.map(element => {
                    html += `
                    <div class="col-lg-3">
                    <div class="card">
                    <div class="ig">
                    <img src=${element.image} class="card-img-top" alt="...">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${element.title.slice(0,20)}</h5>
                        <p class="card-text">${element.description.slice(0,90)}...</p>
                        <span class="price">${element.price} AZN</span>
                    </div>
                    </div>
                    </div>`
                })
                let err = document.getElementById('err')
                if(newdata.length===0){
                    
                    err.classList.add('d-block')
                }
                else{
                    // let err = document.getElementById('err')
                    err.classList.remove('d-block')
                }
                document.getElementById('products').innerHTML = html
            })
})

var filt = document.querySelector('select')
var filValue = null

filt.addEventListener('change',function FilterProd(){
    filValue=filt.value.toLowerCase()
    if(filValue==null || filValue=='all'){
        fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(data=>{data})
    }
    fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(data=>{
                let newdata = data.filter(x=>x.title.toLowerCase().includes(value.toLowerCase()))
                console.log(newdata);
                let html = ''
                newdata.map(element => {
                    html += `
                    <div class="col-lg-3">
                    <div class="card">
                    <div class="ig">
                    <img src=${element.image} class="card-img-top" alt="...">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${element.title.slice(0,20)}</h5>
                        <p class="card-text">${element.description.slice(0,90)}...</p>
                        <span class="price">${element.price} AZN</span>
                    </div>
                    </div>
                    </div>`
                })
            })

})