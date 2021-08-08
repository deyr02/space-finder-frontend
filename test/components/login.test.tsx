import { fireEvent, waitFor, waitForElement } from '@testing-library/react';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import Login from '../../src/components/login';
import { User } from '../../src/model/Model';
import history from '../../src/utils/history';

const someUser: User = {
    userName: 'someUser',
    email: 'someEmail'
}


describe('Login component test suite', ()=>{

    //test Hooks
    // beforeAll(()=>{
    //     console.log('before all');
    // })
    // afterAll(()=>{
    //     console.log('after all');
    // })


    // beforeEach(()=>{
    //     console.log('before each');
    // })
    // afterEach(()=>{
    //     console.log('after each');
    // })
//-------------------------------------------------------------//
    let container:HTMLDivElement;
    //jest mock
    const authServiceMock = {
        login: jest.fn(), //jest mock funtion
        getUserAttributes: jest.fn()
    }

    const setUserMock = jest.fn();
    const setUserAttributeMock = jest.fn();

    const historyMock = history;
    history.push = jest.fn();
    //------

    beforeEach(()=>{
        container = document.createElement('div');
        document.body.appendChild(container);
        ReactDOM.render(
            <Login authservice={authServiceMock as any} setUser= {setUserMock} setUserAttributes={setUserAttributeMock}/>
            , container)

    })
    afterEach(()=>{
        document.body.removeChild(container);
        container.remove();
        jest.clearAllMocks();
    })





    test('Render correctly initial documents', ()=>{
        const title = document.querySelector('h2'); //query selector;
        //assertion
        expect(title!.textContent).toBe("Please Login");

        const inputs = document.querySelectorAll('input');
        expect(inputs).toHaveLength(3);
        expect(inputs[0].value).toBe('');
        expect(inputs[1].value).toBe('');
        expect(inputs[2].value).toBe('Login');
        const label = document.querySelector('label');
        expect(label).not.toBeInTheDocument();
    })


    test('Passes credentials correclty', ()=>{
        const setLoginState = jest.fn();

        const inputs = document.querySelectorAll('input');
        const loginInput = inputs[0];
        const passwordInput = inputs[1];
        const loginButton = inputs[2];

        fireEvent.change(loginInput, {target:{value: 'someUser'}});
        fireEvent.change(passwordInput, {target:{value: 'somePass'}});        
        fireEvent.click(loginButton);

        expect(authServiceMock.login).toBeCalledWith(
            'someUser',
            'somePass'
        );
    })


    test('Correclty handles login success', async ()=>{
        authServiceMock.login.mockResolvedValueOnce(someUser);
        const inputs = document.querySelectorAll('input');
        const loginInput = inputs[0];
        const passwordInput = inputs[1];
        const loginButton = inputs[2];

        fireEvent.change(loginInput, {target:{value: 'someUser'}});
        fireEvent.change(passwordInput, {target:{value: 'somePass'}});
        fireEvent.click(loginButton);

        const statusLabel = await waitFor(()=> container.querySelector('label'));
        expect(statusLabel).toBeInTheDocument();
        expect(statusLabel).toHaveTextContent('Login Successfull');
        expect(setUserMock).toBeCalledWith(someUser)
        expect(historyMock.push).toBeCalledWith('/profile')
    });

     test('Correclty handles login fail', async ()=>{
        authServiceMock.login.mockResolvedValueOnce(undefined);
        const inputs = document.querySelectorAll('input');
        const loginInput = inputs[0];
        const passwordInput = inputs[1];
        const loginButton = inputs[2];

        fireEvent.change(loginInput, {target:{value: 'someUser'}});
        fireEvent.change(passwordInput, {target:{value: 'somePass'}});
        fireEvent.click(loginButton);

        const statusLabel = await waitFor(()=> container.querySelector('label'));
        expect(statusLabel).toBeInTheDocument();
        expect(statusLabel).toHaveTextContent('Login failed');
    });



})