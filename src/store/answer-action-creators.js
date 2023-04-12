import { answersActions } from "./answers-slice"


export const registerAnswer = (currentCountryCode, clickedCountryCode, dispatch) => {
    if (currentCountryCode === clickedCountryCode) {
        dispatch(answersActions.addCorrect())
    } else {
        dispatch(answersActions.addIncorrect())
    }
}