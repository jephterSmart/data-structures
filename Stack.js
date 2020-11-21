/*
| * This stack implementation does use Double Link list,
| * we can also use a simple linked list or an Array.
| * This data structure is useful when we want to only deal with 
| * the top (head) of a structure. Not that useful for search, since 
| * the big O is O(n).
*/


const dllist = require('./DoubleLinkedList');

class Stack {
    constructor(elem){
        this.stack = new dllist();
        // we do so that we can be consistent.
        this.head = this.stack.tail;
        if(!elem) return this;
        this.push(elem);
    }

    push(elem){
        this.stack.add(elem);
        if(arguments.length > 1){
            for(let i = 1; i < arguments.length; i++ ){
                this.stack.add(arguments[i])
            }
        }
        // for consistency;
        this.head = this.stack.tail;
    }
    peek(){
     
        return this.head.value;
    }
    contains(elem){
        return this.stack.contains(elem);
    }
    pop(){
        if(this.stack.isEmpty()) throw new Error("Stack is Empty");
        this.head  = this.stack.tail.prev;
        return this.stack.removeTail()
    }
    toString(){
        let trav = this.stack.head;
        let  str = '\n'
        while(trav){
            str += ' ' +trav.value + '\n |\n ^\n'  ;
            trav = trav.next;
        }
        return str.substring(0,str.length -6);
    }
}

// let stack = new Stack();
// stack.push(5);
// stack.push(10,8,7);
// console.log(stack + '');
// console.log(stack.peek())
// stack.pop()
// stack.pop()
// console.log(stack + '');
// console.log(stack.contains(27))

