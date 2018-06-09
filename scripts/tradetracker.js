//initialize variables
const stockPropertyIdArray = ["symbol","company","price","clientName", "date", "broker", "status"]
const tableColumns = ["Symbol","Company","Price","Client Name", "Date", "Broker", "Status"]
var stocks = [];
var stockIndex = 0;

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
        e.preventDefault();//prevent page refresh

        //get value from form and transfer into a new stock object
        getFormValue(stockPropertyIdArray);
        
        displayStock();
        addToggle();
    });

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
    
    //Create header for table
    for(i=0;i<tableColumns.length;i++){
        $("#tableColumns").append("<th>"+tableColumns[i]+"</th>")
    }
    
    //fill in the each row
    for(i=0;i<stocks.length;i++){

        $("#stockTable").append("<tr id="+i+"></tr>")
        // $("#"+id).append("<td>Test</td>");
        var singleStockObj = stocks[i];
        for(j=0;j<stockPropertyIdArray.length;j++){
            var stockProperty = stockPropertyIdArray[j];
            
            //append each cell with stock property and name class after the property
            $("#"+i).append(
                "<td class="+stockProperty+">"
                    +singleStockObj[stockProperty]
                +"</td>")

            // console.log("appended");
        }
    }
    
    addToggle();
}



function addToggle() {
    for (i=0;i<stocks.length;i++){
        var status = stocks[i].status
        $("#"+i+" .status").html("<button class='toggleButton'>"+status+"</button>");
    }
    
    $(".toggleButton").click(function(e){
        var targetStock = stocks[e.target.parentElement.parentElement.id];
        console.log ("toggled");
        if(targetStock.status == "purchased"){
            targetStock.status = "sold"
        }else if (targetStock.status == "sold"){
            targetStock.status = "watched"
        }else if (targetStock.status == "watched"){
            targetStock.status = "purchased"
            //e.target.textContent = "purchased"
        }
        
        displayStock();
        
    });
}



// // TODO: SEARCH FUNCTION
// document.getElementById('search').addEventListener('click', function(){
//  var sText=document.getElementById('sBox').value
// });