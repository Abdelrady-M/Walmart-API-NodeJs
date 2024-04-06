const express = require("express");
const AddressModel = require("../models/address");

const createNewAddress = async (req, res) => {
  try {
    const address = new AddressModel(req.body);
    await AddressModel.save();
    res.status(201).send(address);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllAddresses = async (req, res) => {
  try {
    const userId = req.params.userId;
    const addresses = await AddressModel.find({ userId });
    res.send(addresses);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateAddress = async (req, res) => {
  try {
    const addressId = req.params.addressId;
    const updates = req.body;
    const updatedAddress = await AddressModel.findByIdAndUpdate(
      addressId,
      updates,
      {
        new: true,
      }
    );
    if (!updatedAddress) {
      return res.status(404).send({ message: "Address not found" });
    }
    res.send(updatedAddress);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteAddress = async (req, res) => {
  try {
    const addressId = req.params.addressId;
    const deletedAddress = await AddressModel.findByIdAndDelete(addressId);
    if (!deletedAddress) {
      return res.status(404).send({ message: "Address not found" });
    }
    res.send(deletedAddress);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createNewAddress,
  getAllAddresses,
  updateAddress,
  deleteAddress,
};
