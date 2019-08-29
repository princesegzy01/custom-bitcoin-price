import axios from 'axios';

// The root provides a resolver function for each API endpoint
const root = {
    hello: () => {
        return "Hello world!";
    },

    // calculate price resolver calculates prices for buy and cell action
    // based on margin and exchange rates
    calculatePrice: async function ({ type, margin, exchangeRate }: priceArgs ) {

        // set margin price
        let marginPrice = 0.0;

        // set the totalPrice
        let totalPrice = 0;

        // set current BTC price 
        let currentBTCPrice = 0;

        // coinDesk API URL to get BTC price
        const url = 'https://api.coindesk.com/v1/bpi/currentprice.json';

        // get current bitcoin price from coindesk.com API
        try {
            const response = await axios.get(url);
            const data = response.data;

            // return an error if unnable to get the float rate.
            if (!data.bpi.USD.rate_float){
                return "Cannot get bitcoin flat rate";
            }

            // set the current price from the BTC float field
            currentBTCPrice = data.bpi.USD.rate_float;
        } catch (error) {
            
            // return error if unnable to get response from the API call
            return "Unnable to fetch bitcoin price from coindesk API";
        }

        // return error if margin is greater than 1
        if (margin > 1){
            return "Margin cannot be greater than 1";
        }

        // return error if margin is less than or equal to 0
        if (margin <= 0){
            return "Margiin cannot be lesser or equal to 0";
        }

        // return error if type is not equal to buy or sell
        if (type != "buy"  &&  type != "sell"){
            return "Invalid type";
        }

        // get margiin price from the currentBTC price
        // by getting the margin percentage on the currentBTCPrice
        marginPrice = currentBTCPrice * margin;

        // if type is buy
        // add the margin price to the current BTC price
        if (type == "buy"){
           totalPrice = currentBTCPrice + marginPrice;
        }

        // if type is sell
        // remove marginPrice from currentBTC price.
        if (type == "sell"){
            totalPrice = currentBTCPrice - marginPrice;
        }

        // NGN price is multiplying th total price with the exchange rate value
        let ngnPrice: number = exchangeRate * totalPrice;
        
        // return the naira equivalent of the price
        return ngnPrice.toFixed(2).toString();
    }   
};

module.exports = root;
export default root;