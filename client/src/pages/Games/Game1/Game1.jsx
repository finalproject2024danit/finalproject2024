import React, { Component } from 'react';
import MainContent from "../../../components/MainContent/MainContent";
import Layout from './UI/Layout/Layout.jsx';
import Field from './UI/Field/Field.jsx';
import ControllPanel from './UI/ControllPanel/ControllPanel.jsx';
import Button from './UI/Button/Button.jsx';
import Score from './UI/Score/Score.jsx';
import {
  moveCells,
  directions,
  initCells,
  removeAndIncreaseCells,
  populateField,
} from './logic';

class Game1 extends Component {
  state = this.getNewState();

  mapKeyCodeToDirection = {
    KeyA: directions.LEFT,
    KeyS: directions.DOWN,
    KeyD: directions.RIGHT,
    KeyW: directions.UP,
  };

  newGame = () => {
    const newState = this.getNewState();
    console.log('New game state:', newState);
    this.setState(newState);
  };

  getNewState() {
    const cells = initCells();
    console.log('Initialized cells:', cells);
    return {
      cells,
      score: 0,
    };    
  }  

  componentDidMount() {
    document.addEventListener('keypress', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.handleKeyPress);
  }

  handleKeyPress = async event => {
    if (['KeyA', 'KeyS', 'KeyD', 'KeyW'].includes(event.code)) {
      console.log('Key pressed:', event.code);

      // Заблокувати подальшу обробку клавіш, поки оновлюється стан
      const { cells } = this.state;

      // Оновлення клітинок з рухом
      const newCells = moveCells(cells, this.mapKeyCodeToDirection[event.code]);
      console.log('Cells after move:', newCells);

      await delay(100);

      // Оновлення клітинок після злиття
      const updatedCells = removeAndIncreaseCells(newCells);
      console.log('Cells after remove and increase:', updatedCells);

      // Оновлення клітинок з заповненням
      const populatedCells = populateField(updatedCells);
      console.log('Cells after populate:', populatedCells);

      // Зробити один виклик setState
      this.setState({ cells: populatedCells });
    }
  };

  render() {
    const { cells, score } = this.state;

    return (
      <MainContent title="">
        <Layout>
          <ControllPanel>
            <Button onClick={this.newGame}>New Game</Button>
            <Score>{score}</Score>
          </ControllPanel>
          <Field cells={cells} />
        </Layout>
      </MainContent>
    );
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export default Game1;


