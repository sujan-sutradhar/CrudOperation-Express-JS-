const express = require('express')
const app = express()
const userModel = require('./model/user')
const path = require('path')
app.set("view engine","ejs")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))
app.get('/',(req,res)=>{
    res.render("index")
})
app.get('/read', async(req,res)=>{
   const allUser = await userModel.find();
   res.render('read',{users:allUser})
})
app.post('/create', async (req,res)=>{
    let {name,email,image}= req.body;
   let user =await userModel.create({
         name,
         email,
         image
      })
    res.redirect('/read')

})
app.get('/delete/:id', async (req,res)=>{
    const data = await  userModel.findOneAndDelete({_id:req.params.id})
    res.redirect('/read')
})
app.get('/edit/:id', async (req,res)=>{
    const data = await  userModel.findOne({_id:req.params.id})
    res.render('edit',{user:data})
})
app.post('/update/:id', async (req,res)=>{
    let {name,email,image}= req.body;
    const data = await  userModel.findOneAndUpdate({_id:req.params.id},{name,email,image},{new:true})
    res.redirect('/read');
})

app.listen(3000)