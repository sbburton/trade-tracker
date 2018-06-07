//initialize variables
const stockPropertyIdArray = ["symbol","company","price","clientName", "date", "broker", "status"]
var stocks = {};

//functions to run when DOM is ready
$(document).ready(function(){
  //Add current Date to Date field
  var date = new Date();

  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  
  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;
  
  var today = year + "-" + month + "-" + day;
  
  
  document.getElementById('date').value = today;

    $("#submit").click(function(e){
        e.preventDefault()//prevent page refresh


        console.log("clicked"); //test

        //get value from form and transfer into a new stock object
        getFormValue(stockPropertyIdArray);
        console.log(stocks); //test
    })

    {passive: true}

});

//Create stock object prototype
function stockObj (){
    this.symbol = "";
    this.company = "";
    this.price = "";
    this.clientName = "";
    this.date = "";
    this.broker = "";
    this.status = ""; //green might indicate this variable has been taken. check if run into problem
}

//Function to set property of a specified stock indexed by its symbol
function setStockProperty(sym,propertyName,propertyValue) {
    stocks[sym][propertyName] = propertyValue;
}

//Function to get value from form input and set as stock obj property
function getFormValue (idArray){

    //create a new stock object inside the stocks object as a property
    var sym = $("#symbol").val();
    stocks[sym] = new stockObj;

    //cycle through all input ids
    for (i=0;i<idArray.length;i++){

        //get value from each input field
        var formValue = $("#"+idArray[i]).val();

        //set stok property
        setStockProperty(sym, idArray[i], formValue);

        // testing
        // console.log(formValue);

        //clear input field
        $("#"+idArray[i]).val("");
    }

}

// // TODO: SEARCH FUNCTION
// document.getElementById('search').addEventListener('click', function(){
//  var sText=document.getElementById('sBox').value
// });