import img1 from "../../assets/img1.jpg"
import img2 from "../../assets/img2.jpg"
import img3 from "../../assets/img3.jpg"
import img4 from "../../assets/img4.jpg"
import img5 from "../../assets/img5.jpg"
import './Background.css'

function Background({bgCount, playStatus}){
    if(!playStatus){
       return 
    }
    if(bgCount === 1){
        return (
            <img src={img1} className='background'/>
        )
    }
    if(bgCount === 2){
        return (
            <img src={img2} className='background'/>
        )
    }
    if(bgCount === 3){
        return (
            <img src={img3} className='background'/>
        )
    }
    if(bgCount === 4){
        return (
            <img src={img4} className='background'/>
        )
    }
    if(bgCount === 5){
        return (
            <img src={img5} className='background'/>
        )
    }
}

export default Background;