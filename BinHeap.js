/*
* This is a priority queue implemented with Array Binary Heap and Hash table map.
* We are going to design for a Min Binary Heap. i.e., it is going to follow the rule 
* of the heap invariant. Element we pass to the priority queue must be comparable of some kind.
*/


class BinaryHeap {
    constructor(){
        this.heap = [];
            for(let i= 0; i < arguments.length ; i++ ){
                this.add(arguments[i]);
            }

    }
    //This function will be called inside a while loop.
    //It only bubble the element only a single step.
    _bubbleUp(currentIndex){
              // Even indexes are to the right of the heap.
        // While odd indexes are to the left of the heap.
        if(currentIndex % 2 == 0){
            let parentIndex= (currentIndex - 2)/2
            
            //This allows for swapping if there in noMinHeap.
            if(this.heap[parentIndex] > this.heap[currentIndex]){
                this._swap(parentIndex,currentIndex);
                currentIndex = parentIndex;
            }
            //return if  parentElement <=  this.heap[currentIndex].
            
            
        }
        // This is for case of where currentIndex is odd.
        else{
            let parentIndex = (currentIndex - 1) /2 ;
    
            if(this.heap[parentIndex] > this.heap[currentIndex]){
                this._swap(parentIndex,currentIndex)
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



class BinHeapWithBetterRemoveMethod{
    constructor(){
        this.set = {};
        this.size = 0;
        this.heap = [];
  
        for(let i= 0; i < arguments.length ; i++ ){
            this.add(arguments[i]);
        }
    }
    _swap(indexParent,indexChild){
        let elemParent = this.heap[indexParent];
        let childElem = this.heap[indexChild]
        this.heap[indexParent] = this.heap[indexChild];
        this.heap[indexChild] = elemParent;
        let arrOfParentPos = this.set[elemParent];
        let arrOfChildPos = this.set[childElem]
        arrOfParentPos
        [arrOfParentPos.indexOf(indexParent)] = indexChild;
        arrOfChildPos
        [arrOfChildPos.indexOf(indexChild)] = indexParent;

    }
    _bubbleUp(currentIndex){
        let parentIndex = currentIndex % 2 == 0 ? (currentIndex - 2)/2
         : (currentIndex - 1) /2 ;
        // Even indexes are to the right of the heap.
  // While odd indexes are to the left of the heap.
  
      if(this.heap[parentIndex] > this.heap[currentIndex]){
          this._swap(parentIndex,currentIndex);
          currentIndex = parentIndex;
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
    //This method takes O(nlogn),
     // since each element takes O(logn).
     // There is another method which takes (logn) which relies on convergent series.
    add(ele){
        let heap = this.heap;
        let set = this.set;
        if(!this.size) {
            this.heap.push(ele);
            this.size++;
            set[ele] = [0];
            return;
        }

            heap.push(ele);
            this.size++;
            let currentIndex = this.size - 1;
            if(!set[ele]) set[ele] = [currentIndex];
            else set[ele].push(currentIndex);
            while(currentIndex > 0){
                currentIndex = this._bubbleUp(currentIndex);
                if(this.isMinHeapMap(currentIndex)) return;
            }

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
    poll(){
        if(this.heap.length === 0){
            throw new Error('Binary heap is empty')
        }
        //use this one when we have only one element in our heap
        if(this.heap.length === 1) {
            delete this.set[this.heap[0]]
            return this.heap.pop();
        }
        //this changes the position of the highest priority ele with the lowest priority elem
        this._swap(0,this.heap.length - 1);
        let highEle = this.heap[this.heap.length -1] 
        this.set[highEle].shift();
        if(this.set[highEle].length === 0) delete this.set[highEle];
        this.size--;
        // let arrOfPositions = this.set[highEle]
        // arrOfPositions.splice(arrOfPositions.indexOf(--this.size),1);
        highEle = this.heap.pop();
        //now let us sift down the heap, if element has lower priority.
        let lowIndex = 0;
        while(lowIndex<this.heap.length){
            
            //This bubble our element down for a single step.
            lowIndex = this._bubbleDown(lowIndex);
            if(this.isMinHeapMap(lowIndex)) return highEle;
         
        
        }

    }
    remove(ele){
        if(!this.set[ele]) throw new Error(ele + ' does not exist in the heap.');
        let arrOfPositions = this.set[ele] 
        if(ele === this.heap[this.heap.length -1]){
            arrOfPositions.shift()
            //This is doing cleanup job for our hashtable
            if(arrOfPositions.length === 0) delete this.set[ele];
            return this.heap.pop();
        }
        
        if(ele === this.heap[0]) 
        return this.poll();
        // let eleIndex = this.heap.findIndex((el) => el === ele);
        // this._swap(eleIndex,this.heap.length - 1);
        // arrOfPositions.splice(arrOfPositions.indexOf(--this.size),1);
        // let elemToRemove = this.heap.pop();
        // let lowIndex = eleIndex;
        let index = this.set[ele][0];
        this._swap(index,this.size - 1);
        this.set[ele].shift();
        let elemToRemove = this.heap.pop();
        this.size--;
        let lowIndex = index;
        
        
        while(lowIndex<this.heap.length){

            lowIndex = this._bubbleUp(lowIndex);
            
            //From here downward is for bubbling down.
            lowIndex = this._bubbleDown(lowIndex);
       
            if(this.isMinHeapMap(lowIndex)) return elemToRemove;
        }

    }
    toString(){
        let str= '';
        for(let el in this.set){
            str += el + '=>' + this.set[el].toString() + '   '
        }
        return str + '\n[' + this.heap.toString() + ']';
        
    }
}
// let binHeap = new BinHeapWithBetterRemoveMethod(2,7,2,11,7,13,2);
// console.log(binHeap + '');
// binHeap.add(3);
// console.log(binHeap + '');
// console.log(binHeap.remove(2));
// console.log(binHeap + '');
// console.log(binHeap.poll());
// binHeap.poll();
// binHeap.add(2)
// console.log(binHeap + '');

// let binaryHeap = new BinaryHeap();
// binaryHeap.heap = [1,5,1,8,6,2,2,13,12,11,7,2,15,3,10];
// // binaryHeap.add(10)
// // binaryHeap.add(20)
// // binaryHeap.add(3)
// // binaryHeap.add(2)
// // binaryHeap.add(0)
// console.log(binaryHeap + '');
// console.log(binaryHeap.poll());
//  console.log(binaryHeap + '');
//  console.log(binaryHeap.remove(12));
//  console.log(binaryHeap + '');
//  console.log(binaryHeap.remove(3));
//  console.log(binaryHeap + '');
//  console.log(binaryHeap.poll());
//  console.log(binaryHeap + '');
//  console.log(binaryHeap.remove(6));
//  console.log(binaryHeap + '');

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
 
