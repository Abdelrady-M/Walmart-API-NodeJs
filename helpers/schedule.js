const schedule = require('node-schedule');
const cartModel = require('../models/cart')

function deleteOldCarts(){ 
  console.log("Old Cart delete schedule started");
  // "*/15 * * * * *" executes every 15 seconds
  // executes every day at mid-night
  schedule.scheduleJob("0 0 * * *", async () => {
    const expirationTime = new Date() - 2592000;  // 1 month past
    // Find and delete documents where expirationTime is less than the time of the last Update
    await cartModel.deleteMany({ guest:{ $eq: true}, updatedAt: { $lte: expirationTime }}).catch(err => console.log(err));
    console.log("Old guest carts was deleted");
  });
}

module.exports = deleteOldCarts
