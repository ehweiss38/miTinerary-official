module.exports=(page,url)=>{
    console.log('page')
    const params={
        method: 'GET',
        url: url,
        params: {page: `${page}`, per_page: '1000',population: '20000'},
        headers: {
          'X-RapidAPI-Key': '700a6ed5e1msha31e4ba252c6b8fp1d3fb5jsnb5498ba3577b',
          'X-RapidAPI-Host': 'countries-cities.p.rapidapi.com'
        }
    }
    return params
}