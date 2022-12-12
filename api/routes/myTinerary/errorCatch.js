module.exports=(country)=>{
    console.log(country)
    if(country.toLowerCase()==="south korea"||country.toLowerCase()==='korea'){
        return 'Republic of Korea'
    }
    if(country.toLowerCase()==="america"||country.toLowerCase()==='united states'||country.toLowerCase()==='us'||country.toLowerCase()==='usa'){
        return 'United States of America'
    }
    if(country.toLowerCase()==="jordan"){
        return 'Hashemite Kingdom of Jordan'
    }
    if(country.toLowerCase()==="uae"){
        return 'United Arab Emirates'
    }
    if(country.toLowerCase()==="bosnie"){
        return 'Bosnia and Herzegovina'
    }
    if(country.toLowerCase()==="bonaire"){
        return 'Bonaire, Saint Eustatius and Saba'
    }
    if(country.toLowerCase()==="drc"){
        return 'Democratic Republic of the Congo'
    }
    if(country.toLowerCase()==="congo"){
        return 'Republic of the Congo'
    }
    if(country.toLowerCase()==="uk"){
        return 'United Kingdom'
    }
    if(country.toLowerCase()==="holland"){
        return 'Netherlands'
    }
    if(country.toLowerCase()==="palestine"){
        return 'Palestinian Territory'
    }
    if(country.toLowerCase()==="trinidad"){
        return 'Trinidad and Tobago'
    }

    else{
        return country
    }
}