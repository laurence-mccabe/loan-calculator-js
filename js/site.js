function getTableValues()
{
    var loanAmount = parseInt(document.getElementById("laId").value);
    var NumMonthlyPayments = parseInt(document.getElementById("paId").value);
    var rate = parseInt(document.getElementById("raId").value);

    //validate input
    if(loanAmount >1000000 || loanAmount < 1) {document.getElementById("laLabId").innerHTML = "Please enter a value between 1 and 1,000,000."};
    if(NumMonthlyPayments >1000000 || NumMonthlyPayments < 1) {document.getElementById("paLabId").innerHTML = "Please enter a value between 1 and 350"};
    if(rate >1000000 || rate < 1) {document.getElementById("raLabId").innerHTML = "Please enter a value between 1 and 20"};

    // call function to calculate NumMonthlyPayments and add values to an output outputArrayay.
    calcNumMonthlyPayments(loanAmount,NumMonthlyPayments,rate)
}

function calcNumMonthlyPayments(loanAmount, NumMonthlyPayments, rate)
{
    // declare local constants variables for use within the for loop
    let month = 1;
    let totalInterest = 0;
    let reminingBalance = loanAmount;
    let interestPaymentPerMonth = 0;
    let principalPaymentPerMonth = 0;
    var outputArray = [];
    let monthlyInterestRate = getmonthRate(rate);

    for( i=0; i<NumMonthlyPayments; i++)
    {
        let monthlyPayment = getMonPay(loanAmount, NumMonthlyPayments, monthlyInterestRate);
        interestPaymentPerMonth = reminingBalance * monthlyInterestRate;
        principalPaymentPerMonth = monthlyPayment - interestPaymentPerMonth; 
        reminingBalance -= principalPaymentPerMonth;
        totalInterest += interestPaymentPerMonth;

        outputArray += `<tr><td>${month}</td><td>${monthlyPayment.toFixed(2)}</td><td>${principalPaymentPerMonth.toFixed(2)}</td><td>${interestPaymentPerMonth.toFixed(2)}</td><td>${totalInterest.toFixed(2)}</td><td>${reminingBalance.toFixed(2)}</td></tr>`
        
        month++;
    }
    // call function to add results to screen.
    displayResults(outputArray,loanAmount,totalInterest,NumMonthlyPayments,monthlyInterestRate)
}

    function getmonthRate(rate)
{
    return rate / 1200;
}

    function getMonPay(loanAmount, NumMonthlyPayments, monthlyInterestRate)
{
        return  loanAmount * monthlyInterestRate * (Math.pow(1 + monthlyInterestRate,NumMonthlyPayments)) / (Math.pow(1 + monthlyInterestRate, NumMonthlyPayments) - 1);
}

    function displayResults(outputArray,loanAmount,totalInterest,NumMonthlyPayments, monthlyInterestRate)
{
        document.getElementById("invisId").classList.remove("invisible");
        document.getElementById("results").innerHTML = outputArray;

        document.getElementById("rightColId").classList.remove("invisible");
        document.getElementById("mpdiv").innerHTML = `${"$"+getMonPay(loanAmount, NumMonthlyPayments, monthlyInterestRate).toFixed(2)}`;
        document.getElementById("tpDiv").innerHTML = `${"$"+loanAmount}`;
        document.getElementById("tiDiv").innerHTML = `${"$"+totalInterest.toFixed(2)}`;
        let totalCost = totalInterest + loanAmount;
        document.getElementById("tcDiv").innerHTML = `${"$"+totalCost.toFixed(2)}`;

}




// function getWord() 
// {
//     let x = (document.getElementById("wordValue")).value;
//     // normalize string - remove white spaces,numbers and non-alphabetic characters
//     if(x == "")
//     {alert ("Please enter a value")};

//     let h = x.replace().replace(/[^a-zA-Z0-9 ]/g, '');
//     let b = h.replace(/ /g,'');
//     let g = b.toLowerCase();
//     let u = g.replace(/[0-9]/g, '');

//     //create an outputArrayay from each character in the word:
//     let forwardsoutputArrayay = u.split("");
//     CreateBackwardsoutputArrayay(forwardsoutputArrayay);
// }

//     function CreateBackwardsoutputArrayay(forwardsoutputArrayay)
// {
//     //create an index counter for the creation of a new outputArrayay to hold the values backwards
//     let total = 0;
//     for (i in forwardsoutputArrayay) {
//     total++;
//     }
//     // intialize new outputArrayay, create the outputArrayay which contains the values backwards.
//     var backwardsoutputArrayay = [];
//     count =0;
//     for(i=total-1; i>=0; i--)
//     {
//         backwardsoutputArrayay[count] = forwardsoutputArrayay[i]
//         count++
//     }
//     displayPalindrome(forwardsoutputArrayay, backwardsoutputArrayay);
// }


//     function displayPalindrome(forwardsoutputArrayay, backwardsoutputArrayay)
// {
//     // convert the outputArrayays into strings to display to the screen
//     var out1 = forwardsoutputArrayay.join("");
//     var out2 = backwardsoutputArrayay.join("");

//     //display the output to the screen.
//     if(out1 == out2)
//     {
//         var d = document.getElementById("output1");
//         d.classList.remove("invisible");
//         d.innerHTML = `<b>Congratulations! You have entered a Palindrome.</b><br><hr>
//                       <em>Your word reversed is:</em><b> ${out2}</b>`;
//     }
//     else
//     {
//         var d = document.getElementById("output1");
//         d.classList.remove("invisible");
//         d.innerHTML = `<b>Sorry, You have not entered a Palindrome.</b><br><hr>
//                        Your word reversed is:<em> ${out2}</em>`;
//      }
// }
   