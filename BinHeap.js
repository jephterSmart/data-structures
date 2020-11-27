/*
* This is a priority queue implemented with Array Binary Heap and Hash table map.
* We are going to design for a Min Binary Heap. i.e., it is going to follow the rule 
* of the heap invariant. Element we pass to the priority queue must be comparable of some kind.
*/

// class HeapMap {
//     constructor(){
//         this.map = {};
//     }
//     add(ele){
//         if(this.map && this.map.hasOwnProperty(ele) ){
//             this.map[ele] = {indexes}
//         }
//     }
// }
class BinaryHeap {
    constructor(){
        this.heap = [];
        arguments.length === 1 && this.add(arguments[0])
        if(arguments.length > 0){
            for(let i= 0; i < arguments.length ; i++ ){
                this.add(arguments[i]);
            }
        }

    }
    //This function will be called inside a while loop.
    //It only bubble the element only a single step.
    _bubbleUp(currentIndex){
              // Even indexes are to the right of the heap.
        // While odd indexes are to the left of the heap.
        if(currentIndex % 2 == 0){
            let parentIndex= (currentIndex - 2)/2
            let parentElement = this.heap[parentIndex];
            //This allows for swapping if there in noMinHeap.
            if(this.heap[parentIndex] > this.heap[currentIndex]){
                this.heap[parentIndex] = this.heap[currentIndex];
                this.heap[currentIndex] = parentElement;
                currentIndex = parentIndex;
            }
            //return if  parentElement <=  this.heap[currentIndex].
            
            
        }
        // This is for case of where currentIndex is odd.
        else{
            let parentIndex = (currentIndex - 1) /2 ;
            let parentElement = this.heap[parentIndex];
            if(this.heap[parentIndex] > this.heap[currentIndex]){
                this.heap[parentIndex] = this.heap[currentIndex];
                this.heap[currentIndex] = parentElement;
                currentIndex = parentIndex;
            }

        }

        return currentIndex;
    }
    _bubbleDown(lowIndex){
        let leftIndex = 2*lowIndex + 1;
        let rightIndex = 2 * lowIndex + 2;
        if(this.heap[leftIndex] && this.heap[rightIndex] 
            && ((this.heap[leftIndex] < this.heap[rightIndex] && this.heap[leftIndex] < this.heap[lowIndex])
                || (this.heap[leftIndex] === this.heap[rightIndex] 
                    && this.heap[leftIndex] < this.heap[lowIndex]) ) ){
                    this._swap(leftIndex,lowIndex);
                    lowIndex = leftIndex;
                }
        else if(this.heap[leftIndex] && this.heap[rightIndex] 
            && (this.heap[leftIndex] > this.heap[rightIndex] && this.heap[rightIndex] < this.heap[lowIndex])){
                this._swap(rightIndex,lowIndex);
                lowIndex = rightIndex;
            }
      else if(this.heap[leftIndex] && (this.heap[leftIndex] < this.heap[lowIndex] )){
            this._swap(leftIndex,lowIndex)
            lowIndex = leftIndex;
        }
    
        return lowIndex;
    }
    add(ele){
        if(this.heap.length === 0){
            this.heap.push(ele);
            return;
        }
        this.heap.push(ele);
        //This is to give the index of the last element inserted in the array;
        //Then we are going to perform a swap.
        let currentIndex = this.heap.length - 1;
        // This loops until we get to the top of tree, or
        // we exit out of function.
        while(currentIndex > 0 ){
            currentIndex = this._bubbleUp(currentIndex);
            if(this.isMinHeapMap(currentIndex)) return;
        }

    }
    //This method is going to help us remove the element with the highest priority from the queue
    poll(){
        if(this.heap.length === 0){
            throw new Error('Binary heap is empty')
        }
        //use this one when we have only one element in our heap
        if(this.heap.length === 1) return this.heap.pop();
        //this changes the position of the highest priority ele with the lowest priority elem
        this._swap(0,this.heap.length - 1);
        let highEle = this.heap.pop();
        //now let us sift down the heap, if element has lower priority.
        let lowIndex = 0;
        while(lowIndex<this.heap.length){
            
            //This bubble our element down for a single step.
            lowIndex = this._bubbleDown(lowIndex);
            if(this.isMinHeapMap(lowIndex)) return highEle;
         
        
        }

    }
    //This method help us to remove element from the queue at any position.
    remove(ele){
        if(ele === this.heap[this.heap.length -1])
        return this.heap.pop();
        if(ele === this.heap[0]) 
        return this.poll();
        let eleIndex = this.heap.findIndex((el) => el === ele);
        this._swap(eleIndex,this.heap.length - 1);
        let elemToRemove = this.heap.pop();
        let lowIndex = eleIndex;
        
        
        while(lowIndex<this.heap.length){

            lowIndex = this._bubbleUp(lowIndex);
            
            //From here downward is for bubbling down.
            lowIndex = this._bubbleDown(lowIndex);
       
            if(this.isMinHeapMap(lowIndex)) return elemToRemove;
        }

    }
    //This is helper method that help us to swap index in the array.
    _swap(indexParent,indexChild){
        let elemParent = this.heap[indexParent];
        this.heap[indexParent] = this.heap[indexChild];
        this.heap[indexChild] = elemParent;
    }
    isMinHeapMap(index){
        let right = 2 * index + 2;
        let left = 2 * index + 1;
        let parent = index % 2  === 0 ? (index-2)/2 :(index -1)/2;
        let result = false;
            if((this.heap[right] && this.heap[right] > this.heap[index]) 
                && (this.heap[left] && this.heap[left] > this.heap[index])){
                result = true;
            }
            else if(!this.heap[left] || !this.heap[right]) result = true;
            if(this.heap[parent] && this.heap[parent] > this.heap[index] ){
                result =  false;
            }
            return result;

    }
    toString(){
     let str = this.heap.toString();
       return str;
    }

}

class BinHeapWithBetterRemoveMethod extends BinaryHeap{
    
}
let binaryHeap = new BinaryHeap();
binaryHeap.heap = [1,5,1,8,6,2,2,13,12,11,7,2,15,3,10];
// binaryHeap.add(10)
// binaryHeap.add(20)
// binaryHeap.add(3)
// binaryHeap.add(2)
// binaryHeap.add(0)
console.log(binaryHeap + '');
console.log(binaryHeap.poll());
 console.log(binaryHeap + '');
 console.log(binaryHeap.remove(12));
 console.log(binaryHeap + '');
 console.log(binaryHeap.remove(3));
 console.log(binaryHeap + '');
 console.log(binaryHeap.poll());
 console.log(binaryHeap + '');
 console.log(binaryHeap.remove(6));
 console.log(binaryHeap + '');

//  console.log(binaryHeap.poll());
//  console.log(binaryHeap + '');
//  console.log(binaryHeap.poll());
//  console.log(binaryHeap + '');
//  console.log(binaryHeap.poll());
//  console.log(binaryHeap + '');
//  console.log(binaryHeap.poll());
//  console.log(binaryHeap + '');
//  console.log(binaryHeap.poll());
//  console.log(binaryHeap + '');
 
