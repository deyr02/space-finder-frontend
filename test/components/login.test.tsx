import ReactDOM from 'react-dom';
import Login from '../../src/components/login';
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
        login: jest.fn() //jest mock funtion
    }

    const setUserMock = jest.fn();
    const setUserAttributeMock = jest.fn();
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
})