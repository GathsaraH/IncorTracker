import React, { createContext, useReducer } from "react";
import TransactionReducer from "../functions/TransactionReducer";

// Make an array of transaction objects
const initialTransactions = [];

// Create the context and export it
export const TransactionContext = createContext(initialTransactions);

Object.keys(myObj).length

const transactions = [
  {
    text: "transaction text 1",
    amount: "2,000",
    id: "1",
  },

  {
   text: "transaction text 2",
    amount: "2,000",
    id: "2"
  },

  {
       text: "transaction text 3",
    amount: "4,000",
    id: "3"
  }
];

const totalProps = transactions.reduce((a, obj) => a + Object.keys(obj).length, 0);
console.log(totalProps);

// Create provider
export const TransactionProvider = ({ children }) => {
  // Use Reducer
  let [state, dispatch] = useReducer(TransactionReducer, initialTransactions);

  //Function  Add transaction
  function addTransaction(transactionObj) {
    dispatch({
      type: "ADD_TRANSACTION",
      payload: {
        text: transactionObj.text,
        amount: transactionObj.amount,
      },
    });
  }

  return (
    <TransactionContext.Provider
      value={{
        transactions: state,
        addTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
