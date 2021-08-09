import ReactDOM from 'react-dom';
import SpaceComponent from '../../src/components/spaces/SpaceComponent';
import { SpaceObject } from '../../src/model/Model';




describe('Space component test suite', ()=>{
    let container: HTMLDivElement;
    const reserveSpaceMock = jest.fn();
    const spaceObject:SpaceObject = {spaceId:'123', name:'someName', location:"someLocation", photoUrl:''}

    describe('tests with photo URL', ()=>{

        beforeEach(()=>{
            container = document.createElement('div');
            document.body.appendChild(container)
            ReactDOM.render(<SpaceComponent 
                spaceObject = {spaceObject}
                reserveSpace={reserveSpaceMock}
               
            />,
            container)
        })

        test('basic rendering', ()=>{

        })

        afterEach(()=>{
            document.body.removeChild(container);
            container.remove();
            jest.clearAllMocks();
        })

    })

    describe('tests without photo URL', ()=>{

    })

}); 