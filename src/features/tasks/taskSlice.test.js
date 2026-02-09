console.log('store : ', store);
console.log('initial state : ', store.getState());

store.dispatch(addTask("Apple"))
console.log('updated state 1 : ', store.getState());

store.dispatch(addTask("Mango"))
console.log('updated state 2 : ', store.getState());

store.dispatch(addTask("Orange"))
console.log('updated state 3 : ', store.getState());

store.dispatch(deleteTask("Mango"))
console.log('updated state 4 : ', store.getState());

store.dispatch(updateTask("Orange"))
console.log('updated state 5 : ', store.getState());

store.dispatch(clearAll())
console.log('updated state 6 : ', store.getState());

store.dispatch(fetchData())
console.log('updated state 7 : ', store.getState());