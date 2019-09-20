export const deleteRequest = (store, currentId) => {
  const newState = { ...store.state.myrecipes };
  //   console.log('From actions', newState, currentId);
  //iterate over the object
  const finalArr = [];
  for (var property1 in newState) {
    // console.log(newState[property1].title);
    if (newState[property1].id !== currentId) {
      const final = newState[property1];
      finalArr.push(final);
    }
  }

  //   console.log('Last result', finalArr);
  store.setState({ myrecipes: finalArr });
};
