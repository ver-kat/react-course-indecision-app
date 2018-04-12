import React from 'react';

import AddOption from './AddOption';
import Action from './Action';
import Header from './Header';
import Options from './Options'
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component {
    
    state = {
        options: [],
        selectedOption: undefined
    }
    componentDidMount() {
        try {
            console.log("Fetching Data");
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
            if (options) {
                this.setState(() => ({ options }));
            };
        } catch (e) {
            //do nothing
        }
    };
    componentDidUpdate(prevProps, prevState) {
        if(prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
            console.log("Saving Data");
        }
    };
    componentWillUnmount() {
        console.log("componentWillUndmount");

    };
    handleDeleteOptions = () =>  {
        this.setState(() => ({ options: [] }));
    };
    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState) => ({ 
            options: prevState.options.filter((option) => optionToRemove !== option) 
        }));
    };
    handlePick = () => {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        this.setState(() => ({
                selectedOption: option
        }));
    };
    handleAddOption = (option) => {
        //console.log(option);
        if(!option) {
            return 'Enter something to add.';
        } else if (this.state.options.indexOf(option) > -1) {
            return 'This already exists. Enter something new to add.';
        }
        this.setState((prevState) => ({ options: prevState.options.concat(option) }));
    };

    handleModalOK = () =>  {
        this.setState(() => ({ selectedOption: undefined }));
    };
    render() {
        const subtitle = "Leave It up to Random Chance";
        return (
            <div>
                <Header subtitle={subtitle} />
                <div className='container'>
                    <div className='widget'>
                        <Options 
                            options={this.state.options}
                            handleDeleteOptions={this.handleDeleteOptions}
                            handleDeleteOption={this.handleDeleteOption}
                        />
                        <AddOption 
                            handleAddOption={this.handleAddOption}
                        />
                    </div>
                    <Action 
                        hasOptions={this.state.options.length > 0} 
                        handlePick={this.handlePick}
                    />
                </div>
                <OptionModal 
                    selectedOption={this.state.selectedOption} 
                    handleModalOK={this.handleModalOK} 
                />
            </div>
        )
    };
};
