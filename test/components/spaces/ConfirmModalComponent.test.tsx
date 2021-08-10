import { fireEvent } from "@testing-library/react";
import React from "react";
import ReactDOM from "react-dom";
import ConfirmModalComponent from '../../../src/components/spaces/ConfirmModalComponent';

describe('Confirmed Modal test suite', ()=>{

    const closeMock = jest.fn();

    let container:HTMLDivElement;

    test("Setup Test showing modal", ()=> {
        container = document.createElement('div');
        document.body.append(container);
        ReactDOM.render(<ConfirmModalComponent close={closeMock} content="some-content" show={true}/>, container);
    });

    test ("showing text correctly", ()=>{
        const modalText = container.querySelector('h3');
        expect(modalText!.textContent).toBe("some-content");
    });

    test("Modal button action", ()=>{
        const modalButton = container.querySelector('button');
        fireEvent.click(modalButton!);
        expect(closeMock).toBeCalled();
    });

    test("TearDown test with show", ()=>{
        document.body.removeChild(container);
        container.remove();
    });

    test ("setup test hiding modal", ()=>{
        container = document.createElement('div');
        document.body.append(container);
        ReactDOM.render(<ConfirmModalComponent close={closeMock} content="some-content" show={false}/>, container);
    })

    test('Hiding modal', ()=> {
        expect(container).toBeEmptyDOMElement();
    })
})