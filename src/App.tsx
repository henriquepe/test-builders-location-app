import React, { useEffect, useState } from 'react'
import { getWeatherWithLatitudeAndLongitude } from './api/weatherApi/endpoints'
import { MainPage } from './pages/MainPage'
import GlobalStyle from './style/index'

function App() {
  const [weather, setWeather] = useState<string[] | null>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    handleGetLocationPermissions()
  }, [])

  function handleGetLocationPermissions() {
    navigator.geolocation?.getCurrentPosition(
      () => {
        return
      },
      () => {
        alert(
          'Não foi possível obter sua localização, favor verificar permissões no navegador.',
        )
      },
      { timeout: 5000 },
    )
  }

  function handleGetUserLatitudeAndLongitude() {
    if (navigator.geolocation) {
      setLoading(true)
      navigator.geolocation?.getCurrentPosition(
        saveUserLocalization,
        () => {
          alert(
            'Não foi possível obter sua localização, favor verificar permissões no navegador.',
          )
          setLoading(false)
        },
        { timeout: 5000 },
      )
    } else {
      console.error('Geolocation is not supported by this browser.')
      setLoading(false)
    }
  }

  async function saveUserLocalization(position: GeolocationPosition) {
    if (position) {
      try {
        const weatherResponse = await getWeatherWithLatitudeAndLongitude({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
        setWeather(weatherResponse)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <>
      <MainPage
        weather={weather}
        handleGetUserLatitudeAndLongitude={handleGetUserLatitudeAndLongitude}
        loading={loading}
      />
      <GlobalStyle />
    </>
  )
}

export default App
