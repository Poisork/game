import React, {Component} from 'react'; 
import './App.scss';
import { LeaderBoard } from './LeaderBoard';
import { Table } from './Table';
import { getInstanceAPI } from './api/APIUtils';
import moment from 'moment'
let uniqueRandoms = []

export const AppContext = React.createContext();

class App extends Component {
  
  state = {
    gameModeRefObj: {},
    winners: [],
    settings: [],
    randomNumber: null,
    validationError: false,
    name: '',
    powerField: null,
    arrayUser: [],
    endGame: {nameWinner: '', endGameValue: false},
    arrayComputer: []
  }
  
  nameRef = React.createRef();
  gameModeRef = React.createRef();

  componentDidMount() {
    this.fetchSettings() 
    this.fetchWinners()
  }
  
  fetchSettings = async () => {
    const settings = await getInstanceAPI('game-settings', 'get') 
    this.setState({settings}) 
  }  

  fetchWinners = async () => { 
    const winners = await getInstanceAPI('winners', 'get')
    this.setState({winners}) 
  }  

  setNewIntervalAndResetOld = () => { 
    const field = this.gameModeRef.current.value ? JSON.parse(this.gameModeRef.current.value).field : '' 
    const name = this.nameRef.current.value.trim()
    if (name && field) {
      clearInterval(this.timeout) 
      this.setState({
          endGame: {nameWinner: '',endGameValue: false},
          validationError: false,
          name,
          gameModeRefObj: JSON.parse(this.gameModeRef.current.value),
          powerField: field**2,
          arrayUser: [],
          randomNumber: null,
          arrayComputer: []
      }, () => {
        this.iteration()
        uniqueRandoms = []  
      }) 
    } else {
      this.setState({validationError: true})
    }
  }
  
  iteration() {
    this.timeout = this.interval() 
  }

  interval = () => {
    const {gameModeRefObj: {delay}} = this.state 
    return (
      setInterval(() => {   
        this.scoreComparison()
        this.setState({randomNumber: this.makeUniqueRandom()})   
      }, delay) 
    )
  }

  makeUniqueRandom = () => {   
    const {powerField} = this.state
    if (!uniqueRandoms.length) {
      for (let i = 1; i < powerField + 1; i++) {
        uniqueRandoms.push(i);
      }
    }
    const index = Math.floor(Math.random() * uniqueRandoms.length);
    const val = uniqueRandoms[index]; 
    uniqueRandoms.splice(index, 1);  
    
    return val; 
  }

  scoreComparison() {
    if (this.state.randomNumber) {
      const {arrayUser,powerField,name} = this.state
      const arr = [...Array(powerField).keys()].map(el => el + 1) 
      const arrayComputer = arr.filter(el => !uniqueRandoms.includes(el) && !arrayUser.includes(el) )
      const percentageExpressionUser = (arrayUser.length * 100) / powerField
      const percentageExpressionComputer =  (arrayComputer.length  * 100) / powerField    
  
      if (percentageExpressionUser >= 50) { 
          this.whenGameEnd(name)
      } else if (percentageExpressionComputer >= 50) { 
          this.whenGameEnd('Computer')
      } 
      this.setState({arrayComputer}) 
    } 
  }
  
  whenGameEnd = nameWinner => {  
    clearInterval(this.timeout)  
    this.setState({endGame: {nameWinner: nameWinner,endGameValue: true}})
    const data = {
      "date": moment().format('HH:mm; D MMMM Y'),
      "winner": nameWinner
    }
    this.setWinners(data) 
  }

  setWinners = async data => {
    await getInstanceAPI('winners', 'post', data)
    this.fetchWinners() 
  }  

  userCatchColum = ({target: {dataset}}) => {
    const {endGame: {endGameValue},arrayUser} = this.state  
    const id = parseInt(dataset.val)
    if (this.state.randomNumber === id && !endGameValue && !arrayUser.includes(id)) {  
      this.setState(prevState => {
        return (
          {arrayUser: [...prevState.arrayUser, id]}
        )
      })
    } 
  } 
 
  render() { 
    const {arrayComputer, validationError, settings, arrayUser, winners, randomNumber, gameModeRefObj:{field}, endGame:{nameWinner, endGameValue}} = this.state
    return ( 
      <div className="App">
        <section className='side'>
          <header className='side__header'>
            {validationError ? <p>Enter a name and select the difficulty of the game</p> : ''}
            {
              Object.entries(settings) ?
              <select className='side__select' ref={this.gameModeRef}>
                <option className='side__option' value=''>Pick game mode</option>
                {Object.entries(settings).map(el => {
                  const [name,obj] = el
                  return (
                    <option 
                    className='side__option' 
                      value={JSON.stringify(obj)} 
                      key={name}
                    >
                      {name}
                    </option>
                  )
                })} 
              </select> :
              null
            }
              <input className='side__input' placeholder='Enter your name' ref={this.nameRef}/>
              <input className='side__button' type='submit' value={endGameValue ? 'PLAY AGAIN' : 'PLAY'} onClick={this.setNewIntervalAndResetOld}/> 
            </header>
            {endGameValue ? <h2>{`${nameWinner} Win!`}</h2>: null}
            {field ?  
              <AppContext.Provider value={{arrayUser,randomNumber,endGameValue,arrayComputer}}>
                <Table  
                  field={field} 
                  userCatchColum={this.userCatchColum}  
                />
              </AppContext.Provider> :
              null
            }
          </section>
          {winners.length ? <LeaderBoard winners={winners}/> : null}
        </div>
      );
    }

  } 
export default App;
