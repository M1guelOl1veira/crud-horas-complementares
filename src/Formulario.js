import React from 'react';

class Formulario extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dimensao: '',
      tipoAtividade: '',
      quantidadeHoras: '',
      listaValores: [], 
      indexEditando: null,
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const novoItem = {
      dimensao: this.state.dimensao,
      tipoAtividade: this.state.tipoAtividade,
      quantidadeHoras: this.state.quantidadeHoras
    };
    if (this.state.indexEditando !== null) {
      const listaValoresAtualizada = [...this.state.listaValores];
      listaValoresAtualizada[this.state.indexEditando] = novoItem;
      this.setState({ listaValores: listaValoresAtualizada, indexEditando: null });
    } else {
      this.setState(prevState => ({
        listaValores: [...prevState.listaValores, novoItem]
      }));
    }
    this.setState({
      dimensao: '',
      tipoAtividade: '',
      quantidadeHoras: ''
    });
  }

  handleExcluir = (index) => {
    this.setState(prevState => ({
      listaValores: prevState.listaValores.filter((_, i) => i !== index)
    }));
  }

  handleEditar = (index) => {
    const itemEditando = this.state.listaValores[index];
    this.setState({
      dimensao: itemEditando.dimensao,
      tipoAtividade: itemEditando.tipoAtividade,
      quantidadeHoras: itemEditando.quantidadeHoras,
      indexEditando: index
    });
  }

  render() {
    return (
      <div className="container mt-4">
        <h1 className="text-center mb-4">Horas Complementares</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="dimensao" className="form-label">Dimensão:</label>
            <input 
              type="text" 
              id="dimensao" 
              name="dimensao" 
              className="form-control" 
              value={this.state.dimensao} 
              onChange={this.handleChange} 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tipoAtividade" className="form-label">Tipo de Atividade:</label>
            <input 
              type="text" 
              id="tipoAtividade" 
              name="tipoAtividade" 
              className="form-control" 
              value={this.state.tipoAtividade} 
              onChange={this.handleChange} 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="quantidadeHoras" className="form-label">Quantidade de Horas:</label>
            <input 
              type="text" 
              id="quantidadeHoras" 
              name="quantidadeHoras" 
              className="form-control" 
              value={this.state.quantidadeHoras} 
              onChange={this.handleChange} 
            />
          </div>
          <button type="submit" className="btn btn-primary">{this.state.indexEditando !== null ? 'Salvar' : 'Enviar'}</button>
        </form>
        {this.state.listaValores.length > 0 && (
          <div className="mt-4">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Dimensão</th>
                  <th scope="col">Tipo de Atividade</th>
                  <th scope="col">Quantidade de Horas</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {this.state.listaValores.map((item, index) => (
                  <tr key={index}>
                    <td>{item.dimensao}</td>
                    <td>{item.tipoAtividade}</td>
                    <td>{item.quantidadeHoras}</td>
                    <td>
                      <button className="btn btn-primary me-2" onClick={() => this.handleEditar(index)}>Editar</button>
                      <button className="btn btn-danger" onClick={() => this.handleExcluir(index)}>Excluir</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}

export default Formulario;
