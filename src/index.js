const express=require('express')
const app=express()
const path= require('path')
const hbs=require('hbs')
const fetch=require('node-fetch')
const port = process.env.PORT || 8080

//middlewares
app.use(express.static(path.join(__dirname,"../public")))
app.set('view engine','hbs')
const views_path=path.join(__dirname,'../templates/views')
app.set('views',views_path)
hbs.registerPartials(path.join(__dirname,"../templates/partials/"))
// import fetch from 'node-fetch'

app.use(express.json())
app.use(express.urlencoded({extended:false}))

//mock balance sheet fetch same
const balanceSheet = [
  {
    "year": 2020,
    "month": 12,
    "profitOrLoss": 250000,
    "assetsValue": 1234
  },
  {
    "year": 2020,
    "month": 11,
    "profitOrLoss": 1150,
    "assetsValue": 5789
  },
  {
    "year": 2020,
    "month": 10,
    "profitOrLoss": 2500,
    "assetsValue": 22345
  },
  {
    "year": 2020,
    "month": 9,
    "profitOrLoss": -187000,
    "assetsValue": 223452
  },
  {
    "year": 2020,
    "month": 8,
    "profitOrLoss": 65689,
    "assetsValue": 12114
  },
  {
    "year": 2020,
    "month": 7,
    "profitOrLoss": 19150,
    "assetsValue": 15789
  },
  {
    "year": 2020,
    "month": 6,
    "profitOrLoss": 25300,
    "assetsValue": 12345
  },
  {
    "year": 2020,
    "month": 5,
    "profitOrLoss": 187000,
    "assetsValue": 203452
  },
  {
    "year": 2020,
    "month": 4,
    "profitOrLoss": 345000,
    "assetsValue": 12234
  },
  {
    "year": 2020,
    "month": 3,
    "profitOrLoss": 19150,
    "assetsValue": 15789
  },
  {
    "year": 2020,
    "month": 2,
    "profitOrLoss": 28900,
    "assetsValue": 21345
  },
  {
    "year": 2020,
    "month": 1,
    "profitOrLoss": 287000,
    "assetsValue": 212452
  },
  {
     "year":2024,
    "month":4,
    "profitOrLoss":343434,
    "assetsValue":34342342
  }

];

//routes
app.get('/',(req,res)=>{
    res.render("index",{
        title:"loan mangementt system",
        style:'style.css'
    })
})
// app.post('/api/review/accouting')

app.post('/api/accounting', (req, res) => {
    // Simulate fetching balance sheet based on the selected business
    console.log("this is client body")
    console.log("printing in console of server")
    console.log(req.body)

    
    // const data=balanceSheet[0]
    // console.log(data)
    console.log("this is balance sheet in the backend")
    console.log(balanceSheet)
    res.json(balanceSheet);

  });
  
app.post('/api/submit',(req,res)=>{
  const { businessDetails, year,loanAmount,accountingProvider } = req.body;
  let preAssessment = 20;
  const profitLast12Months = balanceSheet.filter(entry => entry.year === year).reduce((total, entry) => total + entry.profitOrLoss, 0);
  if (profitLast12Months > 0) {
    preAssessment = 60;
  } 
  const averageAssetsLast12Months = balanceSheet
  .filter(entry => entry.year === year)
  .reduce((total, entry) => total + entry.assetsValue, 0) / 12;

  if (averageAssetsLast12Months > loanAmount) {
    preAssessment = 100;
  }

  const decisionEngineResponse = {
    businessName: businessDetails,
    yearEstablished: year,
    profitOrLossByYear: profitLast12Months,
    preAssessment: preAssessment,
    average_asset:averageAssetsLast12Months
  };


  //decison engine logic can be written here
  

  
  // axios.post('endpoint of decision engine', {
  //       businessName: data.name,
  //       yearEstablished: data.year,
  //       profitOrLossByYear: profitLast12Months,
  //       loanAmount: data.loanAmount
  //   })
  //   .then((response) => {
  //       // Handle the decision engine's response
  //       const decisionEngineResponse = response.data;

  //       // You can process the decision engine's response here

  //       // Send the response back to the frontend
  //       res.json(decisionEngineResponse);
  //   })
  //   .catch((error) => {
  //       // Handle errors
  //       console.error('Error sending data to the decision engine:', error);
  //       res.status(500).json({ error: 'An error occurred while communicating with the decision engine.' });
  //   });

  

  //sample message sending 
  res.json(decisionEngineResponse)
  


}) 
  
  // Simulated Decision Engine
  




app.listen(port,()=>{
    console.log(`server is listening at http://localhost:${port}`)

})
