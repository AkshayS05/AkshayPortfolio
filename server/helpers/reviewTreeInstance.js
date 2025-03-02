// helpers/reviewTreeInstance.js
const ReviewBST = require("./reviewsBST");
const Review = require("../models/Rating");

const reviewTree = new ReviewBST();

(async () => {
  await reviewTree.loadFromMongoDB(Review);
})();

module.exports = reviewTree;
