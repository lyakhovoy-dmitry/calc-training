import React from 'react';
import '../css/Greet.css'

class Greet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      operator: props.operator,
      factor: props.factor ? props.factor : 2,
      first: props.first ? props.first : 2,
      second: props.second ? props.second : 1,
    }
    this.titles = {
      first: '###',
      second: '###',
      factor: 'Множитель',
    }

    this.texts = {
      sum: {
        first: '1-м слагаемом',
        second: '2-м слагаемом',
      },
      decr: {
        first: 'уменьшаемом',
        second: 'вычитаемом',
      },
      mul: {
        first: '1-м множителе',
        second: '2-м множителе',
      },
      frac: {
        first: 'делимом',
        second: 'делителе',
      },
    }

    this.mins = {
      first: 1,
      second: 1,
      factor: 2,
    }
    this.maxs = {
      first: 3,
      second: 3,
      factor: 9,
    }

    this.handleChanges = this.handleChanges.bind(this);
  }

  changeTitles(operator) {
    //console.log('titles ' + operator);
    //console.log(this.texts);
    switch (operator) {
      case 'mul':
        this.titles.first = this.texts.mul.first;
        this.titles.second = this.texts.mul.second;
        break;
      case 'frac':
        this.titles.first = this.texts.frac.first;
        this.titles.second = this.texts.frac.second;
        break;
      case 'sum':
        this.titles.first = this.texts.sum.first;
        this.titles.second = this.texts.sum.second;
        break;
      case 'decr':
        this.titles.first = this.texts.decr.first;
        this.titles.second = this.texts.decr.second;
        break;
    }
    //console.log(this.titles);
  }

  limitsRender() {
    const OPERATOR = this.state.operator;
    const TITLE_FIRST = this.titles.first;
    const TITLE_SECOND = this.titles.second;
    const TITLE_FACTOR = this.titles.factor;
    const VALUE_FIRST = this.state.first;
    const VALUE_SECOND = this.state.second;
    const VALUE_FACTOR = this.state.factor;

    let limitInput = (title, value, name) => {
      return (
        <div className='number'>
          <span className='number__title'>
            {title}
          </span>
          <span className='number__input'>
            <button
              type='button'
              className='number__minus'
              name={name}
              value='minus'
              onClick={this.handleChanges} >
              -
          </button>
            <input
              className='number__display'
              name={name}
              type='text'
              pattern='^[0-9]+$'
              value={value}
              readOnly={true}
            />
            <button
              type='button'
              className='number__minus'
              name={name}
              value='plus'
              onClick={this.handleChanges} >
              +
          </button>
          </span>
        </div>
      );
    }

    let result = () => {
      const FACTOR_INPUT = (() => {
        if ((OPERATOR === 'mul')) {
          if ((VALUE_FIRST === 1) && (VALUE_SECOND === 1)) {
            return (limitInput(TITLE_FACTOR, VALUE_FACTOR, 'factor'));
          }
        }
      });

      return (<div className='container gray'>
        <div className=''>
          <div>Количество чисел в</div>
          {limitInput(TITLE_FIRST, VALUE_FIRST, 'first')}
          {limitInput(TITLE_SECOND, VALUE_SECOND, 'second')}
        </div>
        <div className=''>
          {FACTOR_INPUT()}
        </div>
      </div>);
    }


    return (result());
  }

  handleChanges(event) {
    const NAME = event.target.name;
    const TYPE = event.target.type;

    let value = event.target.value;


    //console.log(NAME + ' ' + value);
    switch (TYPE) {
      case 'number':
        switch (NAME) {
          case 'first':
            if (Number(value) > this.maxs.first) {
              value = this.maxs.first;
            }
            break;
          case 'second':
            if (Number(value) > this.maxs.first) {
              value = this.maxs.second;
            }
            break;
          case 'factor':
            if (Number(value) > this.maxs.first) {
              value = this.maxs.factor;
            }
            break;

          default:
            break;
        }
        this.setState({
          [NAME]: Number(value)
        })
        break;

      case 'button':
        switch (NAME) {
          case 'factor':
            switch (value) {
              case 'minus':
                //console.log(NAME + ' ' + value);
                if (this.state.factor - 1 >= this.mins.factor) {
                  this.setState({
                    factor: --this.state.factor
                  })
                }
                break;
              case 'plus':
                //console.log(NAME + ' ' + value);
                if (this.state.factor + 1 <= this.maxs.factor) {
                  this.setState({
                    factor: ++this.state.factor
                  })
                }
                break;

              default:
                break;
            }
            break;
          case 'first':
            switch (value) {
              case 'minus':
                //console.log(NAME + ' ' + value);
                if (this.state.first - 1 >= this.mins.first) {
                  this.setState({
                    first: --this.state.first
                  })
                }
                break;
              case 'plus':
                //console.log(NAME + ' ' + value);
                if (this.state.first + 1 <= this.maxs.first) {
                  this.setState({
                    first: ++this.state.first
                  })
                }
                break;

              default:
                break;
            }
            break;
          case 'second':
            switch (value) {
              case 'minus':
                //console.log(NAME + ' ' + value);
                if (this.state.second - 1 >= this.mins.second) {
                  this.setState({
                    second: --this.state.second
                  })
                }
                break;
              case 'plus':
                //console.log(NAME + ' ' + value);
                if (this.state.second + 1 <= this.maxs.second) {
                  this.setState({
                    second: ++this.state.second
                  })
                }
                break;

              default:
                break;
            }
            break;

          default:
            this.setState({
              [NAME]: value
            });
            break;
        }
        break;

      case 'select-one':
        // this.changeTitles(VALUE);
        this.setState({
          [NAME]: value
        })
        break;
      default:
        break;
    }
    this.props.handleChanges(event);
  }

  render() {
    const OPERATOR = this.state.operator;
    this.changeTitles(OPERATOR);
    //let limitsInput;
    const LIMITS_INPUT = this.limitsRender();


    return (
      <div className='Greet' >
        <button
          className='content'
          type='button'
          onClick={this.handleChanges}
          name='load'
          value='exercise'>
          Старт
        </button>
        <select
          value={OPERATOR}
          onChange={this.handleChanges}
          name='operator'
          className='content'>
          <option value='sum'>Сложение</option>
          <option value='decr'>Вычитание</option>
          <option value='mul'>Умножение</option>
          <option value='frac'>Деление</option>
        </select>
        {LIMITS_INPUT}
      </div>
    )
  }
}
export default Greet;
