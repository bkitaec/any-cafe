import Immutable from 'utils/immutable/Immutable';
import { get } from 'utils/lo/lo';
import { graphql } from 'graphql/client';

/**
 * Return result or full data
 *
 * @param response data from request.
 */
const _getData = (response) => {
    const data = response.data || {};
    return data && data.result !== undefined ? data.result : data;
};

/**
 * Returns the handler function to dipatch a succes after that a GraphQL action completes succesfully.
 *
 * @param dispatch the Redux's dispatch function.
 * @param type the action type to dispatch.
 * @param successMessage the success message to dispatch.
 */
const dispatchSuccess = (dispatch, type, successMessage) => (response) => {
    const payload = _getData(response);
    dispatch({ type, payload: Immutable(payload), meta: Immutable({ successMessage }) });
    return payload;
};

/**
 * Returns the handler function to dipatch an error after that a GraphQL action throw an Error.
 *
 * @param dispatch the Redux's dispatch function.
 * @param type the action type to dispatch.
 */
const dispatchError = (dispatch, type) => (error) => {
    dispatch({ type, payload: Immutable(error), error: true });
    return Immutable(error);
};

/**
 * Returns the action to load the data for a DataTable.
 *
 * The returned action will accept only one parameter where the caller can specify the action options: { page, pageSize, countMax, where, orderBy, download }
 *
 * @param startActionType the start action type
 * @param endActionType the end action type
 * @param grqphQlQuery the graphql query.
 *    The query must accept as input variables: page, pageSize, where, orderBy, countMax.
 *    The output of the query must contains 2 properties: records and count.
 *    The records property must contains the list of records to display in the DataTable.
 *    The count property is the total number of records that match the query criterias.
 */
const loadTableData = (startActionType, endActionType, graphQlQuery, countMax) => (options) => (dispatch) => {
    const { download, ...variables } = options || {};
    const meta = Immutable({ download, countMax });
    dispatch({ type: startActionType, meta });
    return graphql
        .query({
            query: graphQlQuery,
            variables: {
                page: 1,
                pageSize: 10,
                ...variables,
                countMax: countMax || 10000,
                orderBy: (variables.orderBy || []).map(({ field, asc }) => ({
                    field,
                    direction: asc ? 'asc' : 'desc',
                })),
            },
            fetchPolicy: 'no-cache',
        })
        .then((response: Object) => {
            const { count, records } = Immutable(get(response, 'data') || {});
            if (!Number.isInteger(count) || !Array.isArray(records)) {
                console.warn(`The action "${endActionType}" is not returning the correct data.`, response); // eslint-disable-line no-console
                throw new Error(`The service\'s response is not well formed.`);
            }
            dispatch({
                type: endActionType,
                payload: Immutable({ count, records: records.filter((record) => record) }),
                meta,
            });
            return { count, records };
        })
        .catch((error) => {
            dispatch({ type: endActionType, error: true, payload: Immutable(error), meta });
            return error;
        });
};

/**
 * Returns the action to load the data using a GraphQL query.
 *
 * The returned action will accept only one parameter where the caller can specify the GraphQL query variables.
 *
 * @param startActionType the start action type
 * @param endActionType the end action type
 * @param graphQlQuery  the graphql query. If the output of the query contains the property "result"
 *                      just the value of this property will be returned, otherwise all the data will be returned.
 */
const loadData = (startActionType, endActionType, graphQlQuery) => (variables) => (dispatch) => {
    const meta = { ...(variables || {}) };
    dispatch({ type: startActionType, meta });
    return graphql
        .query({
            query: graphQlQuery,
            variables,
            fetchPolicy: 'no-cache',
        })
        .then(async (response) => {
            const payload = _getData(response);
            dispatch({ type: endActionType, payload: Immutable(payload), meta });
            return payload;
        })
        .catch(dispatchError(dispatch, endActionType));
};

/**
 * Returns the action to mutate data using GraphQL.
 *
 * @param startActionType the start action type
 * @param endActionType the end action type
 * @param graphQlMutation the graphql mutation.
 * @param successMessage the success message.
 */
const mutateData = (startActionType, endActionType, graphQlMutation, successMessage) => (variables) => (dispatch) => {
    dispatch({ type: startActionType });
    return graphql
        .mutate({
            mutation: graphQlMutation,
            variables,
        })
        .then(dispatchSuccess(dispatch, endActionType, successMessage))
        .catch(dispatchError(dispatch, endActionType));
};

export { loadTableData, loadData, dispatchSuccess, dispatchError, mutateData };
