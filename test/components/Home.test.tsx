import React from 'react';
import { render } from '@testing-library/react';
import  Home  from '../../src/components/Home';

describe('home test suite', ()=>{
    test('renders component correctly', ()=>{
        const  { getByText }  = render(<Home />);
        const helloText = getByText(/Welcome to Home Page/i);
        expect(helloText).toBeInTheDocument();
    })
});