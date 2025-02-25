class MaxHeap {
  constructor() {
    this.heap = [];
  }
  //insertion of a review
  insert(review) {
    this.heap.push(review);
    this.bubbleUp();
  }

  bubbleUp(index) {
    let index = this.heap.length - 1;
    const element = this.heap[index];
    while (index > 0) {
      // /find the parent of that
      let parentIndex = Math.floor[(index - 1) / 2];
      let parentValue = this.heap[parentIndex];
      if (element <= parentValue) break;
      this.heap[parentIndex] = element;
      this.heap[index] = parentValue;
      index = parentIndex;
    }
  }
  extractMax() {
    const max = this.heap[0];
    const end = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.skinDown();
    }
    return max;
  }
  skinDown() {
    let index = 0;
    const length = this.heap.length;
    const element = this.heap[0];
    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let leftChild, rightChild;
      let swap = null;
      if (leftChildIndex < length) {
        leftChild = this.heap[leftChildIndex];
        if (leftChild > element) {
          swap = leftChildIndex;
        }
      }
      if (rightChildIndex < length) {
        rightChild = this.heap[rightChildIndex];
        if (
          (swap === null && rightChild > element) ||
          (swap !== null && rightChild > leftChild)
        ) {
          swap = rightChildIndex;
        }
      }
      if (swap === null) break;
      this.heap[index] = this.heap[swap];
      this.heap[swap] = element;
      index = swap;
    }
  }
}
