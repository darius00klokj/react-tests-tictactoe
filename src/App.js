import logo from './logo.svg';
import React from 'react';
import './App.css';

const EMPTY = 1;
const CROSS = 2;
const CIRCLE = 3;

const defaultPositions = [
  EMPTY, EMPTY, EMPTY,
  EMPTY, EMPTY, EMPTY,
  EMPTY, EMPTY, EMPTY
];

function App() {

  return (
    <div id="app" className="flex">
      <Board />
    </div>
  );
}

function Board() {

  const [state, setState] = React.useState(
    {
      player: CIRCLE,
      positions: defaultPositions,
    }
  );

  function takeTurn(position) {
    const positions = state.positions;
    positions[position] = state.player;

    setState({
      player: state.player === CIRCLE ? CROSS : CIRCLE,
      positions: positions,
    })

  }

  function detectWinner(p){

    const players = [CIRCLE, CROSS];
    for (var i = 0; i < (players.length); i++) {
      
      var val = players[i];
      if(p[0] === val && p[1] === val && p[2] === val) return val;
      if(p[3] === val && p[4] === val && p[5] === val) return val;
      if(p[6] === val && p[7] === val && p[8] === val) return val;

      if(p[0] === val && p[4] === val && p[8] === val) return val;
      if(p[2] === val && p[4] === val && p[6] === val) return val;

      if(p[0] === val && p[3] === val && p[6] === val) return val;
      if(p[1] === val && p[4] === val && p[7] === val) return val;
      if(p[2] === val && p[5] === val && p[8] === val) return val;

    }

    return EMPTY;
  }

  function resetGame(){
    setState({
      player: EMPTY,
      positions: [
        EMPTY, EMPTY, EMPTY,
        EMPTY, EMPTY, EMPTY,
        EMPTY, EMPTY, EMPTY
      ],
    });
  }

  const items = []
  for (var i = 0; i < 9; i++) {
    items.push(<Square position={i} value={state.positions[i]} onClickCallback={takeTurn} />)
  }

  const winner = detectWinner(state.positions);

  return (
    <div className="grid">
      {items}
      <Result winner={winner} onClickCallback={resetGame} ></Result>
    </div>
  )
}

function Square(props) {

  function onClickHandler() {
    if (props.value === EMPTY) {
      props.onClickCallback(props.position);
    }
  }

  var val = props.value ?? false;
  return (
    <div className="square flex" onClick={onClickHandler}>
      {val === CIRCLE && <Circle />}
      {val === CROSS && <Cross />}
    </div>
  )
}

function Circle() {
  return (
    <svg width="100" height="100" viewBox="-50 -50 100 100" className="circle"> 
      <circle cx="0" cy="0" r="40"></circle>
    </svg>
  );
}

function Cross() {
  return (
    <svg width="100" height="100" viewBox="-50 -50 100 100" className="cross">
      <line y1="-40" y2="40" x1="-40" x2="40"/>
      <line y1="40" y2="-40" x1="-40" x2="40"/>
    </svg>
  );
}

function Result(props) {

  if( props.winner === EMPTY){
    return (<div className="hidden"></div>);
  }

  var text = props.winner === CIRCLE ? 'Winner is CIRCLE' : '';
  text = props.winner === CROSS ? 'Winner is CROSS' : text;

  return (
    <div className="result flex">
      {text}
      <button onClick={props.onClickCallback}>Reset</button>
    </div>
  )

}

export default App;
