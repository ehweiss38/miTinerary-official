class Node{
    constructor(val){
        this.val=val
        this.next=null
        this.prev=null
        //distance to next set stop
    }
}

class DLL{
    constructor(){
        this.length=0
        this.start=null
        this.tail=null
    }
    push(val){
        let node=new Node(val)
        if(!this.start){
            this.start=node
        }else{
            this.tail.next=node
            node.prev=this.tail
        }
        this.tail=node
        this.length++
        return this
    }
    insert(index, val){
        if(index<0||index>this.length)return undefined
        if(!this.start||index===this.length)this.push(val)
        let node= new Node(val)
        if(index===0){
            node.next=this.start
            this.start.prev=node
            this.start=node
        }else{
            let curr
            if(index/this.length<=.5){
                console.log('check', index, this.length)
                let i=0
                curr=this.start
                while(i<index-1){
                    console.log(i,curr.val.name)
                    curr=curr.next
                    i++
                }
                node.next=curr.next
                curr.next.prev=node
                node.prev=curr
                curr.next=node
            }else{
                console.log('tail insert')
                let i=this.length-1
                curr=this.tail
                while(i>index){
                    curr=curr.prev
                    i--
                }
                node.prev=curr.prev
                curr.prev.next=node
                node.next=curr
                curr.prev=node
            }
        }
        this.length++
        return this
    }
}
module.exports={
    Node,DLL
}