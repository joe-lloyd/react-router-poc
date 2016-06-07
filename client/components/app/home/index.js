import React from 'react';
import { Link } from 'react-router'

export default class HOME extends React.Component {

    static propTypes = {
    };

    static defaultProps = {
    };

    constructor(props, context) {
        super(props, context);

        console.log(context);
    }


    render() {

        return (
            <div>
                <h1>HOME</h1>
                <Link to="/article" >article</Link>
            </div>
        );
    }
}