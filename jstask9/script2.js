var input = document.querySelector('#int')
var filt = document.querySelector('select')
var ratefilter = false

if(sessionStorage.getItem('delitems') === null) {
    sessionStorage.setItem('delitems',JSON.stringify([]))
}
var delitems = JSON.parse(sessionStorage.getItem('delitems'));

function GetProducts() {
    let value = input.value
    let fValue = filt.value.toLowerCase()
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => {
            let newdeldata;
            let new0data;
            let newdata;

            if(delitems.length == 0){
                newdeldata=data
            }else{
                newdeldata = data.filter(x=> !delitems.includes(x.id.toString()))
            }

            if (fValue=='all'){
                new0data=newdeldata
            }else{
                new0data = newdeldata.filter(x => x.category.includes(fValue))
            }

            if (!value.length) {
                newdata = new0data
            } else {
                newdata = new0data.filter(x => x.title.toLowerCase().includes(value.toLowerCase()))
            }

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
                        <i onclick="Delete(this)" id="del" class="fa-solid fa-trash"></i>
                        <p class="d-none">${element.id}</p>
                        <p class="rated d-none">${element.rating.rate}</p>
                    </div>
                    </div>
                    </div>`
            })
            let err = document.getElementById('err')
            
            if (newdata.length === 0) {

                err.classList.add('d-block')
            } else {
                // let err = document.getElementById('err')
                err.classList.remove('d-block')
            }
            document.getElementById('products').innerHTML = html
            if(ratefilter == true){
                var rated = document.querySelectorAll('.rated')
                rated.forEach(function(x){
                    if(Number(x.innerHTML)>4){
                        x.previousElementSibling.previousElementSibling.previousElementSibling.classList.toggle('active2')
                    }
                })
            }
        })
}
GetProducts()


input.addEventListener('keyup', async () => {
    var value = input.value
    GetProducts()
})
filt.addEventListener('change',async ()=>{
    var flValue = filt.value.toLowerCase()
    GetProducts()

})

var Delete = function(x) {
    console.log(x.nextElementSibling.innerHTML);
    delitems.push(x.nextElementSibling.innerHTML);
    sessionStorage.setItem('delitems',JSON.stringify(delitems));
    console.log(delitems);
    GetProducts()


}

var btnfl = document.getElementById('filter')
btnfl.addEventListener('click',function(){
    this.classList.toggle('active')
    if(ratefilter == false){
        ratefilter = true
    }else{
        ratefilter = false
    }
    GetProducts()
})

