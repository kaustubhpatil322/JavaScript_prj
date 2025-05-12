import './Quizz.css';
import {useState , useRef } from 'react';
import quizData from '../../assets/data';

function Quizz(){

    let [index , setIndex ] = useState(0);
    let [question , setQuestion ] = useState(quizData[index]);
    let [lock , setLock] = useState(false);
    let [score , setScore ] = useState(0);
    let [result , setResult] = useState(false);

    let Option1 = useRef(null);
    let  Option2 = useRef(null);
    let Option3 = useRef(null);
    let  Option4 = useRef(null);

    let optionArray = [ Option1, Option2 , Option3 , Option4];
    const checkAns = (e , ans)=>{
        if(lock === false){
                if(question.correctAnswer === ans){
                        setScore(prev => prev+1)
                        e.target.classList.add("correct");//added an element with className = correct
                    }
                else{
                        e.target.classList.add("wrong");
                        optionArray[question.correctAnswer -1].current.classList.add("correct");
                }

                setLock(true);
        }
                    
    }

    const next = ()=>{
        if(lock === true){
            if(index === quizData.length -1){
                setResult(true);
                return 0;
            }
            setIndex(index + 1);
            setQuestion(quizData[index]);
            setLock(false);
            optionArray.map((option)=>{
                option.current.classList.remove("wrong");
                option.current.classList.remove("correct");
                return null;
            })
        }
    }

    const reset = ()=> {
        setResult(false);
        setIndex(0);
        setLock(false);

    }
    return (
        <div className="container">
            <h1>Quizz App</h1>
            <hr />
            {result ? 
            <>

            <h2>You Scored {score} out of {quizData.length}</h2>
            <hr />
            <button onClick={reset}>Reset</button>
            
            </> :
            
            <>
            
                <h2>{index+1}.{question.question}</h2>
                <ul>
                    <li ref={Option1} onClick={(e)=>{checkAns(e , 1)}}>{question.options[0]}</li>
                    <li ref={Option2} onClick={(e)=>{checkAns(e , 2)}}>{question.options[1]}</li>
                    <li ref={Option3} onClick={(e)=>{checkAns(e , 3)}}>{question.options[2]}</li>
                    <li ref={Option4} onClick={(e)=>{checkAns(e , 4)}}>{question.options[3]}</li>
                </ul>
                <button onClick = {next}>
                    Next
                </button>
                <div className="index">
                    {index+1} of {quizData.length} Questions.
                </div>
            </>}
        </div>
    )
}

export default Quizz;