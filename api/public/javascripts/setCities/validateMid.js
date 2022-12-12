let startMid=calcDistance([coords[0],stopCoords[0]])
        let midEnd=calcDistance([stopCoords[0],coords[1]])
        //console.log(startMid,midEnd)
        let valid=compare(miles,startMid,midEnd)
        if(valid){
            //have to edit slightly if denesting objects
            tripOutline=setupList(foundCities[start],foundCities[end],miles,stops,stopCheck[stopCity],startMid,midEnd)
        }