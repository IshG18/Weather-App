import React, { useState, useEffect, useRef} from 'react'
import Groq from "groq-sdk";

const METEO_URL = 'https://api.open-meteo.com/v1/forecast?latitude=30.4383&longitude=-84.2807&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,cloud_cover,surface_pressure,wind_speed_10m,wind_direction_10m&hourly=visibility&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timeformat=unixtime&timezone=auto'
const HOLIDAY_URL = 'https://holidays.abstractapi.com/v1/?api_key={KEY}&country=US&year=2020&month=12&day=25'
const NASA_URL = 'https://api.nasa.gov/planetary/apod?api_key={KEY}'
const MOON_URL = 'https://api.qweather.com/v7/astronomy/moon?location=101010100&date=20211120&key={KEY}'
const ALERTS_URL = 'https://api.weather.gov/alerts/active/area/PA' 
const AIR_QUALITY = 'https://api.waqi.info/feed/tallahassee/?token={KEY}'


async function groqCall(city) {
  const groq = new Groq({ apiKey: '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'}); //, dangerouslyAllowBrowser: true | After api data, change key to env variable
  const chatCompletion = await groq.chat.completions.create({
    "messages": [
      {
        "role": "system",
        "content": "SHORTER"
      },
      {
        "role": "user",
        "content": "Return a one sentence historical weather fact for the city the user gives you. (Keep It Short)"
      },
      {
        "role": "assistant",
        "content": {city}
      }
    ],
    "model": "gemma2-9b-it",
    "temperature": 1,
    "max_tokens": 100,
    "top_p": 1,
    "stream": true,
    "stop": null
  });

  for await (const chunk of chatCompletion) {
    process.stdout.write(chunk.choices[0]?.delta?.content || '');
  }
  console.log(chatCompletion.choices[0]?.message?.content || "");
}

export function ApiListener(props) {
  const [err, setError] = useState();
  const [calls, setCalls] = useState([])
  // const [isLoading, setIsLoading] = useState(false) 
  // For adding a loading effect while fetching data

  //Remember Erase Condition to Abort previous request
  //const abortControllerRef = useRef(AbortController)

  useEffect(() => {
    const fetchCalls = async () => {
      // abortControllerRef.current?.abort()
      // abortControllerRef.current = new AbortController();

      //setIsLoading(true)
      try {
        const response = await fetch(`${METEO_URL}`)
          //,{signal: abortControllerRef.current?.signal,}
      
        //wd = weather data
        const wd = await response.json()
        setCalls(wd)
      } catch (e) {
        if (e === "AbortError") {
          console.log('Aborted');
          return
        }
        setError(e)
      }
      // finally {
      //   setIsLoading(false)
      // }
    }
    fetchCalls()
  }, []);

  // if (isLoading) {
  //   return <div>Loading........................</div>
  // }

  if (err) { return <div>Something went wrong! Please reload and try again.</div> }

  return (
    <div>
    <h2>Calls</h2>
    <span>Open Meteo
      <p>
      {/* {calls.map((call) => {
        return (
          call
        )
      })} */}
      {}
      </p>
    </span>
    </div>
    
  )
}
