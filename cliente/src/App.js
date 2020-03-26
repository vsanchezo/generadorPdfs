import React, { Component } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';

import './App.css';

class App extends Component {
  state = {
    nombre: '',
    idReceta: 0,
    precio1: 0,
    precio2: 0,
  }

  handleChange = ({ target: { value, name }}) => this.setState({ [name]: value })

  creaYDescargaPdf = () => {
    //?blob
    axios.post('/crear-pdf', this.state)
      .then(() => axios.get('enviar-pdf', { responseType: 'blob' }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

        saveAs(pdfBlob, 'archivoPdf.pdf');
      });
  }

  render(){
    return (
      <div className="App">
        <input type="text" placeholder="Nombre" name="nombre" onChange={this.handleChange} />
        <input type="number" placeholder="ID receta" name="idReceta" onChange={this.handleChange} />
        <input type="number" placeholder="Precio 1" name="precio1" onChange={this.handleChange} />
        <input type="number" placeholder="Precio 2" name="precio2" onChange={this.handleChange} />
        <button onClick={this.creaYDescargaPdf} >Descargar PDF</button>
      </div>
    );
  }
}

export default App;
