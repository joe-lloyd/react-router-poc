import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Routes } from './components/routes';

ReactDOM.render(
    <Router history={browserHistory}>
        <Routes />
    </Router>,
document);