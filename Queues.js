/*
* This queue is also going to be implemented using double linked list.
* This object has primarily two operator: Enqueue(Adding) and Dequeue.
*  We can also use Arrays to implement this. JS has already done that for
* us with the two methods: shift() and push(). Thus viewing the array as a queue.
* Thus making it an Abstract Data Type.
*/
"use strict"
const dllist = require('./DoubleLinkedList');

class Queues {
    constructor(){
        this.queue = new dllist();
        // This is done to make the queue not mutated from outside the class Queues.
        Object.defineProperty(this,'queue',{writable: false,configurable:false})
        this.back = this.queue.tail;
        this.front = this.queue.head;
        if(arguments.length === 0 ) return this;
        this.Enqueue(...arguments)
    }
    // Add an element to the back of the queue;
    Enqueue(){
        for(let i = 0; i<arguments.length; i++){
            this.queue.add(arguments[i]);
        }
        this.back = this.queue.tail;
        
    }
    // Remove an element from the front of the queue
    // The neame of this function can alse be poll
    // This throws error if Queue is empty from the removeHead() method.
    Dequeue(){
        let el = this.queue.removeHead();
        this.front = this.queue.head;
        return el;
    }
    toString(){
        return this.queue.toString();
    }
    contains(ele){
        return this.queue.contains(ele);
    }
    get size(){
        return this.queue.size;
    }
    peek(){
        if(this.size === 0) throw new Error("Queue is empty")
        return this.front.value;
    }
}

// const que = new Queues(10,15,20);
// que.Enqueue(5,6)
// console.log(que + '');
// que.Dequeue();
// que.Dequeue();
// console.log(que + '', que.size);
module.exports = Queues;