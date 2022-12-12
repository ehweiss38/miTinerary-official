module.exports=(type,coords)=>{
    console.log(coords)
    const latitude=coords[0]
    const longitude=coords[1]
    let options
    if(type==='hotels'){
        options={
            method: 'GET',
            url: 'https://booking-com.p.rapidapi.com/v1/hotels/search-by-coordinates',
            params: {
                checkout_date: '2023-06-02',
                units: 'metric',
                room_number: '1',
                latitude: latitude,
                checkin_date: '2023-06-01',
                longitude: longitude,
                adults_number: '2',
                order_by: 'popularity',
                filter_by_currency: 'USD',
                locale: 'en-gb',
                include_adjacency: 'true',
                page_number: '0'
            },
            headers: {
                'X-RapidAPI-Key': '700a6ed5e1msha31e4ba252c6b8fp1d3fb5jsnb5498ba3577b',
                'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
            }
        };
        console.log(options.url)
    }else if(type==='restaurants'||type==='attractions'){
        const url=`https://travel-advisor.p.rapidapi.com/${type}/list-by-latlng`
        options={
            method: 'GET',
            url: url,
            params: {
                latitude: latitude,
                longitude: longitude,
                limit: '30',
                currency: 'USD',
                lunit: 'km',
                lang: 'en_US'
            },
            headers: {
                'X-RapidAPI-Key': '700a6ed5e1msha31e4ba252c6b8fp1d3fb5jsnb5498ba3577b',
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }
        }
    }
    return options
}