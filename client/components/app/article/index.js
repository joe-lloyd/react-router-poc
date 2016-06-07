import React from 'react';
import { Link } from 'react-router'

export default class Article extends React.Component {

    static propTypes = {
    };

    static defaultProps = {
    };

    static contextTypes = {
        color: React.PropTypes.string
    };

    constructor(props, context) {
        super(props, context);

        console.log(context);
    }



    render() {

        return (
            <div>
                <h1>ARTICLE</h1>
                <Link to="/" >HOME</Link>
            </div>
        );
    }
}