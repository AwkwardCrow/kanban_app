import uuid from 'node-uuid';
import React from 'react';
import Note from './Note.jsx';
const notes = [
  {
    id: uuid.v4(),
    task: 'Learn Webpack'
  },
  {
    id: uuid.v4(),
    task: 'Learn React'
  },
  {
    id: uuid.v4(),
    task: 'Do laundry'
  }
];

export default class App extends React.Component {

  render(){
    /*using {} lets us blend JS syntax withing JSX
    we are passing renderNot to map, telling it to apply renderNote to all
    entries withing note*/
    return (
      /*this is how you do comments in JSX*/
      <div>
        <ul>{notes.map(this.renderNote)}</ul>
      </div>
    );
  }

  renderNote(note) {
    return (
      //in order to tell react in which order to render the elements, we use key
      //its important that this is unique or else react wont be able to figure out the correct order
      //if not set react will give a wardning
      <li key={note.id}>
        <Note task={note.task} />
      </li>
    );
  }

}
