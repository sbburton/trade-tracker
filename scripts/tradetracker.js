//initialize variables
const stockPropertyIdArray = ["symbol","company","price","clientName", "date", "broker", "status"]
const tableColumns = ["Symbol","Company","Price","Client Name", "Date", "Broker", "Status"]
var stocks = [];
var stockIndex = 0;

//functions to run when DOM is ready
$(document).ready(function(){
   

    //load stock table
    displayStock();
    
    //load date on input form
    tDate();
    
    $("#submit").click(function(e){

        e.preventDefault();//prevent page refresh


        //get value from form and transfer into a new stock object
        createStockFromInput(stockPropertyIdArray);
        
        //show stock table
        displayStock();
        
        //addToggle buttons
        addToggle();
        
        //Add current Date to Date field
        tDate();
        
         //Reset input form values
        $('#broker').val('Arnell'); //value of your default option
        $('#status').val('purchased'); //value of your default option
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
function createStockFromInput (idArray){

    //create a new stock object inside the stocks object as a property

    // var sym = $("#symbol").val();
    stocks[stockIndex] = new stockObj;
    
    //cycle through all input ids
    for (i=0;i<idArray.length;i++){

        //get value from each input field
        var formValue = $("#"+idArray[i]).val().toUpperCase();

        //set stok property
        setStockProperty(stockIndex, idArray[i], formValue);

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
   
   //Add toggle buttons
    addToggle();
}


//function to add toggle buttons
function addToggle() {
    
    //relace text in status column with button elements
    for (i=0;i<stocks.length;i++){
        var status = stocks[i].status
        $("#"+i+" .status").html("<button class='toggleButton "+status+"'"+">"+status+"</button>");
    }

    //add event listener to buttons
    $(".toggleButton").click(function(e){
        
        //find the stock object being clicked  
        var targetStock = stocks[e.target.parentElement.parentElement.id];
        
        //toggle stock object state when button is clicked
        if(targetStock.status == "PURCHASED"){
            targetStock.status = "SOLD"
        }else if (targetStock.status == "SOLD"){
            targetStock.status = "WATCHED"
        }else if (targetStock.status == "WATCHED"){
            targetStock.status = "PURCHASED"
        }
        
        //update stock table
        displayStock();
        
    });
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