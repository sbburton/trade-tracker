//initialize variables
const stockPropertyIdArray = ["symbol","company","price","clientName", "date", "broker", "status"]
const tableColumns = ["Symbol","Company","Price","Client Name", "Date", "Broker", "Status"]
var stocks = [];
var stockIndex = 0;

//functions to run when DOM is ready
$(document).ready(function(){
   
   
   //  supoose to have the drop down with default values
  //  $('#submit').click(function(){
   //     $('#broker').val('Arnell'); //value of your default option
   // });
   // $('#submit').click(function(){
   //     $('#status').val('purchased'); //value of your default option
   // });


    //Add current Date to Date field
     tDate();
    $("#submit").click(function(e){
        e.preventDefault()//prevent page refresh
     
     //    
      

        console.log("clicked"); //test

        //get value from form and transfer into a new stock object
        getFormValue(stockPropertyIdArray);
        console.log(stocks); //test
        
        displayStock();
        tDate();
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
function setStockProperty(index,propertyName,propertyValue) {
    stocks[index][propertyName] = propertyValue;
}

//Function to get value from form input and set as stock obj property
function getFormValue (idArray){

    //create a new stock object inside the stocks object as a property

    // var sym = $("#symbol").val();
    stocks[stockIndex] = new stockObj;
    
    //cycle through all input ids
    for (i=0;i<idArray.length;i++){

        //get value from each input field
        var formValue = $("#"+idArray[i]).val();

        //set stok property

        setStockProperty(stockIndex, idArray[i], formValue);
        

        // testing
        // console.log(formValue);

        //clear input field
        $("#"+idArray[i]).val("");
    }
    
    stockIndex++;
    
}

function displayStock(){
    
    
    $("#stockTable").html(""); //clear table content
    
    $("#stockTable").append("<tr id='tableColumns'></tr>")
    for(i=0;i<tableColumns.length;i++){
        $("#tableColumns").append("<th>"+tableColumns[i]+"</th>")
    }
    
    for(i=0;i<stocks.length;i++){
        var id = "stock"+i
        $("#stockTable").append("<tr id="+id+"></tr>")
        // $("#"+id).append("<td>Test</td>");
        console.log(id);
        var singleStockObj = stocks[i];
        for(j=0;j<stockPropertyIdArray.length;j++){
            var stockProperty = stockPropertyIdArray[j];
            $("#"+id).append("<td>"+singleStockObj[stockProperty]+"</td>")
            console.log("appended");
        }
    }
   
    
    
    
    // for(i=0;i<stocks.length;i++){
        
    //     var sym = stocks[i].symbol;
    //     var listItem = "<li>"+sym+"</li>"
    //     $("#stockList").append(listItem);
    // }
    
}
function tDate(){

  
    var date = new Date();
  
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    
    var today = year + "-" + month + "-" + day;
    
    
    document.getElementById('date').value = today;
    }
    
   

// // TODO: SEARCH FUNCTION
// document.getElementById('search').addEventListener('click', function(){
//  var sText=document.getElementById('sBox').value
// });