import * as React from 'react';
import './ConfirmModalComponentProps.css';

interface Props{
    show: boolean,
    content: string,
    close: () => void
}
export default function ConfirmModalComponent({show, content, close}:Props){
    return(
       show ? <div className='modal'>
                <div className='modal-content'>
                    <h2>You tried to resrve and ...</h2>
                    <h3 className='modalText'>{content}</h3>
                    <button className='modalButton'  onClick={()=> close()} >Ok, close</button>
                </div>
            </div> : <></>
    )
}