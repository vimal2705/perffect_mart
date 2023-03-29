export const addExpense=(action)=>({
    type:"ADD_USER",
    data:action[0],
    navigation:action[1]
    
   
  }) 
  export const verifyUser=(action)=>({
      type:"VERIFY_USER",
      data:action[0],
      navigation:action[1]
  })
  export const addImage=(action)=>({
      type:'ADD_IMAGE',
      data:action
  })
  