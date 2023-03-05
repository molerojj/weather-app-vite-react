import { ajax } from '../tools/ajax';

export const getCityWeather = async (city) => {
    const optionsRequest = {
        method: 'GET',
        url: 'https://api.openweathermap.org/data/2.5/weather',
        params: {
            q: city, 
            appid: 'd1ced20bd0505f6ef872b641db0dca3e', 
            units: 'metric'
        }
    };
    return await ajax(optionsRequest);
}