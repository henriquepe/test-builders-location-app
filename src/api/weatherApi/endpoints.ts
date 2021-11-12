import moment from 'moment'
import weatherApi from './index'

interface GetWeatherWithLatitudeAndLongitudeDTO {
  latitude: number
  longitude: number
}
export async function getWeatherWithLatitudeAndLongitude({
  latitude,
  longitude,
}: GetWeatherWithLatitudeAndLongitudeDTO): Promise<string[] | null> {
  const weatherResponse = await weatherApi.get(
    `/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&lang=pt_br&units=metric`,
  )

  if (!weatherResponse) {
    return null
  }

  const currentTemperature = `Temperatura atual: ${parseInt(
    weatherResponse.data.main.temp,
  )}°C`
  const maxTemperature = `Maxima de hoje: ${parseInt(
    weatherResponse.data.main.temp_max,
  )}°C`
  const minTemperature = `Minima de hoje: ${parseInt(
    weatherResponse.data.main.temp_min,
  )}°C`
  const region = `Regiao de: ${weatherResponse.data.name}`
  const thermalSensation = `Sensaçao termica de: ${parseInt(
    weatherResponse.data.main.feels_like,
  )}°C`
  const weatherData = [
    currentTemperature,
    maxTemperature,
    minTemperature,
    region,
    thermalSensation,
  ]

  return weatherData
}
