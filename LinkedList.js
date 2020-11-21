class LinkedList {
    constructor(){
        this.head = null;
        this.tail = null;
    } 
    add(elem){
        let newNode = {value: elem, next:null};
        let prevNode = this.tail;
        // This occur if the element was the first element to the list
        if(!this.head){
            this.head = newNode;
            this.tail= newNode;
            return;
         }
       
         prevNode.next = newNode;
        this.tail = newNode;

         }
    addElementAt(elem,index = 0 ){
        let arr = this.toArray() ;
        let NoEle = "-ajq5";//This is use to make sure that empty list can still be inserted into
        let el = arr[index] || NoEle ;
        let newNode = {value: elem, next: null};
        let trav = this.head;

        // This occurs when we are inserting the first element
        if(el == NoEle){
            this.add(elem)
            return;
         }
        while(trav){
            //This occurs when index points at the head.
            if(index === 0){
                
                newNode.next = this.head;
                this.head = newNode;
                return;
            }
            //This occurs when index is the last element
            if(index === arr.length - 1 ){
                this.add(elem)
                
            }

            // This count variable enables me to avoid situations in which
            // let say we have 2 elem which have the same value and we want to 
            // insert at the farther one in the list. But without this list 
            // i will insert at the first occurrence of this value rather than 
            // the farthest one. Count has a value of 1 because we are searching at the next value.
            let count = 1; 
            //This occurs when index is between element.
            if(trav.next && trav.next.value === el && count == index){
                newNode.next = trav.next;
                trav.next = newNode;
                return;   
        }
            trav=trav.next;
            ++count;
        }
    }  
    // remove method removes elem from the list with the first occurrrence 
    //or the last when no argument is specified
    remove(elem){
        let arr = this.toArray();
        let trav = this.head;
        if(!this.head) return "Empty List";
        let count = 1;
        while(trav){
            
            // This occurs when the first element to be remove is at the head
            if(this.head.value === elem){
                this.head = this.head.next;
                return elem;
            }
            //This occur when element occurs in the middle of a list is to be deleted.
            if( trav.next && trav.next.value == elem){
                trav.next = trav.next.next;
                return elem
            }
            // This occurs when the first element to be remove is at the tail 
            // or no argument was passed in.
            if((this.tail.value === elem || !elem) && count === arr.length -1 ){
                let el = this.tail.value;
                this.tail= trav;
                this.tail.next = null;
                return el;
            }
            
            //This occurs if there is no element
            if(count === arr.length ){
                return "No element found";
            }
       
            
            trav = trav.next;
            ++count;
        }
     
    }
    //This method remove element from a specified index;
    removeElementAt(index){
        let arr = this.toArray();
        let noEle = "-ajq5";
        let elem = arr[index] || noEle;
        let trav = this.head;
       // This count variable enables me to avoid situations in which
            // let say we have 2 elem which have the same value and we want to 
            // insert at the farther one in the list. But without this list 
            // i will insert at the first occurrence of this value rather than 
            // the farthest one. Count has a value of 1 because we are searching at the next value.
            let count = 1; 
           if(elem == noEle && !this.head) return "Empty List";
           let err = new Error('Index out of bound');
           if(index >= arr.length) throw err;
            while(trav){

                //this occurs when index is the first elem
             if(index === 0){
            return this.remove(elem);
            }
         //This occurs when index is at tail;
                if(index == arr.length - 1){
                   return this.remove();// remove from tail;

                }
                //This occurs when index is between element.
            if(trav.next && trav.next.value === elem && count == index){
                trav.next = trav.next.next;
                return elem;   
        }
        

            trav=trav.next;
            ++count;
            }
            

    }
    updateElementAt(elem, index){
        let elRemoved = this.removeElementAt(index);
        this.addElementAt(elem,index);
        return elRemoved;
    }
    contains(elem){
        let arr = this.toArray();
       let ele =arr.find(el => elem == el);
       if(ele === undefined ) return false;
       else return true
    }
    toArray(){
        let arr = [];
        let trav = this.head;
        if(!this.head) return [];

        arr.push(trav.value);
        while(trav.next){
            arr.push(trav.next.value);
            trav = trav.next;
        }
       
        return arr;
    }
  
    toString(){
        let arr = this.toArray();
        let string = '';
        for(let ele of arr){
            string += ele + ' --> '
        }
        return string.substring(0,string.length - 4);
    }
}


let linkedL = new LinkedList();


 linkedL.addElementAt(5)
linkedL.addElementAt(3,1)
linkedL.addElementAt(10,2)
linkedL.addElementAt(15,3)
console.log(linkedL.toArray());
linkedL.addElementAt(6,0);
console.log(linkedL.toArray());
console.log(linkedL.remove(10));
console.log(linkedL.toArray());
linkedL.add(5);
 linkedL.add(3);
linkedL.add(10);
linkedL.add(15);
console.log(linkedL.toArray());
 console.log(linkedL.remove(15))
console.log(linkedL.toArray())
console.log(linkedL.remove(10))
console.log(linkedL.toArray())
linkedL.add(5);
console.log(linkedL.toArray());
try{
    console.log(linkedL.removeElementAt(1));
}
catch(err){
    console.log(err.message);
}

console.log(linkedL.toArray());
console.log(linkedL.remove(30));
console.log(linkedL.toString())
console.log(linkedL.contains(30));
linkedL.remove()
console.log(linkedL + '')
module.exports = LinkedList;