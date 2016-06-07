import React from 'react';
import LatestArticleList from './latestarticlelist';

export default class Home extends React.Component {

    static propTypes = {
        latest: React.PropTypes.object
    };

    static defaultProps = {
        latest: {}
    };

    constructor(props) {
        super(props);

        let latest;

        latest = this.props.latest && this.props.latest.pager && this.props.latest.pager.items_per_page >= 1 ? this.props.latest.items : [];

        this.state= ({latest});
    }

    getLatest(){
        if(this.state.latest.length > 0){
            return (
                <LatestArticleList
                    latestArticles={this.state.latest}
                />
            );
        }
        return '';
    }

    render() {

        let latest = this.getLatest();

        return (
            <div className="appbody">
                <article>

                    {latest}

                </article>
            </div>
        );
    }
}