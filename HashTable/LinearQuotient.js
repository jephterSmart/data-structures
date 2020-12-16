/*
* Linear quotient is a collision resolution algorithm that falls under the class of collision 
* resolution method called Double hashing. Double hashing because it uses two hashing function, one,
* to locate the home address, two, to locate the variable increment in the primary probe chain.

* @author Uzezi jephter Oghenekaro.
*/


//This is just to act as a dummy object, for cases of deletion.
class Tombstone{
    constructor(){
        this.value = 'TS'
    }
    toString(){
        return this.value;
    }
}
const DirectChaining = require('./DirectChaining');
class LinearQuotient extends DirectChaining{
    constructor(capacity){
        super(capacity);
        this.locationCount = 0;
    }
    delete(key){
        let homeAddress = this.hashFunction(key);
        if(this.isIndexEmpty(homeAddress)) return false;
        if(this.hashTable[homeAddress].key === key){
            this.hashTable[homeAddress] = new Tombstone();
            return true;
        }
        else{
            let addressIncrement = this.__probingFunction(key) === 0 ? 1 : this.__probingFunction(key) ;
            this.locationCount = 1;
            let nextProbeAdress = 0;
            while(this.locationCount < this.capacity){
                // this moding % is done so that we can have a circular datastructure or table
                 nextProbeAdress = (addressIncrement + homeAddress) % this.capacity;
                 homeAddress += addressIncrement;
                if(this.isIndexEmpty(nextProbeAdress)) {
                    
                    return false;
                }
                if(this.hashTable[nextProbeAdress].key === key) {
                    this.hashTable[nextProbeAdress] = new Tombstone();
                    return true;
                };
                this.locationCount++;

            }
            return false;
        }
    }
    insert(record){
        if(!record) throw new Error('pass in an object with a key property');
        if(record && record.key === undefined) throw new Error('record must have unique key property');
        let key = record.key
        if(typeof key !== 'number') throw new Error('expected a unique numeric key');
        let homeAddress = this.hashFunction(key);
        if(this.isIndexEmpty(homeAddress)) 
        {
            this.hashTable[homeAddress] = record;
            return true;
        }
        else{
            let addressIncrement = this.__probingFunction(key) === 0 ? 1 : this.__probingFunction(key) ;
            this.locationCount = 1;
            let nextProbeAdress = 0;
            while(this.locationCount < this.capacity){
                // this moding % is done so that we can have a circular datastructure or table
                 nextProbeAdress = (addressIncrement + homeAddress) % this.capacity;
                 homeAddress += addressIncrement;
                if(this.isIndexEmpty(nextProbeAdress)) {
                    this.hashTable[nextProbeAdress] = record;
                    return true;
                }
                if(this.hashTable[nextProbeAdress].key === record.key) throw new Error("Duplicate Record");
                this.locationCount++;

            }
            throw new Error('Full table!')
        }
    }
    find(key){
        let homeAddress = this.hashFunction(key);
        let addressIncrement = this.__probingFunction(key) === 0 ? 1 : this.__probingFunction(key) ;
        if(this.hashTable[homeAddress].key === key) return true;
        //This means homeaddress contain no value.
        if(!this.hashTable[homeAddress]) return false;
        //This means we meet a tombstone so continue searching
        if(this.hashTable[homeAddress] instanceof Tombstone) {
            homeAddress += addressIncrement;
        }
        else{
            this.locationCount = 1;
            let nextProbeAdress = homeAddress;
            while(this.locationCount < this.capacity){
               
                 //This means homeaddress contain no value.
                if(!this.hashTable[nextProbeAdress]) return false;
                //This means we meet a tombstone so continue searching
                if(this.hashTable[nextProbeAdress] instanceof Tombstone) {
                    homeAddress += addressIncrement;
                    nextProbeAdress = homeAddress % this.capacity;
                    this.locationCount++;
                    continue;
                }
                if(this.hashTable[nextProbeAdress].key === key) return true;
                this.locationCount++;
                 // this moding % is done so that we can have a circular datastructure or table
                 nextProbeAdress = (addressIncrement + homeAddress) % this.capacity;
                 homeAddress += addressIncrement;
            }
            return false;
        }

    }
    __probingFunction(key){
        return Math.floor(key/this.capacity) % this.capacity;
    }
    toString(){
        let str= '--------\n';
        for(let el of this.hashTable){
            if(el instanceof Tombstone){
                str += '| '+ el + '  |\n'
            }
            else if(el){
                str += '| '+ el.key + '  |\n'
            }
            else str += '|     |\n';
            
        }
        return str += '--------\n' ;
        
    }
    isIndexEmpty(index){
        if(!this.hashTable[index] || this.hashTable[index] instanceof Tombstone ) return true;
        else return false;
    }

}

let lQ = new LinearQuotient(9);

lQ.insert({key:27,name:'Jephter'})
lQ.insert({key:18,name:'Swahile'})
lQ.insert({key:29,name:"austin"})
lQ.insert({key:28,name:'eloho'})
lQ.insert({key:39})
lQ.insert({key:13})
lQ.insert({key:16})
lQ.insert({key:42})
lQ.insert({key:17})
console.log(lQ.toString(), lQ.hashTable.length,lQ.capacity);
console.log(lQ.delete(17));
console.log(lQ + '')
// lQ.insert({key:17})
// console.log(lQ.toString(), lQ.hashTable.length,lQ.capacity);
console.log(lQ.find(15));

module.exports = LinearQuotient;