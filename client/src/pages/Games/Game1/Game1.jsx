import {Component} from 'react';
import MainContent from "../../../components/MainContent/MainContent";
import Layout from './UI/Layout/Layout.jsx';
import Field from './UI/Field/Field.jsx';
import ControlPanel from './UI/ControlPanel/ControlPanel.jsx';
import Button from './UI/Button/Button.jsx';
import Score from './UI/Score/Score.jsx';
import styles from "./Game1.module.scss";
import {directions, initCells, moveCells, populateField, removeAndIncreaseCells,} from './logic';

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
            const {cells} = this.state;

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
            this.setState({cells: populatedCells});
        }
    };

    render() {
        const {cells, score} = this.state;

        return (
            <MainContent title="">
                <ul className={styles.boxArrow}>
                    <li className={styles.arrowUp}>↑ W</li>
                    <li className={styles.arrowLeft}>← A</li>
                    <li className={styles.arrowRight}>→ D</li>
                    <li className={styles.arrowDown}>↓ S</li>
                </ul>
                <Layout>
                    <ControlPanel>
                        <Button onClick={this.newGame}>New Game</Button>
                        <Score>{score}</Score>
                    </ControlPanel>
                    <Field cells={cells}/>
                </Layout>
            </MainContent>
        );
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export default Game1;


