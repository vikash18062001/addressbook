import { Dispatch } from "@reduxjs/toolkit";
import { Person } from "../../../model/Person"
import Service from "../../../service/service"

export const addPerson = (person: Person) => {
  return (dispatch : Dispatch) =>{
    Service.add(person).then((response) => {
      dispatch({type:"ADD_PERSON",payload:person})
    }).catch((error)=>{
      console.log(error);
    })

  }
}

export const getAllPerson = () => {
  return (dispatch: Dispatch) => {
    Service.getAll()
      .then((response) => {
        dispatch({ type: "LIST_PERSON", payload: response.data });
      })
      .catch((error) => {
        console.error(error);
      });
  };
}

export const deletePerson = (id: number) => {
  return (dispatch: Dispatch) => {
    Service.delete(id).then((response) => {
      console.log("Successfull deletioon");
      dispatch({ type: "DELETE_PERSON", payload: id })
    }).catch((error) => {
      console.log(error);
    })
  }
}

export const updatePerson = (person : Person) => {
  return (dispatch: Dispatch) => {
    Service.update(person).then((response) => {
      console.log("Successfull update");
      dispatch({ type: "UPDATE_PERSON", payload: person })
    }).catch((error) => {
      console.log(error);
    })
  }
}

export default { addPerson, getAllPerson ,deletePerson,updatePerson};