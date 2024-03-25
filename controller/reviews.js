const express = require("express");
const  reviewsModel= require("../models/reviews")

// ======================== get all reviews ========================
const getAllReviewsOfProductById = async (req,res)=>{   
    var id = req.params.id;
    try{
        const allReviews = await reviewsModel.find({productId:id});
        res.status(200).json({allReviews})
    }
    catch(err){
        res.status(400).json(`error : ${err}`, {not:""})
    }
}

// ======================== create review ========================
const createReview = async (req,res)=>{
    var review =req.body;
    try{
        const newReview = await reviewsModel.create(review);
        res.status(201).json(newReview);
    }
    catch(err){
        res.status(400).json(`error: ${err}`)
    }
}

// ======================== update review ========================
const updatingReview = async (req,res)=>{
    var id = req.params.id;
    var updates = req.body;
    try{
        const updatedReview = await reviewsModel.updateOne({_id:id},updates)
        res.status(200).json({updatedReview});
    }
    catch(err) {
        res.status(400).json(`error: ${err}`);
    }
}

// ======================== Delete review ========================
const deleteReview = async (req,res)=>{
    var id = req.params.id;
    try{
        const review = await reviewsModel.deleteOne({_id:id});
        res.status(200).json(review);
    }
    catch(err){
        res.status(400).json(`error: ${err}`)
    }
}

module.exports = {getAllReviewsOfProductById,createReview,updatingReview,deleteReview}
