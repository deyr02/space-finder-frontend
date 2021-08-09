import { fireEvent } from '@testing-library/react';
import ReactDOM from 'react-dom';
import SpaceComponent from '../../src/components/spaces/SpaceComponent';
import { SpaceObject } from '../../src/model/Model';




describe('Space component test suite', ()=>{
    let container: HTMLDivElement;
    const reserveSpaceMock = jest.fn();
    const spaceObject:SpaceObject = {spaceId:'123', name:'someName', location:"someLocation", photoUrl:'some.url'}
    const spaceObjectWithoutUrl:SpaceObject = {spaceId:'123', name:'someName', location:"someLocation"};

    function cleanUpTest(){
        document.body.removeChild(container);
        container.remove();
        jest.clearAllMocks();
    }
    
    function setUpTests(element: React.FunctionComponentElement<any>){
        container = document.createElement('div');
        document.body.appendChild(container)
        ReactDOM.render(element,container)
    }
    describe('tests with photo URL', ()=>{

        beforeEach(()=>{
            setUpTests(<SpaceComponent spaceObject = {spaceObject} reserveSpace={reserveSpaceMock}/>);
        })

        test('show image correctly', ()=>{
            const image = container.querySelector('img');
            expect(image!).toBeInTheDocument();

            expect(image!.src).toBe('http://localhost/some.url');
        })
        
        test('show labels correclty', ()=>{
            const label = container.querySelectorAll('label');
            expect(label[0]).toHaveTextContent('someName')
            expect(label[1]).toHaveTextContent('123')
            expect(label[2]).toHaveTextContent('someLocation')
        })
        test('reserve spaces', ()=>{
            const button = container.querySelector('button');
            fireEvent.click(button!);
            expect(reserveSpaceMock).toBeCalledWith('123');

        })

        afterEach(()=>{
            cleanUpTest();
        })

    })

    describe('tests without photo URL', ()=>{
     beforeEach(()=>{
            setUpTests(<SpaceComponent spaceObject = {spaceObjectWithoutUrl} reserveSpace={reserveSpaceMock}/>);
           
        })


        test('show image correctly', ()=>{
            const image = container.querySelector('img');
            expect(image!).toBeInTheDocument();

            expect(image!.src).toBeFalsy();
        })

           afterEach(()=>{
            cleanUpTest();
        })
    })




}); 