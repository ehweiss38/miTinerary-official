module.exports=(stops)=>{
    const merge=(arr1,arr2)=>{
        let r=0
        let l=0
        let neu=[]
        while(neu.length<arr1.length+arr2.length){
            if((arr1[l]&&arr2[r]&&arr1[l].population>arr2[r].population)||r>=arr2.length){
                neu.push(arr1[l])
                l++
            }else{
                neu.push(arr2[r])
                r++
            }
        }
        return neu
    }
    const mergeSort=(arr)=>{
        if(arr.length<=1)return arr
        let mid=Math.floor(arr.length/2)
        let left=mergeSort(arr.slice(0,mid))
        let right=mergeSort(arr.slice(mid))
        return merge(left,right)
    }
    //potentially unneeded
    const copy=mergeSort(stops)
    return copy
}