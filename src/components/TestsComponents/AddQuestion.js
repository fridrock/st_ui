import React, { useState } from 'react';
import Button from '../default/Button';
import { TESTS_ENDPOINT, useAuthFetch } from '../../utils';
const AddQuestion = ({test}) => {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState([{ responseText: '', correctness: false }]);
  const authFetch = useAuthFetch()
  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleAnswerChange = (index, field, value) => {
    const newAnswers = [...answers];
    if (field === 'responseText') {
      newAnswers[index].responseText = value;
    } else if (field === 'correctness') {
      newAnswers[index].correctness = value;
    }
    setAnswers(newAnswers);
  };

  const addAnswer = () => {
    setAnswers([...answers, { responseText: '', correctness: false }]);
  };

  const removeAnswer = (index) => {
    setAnswers(answers.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await authFetch(`${TESTS_ENDPOINT}/questions`, {
        method: "POST",
        body: JSON.stringify({
            questionText: question,
            testId: test.id,
            responses: answers
        })
    })
    if(response.status == 200){
      setQuestion('')
      setAnswers([{responseText: '', correctness: false}])
    }

  };

  return (
    <form className='mt-10'>
      <div>
        <input
          placeholder='Question'
          type="text"
          value={question}
          onChange={handleQuestionChange}
        />
      </div>
      <div className='mt-5 mb-5'>
        <h4>Answers:</h4>
        {answers.map((answer, index) => (
          <div key={index} className='mt-5 mb-5'>
            <input
              type="text"
              placeholder="Answer responseText"
              value={answer.responseText}
              onChange={(e) => handleAnswerChange(index, 'responseText', e.target.value)}
              required
            />
            <label className='ml-5'>
              Correct:
              <input
                className='ml-1 mr-1'
                type="checkbox"
                checked={answer.correctness}
                onChange={(e) => handleAnswerChange(index, 'correctness', e.target.checked)}
              />
            </label>
            <Button text="Remove" onClick={() => removeAnswer(index)} className='ml-5'>
            </Button>
          </div>
        ))}
        <Button onClick={addAnswer} text="Add Answer">
        </Button>
      </div>
      <div className='mt-5'>
        <Button text="Submit" onClick={(e)=>handleSubmit(e)}></Button>
      </div>
    </form>
  );
};

export default AddQuestion;