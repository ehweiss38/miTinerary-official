const axios = require("axios");
const options=require('./options/options')
const setUrl=require('./setUrl/setUrl');
const findCity = require("./options/findCity");


//don't love how this returns object
//needs to handle smaller cities
module.exports= async(countries,cities,states,idx)=>{
  let codes={}
  console.log('index called')
  console.log(countries)
  const countriesList=await axios.request(options.countryList)
  for(let country in countriesList.data.countries){
    if (countriesList.data.countries[country]===countries[0]){
      codes[countries[0]]=country
    }
    if (countries[1]&&countriesList.data.countries[country]===countries[1]){
      codes[countries[1]]=country
    }
  }
  let locObj={}
  let cityObj={}
  let multi=false
  if(cities.length>1){
    multi=true
  }
  console.log("These here are the states",states)
//change to iterate through array only
  for(let i=0;i<cities.length;i++){
    const city=cities[i]
    console.log('looking for:',city)
    cityObj['code']=codes[countries[i]]
    const url=setUrl(cityObj['code'])
    console.log('url',url)
    try{
      let nextPage=true
      let page=1
      let targetCity
      let citiesL
      while(nextPage){
        const citiesList=await axios.request(findCity(page,url))
        citiesL=citiesList.data.cities
        console.log('length',citiesL.length)
        if(citiesL.length<1000){
          nextPage=false
        }
        //weird error here
        let j=0
        const last=citiesL[citiesL.length-1].name
        console.log(nextPage)
        while(nextPage&&j<Math.min(last.length,city.length)){
          console.log('J',j)
          console.log(last[j],city[j])
          if(last[j]<city[j]||(j===Math.min(last.length,city.length)&&last.length<city.length)){
            page++
            break
          }else if(city[j]<last[j]||j===city.length){
            nextPage=false
          }else if(city[j]===last[j]){
            j++
          }
        }
        /*
        if(citiesL[citiesL.length-1].name[0]<city[0]){
          console.log(citiesL[citiesL.length-1].name,city[0])
          page++
          continue
        }else{
          nextPage=false
        }
        */
      }
      //const citiesList=await axios.request(options.countryCities)

      //one particular uber rare edge case in which some cities of name are on one page and not others
      if(states&&states[i]){
        targetCity=citiesL.find(
          lCity=>city===lCity.name&&lCity.division.code==="US-"+states[i]
          )
      }else{
        targetCity=citiesL.find(lCity=>city===lCity.name)
      }

      console.log(targetCity)
      if(idx){
        cityObj['index']=parseInt(idx)
      }
      cityObj['name']=city
      cityObj['country']=countries[i]
      cityObj['id']=targetCity.geonameid
      cityObj['population']=targetCity.population
      cityObj['latitude']=targetCity.latitude
      cityObj['longitude']=targetCity.longitude
      if(multi){
        if(locObj[city]){
          locObj[city+" "]=cityObj
        }else{
          locObj[city]=cityObj
        }
        cityObj={}
      }
    }catch(err){
      console.log(err)
      return ""+i
    }
  }
  if(multi){
    return locObj
  }
  return cityObj
}
/*
  for(let i=0;i<cities.length;i++){
    if(i===1){
      long=true
    }
    locObj[cities[i]]={id:null,code:`${codes[countries[i]]}`}
  }
  for(let city in locObj){
    options.countryCities.url=setUrl(locObj[city]['code'])
    console.log('url',options.countryCities.url)
    const citiesList=await axios.request(options.countryCities)
    const targetCity=citiesList.data.cities.find(lCity=>city===lCity.name)
    console.log(targetCity)
    cityObj['name']=city
    cityObj['id']=targetCity.geonameid
    cityObj['population']=targetCity.population
    cityObj['latitude']=targetCity.latitude
    cityObj['longitude']=targetCity.longitude
    if(long){
      locObj[city]=cityObj
      cityObj={}
    }
  }
  if(long){
    return locObj
  }
  return cityObj
}
  for(let i=0;i<cities.length;i++){
    if(i===1){
      long=true
    }
    locObj[cities[i]]={id:null,code:`${codes[countries[i]]}`}
  }
  for(let city in locObj){
    options.countryCities.url=setUrl(locObj[city]['code'])
    console.log('url',options.countryCities.url)
    const citiesList=await axios.request(options.countryCities)
    const targetCity=citiesList.data.cities.find(lCity=>city===lCity.name)
    const cityObj={}
    console.log(targetCity)
    locObj[city]['name']=city
    locObj[city]['id']=targetCity.geonameid
    locObj[city]['population']=targetCity.population
    locObj[city]['latitude']=targetCity.latitude
    locObj[city]['longitude']=targetCity.longitude
    console.log('loc')
  }
  console.log('idx complete')
  return locObj
}
*/