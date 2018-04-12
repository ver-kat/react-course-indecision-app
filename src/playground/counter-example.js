class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.handleAdd1 = this.handleAdd1.bind(this);
        this.handleSubtract1 = this.handleSubtract1.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.state = {
            count: 0
        }

    }

    
    componentDidMount() {
        try {
            const count = parseInt(localStorage.getItem('count'), 10);
            if (count) {
                this.setState(() => ({ count }));
            };
            console.log("Fetching Data", count);
        } catch (e) {
            //do nothing
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevState.count !== this.state.count) {
            localStorage.setItem('count', this.state.count);
            console.log("Saving Data", this.state.count);
        }
    }
    handleAdd1(){
        this.setState((prevState) => {
            return {
                count: prevState.count + 1
            }
        });
        console.log('handleAdd1',this);
    }
    handleSubtract1(){
        this.setState((prevState) => {
            return {
                count: prevState.count - 1
            }
        });
        console.log('handleSubtract1',this);
    }
    handleReset(){
        this.setState(() => {
            return {
                count: 0
            }
        });
        console.log('handleReset',this);
    }
    render() {
        return (
            <div>
                <h1>Count: {this.state.count}</h1>
                <button onClick={this.handleAdd1}>+1</button>
                <button onClick={this.handleSubtract1}>-1</button>
                <button onClick={this.handleReset}>Reset</button>
            </div>
        );
    }
}

ReactDOM.render(<Counter />, document.getElementById('app'));


// let count = 0;
// const addOne = () => {
//     count++;
//     renderCounterApp()
// };
// const subtractOne = () => {
//     count--;
//     renderCounterApp()
// };
// const reset = () => {
//     count=0;
//     renderCounterApp()
// };



// const renderCounterApp = () => {
//     const template2 = (
//         <div>
//             <h1>Count: {count}</h1>
//             <button onClick={addOne}>+1</button>
//             <button onClick={subtractOne}>-1</button>
//             <button onClick={reset}>Reset</button>
//         </div>
//     );

//     ReactDOM.render(template2, appRoot);
// };

// renderCounterApp();