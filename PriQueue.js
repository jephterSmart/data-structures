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
    add(ele){
        if(this.heap.length === 0){
            this.heap.push(ele);
            this.index++ ;
            return;
        }
        this.heap.push(ele);
        //This is to give the index of the last element inserted in the array;
        //Then we are going to perform a swap.
        let currentIndex = this.heap.length - 1;
        // This loops until we get to the top of tree, or
        // we exit out of function.
        while(currentIndex > 0 ){
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
            else return;
            
            
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
            // again do similar thing
            else return;
        }
    }
    }
    isMinHeapMap(index){
        let ind = index;
        let right = 2 * index + 2;
        let left = 2 * index + 1;
            if(this.heap[right] > this.heap[index] && this.heap[left] > this.heap[index]){
                return true;
            }
            else return false
            
        
    }
    toString(){
        
    //     // This variable gives us the outer number of iterations.
    //     let heightOfTree = Math.floor(Math.log2(this.heap.length));
        
    //     function displaytabs(num){
    //         let tabs = '';
    //         for(let t=0 ; t <= num; t++){
    //             tabs += '\t';
    //         }
    //         return tabs; 
    //     }
        
    //     let str =heightOfTree + displaytabs(heightOfTree*2) + this.heap[0] + '\n' + (heightOfTree -1) ;
    //     //The t variable controls the spaces or tabs between letter.
    //    for(let i = 1,t= heightOfTree; i <= this.heap.length, t > 0; t--){
    //        for(var j= i ; j <= 2 * i ; j++){
    //            str += displaytabs(t) +this.heap[j] + displaytabs(t);
    //        }
    //        str += '\n' + t-2;
    //        i = j;
    //    }
     let str = this.heap.toString();
       return str;
    }

}
let binaryHeap = new BinaryHeap(2,10,20,3,2,1);
// binaryHeap.add(10)
// binaryHeap.add(20)
// binaryHeap.add(3)
// binaryHeap.add(2)
 binaryHeap.add(0)
console.log(binaryHeap + '');
// class PriQueue {
//     constructor(){
//         this.heapMap = new this.heapMap();
//         this.binaryHeap = new this.binaryHeap();
//         if(arguments.length > 0)
//         this.add(...arguments);
//         else return this;
//     }

// }