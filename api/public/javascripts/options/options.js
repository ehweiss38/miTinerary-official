module.exports= {
    countryList:{
        method: 'GET',
        url: 'https://countries-cities.p.rapidapi.com/location/country/list',
        headers: {
        'X-RapidAPI-Key': '700a6ed5e1msha31e4ba252c6b8fp1d3fb5jsnb5498ba3577b',
        'X-RapidAPI-Host': 'countries-cities.p.rapidapi.com'
        }
    },
    countryCities:{
        method: 'GET',
        url: null,
        params: {page: '1', per_page: '400',population: '100000'},
        headers: {
          'X-RapidAPI-Key': '700a6ed5e1msha31e4ba252c6b8fp1d3fb5jsnb5498ba3577b',
          'X-RapidAPI-Host': 'countries-cities.p.rapidapi.com'
        }
    },
    cityInfo:{
        method: 'GET',
        url: null,
        headers: {
            'X-RapidAPI-Key': '700a6ed5e1msha31e4ba252c6b8fp1d3fb5jsnb5498ba3577b',
            'X-RapidAPI-Host': 'countries-cities.p.rapidapi.com'
        }
    }
    
};