'use strict'

const fs = require('fs')
const path = require('path')
const guestsPath = path.join(__dirname,'guests.json')
// console.log(__dirname,__filename)

const http=require('http')
const port=process.env.PORT||8000

const server = http.createServer(function(req,res){
    // console.log(req.method,req.url)
    if(req.method==='GET'&&req.url==='/guests'){
        fs.readFile(guestsPath,'utf8',(err,guestsJSON)=>{
            if(err){
                console.error(err.stack)
                res.statusCode=500
                res.setHeader('Content-Type','text/plain')
                return res.end('Internal Server Error')
            }

            res.setHeader('Content-Type','application/json')
            res.end(guestsJSON)
        })    
    }
    else{
        res.statusCode=404
        res.setHeader('Content-Type','text/plain')
        res.end('Not found')
    }
})

server.listen(port,function(){
    console.log('listening on port',port)
})