import React from 'react';
import { Link } from 'react-router';

export default class Article extends React.Component {

    static propTypes = {
        params: React.PropTypes.object
    };

    static defaultProps = {
        params: {}
    };


    constructor(props) {
        super(props);

        
    }


    render() {

        return (
            <div>
                <h1>ARTICLE</h1>

                {this.props.params.slug};

                <Link to="/" className="active">home</Link>
            </div>
        );
    }
}