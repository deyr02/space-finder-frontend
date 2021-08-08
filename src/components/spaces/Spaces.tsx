import * as React from 'react';
import { SpaceObject } from '../../model/Model';
import { DataService } from '../../services/DataService';
import ConfirmModalComponent from './ConfirmModalComponent';
import SpaceComponent from './SpaceComponent';

interface Props{
   dataService: DataService
}
export default function Spaces({dataService}:Props){
    
    const[allSpace, setAllSpace] = React.useState<SpaceObject[]|null>(null);
    const[showModal, setShowModal]= React.useState<boolean>(false);
    const[modalContent, setModalContent]= React.useState<string>('');

     React.useEffect( ()=>{
      dataService.getSpace().then(data=>{
            setAllSpace(data);
        });
    },[dataService, setAllSpace])

    async function reserveSpace(spaceId:string) {
        const ReservationResult = await dataService.reserveSpace(spaceId);
        if(ReservationResult){
            setShowModal(true);
            setModalContent(`You reserved the space with id ${spaceId} and got the reservation number ${ReservationResult}`)
        }
        else{
            setShowModal(true);
            setModalContent(`You can't reserve the space with id ${spaceId}`);
        }
        
    }

    function close(){
        setShowModal(false);
        setModalContent('');
    }

    function renderSpaces(){
        return  allSpace?.map(item =>(
            <SpaceComponent key={item.spaceId} spaceObject={item} reserveSpace={reserveSpace} />
        ))
    }

    return(
        <div>
            <h2>Welcome to the Spaces page!</h2>
            {renderSpaces()}
            <ConfirmModalComponent close={close} content={modalContent} show={showModal} />
        </div>
    )

}