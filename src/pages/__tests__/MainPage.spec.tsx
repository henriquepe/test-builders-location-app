import 'regenerator-runtime/runtime.js'
import React from 'react'
import { render } from '@testing-library/react'
import { MainPage } from '../MainPage'
import { create, act } from 'react-test-renderer'

const fakeWeather = [
  'Temperatura atual: 15°C',
  'Maxima de hoje: 17°C',
  'Minima de hoje: 13°C',
  'Regiao de: Osasco',
  'Sensaçao termica de: 15°C',
]

describe('MainPage', () => {
  jest.useFakeTimers()
  const handleGetUserLatitudeAndLongitude = jest.fn()
  it('should render the MainPage correctly', () => {
    const { baseElement } = render(
      <MainPage
        weather={fakeWeather}
        handleGetUserLatitudeAndLongitude={handleGetUserLatitudeAndLongitude}
        loading={false}
      />,
    )

    expect(baseElement).toBeTruthy()
  })

  it('should initiate the button in the main page with "Consultar meu clima" text', async () => {
    const { getByText } = render(
      <MainPage
        weather={null}
        handleGetUserLatitudeAndLongitude={handleGetUserLatitudeAndLongitude}
        loading={false}
      />,
    )

    const mainPageButtonTitle = getByText('Consultar meu clima')

    expect(mainPageButtonTitle).toBeInTheDocument()
  })

  it('should change the button text in the main page with "Realizar nova consulta"', async () => {
    const { getByText } = render(
      <MainPage
        weather={fakeWeather}
        handleGetUserLatitudeAndLongitude={handleGetUserLatitudeAndLongitude}
        loading={false}
      />,
    )

    const mainPageButtonTitle = getByText('Realizar nova consulta')

    expect(mainPageButtonTitle).toBeInTheDocument()
  })

  it('should render the weather data', async () => {
    const { root } = create(
      <MainPage
        weather={fakeWeather}
        handleGetUserLatitudeAndLongitude={handleGetUserLatitudeAndLongitude}
        loading={false}
      />,
    )
    const saveUserLocalization = jest.fn()

    jest
      .spyOn(navigator.geolocation, 'getCurrentPosition')
      .mockImplementationOnce((success) =>
        saveUserLocalization(
          Promise.resolve(
            success({
              coords: {
                accuracy: 19.54,
                altitude: null,
                altitudeAccuracy: null,
                heading: null,
                latitude: -23.5578818,
                longitude: -46.7755537,
                speed: null,
              },
              timestamp: 1636683085160,
            }),
          ),
        ),
      )

    const searchWeatherButton = root.findByProps({ name: 'LocalSearchButton' })

    expect(searchWeatherButton).toBeTruthy()

    await act(async () => {
      try {
        await searchWeatherButton.props.onClick()
      } catch (error) {
        console.error('error', error)
      }
    })

    expect(root.findAllByProps({ testID: 'WeatherDataListItem' })).toHaveLength(
      fakeWeather.length,
    )
  })
})
