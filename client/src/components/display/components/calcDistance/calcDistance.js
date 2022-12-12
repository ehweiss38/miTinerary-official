//note: Sourced from geeksforgeeks 
module.exports=(la1,la2,lo1,lo2)=>{

    const distRef=[1128.497220,2256.994440,4513.988880,9027.977761,18055.955520,36111.911040,
        72223.822090,144447.644200,288895.288400,577790.576700,1155581.153000,2311162.307000,
        4622324.614000,9244649.227000,18489298.450000,36978596.910000,73957193.820000,147914387.600000,
        295828775.300000,591657550.500000]
        
    function distance(lat1,
        lat2, lon1, lon2){
        // The math module contains a function
        // named toRadians which converts from
        // degrees to radians.
        lon1 =  lon1 * Math.PI / 180;
        lon2 = lon2 * Math.PI / 180;
        lat1 = lat1 * Math.PI / 180;
        lat2 = lat2 * Math.PI / 180;
        
        // Haversine formula
        let dlon = lon2 - lon1;
        let dlat = lat2 - lat1;
        let a = Math.pow(Math.sin(dlat / 2), 2)
        + Math.cos(lat1) * Math.cos(lat2)
        * Math.pow(Math.sin(dlon / 2),2);
        
        let c = 2 * Math.asin(Math.sqrt(a));
        
        // Radius of earth in kilometers. Use 3956
        // for miles
        let r = 6371;
        
        // calculate the result
        return(c * r);
    }
    const meters=distance(la1,la2,lo1,lo2)*1000/0.065 

    let use=null

    for(let i=0;i<distRef.length;i++){
        if(use){
            break
        }
        if(meters<distRef[i]){
            use=19-i
        }
    }
    console.log(meters,use)

    return use+1

}