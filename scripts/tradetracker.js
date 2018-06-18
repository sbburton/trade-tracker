//initialize variables
const stockPropertyIdArray = ["symbol","company","price","quantity", "total","clientName", "date", "broker", "status"]
const tableColumns = ["Symbol","Company","Price","Quantity","Total","Client Name", "Date", "Broker", "Status", "Delete"]
// added example inputs for stocks for testing purposes
var stocks = [
    {symbol: "FB", company: "FACEBOOK", price: "10", quantity: "1", total: "10", clientName: "JOHN", date: "06/11/2015", broker: "ARNELL", status: "PURCHASED"},
    {symbol: "AMZN", company: "AMAZON", price: "40", quantity: "1", total: "40", clientName: "BEZOS", date: "04/04/2004", broker: "REECE", status: "WATCHED"},
    {symbol: "GE ", company: "GENERAL ELECTRIC", price: "20", quantity: "1", total: "20", clientName: "JANE", date: "06/11/2018", broker: "ARNELL", status: "SOLD"}
    ];
// var stockIndex = 3; // Obselete

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
        fDate();

    });


    {passive: true} //Added non-passive event listener to a scroll-blocking 'mousewheel' event. consider marking event handler as 'passive' to make the page more responsive.

});


//Create stock object prototype
function stockObj (){
    this.symbol = "";
    this.company = "";
    this.price = "";
    this.quantity = "";
    this.total = "";
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

    //check if any input values are null - if so do not pass go do not collect $200
    for (var i=0; i<stockPropertyIdArray.length; i++){
        if ($(`#${stockPropertyIdArray[i]}`).val() == "")
            return null;
    }
    //create a new stock object inside the stocks object as a property
    stockIndex = stocks.length; //reset index to one after the last object in array
    stocks[stockIndex] = new stockObj;


    document.getElementById("total").value = document.getElementById("price").value * document.getElementById("quantity").value;

    //cycle through all input ids
    for (i=0;i<idArray.length;i++){

        //get value from each input field
        var formValue = $("#"+idArray[i]).val().toUpperCase();

        if (!formValue)
            return null;

        //set stok property
        setStockProperty(stockIndex, idArray[i], formValue);

        //clear input field
        $("#"+idArray[i]).val("");
    }

    //move stock index
    stockIndex++;

}

function displayStock(){

    $("#stockTable").html(""); //clear table content

    //Create header for table
    $("#stockTable").append("<tr id='tableColumns'></tr>")

    for(i=0;i<tableColumns.length;i++){
        $("#tableColumns").append("<th>"+tableColumns[i]+"</th>")
    }

    // Reset total field
    document.getElementById("total").value = 0;

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
    delStock();
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


//Puts the Current Date into the Date Field on Form
function tDate(){

    var date = new Date();                  

    var day=date.getDate();             
    var month=date.getMonth() + 1;
    var year= date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    var today = year + "-" + month + "-" + day;

    document.getElementById('date').value = today;
    }

  // Fixed Date display on Table
function fDate(){
    for (i=0;i<stocks.length; i++){

       var orgDate= stocks[i].date;         // stockObj Date field
       var arrDate= orgDate.split('-');    
       var mYear=arrDate.shift();           // remove Year from front   
       arrDate.push(mYear);                 // Place it at the end
       var cDate=arrDate.join("/");        
       stocks[i].date=cDate;                // Set Date back into field
    }
    
    displayStock();
}

// Delete Stock Button
function delStock(){
   var trash=[];                // empty array to create a 'undo' feature
   for (i=0; i<stocks.length; i++){
       $("#"+i).append(
           "<td>"
                +"<button class='delete' id='del"+i+"' type='button' onClick='confirm(this)'>Delete</button>"
           +"</td>"
           );

        
         } 
       }

function confirm(element){
    
    element.innerHTML="Confirm";
    element.setAttribute('onClick','dele(this)');
   // $(element).fadeTo(100,0.2)
   // .fadeTo(100,1)
   // .fadeTo(100,0.2)
   // .fadeTo(100,1)
   // $(element).hide().slideDown(1000)
   // console.log($(element));
   // element.click(dele(element));
    
}

// Delete Stock
   function dele(obj){
    var id=obj.id;                                              //  Retrieves the Button's ID              
    var i=id.replace(/\D/g,'');                                 // Strips Text from ID.
    var row="#"+i;          
    $(row)
       .css('background-color', 'rgba(255, 0, 0, 0.15)')        //  R,G,B, transparancy
       .fadeOut(1000);                                          //  Fades out stock on Table 
    stocks.splice(i,1);                                         //  Deletes from array.
}  
     

  
