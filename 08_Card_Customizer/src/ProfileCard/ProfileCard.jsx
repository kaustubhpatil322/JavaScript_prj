import {useState} from "react";
import Profile from "../assets/Profile.png"
import ProfPic from "../assets/prof_pic.jpg"
import styles from "./ProfileCard.module.css"


function ProfileCard(){
    const [name , setName] = useState("Kaustubh Patil");
    const [email ,  setEmail] = useState("ksp@gmail.com");
    const [cardEdit , setCardEdit] = useState(false);
    const [bio , setBio] = useState("This is Kaustubh, Passionate in Tech.")
    const [avatar , setAvatar] = useState(Profile)

    const editButtonHandler = ()=>{
            setCardEdit(true);
  
    }

    const saveButtonHandler = ()=>{
        setCardEdit(false);
    }

    const onClickAvatar = ()=>{
        setAvatar((prev)=>{
            if(prev === Profile){
                setAvatar(ProfPic)
            }
            else{
                setAvatar(Profile)
            }
        })
    }


        return (
            <div className={styles.profile_card}>

                <h2 className="name"></h2>
                <div>
                    {cardEdit ? (

                    <div>
                        
                                <img alt="avatar"
                                className ={styles.avatar}
                                id="avatar"
                                src = {avatar}
                                ></img> 
                                <br />
                                <button onClick={onClickAvatar}
                                        className={styles.avatar_button}
                                >Change Avatar</button>
                            <br /><br />
                    
                        <div >
        
                            <input type="text"
                                   
                                    value={name}
                                    onChange ={
                                        (e)=>{
                                           setName(e.target.value)
                                        }
                                    }
                            />
                        </div>
                        <br />
                        <div> 
                              
                            <input type="email" 
                            value={email}
                            placeholder = "Enter email"
                            onChange = {
                                (e)=>{
                                    setEmail(e.target.value)
                                }
                            } 
                            />

                        </div>
                        <br />
                        <div>
                            <input type="text"
                                    placeholder="enter bio"
                                    onChange={
                                        (e)=>{
                                            setBio(e.target.value)
                                        }
                                    }
                                    maxLength={35}/>
                        </div>
                    </div>

                    )
                    : 
                    (
                    <div className ={styles.name}>
                        <img alt="avatar"
                        className ={styles.avatar}
                        id="avatar"
                        src = {avatar}
                        ></img>
                        <br /><br />
                        <label htmlFor="name"
                            
                        >
                          {name}
                        </label>
                        <br />
                        <label htmlFor="email">
                         {email}
                        </label>
                        <br />
                        <p> {bio}</p>
                    </div>

                    )
                    }
                </div>
                
                <div>
                    {
                    cardEdit ?
                    (
                        <div>
                            <br />
                        <button className="save-button"
                        onClick={saveButtonHandler}
                        >Save</button>
                        </div>
                    )
                    :
                    (
                        <button className="edit-button"
                        onClick={editButtonHandler}
                    >Edit</button>
                    )
                }
                </div>

            </div>
        )
}

export default ProfileCard