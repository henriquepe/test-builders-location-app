import styled from 'styled-components'
import { shade } from 'polished'

interface WeatherDataListItemProps {
  testID?: string
}

interface LocalSearchButtonTextProps {
  testID?: string
}

export const Container = styled.div`
  display: flex;
  flex: 1;
  height: 100vh;
  color: black;
  align-items: center;
  justify-content: center;
`

export const LocalSearchButton = styled.button`
  width: 350px;
  height: 350px;
  border: 1px solid #059fff;
  border-radius: 50%;
  background-color: #059fff;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${shade(0.2, '#059fff')};
  }
`

export const LocalSearchButtonText = styled.p<LocalSearchButtonTextProps>`
  color: white;
  font-size: 48px;
  font-weight: bold;
`

export const WeatherDataList = styled.ul`
  list-style-type: none;
  margin-left: 20px;
`

export const WeatherDataListItem = styled.li<WeatherDataListItemProps>`
  color: black;
`

export const WeatherDataText = styled.p`
  color: black;
  font-size: 28px;
`
