/*
* This algorithm Enable us to perform the Kraunal minimal Algorithm Spanning, i.e given 
* a graph G(V,E) with vertices (V) and edges(E) we can find the shortest path to travel
* through the entire graph without doing circulation. Basically this algorithm is use find 
* path between element.
*/
'use strict';
class UnionFind{
    constructor(...rest){
        this.numOfComponenet = this.size = rest.length;
        this.sz = [];
        //THis is use to keep the original mappings of the element.
        // Enabling us to do what is called bijection. by having a lookup.
        this.origId = {};

        this.id = [];
        // Object.defineProperties(this,{
        //     sz:{writable:false,configurable:false,value:false,enumerable:false},
        //     origId:{writable:false,configurable:false,value:false,enumerable:false},
        //     id:{writable:false,configurable:false,value:false,enumerable:false}
        // });
        for(let i=0; i<rest.length; i++){
            this.id.push(i);
            this.origId[rest[i]] = i;
            this.sz.push(1);
        }
    }
    findRoot(ele){
        let index = this.origId[ele];
        let p = this.id[index];
        let root = p;
        //loop until we reach the root of the element we are given.
        while(root !== this.id[root])
         root = this.id[root];

         //This step will allow us to do path compression
         while(p !== root){
             let next = this.id[p]
             this.id[p] = root;
             p = next;
         }
         return root;
    }
    componentSize(ele){
        return this.sz[this.findRoot(ele)];
    }
    components(){
        return this.numOfComponenet
    }
    isEmpty(){
        return this.size === 0;
    }
    connected(elem1,elem2){
        let root1 = this.findRoot(elem1);
        let root2 = this.findRoot(elem2);
        if(root1 === root2) return true
        return false;
    }
    unify(elem1,elem2){
        let root1 = this.findRoot(elem1);
        let root2 = this.findRoot(elem2);
        if(this.connected(elem1,elem2)) return;
        if(this.sz[root1] < this.sz[root2]){
            this.id[root1] = root2;
            this.sz[root2] += this.sz[root1];
        }
        else{
            this.id[root2] = root1;
            this.sz[root1] += this.sz[root2];

        }
        this.numOfComponenet--;
    }
    getEle(ind){
        for(let el in this.origId){
            if(this.origId[el] === ind) return el;
        }
    }
    toString(){
        let str ='';
        for (let i = 0; i<this.id.length; i++){
            if(this.getEle(this.id[i]) === this.getEle(i) )
            str += this.getEle(this.id[i]) + '  ';
            else{
                if(str.substring(str.length-3) === this.getEle(this.id[i-1]) + '  '){
                    str = str.substring(0,str.length - 3)
                    
                }
                str += this.getEle(this.id[i]) + ' <=' + this.getEle(i) + '  ';
            
            }
        }
       
         return str;
    }
}

let union = new UnionFind('A','B','C','D','E','F','G','H','I','J');
union.unify('A','B');
union.unify('C','D');
union.unify('E','F');
union.unify('G','H');
union.unify('I','J');
union.unify('J','G');
console.log(union + ' ');