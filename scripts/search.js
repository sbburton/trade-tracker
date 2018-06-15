const list=document.querySelector('#stockTable');


//filter Books
const searchBar=document.forms['search-stocks'].querySelector('input');
//console.log(searchBar);

searchBar.addEventListener('keyup',function(e){

    var myList = document.getElementById("stockTable").childNodes;
//    console.log(myList.length);

    var searchString = document.getElementById("search").value;
    var str = '';

    console.log(myList.length);

    for(var i = 1; i < myList.length; i++){

        str = myList[i].firstElementChild.innerHTML;

        str = str.toUpperCase();
        searchString = searchString.toUpperCase();

        if(searchString.length == 0)
        {
            document.getElementById("stockTable").childNodes[i].hidden = false;
        }
        else{
            if(str.indexOf(searchString) != -1)
            {
                //console.log("Search index: " + str.indexOf(searchString));
                console.log("Found it! " + str + " " + searchString);
                document.getElementById("stockTable").childNodes[i].hidden = false;
            }
            else
            {
                //hide the row
                console.log("Not a match: " + str + " " + searchString);
                document.getElementById("stockTable").childNodes[i].hidden = true;
            }
        }
    }

    //console.log(searchString);
    //console.log(str);

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


