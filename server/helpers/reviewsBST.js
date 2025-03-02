class ReviewNode {
  constructor(review) {
    this.review = review;
    this.rating = review.rating;
    this.left = null;
    this.right = null;
  }
}
class ReviewBST {
  constructor() {
    this.root = null;
  }
  //insert review in BST
  insert(review) {
    let newNode = new ReviewNode(review);
    if (!this.root) {
      this.root = newNode;
      return;
    }
    let current = this.root;
    while (true) {
      if (review.rating < current.rating) {
        if (!current.left) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else if (review.rating > current.rating) {
        // ✅ Fixed structure
        if (!current.right) {
          current.right = newNode;
          return;
        }
        current = current.right;
      } else {
        // ✅ Handles duplicate ratings correctly
        if (Math.random() < 0.5) {
          if (!current.left) {
            current.left = newNode;
            return;
          }
          current = current.left;
        } else {
          if (!current.right) {
            current.right = newNode;
            return;
          }
          current = current.right;
        }
      }
    }
  }
  async loadFromMongoDB(Review) {
    // Populate userId with name and avatar
    const reviews = await Review.find().populate("userId", "name avatar");

    reviews.forEach((review) => this.insert(review));
    reviews.forEach((review, index) => {});
  }

  //get reviews in ascending order --> in order traversal
  getSortedReviews(order = "asc", node = this.root, result = []) {
    if (!node) return result;
    if (order === "asc") {
      this.getSortedReviews(order, node.left, result);
      result.push(node.review);
      this.getSortedReviews(order, node.right, result);
    } else {
      this.getSortedReviews(order, node.right, result);
      result.push(node.review);
      this.getSortedReviews(order, node.left, result);
    }
    return result;
  }
  //get top k reviews (reverse in-order traversal)
  getTopKReviews(k, node = this.root, result = []) {
    if (!node || result.length >= k) return result;
    this.getTopKReviews(k, node.right, result);
    if (result.length < k) result.push(node.review);
    this.getTopKReviews(k, node.left, result);
    return result;
  }
  //remove review from the BST
  remove(review, node = this.root, parent = null) {
    if (!node) return null;

    if (review.rating < node.rating) {
      node.left = this.remove(review, node.left, node);
    } else if (review.rating > node.rating) {
      node.right = this.remove(review, node.right, node);
    } else {
      // Check if this is the exact review to remove (in case of duplicate ratings)
      if (review.testimonial !== node.review.testimonial) {
        // Continue searching if the testimonial does not match
        node.right = this.remove(review, node.right, node);
        return node;
      }

      // Remove node normally if it matches
      if (!node.left && !node.right) {
        return null;
      } else if (!node.left) {
        return node.right;
      } else if (!node.right) {
        return node.left;
      }

      // Two children
      let temp = this.findMin(node.right);
      node.rating = temp.rating;
      node.review = temp.review;
      node.right = this.remove(temp, node.right, node);
    }
    return node;
  }
  findMin(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }
}
module.exports = ReviewBST;
