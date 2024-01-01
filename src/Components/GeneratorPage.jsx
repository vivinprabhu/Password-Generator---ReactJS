import React, { useEffect, useState } from 'react'
import '../Assests/css/GeneratorPage.css'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import copyIcon from '../Assests/images/copy icon.svg'

const lowercaseList = 'abcdefghijklmnopqrstuvwxyz';
const uppercaseList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbersList = '0123456789';
const symbolsList = '!@#$%^&*()-_=+[{]}|;:,<.>/?';

const GeneratorPage = () => {

  const [password,setPassword] = useState('');
  const [lowerCase,setLowerCase] = useState('true');
  const [upperCase,setUpperCase] = useState('true');
  const [number,setNumber] = useState('true');
  const [symbols,setSymbols] = useState('true');
  const [passwordLength,setPasswordLength] = useState(8);

  useEffect(()=>{
    generatePassword();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[passwordLength])

  const generatePassword = () =>{
    let characterList = '';
    if(lowerCase){
      characterList += lowercaseList;
    }
    if(upperCase ){
      characterList += uppercaseList;
    }
    if(number){
      characterList += numbersList;
    }
    if(symbols){
      characterList += symbolsList;
    }
    let newPassword='';
    for(let i=0;i<passwordLength;i++)
    {
      const randomIndex = Math.floor(Math.random()*characterList.length);
      newPassword+=characterList[randomIndex];
    }
    setPassword(newPassword);
  }

  const copyPassword = async () => {
    const copiedPassword = await navigator.clipboard.readText();
    if(password.length && copiedPassword!==password){
      navigator.clipboard.writeText(password); 
      toast.success('Password copied successfully !', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
    else if(password.length && copiedPassword===password){
      toast.error('Already copied!', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  }

  return (
    <div>
      <div className='navbar'>Password Generator</div> <br></br>
      <div className='container'>
        <div className='password-generator-container'>
          <h2>RANDOM PASSWORD GENERATOR</h2>
          <div className='password-field'>
            <input className='password' value={password} type='text' disabled placeholder='Click on Generate Password' />
            <img className='copyIcon' src={copyIcon} alt='copyIcon' onClick={copyPassword}/>
          </div>

          <div><h3>Customize your password</h3></div>  
          <div className='customize-checkboxes'>
            <div className='checkboxes'>
              <div className='left'>
                <div className='checkbox'>
                  <input type='checkbox' checked={lowerCase} onChange={()=>setLowerCase(!lowerCase)}/>
                  <label>Lowercase (a-z)</label>
                </div>
                <div className='checkbox'>
                  <input type='checkbox' checked={upperCase} onChange={()=>setUpperCase(!upperCase)}/>
                  <label>Uppercase (A-Z)</label>
                </div>
              </div>
              <div className='right'>
                <div className='checkbox'>
                    <input type='checkbox' checked={number} onChange={()=>setNumber(!number)}/>
                    <label>Numbers (0-9)</label>
                </div>
                <div className='checkbox'>
                  <input type='checkbox' checked={symbols} onChange={()=>setSymbols(!symbols)}/>
                  <label>Special (&-#)</label>
                </div>
              </div>
            </div>
          </div>

          <div className='password-length'>
            <h3>Password Length</h3>
              <div className='slider'>
                <p className='range-value'>{passwordLength}</p>
                <div className='range'>
                  <input type="range" min={8} max={42} defaultValue={passwordLength} onChange={(event)=>setPasswordLength(event.currentTarget.value)}/>
                </div>
              </div>
          </div>

          <div className='buttons'>
            <button type='button' onClick={copyPassword}>Copy Password</button>
            <button type='button' onClick={generatePassword}>Generate Password</button>
          </div>

        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default GeneratorPage