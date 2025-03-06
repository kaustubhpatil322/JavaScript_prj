let hr=0
let min = 0
let sec =0

function showClock()
{
    console.clear()
    sec++
    console.log(hr+ " : " + min + " : "+sec)
   
    if(sec == 59 && min!=59)
    {
        sec = 0
        min ++
    }
    if(min == 59 && sec==59)
    {
        sec=0;
        min = 0
        hr++
    }
    if(hr == 23 && min==59 && sec == 59)
    {
        hr ==0;
        return
    }
    setTimeout(showClock , 1*1000)

}

setTimeout(showClock ,1*1000 )