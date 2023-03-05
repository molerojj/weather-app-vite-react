import { useEffect, useState } from "react"
import { getCountries } from './services/Countries';
import { getCities } from './services/Cities';
import { getCityWeather } from './services/Weather';
import style from './App.module.css'
import imgIcon from './Img/weathericon.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDroplet } from '@fortawesome/free-solid-svg-icons';

function App() {
    const [ countries, setCountries] = useState([]);
    const [ cities, setCities] = useState([]);
    const [ weather, setWeather] = useState(null);

    const ordered = (countries) => {
        return countries.sort(function(a,b) {
            let nameA = a.name.common.toUpperCase();
            let nameB = b.name.common.toUpperCase();
            if (nameA < nameB) {
                return -1
            }
            if (nameA > nameB) {
                return 1
            }
            return 0;
        })
    }

    useEffect(() => {
        (async () => {
            const result = await getCountries();
            const data = ordered(result)
            setCountries(data);
        })();
    }, []);

    const countryHandler = async (e) => {
        e.currentTarget.value && setCities(await getCities(e.currentTarget.value));
        setWeather(null)
    }

    const cityHandler = async (e) => e.currentTarget.value && setWeather(await getCityWeather(e.currentTarget.value));

    return (
        
        <div className={style.weatherContainer}> 

            <div className={style.iconTitle}>
                <img src={imgIcon} alt="" />
                <h1>Weather APP</h1>
            </div>

            <div className={style.selections}>

                <div className={style.selectContainer}>
                    <label htmlFor="">Elige un pais: </label>
                    <div className={style.select}>
                        <select onChange={countryHandler} name="" id="">
                            <option value="">Selecciona</option>
                            {countries.map(c => <option key={c.cca2}value={c.cca2}>{c.name.common}</option>)}
                        </select>
                    </div>
                </div>

                { cities.length > 0 && (
                    <div className={style.selectContainer}>
                        <label htmlFor="">Elige una ciudad: </label>
                        <div className={style.select}>
                            <select onChange={cityHandler} name="" id="">
                                <option value="">Selecciona</option>    
                                {cities.map(c => <option key={c.id}>{c.name}</option>)}
                            </select>
                        </div>
                    </div>
                )}

            </div>

                { weather && (
                    <div className={style.allData}>

                        <div className={style.dataLeft}>

                            <div className={style.temp}>
                                <h2>{weather.main.feels_like} °C</h2>
                                <p>- {weather.main.temp_min} °C</p>
                                <p>+ {weather.main.temp_max} °C</p>
                            </div>

                            <div className={style.humidity}>
                                <FontAwesomeIcon icon={faDroplet} className={style.humidityIcon}/>
                                <p className={style.p}>{weather.main.humidity}%</p>
                            </div>

                        </div>

                        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" className={style.iconWeather}/>
                    </div>
                )}
            
        </div>
    )
}

export default App
