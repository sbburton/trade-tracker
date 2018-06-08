//initialize variables
const stockPropertyIdArray = ["symbol","company","price","clientName", "date", "broker", "status"]
const tableColumns = ["Symbol","Company","Price","Client Name", "Date", "Broker", "Status"]
var stocks = [];
var stockIndex = 0;

//functions to run when DOM is ready
$(document).ready(function(){

    $("#submit").click(function(e){
        e.preventDefault()//prevent page refresh
        
        console.log("clicked"); //test
        
        //get value from form and transfer into a new stock object
        getFormValue(stockPropertyIdArray);
        console.log(stocks); //test
        
        displayStock();
    })
    
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
        for(var j in singleStockObj){
            if(singleStockObj.hasOwnProperty(j)){
                $("#"+id).append("<td>"+singleStockObj[j]+"<td>")
            }
        }
    }
    
    
    
    
    // for(i=0;i<stocks.length;i++){
        
    //     var sym = stocks[i].symbol;
    //     var listItem = "<li>"+sym+"</li>"
    //     $("#stockList").append(listItem);
    // }
    
}

//Get Text from inputer box
// document.getElementById('search').addEventListener('click', function(){
//  var sText=document.getElementById('sBox').value
// });