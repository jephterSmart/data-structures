/* 
* Binary search trees are data structures which have only two children
* and satisfy Binary Search Tree invariant : which is, the left child is lesser
* than the parent node and the right child is greater than the parent node.
*
*
* @uthor : Jephter Oghenekaro.
*  
*/

const Queue = require('./Queues');

class BinarySearchTrees {
    constructor(elem){
        this.root = {left: null, right: null, value: elem}
        //this is done to create a lightweight object
        this.root.__proto__ = null;
        this.nodeCount = 1;
    }
    isEmpty() {
        return this.size === 0;
    }
    get size(){
        return this.nodeCount;
    }
    add(elem){
        if(this.contains(elem)){
            return false;
        }
        else{
            this.root = this._add(this.root,elem);
            this.nodeCount++;
            return true;
        }
    }
    _add(node,elem){
        if(node == null){
            node = {left: null, right: null, value: elem}
            // This is done to create a lightweight object.
            node.__proto__ = null;
        }
        else{
            if(node.value > elem){
                node.left = this._add(node.left,elem)
        
            }
            else{
                node.right = this._add(node.right,elem);
            }
        }
        return node;

    }
    // __cleanParent(){
    //     this.root.parent = null;
    //     delete this.root.parent;
    // }
    // THIS REMOVE METHOD IS EFFICIENT BUT IS COST MEMORY, WHICH IS NOT SUITABLE FOR ALL SITUATIONS
    // remove(elem){
    //     let node = this.find(elem);
    //     if(node){
    //      let delNode = this._remove(node);
    //      if(delNode === null ){
    //          if(node.parent.left.value === elem) node.parent.left = null;
    //          if(node.parent.right.value === elem) node.parent.right = null;
    //          this.__cleanParent();
    //      }
    //      if(node.left && node.left.value === delNode.value){
    //         if(node.parent.left.value === elem) node.parent.left = delNode;
    //         if(node.parent.right.value === elem) node.parent.right = delNode;
    //         this.__cleanParent();
    //      }
    //      if(node.right && node.right.value === delNode.value){
    //         if(node.parent.left.value === elem) node.parent.left = delNode;
    //         if(node.parent.right.value === elem) node.parent.right = delNode;
    //         this.__cleanParent();
    //      }
    //         this.nodeCount--;
    //         return true;
    //     } 
    //     else return false;
    // }
    // _remove(node){
    //     if(node.left && node.right){
    //         //we are going to go left and find the largest elem
    //        let rightChild = this._digRight(node.left);
    //        node.value = rightChild && rightChild.value;
    //        node.left = this._remove(rightChild);
    //     }
       
    //     else if(node.left && !node.right ){
    //         node = node.left;
    //     }
    //    else if( node.right && !node.left){
    //         node = node.right;
    //     }
    //     else if(!node.left && !node.right){
    //         node = null;
    //     }
    //     return node;
    // }
    //WE ARE GOING TO IMPLEMENT SOMETHING SIMILAR BUT COST A LITTLE BIT OF MORE CPU
    remove(elem){
        if(this.contains(elem)){
            this.root = this._remove(this.root,elem);
            this.nodeCount--;
            return true;
        }
        else return false;
    }
    _remove(node,elem){
        if(node === null){
            return null;
        }
        if(node.value > elem){
           node.left = this._remove(node.left,elem);
        }
        else if( node.value < elem){
            node.right =this._remove(node.right,elem);
        }
        //For cases where we find a match
        else{
            // when we don't have a left child;
            if(node.left === null){
                let rightChild = node.right;
                node = null;
                return rightChild;
            }
            else if(node.right === null){
                let leftChild = node.left;
                node = null;
                return leftChild;
            }
            // This is the case in which we have left and right trees 
            else{
                let temporary = this._digRight(node.left);
                // make the swap here.
                node.value = temporary.value;
                node.left = this._remove(node.left,temporary.value)
            }
        }
        return node;
    }
    find(elem){
        return this._find(this.root,elem);
    }
    _find(node,elem){
        if(node === null) return null;
        if(node.value === elem) return node;
        else if(node.value > elem){
            //This parent property was added so that we can be able to remove
            //leave node, This will be temporaily memory intensive.
            // node.parent = node;
            // node = {...node, ...this._find(node.left,elem)};
            node = this._find(node.left,elem);
        }
        else{
            //This parent property was added so that we can be able to remove
            //leave node, This will be temporaily memory intensive.
        //     node.parent = node;
        //   node = {...node,...this._find(node.right,elem)};
        node = this._find(node.right,elem);
        }
        return node;
    }
    preOrder(){
        let arr = [];
       this. _preOrder(this.root,arr);
       return arr;
    }
    _preOrder(node,arr){
        if(node === null) return;
        arr.push(node.value);
        this._preOrder(node.left,arr);
        this._preOrder(node.right,arr)

    }
    inOrder(){
        let arr = [];
        this._inOrder(this.root,arr)
        return arr;
    }
    //This method enable us to sort the element in our Binary Search Tree. which make our sorting 
    // algorithm easier.
    _inOrder(node,arr){
        if(node === null) return;
        this._inOrder(node.left,arr);
        arr.push(node.value);
        this._inOrder(node.right,arr);
    }
    postOrder(){
        let arr = [];
        this._postOrder(this.root,arr);
        return arr;
    }
    _postOrder(node,arr){
        if(node === null) return;
        this._postOrder(node.left,arr);
        this._postOrder(node.right,arr)
        arr.push(node.value);
    }
    levelOrder(root){
        
        const queue = new Queue(root);
        let arr = [];
        let next = root;
        runQueue:
        while(next){
            if(next == root){
                try{
                    queue.Dequeue()
                }
                catch(err){}
                
            }
            
            if(next.left !== null )
             queue.Enqueue(next.left)
             if(next.right !== null)
             queue.Enqueue(next.right); 
            arr.push(next.value);
            try{
                next = queue.Dequeue(); 
            }
            catch(er){
                break runQueue;
                
            }
            
        }
        
        return arr;
    }
    contains(elem){
        return elem && this._contains(this.root,elem)
    }
    _contains(node,elem){
       let result;
        if(node === null) return false;
        if(node.value === elem) {
            result = true;
        }
        else if(node.value > elem ){
            result = this._contains(node.left,elem)
        }
        else {
            result = this._contains(node.right,elem)
        }
        return result;
    }
    height(){
        return this._height(this.root);

    }
    _height(node){
        if(node === null) return 0;
       return Math.max(this._height(node.left),this._height(node.right)) + 1
    }
    //This is use to get the smallest element in the right node
    _digLeft(node){
        let elemNode = node.left;
        while(elemNode !== null){
            node = elemNode;
            elemNode = elemNode.left;
        }
        return node;
    }
    //This is use to get the largest Element in the left node.
    _digRight(node){
        let elemNode = node.right;
        while(elemNode !== null){
            node = elemNode;
            elemNode = elemNode.right;
            
        }
        return node;
    }

    toString(){
        return this.levelOrder(this.root).toString()
    }
    
}

const bin = new BinarySearchTrees(3);
bin.add(2)
bin.add(1)
bin.add(4)
bin.add(5)
bin.add(0)
bin.add(10)
bin.add(-3)

console.log(bin +'');
bin.remove(3);
console.log(bin + '')
bin.remove(4);
console.log(bin + '')
bin.add(4);
console.log(bin + '')
bin.remove(4);
console.log(bin + '','\n' + bin.height());
console.log(bin.preOrder())
console.log(bin.inOrder())
console.log(bin.postOrder())

