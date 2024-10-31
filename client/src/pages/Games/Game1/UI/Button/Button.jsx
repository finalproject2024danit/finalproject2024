import styled from 'styled-components'

const Button = styled.button`
  background-color: green;
  border-radius: 5px;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 20px;
  font-weight: 500;
  outline: none;
  padding: 20px 25px;
  text-transform: capitalize;
  align-items: center;

  &:hover {
    background-color: darkgreen; /* Колір фону при наведенні */
    transform: scale(1.05); /* Легке збільшення кнопки при ховері */
    transition: background-color 0.3s ease, transform 0.3s ease; /* Анімація */
  }
`

export default Button
