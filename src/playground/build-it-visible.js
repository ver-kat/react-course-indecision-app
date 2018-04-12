class VisibilityToggle extends React.Component {
    constructor(props) {
        super(props);
        this.handleToggleVisibility = this.handleToggleVisibility.bind(this);
        this.state = {
            visibility: false
        }

    }
    handleToggleVisibility(){
        this.setState((prevState) => {
            return {
                visibility: !prevState.visibility
            }
        });
        console.log('handleToggleVisibility',this);
    }
    render() {
        return (
            <div>
                <p>Message: </p>{this.state.visibility && <p>Some message to show or hide!</p>}
                <button onClick={this.handleToggleVisibility}>{this.state.visibility ? 'Hide' : 'Show' }</button>
            </div>
        );
    }
}


ReactDOM.render(<VisibilityToggle />, document.getElementById('app'));





// console.log("app.js is running");

// const app = {
//     title: "Toggle Visibility",
//     subtitle: "Click a button to show and hide something",
//     text: "This is some text to show or hide"
// }; 

// let show = false;
// let buttonText = "Show";

// const onClick = () => {
//     //e.preventDefault();

//     console.log("onClick", show);
//     show = !show;
//     if (show) {
//         buttonText = "Hide";
//     } else {
//         buttonText = "Show";
//     }
//     render();
// }

// const appRoot = document.getElementById('app');

// const render = () => {
//     const template = (
//         <div>
//             <h1>{app.title}</h1>
//             {app.subtitle && <p>{app.subtitle}</p>}
//             <button onClick={onClick}>{buttonText}</button>
            
//             <p>{show ? app.text : ''}</p>

//         </div>
//     );
//     ReactDOM.render(template, appRoot);
// }

// render();