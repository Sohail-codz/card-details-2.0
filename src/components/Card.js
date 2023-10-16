import React, {useState} from 'react';
import './Card.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Card({onUpdateCardInfo}){

    const notify = ()=>{
        toast.success('DONE!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
    }
    const [nameInput,setNameInput]=useState('');
    const [cninput,setcninput]=useState('');
    const [monthInput,setMonthInput]=useState('');
    const [yearInput,setYearInput]=useState('');
    const [cvcInput,setCvcInput]=useState('');

    const [errorTextcnum,setErrorTextcnum]=useState('');
    const [errorTextdate,setErrorTextdate]=useState('');
    const [errorTextcvc,setErrorTextcvc]=useState('');
    const [errorTextName, setErrorTextName] = useState('');

    const validateAlphabets = (input) => {
        const regex = /^[A-Za-z\s]+$/;
        return regex.test(input);
    };

    const validationNumbers = () =>{
        let isError = false
        
        if(cvcInput.length!==3 ){
            setErrorTextcvc('Wrong cvc')
            setCvcInput('')
            isError = true
        }
        else{
            setErrorTextcvc('')
        }
        if(cvcInput === ''){
            setErrorTextcvc('CVC Required')
            isError = true
        }
        if(yearInput.length !== 2 || monthInput.length !== 2 || monthInput>12 || monthInput<1){
            setErrorTextdate('Wrong Date')
            setYearInput('')
            setMonthInput('')
            isError = true
        }
        else{
            setErrorTextdate('')
        }
        if(yearInput === '' || monthInput === ''){
            setErrorTextdate('Date Required')
            isError = true
        }
        if(cninput.length!==16 || cninput === ''){
            setErrorTextcnum('Wrong Card Number')
            setcninput('')
            isError = true
        }
        else{
            setErrorTextcnum('')
        }
        if(cninput === ''){
            setErrorTextcnum('Card number required')
            isError = true
        }
        if (!validateAlphabets(nameInput)) {
            setErrorTextName('Name can only have alphabets');
            setNameInput('');
            isError = true;
        }
        else{
            setErrorTextName('');
        }
        if(nameInput === ''){
            setErrorTextName('Name required')
            isError = true
        }
        return isError
    };


    return(
        <div className='details'>
            <form className='creditcarddetails' onSubmit={(e)=>{

                e.preventDefault();

                if(validationNumbers()){
                    return
                }

                let tnNumber = ""
                for(let i = 1; i <= 16; i++){
                    tnNumber += cninput[i - 1]  
                    if(i % 4 === 0 && i !== 16) 
                        tnNumber += " "
                }

                const obj={
                    name:nameInput,
                    CardNumber:tnNumber,
                    month:monthInput,
                    year:yearInput,
                    cvc:cvcInput
                }
                
                onUpdateCardInfo(obj);

                console.log(obj);
                setNameInput('');
                setcninput('');
                setMonthInput('');
                setYearInput('');
                setCvcInput('');

                notify();

            }}>
                <label htmlFor='c-name' >CARDHOLDER NAME</label><br></br>
                    <input
                    value={nameInput}
                     onChange={(e)=>{
                        setNameInput(e.target.value);
                     }}                     
                    type='text' name='CardName' id='c-name' placeholder='e.g. Jane Appleseed' /><br></br>
                    <p style={{color:'red'}}>{errorTextName}</p>
                    <label htmlFor='c-number' >CARD NUMBER</label><br></br>
                    <input 
                    value={cninput}
                    onChange={(e)=>{
                       setcninput(e.target.value);
                    }}   
                    type='number' name='CardNumber' id='c-number' placeholder='e.g. 1234 5678 9123 0000' /><br></br>
                    <p style={{color:'red'}}>{errorTextcnum}</p>
                    <div className='date-input-box'>
                        <div className='datearea'>
                            <label htmlFor='date'>EXP. DATE (MM/YY)</label><br></br>
                            <input 
                            value={monthInput}
                            onChange={(e)=>{
                                setMonthInput(e.target.value);
                            }}   
                            type='number' name='month' id='date' placeholder='MM' style={{width:'100px'}} />
                            
                            <input 
                            value={yearInput}
                            onChange={(e)=>{
                                setYearInput(e.target.value);
                            }}   
                            type='number' name='year' id='YY' placeholder='YY' style={{width:'100px',marginLeft:'5px'}} />
                            <p style={{color:'red'}}>{errorTextdate}</p>
                        </div>
                        
                        <div className='cvcarea'>
                            <label htmlFor='c-cvc' style={{marginLeft:'10px'}}>CVC</label><br></br>
                            <input 
                            value={cvcInput}
                            onChange={(e)=>{
                               setCvcInput(e.target.value);
                            }}   
                            type='number' name='cardCvc' id='c-cvc' placeholder='e.g. 123' style={{marginLeft:'10px',width:'210px'}}/><br></br>
                            <p style={{marginLeft:'10px',color:'red'}}>{errorTextcvc}</p>
                        </div>
                    </div>
                <button type='submit'>Confirm</button>
            </form>
            <ToastContainer/>
        </div>
    )
}
 export default Card;
