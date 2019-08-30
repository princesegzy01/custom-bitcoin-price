# Custom bitcoin price

## Summary  
This package consumes a coindesk API to get the bicoin price then add or remove a markup base on if you are buying or selling in other to get the final price with all action being perfomed all from a graphiql interface.

## Technology used
1. Nodejs
2. Mocha  
3. Typescript
4. TsLint
5. Graphql


##  Setup & Installation
- Clone the repository into a directory of your choice
- Open your Terminal and run `git clone https://github.com/princesegzy01/custom-bitcoin-price.git`
- change directory to the app you cloned buy running `cd custom-bitcoin-price`
- Install dependencies by running `npm install` on your terminal.

## Start Server
- From your terminal, run  `npm run ts-watch` to watch changes to typescripts file and automatically transpile it.

- open another terminal and run `node index.js` to start the server. you should see an output like this *Running a GraphQL API server at localhost:3000/graphiql*.

## Open Application
- Open your browser and logon to `http://localhost:3000/graphiql`. you should see a page like below.


<img src="https://raw.githubusercontent.com/princesegzy01/custom-bitcoin-price/master/graphQL.png"
     alt="Markdown Monster icon"
     style="float: left; margin-right: 10px;" />

## Expample with Details
This app contain a single graphQL query method named `calculatePrice`. This method accept three required arguments:

- `type`: (String) This can either be `buy` or `sell` buying means you are buying from the platform and selling means you are selling to the platform.

- `margin` (Float): This is a percentage that is used in a calculating the markup or markdown to get the final price. margin must be between 0.1 to 1.0

- `exchangeRate` (Number) : This is a custom USD/NGN exchange  that is used to connvert the dollar price to Naira equivalent.

On the graphiql interface, type the following code 

    {  
        calculatePrice(type:"buy", margin : 0.2, exchangeRate :300) 
    }

you will receive a response containing the peice based on the parameter you supplied. sample response : 

    {
        "data": {
            "calculatePrice": "3429289.80"
        }
    }

## Test

The test for this application are written using the following tech nologies : Mocha, Chai and Supertest.

To run the test, open your Terminal, cd into the project root and run  `npm test`.



Feel free to reach out to me if you have any questions at princesegzy01@gmail.com