import {API} from 'aws-amplify'
import {createContact} from '../amplify/backend/function/ryantalbotwebsitec58c8665/src/'

const handleContactFormSubmit = async (e) => {
    e.preventDefault()
    const {name, email, message} = formstate
    if(name && email && message){
        try {
            alert('Contact Form Submitted Successfully')
            onclose()
        } catch (e) {}

    }
}

await API.graphql({
    query: createContact,
    variables: {
      input: {
        name,
        email,
        message,
      },
    },
  })