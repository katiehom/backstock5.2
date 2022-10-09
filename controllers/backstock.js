const Todo = require('../models/Todo')
const User = require('../models/User')
const dayjs = require('dayjs');

module.exports = {
    getBackstock: async (req,res)=>{
        console.log(req.user)
        try{
            const todoItems = await Todo.find({userId:req.user.id})
            res.render('backstock.ejs', {
                todos: todoItems, 
                user: req.user,
                dayjs: dayjs,
            })
        }catch(err){
            console.log(err)
        }
    },
    add: async (req, res)=>{
        res.render('add.ejs')
    },
    edit: async (req, res) => {
        try {
          const item = await Todo.findById(req.params.id);
          res.render("edit.ejs", { item: item, user: req.user });
        } catch (err) {
          console.log(err);
        }
    },
    update: async (req, res) => {
        try {
          await Todo.findOneAndUpdate(
            { _id: req.params.id }, req.body
          );
          console.log('Updated Backstock Item');
          res.redirect(`/backstock`);
        } catch (err) {
          console.log(err);
        }
    },
    createBackstock: async (req, res)=>{
        try{
            await Todo.create({
                category: req.body.category, 
                brand: req.body.brand,
                description: req.body.description,
                storageLocation: req.body.storageLocation,
                quantity: req.body.quantity,
                idealQuantity: req.body.idealQuantity,
                size: req.body.size,
                expirationDate: req.body.expirationDate,
                comments: req.body.comments,
                userId: req.user.id})
            console.log('Backstock item has been added!')
            res.redirect('/backstock')
        }catch(err){
            console.log(err)
        }
    },
    deleteBackstock: async (req, res) => {
        try {
          // Find item by id
          let post = await Todo.findById({ _id: req.params.id });
          // Delete item from db
          await Todo.remove({ _id: req.params.id });
          console.log("Deleted Backstock item");
          res.redirect("/backstock");
        } catch (err) {
          res.redirect("/backstock");
        }
    },
    
    // getAccount: async (req, res) => {
    //       try {
    //         const posts = await User.find({ user: req.user.id });
    //         res.render("account.ejs", { user: req.user });
    //       } catch (err) {
    //         console.log(err);
    //       }
    // },
    // editAccount: async (req, res) => {
    //     try {
    //     await User.findOneAndUpdate(
    //         { _id: req.params.id }, req.body
    //     );
    //     console.log('Updated Account Information');
    //     res.redirect(`/account`);
    //     } catch (err) {
    //     console.log(err);
    //     }
    // },      
};
  