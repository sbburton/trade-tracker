document.addEventListener("DOMContentLoaded", function() {

	console.log('validinput.js connected');

	document.getElementById("submit").addEventListener("click", function(e){
    e.preventDefault()//prevent page refresh

	checkValidity();

	});

	function checkValidity() {

		var symbol = $("#symbol").val()
		var company = $("#company").val()
		var price = $("#price").val()
		var client = $("#clientName").val()
		var date = $("#date").val()
		var broker = $("#broker").val()
		var status = $("#status").val()

		var inputList = ['symbol', 'company', 'price', 'clientName', 'date', 'broker', 'status'];
		// console.log(`symbol: ${symbol}, company: ${company}, price: ${price}, client: ${client}, broker: ${broker}, status: ${status}`);

		var errorCount = 0;
		for (var i=0; i<inputList.length; i++){
			if ($(`#${inputList[i]}`).val() == "" && errorCount === 0 && $("#error").text() != "Please fill out all fields!") {
				console.log(inputList[i], ' blank');
				$("#addItem").append("<p id='error' style='font-weight:bold; color:red; text-shadow:1px 1px #400;'>Please fill out all fields!</p>");
				errorCount++;
			} else if (errorCount == 0) {
				$("#error").remove();
			}
		}
	}

});

// Gather Stock List and Validate it
$.getJSON("ajax/stockList.json", function(data){
		console.log(data);
});