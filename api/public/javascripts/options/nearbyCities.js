module.exports=(iLatitude,iLongitude, idealDistance,minPop)=>{
    let actualRadius
    if(idealDistance>500){
        actualRadius=500
    }else{
        actualRadius=idealDistance
    }
    console.log('lat',iLatitude)
    console.log('long',iLatitude)
   console.log('minPop',minPop)
   console.log('radius:',actualRadius)
    const params={
        method: 'GET',
        url: 'https://countries-cities.p.rapidapi.com/location/city/nearby',
        params: {
            format: 'json',
            latitude: iLatitude,
            longitude: iLongitude,
            radius: `${Math.floor(idealDistance)}`,
            min_population: minPop,
            per_page: '100'
        },
        headers: {
            'X-RapidAPI-Key': '700a6ed5e1msha31e4ba252c6b8fp1d3fb5jsnb5498ba3577b',
            'X-RapidAPI-Host': 'countries-cities.p.rapidapi.com'
        }
    }
    console.log(params)
    return params
}