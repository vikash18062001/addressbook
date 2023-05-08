import { Person } from "../../../model/Person";

const initialState = {
    persons: []
}

const person = (state = initialState, action: { type: string; payload: any; }) => {
    switch (action.type) {
        case "LIST_PERSON":
            return { ...state, persons: action.payload }
        case "DELETE_PERSON":
            return {
                ...state, persons: state.persons.filter((data: any) => {
                    return data['id'] != action.payload
                })
            }
        case "UPDATE_PERSON":
            return {
                ...state, persons: state.persons.map((person: Person, index: number) => {
                    if (person['id'] == action.payload.id) {
                        return action.payload;
                    }
                    return person;
                })
            }
        case "ADD_PERSON":
            return {
                ...state, persons: [action.payload, ...state.persons]
            }

        default:
            return state;

    }
}

export default person;