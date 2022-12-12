module.exports=(total,startMid,midEnd)=>{
    console.log('total:',total,'startMid:',startMid,'midEnd:', midEnd)
    if((startMid+midEnd)/total>1.75){
        console.log('stop rejected')
        return false
    }
    if(startMid>total||midEnd>total){
        console.log('stop rejected')
        return false
    }
    console.log('stop approved')
    return true
}