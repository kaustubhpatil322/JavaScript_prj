let hr=23
let min = 59
let sec =50

function showClock()
{
    console.clear()
    console.log(hr+ " : " + min + " : "+sec)
   
    
if(sec == 59)
    {
        if(min == 59)
        {
            if(hr == 23)
            {
                hr=0;
                min=0;
                sec = 0;
            }
            else{
            min = 0;
            hr++;
            }
        }
        else{
            min ++;
        }
        sec = 0;
        
    }
    else{
        sec++;
    }
    setTimeout(showClock , 1*1000)

}

setTimeout(showClock ,1*1000 )


