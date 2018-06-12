const list=document.querySelector('#stockTable');


//filter Books
const searchBar=document.forms['search-stocks'].querySelector('input');

searchBar.addEventListener('keyup',function(e){

    var myList = document.getElementById("stockTable").childNodes.length;
    console.log(myList);

    const term=e.target.value.toLowerCase();
    const stocks=list.getElementsByTagName('li');
    Array.from(stocks).forEach(function(stock){
        const title=stock.firstElementChild.textContent;
        if(title.toLowerCase().indexOf(term)!=-1){
            stock.style.display='block';
        } else {
        //stock.style.display = 'none';
        }
    })
});


