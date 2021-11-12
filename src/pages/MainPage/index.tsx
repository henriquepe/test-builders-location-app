import React, { useEffect, useState } from 'react'
import {
  Container,
  LocalSearchButton,
  LocalSearchButtonText,
  WeatherDataList,
  WeatherDataListItem,
  WeatherDataText,
} from './styles'
import Loader from 'react-loader-spinner'

interface MainPageProps {
  weather: string[] | null
  loading: boolean
  handleGetUserLatitudeAndLongitude: () => void
}

export function MainPage({
  weather,
  loading,
  handleGetUserLatitudeAndLongitude,
}: MainPageProps) {
  const [weatherData, setWeatherData] = useState<string[] | null>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setWeatherData(weather)
    setIsLoading(loading)
  }, [loading, handleGetUserLatitudeAndLongitude, weather])

  return (
    <Container>
      <LocalSearchButton
        name="LocalSearchButton"
        onClick={handleGetUserLatitudeAndLongitude}
      >
        {isLoading ? (
          <Loader
            type="Puff"
            color="#00BFFF"
            height={200}
            width={200}
            timeout={8000}
          />
        ) : (
          <LocalSearchButtonText testID="LocalSearchButtonText">
            {weatherData?.length
              ? 'Realizar nova consulta'
              : 'Consultar meu clima'}
          </LocalSearchButtonText>
        )}
      </LocalSearchButton>
      <WeatherDataList>
        {weatherData
          ? weatherData.map((weather, index) => (
              <WeatherDataListItem key={index} testID="WeatherDataListItem">
                <WeatherDataText>{weather?.toUpperCase()}</WeatherDataText>
              </WeatherDataListItem>
            ))
          : null}
      </WeatherDataList>
    </Container>
  )
}
