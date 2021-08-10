import  React from 'react';
import ReactDOM from 'react-dom';
import { SpaceObject } from '../../../src/model/Model';
import Spaces from '../../../src/components/spaces/Spaces';
import { DataService } from '../../../src/services/DataService';
import { act, fireEvent, waitFor } from '@testing-library/react';


const someSpaces: SpaceObject[] = [
  {
    location: "Paris",
    name: "Park place",
    spaceId: "1234"
  },
  {
    location: "Paris",
    name: "Park place",
    spaceId: "1235"
  },
  {
    location: "Paris",
    name: "Park place",
    spaceId: "1236"
  },
  {
    location: "Paris",
    name: "Park place",
    spaceId: "1237"
  }
];


describe("Space Component test Suite", ()=>{
    const promise = Promise.resolve();
    const dataServiceMock = {
        getSpace: jest.fn(),
        reserveSpace: jest.fn()
    }
    let container:HTMLDivElement;

    beforeEach(()=>{
        dataServiceMock.getSpace.mockResolvedValueOnce(someSpaces);
        container = document.createElement('div');
        document.body.append(container);
        act(()=>{
        ReactDOM.render(<Spaces dataService={(dataServiceMock as any)as DataService} />, container);

        })
    })

    afterEach(()=>{
        document.body.removeChild(container);
        container.remove();
        jest.clearAllMocks();
   
    })

    test("Render all spaces", ()=>{
        const spaces = document.getElementsByClassName('spaceComponent');
        setTimeout(() => {
             expect(spaces.length).toBe(4);
        }, 2000);
    })
    
    test("Correctly calls for reservation all spaces", async() => {
        const buttons = document.querySelectorAll('button');
        expect(buttons!.length).toBe(4);
        fireEvent.click(buttons[0]);
    
        await act(()=> promise);
        expect(dataServiceMock.reserveSpace).toBeCalledWith('1234');
        //This test have a bug that need to be fixed later. 
 
    });

    test("Correctly displays modal with reservation", async () => {
    dataServiceMock.reserveSpace.mockResolvedValueOnce('555');
    const buttons = document.querySelectorAll('button');
    fireEvent.click(buttons[0]);
    expect(dataServiceMock.reserveSpace).toBeCalledWith('1234');

    const modalValue = await waitFor(() => document.getElementsByClassName('modalText'));
    expect(modalValue[0]).toHaveTextContent('You reserved the space with id 1234 and got the reservation number 555');
  });

    test("Correctly displays modal without reservation", async () => {
    dataServiceMock.reserveSpace.mockResolvedValueOnce(undefined);
    const buttons = document.querySelectorAll('button');
    fireEvent.click(buttons[0]);

    const modalValue = await waitFor(() => document.getElementsByClassName('modalText'));
    expect(modalValue[0]).toHaveTextContent(`You can't reserve the space with id 1234`);
  });

  test("Correctly closes modal", async () => {
    dataServiceMock.reserveSpace.mockResolvedValueOnce('555');
    const buttons = document.querySelectorAll('button');
    fireEvent.click(buttons[0]);

    const closeButton = await waitFor(() => document.getElementsByClassName('modalButton'));
    fireEvent.click(closeButton[0]);

    const modalValue = await waitFor(() => document.getElementsByClassName('modalText'));
    expect(modalValue[0]).toBeUndefined();
  });

})


