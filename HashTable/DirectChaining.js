
'use strict'
function CoalesceHashing(capacity){
    let cap = CoalesceHashing.capacity;
    this.capacity = (capacity && CoalesceHashing.isPrime(capacity) && capacity > cap) ? capacity : cap;
    this.hashTable = new Array(this.capacity);
    this.spacePointer = this.capacity - 1;// one record lenth from bottommost boundary of the table
}
//These are instance properties and method

//argument to insert function is an object that has a key property
CoalesceHashing.prototype.insert = function(record){
    if(!record) throw new Error('pass in an object with a key property');
    if(record && record.key === undefined) throw new Error('record must have unique key property');
    let key = record.key
    if(typeof key !== 'number') throw new Error('expected a unique numeric key');
    let indexInHashTable = this.hashFunction(key);
    let newNode = {value:key,next:null};
    // newNode.__proto__ = null;
     newNode.__proto__.toString = function(){
        return this.value + '   ' + this.next;
     }
    if(this.isIndexEmpty(indexInHashTable)){
        this.hashTable[indexInHashTable] = newNode;
    }
    // For duplicates throw an error
    else if(this.hashTable[indexInHashTable].value === key){
        throw new Error('Duplicate value was entered, key already exist in table');
    }
    else{
        let currentElem = this.hashTable[indexInHashTable];
        let nextIndex = this.hashTable[indexInHashTable] && this.hashTable[indexInHashTable].next;
        //Do this, if this is a probe chain
        while(nextIndex !== null){
            if(!this.isIndexEmpty(nextIndex)){
                currentElem = this.hashTable[nextIndex];
            }
            nextIndex = this.hashTable[nextIndex].next;
        }
        // After getting out of the loop, i.e., the end of the probe chain, nextIndex will be null;
        // and currentElem will be the last element in the probe Chain.
        currentElem.next = this.spacePointer;
        this.hashTable[this.spacePointer] = newNode;
        //This loop is to position spacePointer appropriately to an empty slot in our table.
        while(!this.isIndexEmpty(this.spacePointer)){
            --this.spacePointer;
            if(this.spacePointer < 0) throw new Error('Table is full, increase capacity');
        }
    }
}
//Will return true if that particular location in hashTable is not holding an element.
CoalesceHashing.prototype.isIndexEmpty = function(indexInHashTable){
    if(!this.hashTable[indexInHashTable]) return true;
    else return false;
}
CoalesceHashing.prototype.hashFunction = function(key){
    let result = key % this.capacity;
    return result;
}

//These are static properties and method
CoalesceHashing.capacity = 11;
CoalesceHashing.primeNumbers = [2,3,5];
CoalesceHashing.isPrime = function(numb){
    let primeNumbers = CoalesceHashing.primeNumbers;
    let numberAlreadyExist = primeNumbers.includes(numb);
    let sizeOfPrimeNumbers = primeNumbers.length;
    if(numberAlreadyExist) return true;
    //generate prime numbers until we get to our numb argument;
    else{
        for(let beginningOfCount = primeNumbers[sizeOfPrimeNumbers -1] + 1;
             beginningOfCount <= numb; beginningOfCount++){
            for(let ele of primeNumbers){
                if(ele % beginningOfCount === 0) break;
                //if this is the last element in our primeNumbers array then we do this
                if(primeNumbers[sizeOfPrimeNumbers-1] === ele 
                    && ele % beginningOfCount !== 0){
                        primeNumbers.push(beginningOfCount);
                    }
                if(beginningOfCount === numb && ele % beginningOfCount !== 0){
                    return true;
                }
                else return false
            }
        }
    }
}
//This function help us to find a prime that is eqal or greater than our
//capacity given to us.
CoalesceHashing.primeCapacity = function(capacity){
    if (CoalesceHashing.isPrime(capacity)) return capacity;
    let primeNumbers = CoalesceHashing.primeNumbers;
    let cap =primeNumbers[primeNumbers.length - 1];
    for(let k = cap + 1; k<=cap + 10000; k++){
        for(let ele of primeNumbers){
            if(ele % k === 0) break;
            if(primeNumbers[primeNumbers.length -1] === k && ele % k !== 0){
                primeNumbers.push(k);
                return k;
            }
        }
    }
    
}
Object.defineProperty(CoalesceHashing,'capacity',{writable:false,configurable:false,value:11})


let table = new CoalesceHashing(9);
table.insert({key:27})
table.insert({key:18})
table.insert({key:29})
table.insert({key:28})
table.insert({key:39})
table.insert({key:13})
table.insert({key:16})
table.insert({key:42})
table.insert({key:17})
console.log(table.hashTable.toString());