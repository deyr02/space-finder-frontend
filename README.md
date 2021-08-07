# Installing Jest in the project

## first we need to change "react-script test" to "jest in the project.json

"scripts": {
"start": "react-scripts start",
"build": "react-scripts build",
"test": "jest",
"eject": "react-scripts eject"
},

## Second

With new package versions, new bugs are also coming in.
TypeError: Jest: a transform must export a `process` function.
This error comes from an update in ts-jest 27, incompatible with Jest 26, used by React
Solution:use ts-jest 26.5.4:

    npm i ts-jest@26.5.4

## Third we need to install

-> react typescript jest library
-> jest typescript parser
-> node library
npm i @types/jest ts-jest ts-node
run comand to intall pacakages

## fourth we need to create a jest configureation file in the root direcotry

filename : jest.config.ts

and Include the following lines

---

        import type { Config } from '@jest/types';
        const config:Config.InitialOptions = {
            roots: [
                "<rootDir>/test",
                "<rootDir>/src"
            ],
            transform: {
                "^.+\\.tsx?$": "ts-jest"
            },
            setupFilesAfterEnv: [
                "@testing-library/jest-dom/extend-expect"
            ],
            testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
            moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
            testEnvironment: "jsdom",
            collectCoverage: true,
            collectCoverageFrom: [
                'src/**/*.{ts,tsx}'
            ]
        };
        export default config;
    _______________________________________


# excluding file from test coverage 
## to exclude file test covere, we need add the file fath in collectCoverageFrom in the jest.config.ts file
similar below
_________________________
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
        '!src/services/**', //theser are the file excluded from the test coverage
        '!src/react-app-env.d.ts' // this one too
    ]
_________________________

## Anothe way to exclude file from test coverage by simpley comment the below line on the top of the compnent file
__________________________
/*istanbul ignore file */
export default function App(){
    .........
}
_________________________

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
