
const express = require('express');
const Faq = require('../model/faqdb')
const router = express.Router();
const mongoose = require('mongoose')

router.post('/add' , async (req,res)=>{
    
    const answer = req.body.answer;
    const question = req.body.question;
    try{
        const newFaq = new Faq({question , answer});
        const result = await newFaq.save();
        console.log(result)
        res.status(200).json({msg: "added successfully" , result});
    }
    catch(e)
    {
        console.log(e);
        res.status(400).json({msg:"it cant be saved"});
    }
})

router.put('/:id/edit',async (req,res)=>{
    const answer = req.body.answer;
    const question = req.body.question;
    try
    {
        const updatedFaq = await  Faq.findByIdAndUpdate(req.params.id,
            {question , answer,translation :{}},{new:true});
        console.log(updatedFaq);
        res.status(200).json({updatedFaq});
    }
    catch(e)
    {
        console.error(e);
        res.status(400).json({msg : "changes cant be saved at the moment"});
    }
})

router.delete('/:id/delete',async (req,res)=>{
    const id = req.params.id;
    try{
        await Faq.findByIdAndDelete(id);
        res.status(200).json({
            msg: "Faq deleted Successfully"
        })
    }
    catch(e)
    {
        console.error(e);
        res.status(400).json({
            msg : "error deleting Faq"
        })
    }
})



module.exports = router;