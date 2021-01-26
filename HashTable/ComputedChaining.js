/* The computed Chaining method is like the DirectChaining method in that it has an 
* extra field for storing offset, which is a certain number of bits. Here the address is not
* stored but rather the address is computed.
*
*
* @author uzezi Jephter Oghenekaro
*/

const LinearQuotient = require('./LinearQuotient');

class ComputedChaining extends LinearQuotient {
    constructor(capacity){
        super(capacity);
    }
    isHomeAddress(key,homeAddress){
        return this.hashFunction(key) === homeAddress
    }
    insert(record){
        this.checkRecord(record);
        let key = record.key;
        let homeAddress = this.hashFunction(key);

        if(this.isIndexEmpty(homeAddress)) {
            this.hashTable[homeAddress] = {record,numberOfRef: null};
            return true;
        }
        let probeElement = this.hashTable[homeAddress];
        if(probeElement.record.key === key) throw new Error('Duplicate record');

        
        //This test if the position we are trying to insert has an item which is not in its
        // home address, i.e no primary clustering is involved then move the already existing 
        // item so that the item to be inserted can be put in this position.
        if(!this.isHomeAddress(probeElement.record.key,homeAddress)){
            let temporaryElementRemoved = [];
            let probeIncrement = 0;
            let nextprobeAddress = homeAddress;
            // This is use to keep pointer to which address element was removed from.
            let temporaryAddressOfElementRemoved = homeAddress;
            temporaryElementRemoved.push(probeElement.record);
            while(probeElement.numberOfRef !== null){
                
                 probeIncrement = (probeElement.numberOfRef
                            * this.__probingFunction(probeElement.record.key)) ;
                nextprobeAddress = (probeIncrement + nextprobeAddress ) % this.capacity;
                probeElement = this.hashTable[nextprobeAddress];
                temporaryElementRemoved.push(probeElement.record);
                delete this.hashTable[nextprobeAddress];
            }
            this.hashTable[homeAddress] = {record,numberOfRef: null};
            //Reinsertion phase into the table after displacement
            let firstElementRemoved = temporaryElementRemoved[0];
             let originalHomeAddress = this.hashFunction(firstElementRemoved.key);

            
             nextprobeAddress = originalHomeAddress;
             //This is done to locate or relink the predecessor to the moved element
             while(nextprobeAddress !== temporaryAddressOfElementRemoved){
                probeElement = this.hashTable[nextprobeAddress];
                probeIncrement = (probeElement.numberOfRef
                    * this.__probingFunction(probeElement.record.key)) ;
                 nextprobeAddress = (probeIncrement + nextprobeAddress ) % this.capacity;
                 

             }
             // probeElement will store the predecessor element in the probe chain
             nextprobeAddress = (nextprobeAddress + this.__probingFunction(probeElement.record.key))
                                 % this.capacity;
            //This loop is used to update the nextProbeAddress until we find an empty slot.
            let numberOfRef = probeElement.numberOfRef + 1;
             while(!this.isIndexEmpty(nextprobeAddress) && numberOfRef < this.capacity){
                numberOfRef++;
                nextprobeAddress = (nextprobeAddress + this.__probingFunction(probeElement.record.key)) % this.capacity; 
             }
             if(numberOfRef === this.capacity) throw new Error('Full table');
             probeElement.numberOfRef = numberOfRef;
             //This is where the reinsertion of the items are put back in the table.
             temporaryElementRemoved.forEach((ele,ind,arr) => {
                 this.hashTable[nextprobeAddress] = {record: ele, numberOfRef: null};
                 if(ind !== arr.length - 1){
                    //temporary pointer to point to predecessor address.
                    let addr = nextprobeAddress;
                    nextprobeAddress = (nextprobeAddress + 
                        this.__probingFunction(this.hashTable[nextprobeAddress].record.key))
                            % this.capacity;
                    
                    numberOfRef = 1;
                    //Look until we find empty location
                    while(!this.isIndexEmpty(nextprobeAddress) && numberOfRef < this.capacity){
                        numberOfRef++;
                        nextprobeAddress = (nextprobeAddress + this.__probingFunction(this.hashTable[nextprobeAddress].key))
                            % this.capacity; 

                        }  
                        if(numberOfRef === this.capacity) throw new Error('Full table');
                        this.hashTable[addr].numberOfRef = numberOfRef;
                 }
                 
                    
             })
             // if we got here means insertion was successful!
             return true;

        }

        //This case is for primary clustering.
        else{
            let nextProbeAddress = homeAddress;
            //This loop is use to run from the beginning to the end of a probe chain and
            // throw error if record we are trying to insert already exist in the probe chain.
            while(probeElement.numberOfRef !== null){
                nextProbeAddress = (nextProbeAddress + (probeElement.numberOfRef * 
                        this.__probingFunction(probeElement.record.key))
                        ) % this.capacity;
                probeElement = this.hashTable[nextProbeAddress];
                if(probeElement.record.key === key) throw new Error(' Duplicate record');
                
            }
            //At the end of the loop, the probeElement should hold the last element on the
            // probe chain.
            let addr = nextProbeAddress;// this temp addr holds the address of the last item in the probeChain
            nextProbeAddress = (nextProbeAddress + this.__probingFunction(probeElement.record.key)) % 
                    this.capacity;
                
               let numberOfRef = 1;
                //Look until we find empty location
                while(!this.isIndexEmpty(nextProbeAddress) && numberOfRef < this.capacity){
                    numberOfRef++;
                    nextProbeAddress = (nextProbeAddress + this.__probingFunction(probeElement.record.key)) 
                        % this.capacity; 

                    }  
                    if(numberOfRef === this.capacity) throw new Error('Full table');
                    this.hashTable[addr].numberOfRef = numberOfRef;
                    this.hashTable[nextProbeAddress] = {record, numberOfRef: null};
                    return true;
        }
    }
    toString(){
        let str= '--------------\n';
        for(let el of this.hashTable){
            let nofS = '';
            if(el){
                str += '| '+ el.record.key + '  | '
                if(el.numberOfRef === null) nofS = '$';
                else nofS = el.numberOfRef;
                str += nofS +'  |\n'
            }
            else str += '|     |    |\n';
            
        }
        return str += '--------------\n' ;
        
    }
}



let cChain = new ComputedChaining(9);
cChain.insert({key:27,name:'Jephter'})
cChain.insert({key:18,name:'Swahile'})
cChain.insert({key:29,name:"austin"})
cChain.insert({key:28,name:'eloho'})
cChain.insert({key:39})
cChain.insert({key:13})
cChain.insert({key:16})
cChain.insert({key:38})
cChain.insert({key:53})
console.log(cChain.toString(), cChain.hashTable.length,cChain.capacity);