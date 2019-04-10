import { createBrowserHistory } from 'history';
// import { syncHistoryWithStore } from 'react-router-redux';

import store from 'store/Store';

const browserHistory = createBrowserHistory();

/**
 * workaround (@see https://gitlab.mi-c3.com/affectli-project/affcetli-support-issues/issues/2036)
 * FIXME: remove the pushBack method and use the goBack method
 *        when the application will run outside of the Angular context.
 */
browserHistory.pushBack = () => {
    const historyList = store.getState().history.list;
    const historyLength = historyList.length;
    if (historyLength >= 2) {
        browserHistory.push(historyList[1].pathname);
    } else if (historyLength === 1) {
        browserHistory.goBack();
    } else {
        browserHistory.push('/');
    }
};

/**
 * Creates an enhanced history that syncs navigation events with the store (https://www.npmjs.com/package/react-router-redux)
 */
// const history = syncHistoryWithStore(browserHistory, store);

export default browserHistory;
