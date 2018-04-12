class IndecisionApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.state = {
            options: []
        }
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
    }
    componentDidUpdate(prevProps, prevState) {
        // console.log("  componentDidUpdate  prevProps ", prevProps);
        // console.log("  componentDidUpdate  prevState ", prevState);
        if(prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
            console.log("Saving Data");
        }
    }
    componentWillUnmount() {
        console.log("componentWillUndmount");

    }
    handleDeleteOptions() {
        this.setState(() => ({ options: [] }));
    };
    handleDeleteOption(optionToRemove) {
        this.setState((prevState) => ({ 
            options: prevState.options.filter((option) => optionToRemove !== option) 
        }));
    };
    handlePick() {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        console.log("handlePick clicked", option);
        // this.setState(() => {
        //     return {
        //         options: []
        //     }
        // });
    }
    handleAddOption(option) {
        //console.log(option);
        if(!option) {
            return 'Enter something to add';
        } else if (this.state.options.indexOf(option) > -1) {
            return 'This already exists. Enter something new to add.';
        }
        this.setState((prevState) => ({ options: prevState.options.concat(option) }));

    }

    render() {
        const subtitle = "Put your hands in the life of a computer";
        return (
            <div>
                <Header subtitle={subtitle} />
                <Action 
                    hasOptions={this.state.options.length > 0} 
                    handlePick={this.handlePick}
                />
                <Options 
                    options={this.state.options}
                    handleDeleteOptions={this.handleDeleteOptions}
                    handleDeleteOption={this.handleDeleteOption}
                />
                <AddOption 
                    handleAddOption={this.handleAddOption}
                />
            </div>
        )
    }
};

const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            {props.subtitle && <h2>{props.subtitle}</h2>}
        </div>
    );
};

Header.defaultProps = {
    title: 'Indecision'
};

const Action = (props) => {
    return (
        <div>
            <button 
            onClick={props.handlePick} 
            disabled={!props.hasOptions}>
            What should I do?
            </button>
        </div>
    );
}

const Options = (props) => {
    return (
        <div>            
        {
            props.options.map((option) => (
                <Option 
                    key={option} 
                    optionText={option} 
                    handleDeleteOption={props.handleDeleteOption}
                />
            ))
        }
        <button onClick={props.handleDeleteOptions}>Remove All</button>
        {props.options.length === 0 && <p>Please add an option</p>}
        </div>
    );
}

const Option = (props) => {
    return (
        <div>
            {props.optionText}
            <button 
                onClick={(e) => {
                    props.handleDeleteOption(props.optionText);
                }}
            >
                Remove
            </button>
        </div>
    );
}

class AddOption extends React.Component {
    constructor(props) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.state = {
            error: undefined
        };
    }
    onFormSubmit(e) {
        e.preventDefault();
        const option = e.target.elements.option.value.trim();
        console.log("form submitted", option);
        const error = this.props.handleAddOption(option);
        this.setState(() => ({ error }));
        
        if (!error) {
            e.target.elements.option.value = '';
        }
    }
    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onFormSubmit}>
                <input type='text' name='option'/>
                <button>Add Option</button>
                </form>
            </div>
        );
    }
}


ReactDOM.render(<IndecisionApp />, document.getElementById('app'));