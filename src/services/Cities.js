import { ajax } from '../tools/ajax';

export const getCities = async (countryCode) => {
    const optionsRequest = {
        method: 'GET',
        url: 'https://spott.p.rapidapi.com/places',
        params: {
            limit: '20', 
            country: countryCode, 
            type: 'CITY'
        },
        headers: {
            'X-RapidAPI-Key': 'bcff5b7e4cmsh803b64b021cd2e1p1af011jsn1cb02f29d43b',
            'X-RapidAPI-Host': 'spott.p.rapidapi.com'
        }
    };
    return await ajax(optionsRequest);
}