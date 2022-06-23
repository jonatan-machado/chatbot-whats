import express from "express";

const app = express()

app.listen(process.env.port || 3333, ()=>{
  console.log('servidor em execução')
})
