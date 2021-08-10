import ReactDOM from 'react-dom';
import Profile from '../../src/components/Profile';
import {User, UserAttribute} from '../../src/model/Model';
import { StaticRouter } from 'react-router';



const someUser:User = {
    userName: "someUser",
    email:"some@email.com"
}

const someUserAttribute: UserAttribute[]= [
    {
        Name: "Age",
        Value: "25"
    },
    {
        Name: "Position",
        Value:"Manager"
    }
]


describe("Profile Test Suite", ()=>{
    let container: HTMLDivElement;


    test('Setup Test with user', ()=>{
        container = document.createElement('div');
        document.body.append(container);
        ReactDOM.render(<Profile user={someUser} userAttributes={someUserAttribute}/>, container);
    })

    test('renders components with user correctly', ()=>{
        const table = container.querySelector("table");
        expect(table!.rows.length).toBe(2);
    })

    test('Tear down test with user', ()=>{
        document.body.removeChild(container);
        container.remove();
     
    })

    test ('Set up test without user', ()=> {
        container = document.createElement('div');
        document.body.append(container);
        ReactDOM.render(
            <StaticRouter>
                <Profile user={undefined} userAttributes={someUserAttribute}/>
            </StaticRouter>, container);
    })
    test("renders component without user correctly", () => {
        const table = container.querySelector("table");
        expect(table).toBeNull();
    });

    test("teardown test without user", () => {
        document.body.removeChild(container);
        container.remove();
    });


})