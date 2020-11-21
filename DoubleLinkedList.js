class DoubleLinkedList {
    
    constructor(data){
        this.size = 0;
        this.head = null;
        this.tail = null;
        if(data){
            const newNode = {prev:null,value: data, next: null};
            this.head = newNode;
            this.tail = newNode;
            this.size = 1;
        }
    }
    size(){
        return this.size;
    }
    isEmpty(){
        return this.size === 0;
    }
    add(elem){
        const newNode = {prev: null, value: elem, next: null};
        if(this.isEmpty()){
            this.head = newNode;
            this.tail = newNode;
            this.size++;
            return;
        }
        newNode.prev = this.tail;
        this.tail.next = newNode;
        this.tail = newNode;
        this.size++;
    }
    addElementAt(elem,index){
        const newNode = {prev: null, value: elem, next:null};
        if(index > this.size )
        throw new Error(' Out of bound Index. Index is larger than list');
        //This is for situations we want to add to the list;
        if(index == this.size) return this.add(elem);
        //This is just to reduce the number of computation.
        //This condition allow us to search from the tail of list.
        if(index >= this.size/2){
            let trav = this.tail;
            let count = this.size;
            while(trav){
                if(count === index){
                   newNode.next = trav.next;
                   newNode.prev = trav;
                   trav.next.prev = newNode;
                   trav.next =newNode;
                   this.size++;
                   return; 
                }
                trav = trav.prev;
                count--;
            }
        }
        //This other else statement is to start from head if index is < arr.len/2
        else{
            let trav1 = this.head;
            let count1 = 0;
            while(trav1){
                if(count1 === index){
                    newNode.prev = trav1.prev;
                    newNode.next = trav1;
                    trav1.prev.next = newNode;
                    trav1.prev = newNode;
                    this.size++;
                    return;
                }
                trav1 = trav1.next;
                count1++;
            }
        } 

    }
     removeTail(){
         if(!this.tail) throw new Error("Empty List ")
        let data =  this.tail.value;
        this.tail = this.tail.prev;
        this.tail.next = null;
        this.size--;
        return data;
    }
     removeHead(){
         if(!this.head) throw new Error("Empty List");
        this.head = this.head.next;
        this.head.prev = null;
        this.size--;
        return;
    }

    remove(elem,head=1){
        const newNode = {prev: null, value:elem, next: null};
        if(this.isEmpty()){
            return "Empty List";
        }
        
        
        //This is run if no element was specified, hence we remove from the tail of the list
        if(!elem){
            return this.removeTail();
        }
        //This is the case where element to be deleted is specified.
        //It deletes the first element with that value specified from the head
        if(head == 1){
            let trav = this.head;
            while(trav){
                //This occurs when elem apear as the head of list
                if( this.head.value === elem){
                   this.removeHead()
                   return elem;
                }
                //This occurs when elem appear btw elem of list;
                if(trav.value === elem){
                    trav.prev.next = trav.next;
                    trav.next.prev = trav.prev;
                    this.size--;
                    return elem
                }

                trav = trav.next;
            }
        }
        // This case is when we are searching from the tail of the list.
        else{
            let trav1 = this.tail;
            while(trav1){
                //This occurs when tail is the element to be deleted.
                if(this.tail.value === elem){
                return this.removeTail();
             }
             //This occurs when the elem occurs in the middle of list and starting from tail.
             if(trav1.value === elem){
                trav1.next.prev = trav1.prev;
                trav1.prev.next = trav1.next;
                this.size--;
                return elem;
             }
             trav1 = trav1.prev;
            }
            
        }
        
    }

    removeElementAt(index){
        if(index === 0) return this.removeHead();
        if(index === this.size - 1) return this.removeTail();
        if(this.isEmpty()) return "Empty List";
        //The rest is when element is between the list.
        //Again we are going to apply the splitting to reduce computation.
        if(index >= this.size/2){
            let trav = this.tail;
            let count = this.size;
            while(trav){
                if(count === index + 1){
                    let ele = trav.value;
                  trav.next.prev = trav.prev;
                  trav.prev.next = trav.next;
                  this.size--;
                  return  ele;
                }
                trav = trav.prev;
                count--;
            }
        }
        //This is when index is < this.size/2, i.e half of the list.
        else{
            let trav = this.head;
            let count = 0;
            while(trav){
                if(count == index){
                    let ele = trav.value;
                    trav.next.prev = trav.prev;
                    trav.prev.next = trav.next;
                    this.size--;
                    return ele;
                }
                trav = trav.next;
                count++;
            }
        }
    }
    updateElementAt(elem,index){
        let elRemoved = this.removeElementAt(index);
        this.addElementAt(elem,index);
        return elRemoved;
    }
    //This returns true or false if our list contains an element.
    contains(elem){
        let trav = this.head;
        while(trav){
            if(trav.value == elem) return true;
            trav = trav.next;
        }
        if(!trav) return false;
    }
    toArray(){
        let trav = this.head;
        let arr = [];
        if(this.isEmpty()) return arr;
        while(trav){
            arr.push(trav.value);
            trav = trav.next;
        }
        return arr;
    }
    toString(){
        let string = '';
        let arr = this.toArray();
        for(let ele of arr){
            string += ele + ' <---> ';
        }
        return string.substring(0,string.length - 7);
    }
}

// const dllist = new DoubleLinkedList(5)
// console.log(dllist.toArray());
// dllist.add(10);
// console.log(dllist.toArray());
// dllist.add(15);
// console.log(dllist.size, dllist.isEmpty())
// dllist.add(20)
// console.log(dllist.remove());
// console.log(dllist.toArray());
// dllist.add(20);
// dllist.add(25);
// dllist.add(15);
// dllist.add(10);
// console.log(dllist.toArray());
// console.log(dllist.remove(15,0));
// console.log(dllist.toArray());
// console.log(dllist.toString())
// dllist.addElementAt(2,4)
// dllist.addElementAt(4,6);
// console.log(dllist + '');
// dllist.removeElementAt(2)
// console.log(dllist + '');
// dllist.updateElementAt(30,3)
// console.log(dllist + '')
// console.log(dllist.contains(20))

module.exports = DoubleLinkedList;