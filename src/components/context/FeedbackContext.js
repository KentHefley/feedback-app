import { v4 as uuidv4 } from 'uuid';
import { createContext, useState } from "react";

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const [feedback, setFeedback] = useState([
        {
            id: 1,
            text: 'This feedback item 1',
            rating: 10
        },
        {
            id: 2,
            text: 'This feedback item 2',
            rating: 10
        },
        {
            id: 3,
            text: 'This feedback item 3',
            rating: 10
        }
    ]);
    
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false,
    })

    // * Add Feedback

    function addFeedback(newFeedback) {
        newFeedback.id = uuidv4();
        setFeedback([newFeedback, ...feedback]);
        
    }

    // * Delete Feedback
    function deleteFeedback(id) {
        if (window.confirm('Are you sure you want to delete this item')) {
            setFeedback(feedback.filter((item) => item.id !== id))
        }
    }

    


    // * Update feedback item

    function updateFeedback(id, updItem) {
        setFeedback(feedback.map((item)=> item.id === id ? {...item, ...updItem} : item));
        

        setFeedbackEdit({
            item: {},
            edit: false
        })
      
    }

    // * Set item to be updated

    function editFeedback(item) {
        setFeedbackEdit({
            item,
            edit: true
        })
    }


return <FeedbackContext.Provider value={{
    feedback,
    deleteFeedback,
    addFeedback,
    editFeedback,
    feedbackEdit,
    setFeedbackEdit,
    updateFeedback
}}>
    {children}
</FeedbackContext.Provider>
}

export default FeedbackContext;