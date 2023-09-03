const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
const { tallySchema } = require('./schema');


// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const { connection } = require('./connector')



// app.listen(port, async() =>{
//     try {
//         await connection
//         console.log(`App listening on port ${port}!`))
//     }catch (error) {
        
//     }
// })
app.listen(port,async()=>{
try {
    await connection
    console.log(`App listening on port ${port}!`)
} catch (error) {
    console.log(`not connected`)
}
})


app.get("/totalRecovered", async(req, resp)=>{
    try {
        const data = await tallySchema.find({recovered});
        let total = 0;
        for (i = 0;i<data.length; i++){
            total +=data[i].recovered
        }
        resp.status(200).json({
            data: { _id: "total", recovered: total },
        })
    }
    catch (error){
        resp.status(500).json({
            sta:"failed",
            message: error.message
        })
    }
})
app.get("/totalActive", async(req, resp)=>{
    try {
        const data = await tallySchema.find({recovered});
        let total = 0;
        for (i = 0;i<data.length; i++){
        infected: 867780,
            total +=data[i].infected
        }
        resp.status(200).json({
            data: { _id: "total", active: total },
        })
    }
    catch (error){
        resp.status(500).json({
            sta:"failed",
            message: error.message
        })
    }
})
app.get("/totalDeath", async(req, resp)=>{
    try {
        const data = await tallySchema.find({recovered});
        let total = 0;
        for (i = 0;i<data.length; i++){
            total +=data[i].death
        }
        resp.status(200).json({
            data: { _id: "total", death: total },
        })
    }
    catch (error){
        resp.status(500).json({
            sta:"failed",
            message: error.message
        })
    }

})
app.get("/hotspotStates", async(req, resp)=>{

})
app.get("/healthyStates", async(req, resp)=>{
    try {
        const data = await tallySchema.find({recovered});
        const states=[];
        // let total = 0;
        let mortality=(data[i].death)/(data[i].infected);
        if (mortality < 0.005){
            states.push({states:data[i].states,mortality})
        }
        resp.status(200).json({
            data: states,
        })
    }
    catch (error){
        resp.status(500).json({
            sta:"failed",
            message: error.message
        })
    }

})



module.exports = app;