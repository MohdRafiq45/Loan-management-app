document.addEventListener("DOMContentLoaded",()=>{
    const form=document.getElementById("application-form");
    const resultDisplay=document.getElementById("applicationResult")
    const reviewDisplay=document.getElementById("applicationReview")
    const UserBalanceDispaly=document.getElementById("balance-sheet");
    const submit_btn=document.getElementById("submit_btn")


    document.getElementById("review").addEventListener("click",(event)=>{
        event.preventDefault()
        const formData= new FormData(form)
        const balanceSheetTable = document.getElementById("balance-sheet-table");
        const balanceSheetBody = document.getElementById("balance-sheet-body");
        const data={
            name: formData.get("name"),
            year: parseInt(formData.get("year")),
            loanAmount: parseInt(formData.get("loan-amount")),
            accountingSoftware: formData.get("accounting-software"),
        }
        if(data.name==="" ){
            alert("please provide the business name")

        }
        else if(!data.year){
            alert("please provide the year")
        }
        else if(data.year<1900 || data.year>2023){
            alert("please provide the year between 1900 to 2023")
        }
        else if(!data.loanAmount){
            alert("please provide the loan amount")
        }
        else{
            fetch("api/accounting",{
                method:"POST",
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(data)
            }).then(res=>res.json())
            .then(balance_sheet=>{
                UserBalanceDispaly.classList.remove("hidden")
            balanceSheetBody.innerHTML = "";
            balance_sheet.map((ele)=>{
                const row=document.createElement("tr");
                row.innerHTML=`
                <td>${ele.year}</td>
                <td>${ele.month}</td>
                <td>${ele.profitOrLoss}</td>
                <td>${ele.assetsValue}</td>
                `
                balanceSheetBody.appendChild(row)
            })
             // Display profit and loss summary
            
            submit_btn.classList.remove("hidden")
                form.addEventListener("submit",(event)=>{

                    event.preventDefault()
                    const businessDetails = document.getElementById("name").value;
                    const loanAmount = document.getElementById("loan-amount").value;
                    const accountingProvider = document.getElementById("accounting-software").value;
                    const year=document.getElementById("year").value
                    fetch('/api/submit',{
                        method:'POST',
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify({businessDetails,year,loanAmount,accountingProvider})
        
                    }).then(ele=>ele.json())
                    .then(data=>{
                        alert("your application submitteed successfully")
                        // console.log(data.preAssessment)
                       
                        resultDisplay.innerHTML=
                        `
                            <h2>Application Result</h2>
                            
                            <h3 id="result">your loan is favored to be approved ${data.preAssessment}% of the request value. </h3>
                        
                        `;
                        // console.log(data)
                        resultDisplay.classList.remove("hidden")
                    })
                })
            })
        }
    })

})