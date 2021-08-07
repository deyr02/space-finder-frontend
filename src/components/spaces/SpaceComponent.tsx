import * as React from 'react';
import { SpaceObject } from '../../model/Model';
import spaceImage from '../../building.jpg';
import './SpaceComponent.css';

interface Props{
    spaceObject: SpaceObject,
    reserveSpace: (spaceID:string)=> void,
}
export default function SpaceComponent({spaceObject, reserveSpace}:Props){

    function renderImage(){
        if(spaceObject.photoUrl){
            return <img src = {spaceObject.photoUrl} alt={spaceObject.name}/>
        }
        else{
            return <img src={spaceImage} alt=""/>
        }
    }
    return(
        <div className="spaceComponent">
            {renderImage()}
            <label className='name'>{spaceObject.name}</label><br/>
            <label className='spaceId'>{spaceObject.spaceId}</label><br/>
            <label className='location'>{spaceObject.location}</label><br/>
            <button onClick={()=>reserveSpace(spaceObject.spaceId)}>Reserve</button>
        </div>
    )

}