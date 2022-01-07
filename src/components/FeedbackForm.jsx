import { useState, useContext, useEffect } from "react"
import Card from "./shared/Card";
import Button from "./shared/Button";
import RatingSelect from "./ratingSelect";
import FeedbackContext from "./context/FeedbackContext";

function FeedbackForm() {
    const [text, setText] = useState('');
    const [rating, setRating] = useState(10);
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [message, setMessage] = useState('')

    const {addFeedback, feedbackEdit, updateFeedback} =useContext(FeedbackContext)

    useEffect(() => {
        if(feedbackEdit.edit === true) {
            setBtnDisabled(false)
            setText(feedbackEdit.item.text)
            setRating(feedbackEdit.item.rating)
        }
    }, [feedbackEdit])

    function handleTextChange(e) {
        if (text === '') {
            setBtnDisabled(true)
            setMessage(null)
        } else if (text !== '' && text.trim().length <= 10) {
            setMessage('Text must be a least 10 characters')
            setBtnDisabled(true)
        } else {
            setMessage(null)
            setBtnDisabled(false)
        }
        setText(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (text.trim().length > 10) {
            const newFeedback = {
                text,
                rating,
            }

            if(feedbackEdit.edit === true) {
                updateFeedback(feedbackEdit.id, newFeedback)
            } else {
                addFeedback(newFeedback)
            }
           
            setText('');
        }
    }

    return <Card>
        <form onSubmit={handleSubmit}>
            <h2>How would you rate our service with us</h2>
            <RatingSelect select={(rating) => setRating(rating)} />
            <div className="input-group">
                <input onChange={handleTextChange} type="text" value={text} placeholder="write a review" />
                <Button type='submit' isDisabled={btnDisabled}>Send</Button>
            </div>
            {message && <div className='message'>{message}</div>}
        </form>
    </Card>
}

export default FeedbackForm
