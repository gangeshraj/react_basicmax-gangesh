import React, { Component } from 'react';

// const withClass = (WrappedComponent, className) => {
//     return (props) => (
//         <div className={className}>
//             <WrappedComponent {...props} />
//         </div>
//     )
// }

const withClass = (WrappedComponent, className) => {
    const WithClass = class extends Component {
        render () {
            return (
                <div className={className}>
                    <WrappedComponent ref={this.props.forwardedRef} {...this.props} />
                </div>
            )
        }
    }

    //here ref is passed from person a child component with react.forwardRef anew addition of react 16.3
    return React.forwardRef((props, ref) => {
        return <WithClass {...props} forwardedRef={ref} />
    });
}


export default withClass;