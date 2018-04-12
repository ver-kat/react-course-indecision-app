import React from 'react';

export default class AddOption extends React.Component {
    state = {
        error: undefined
    };
    onFormSubmit = (e) => {
        e.preventDefault();
        const option = e.target.elements.option.value.trim();
        console.log("form submitted", option);
        const error = this.props.handleAddOption(option);
        this.setState(() => ({ error }));
        
        if (!error) {
            e.target.elements.option.value = '';
        }
    };
    render() {
        return (
            <div>
                {this.state.error && <p className='add-option-error'>{this.state.error}</p>}
                <form className='add-option' onSubmit={this.onFormSubmit}>
                <input className='add-option__input' type='text' name='option'/>
                <button className='button'>Add Choice</button>
                </form>
            </div>
        );
    };
}