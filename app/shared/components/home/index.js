import React from 'react';
import { Link } from 'react-router';

export default class Home extends React.Component {

    static propTypes = {
    };

    static defaultProps = {
    };

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <h1>HOME</h1>

                <Link to="/article/2" className="active">article</Link>
            </div>
        );
    }
}