import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const questions = [
  {
    id: 1,
    text: "Over the past 2 weeks, how often have you felt nervous or anxious?",
    options: [
      { text: "Not at all", weight: 0 },
      { text: "Several days", weight: 1 },
      { text: "More than half the days", weight: 2 },
      { text: "Nearly every day", weight: 3 }
    ]
  },
  {
    id: 2,
    text: "How often have you had trouble relaxing?",
    options: [
      { text: "Not at all", weight: 0 },
      { text: "Sometimes", weight: 1 },
      { text: "Often", weight: 2 },
      { text: "Almost always", weight: 3 }
    ]
  },
  {
    id: 3,
    text: "How frequently have you felt little interest in activities?",
    options: [
      { text: "Not at all", weight: 0 },
      { text: "Occasionally", weight: 1 },
      { text: "Frequently", weight: 2 },
      { text: "Constantly", weight: 3 }
    ]
  },
  {
    id: 4,
    text: "How often have you experienced sleep changes?",
    options: [
      { text: "No changes", weight: 0 },
      { text: "Mild changes", weight: 1 },
      { text: "Moderate changes", weight: 2 },
      { text: "Severe changes", weight: 3 }
    ]
  },
  {
    id: 5,
    text: "How often have you felt tired or low energy?",
    options: [
      { text: "Rarely or never", weight: 0 },
      { text: "A few times", weight: 1 },
      { text: "More days than not", weight: 2 },
      { text: "Every day", weight: 3 }
    ]
  },
  {
    id: 6,
    text: "How often have you had difficulty concentrating?",
    options: [
      { text: "Never", weight: 0 },
      { text: "Sometimes", weight: 1 },
      { text: "Often", weight: 2 },
      { text: "Very often", weight: 3 }
    ]
  }
];

const Dashboard = () => {

 const {user} = useAuth()

 const token = localStorage.getItem('token')
 
  const [testStarted, setTestStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [report, setReport] = useState(null);

   
  const [loader ,setLoader] = useState(false)

  const handleAnswer = (answerIndex) => {
    const newResponse = {
      questionId: questions[currentIndex].id,
      answer: answerIndex + 1 
    };

    const updatedResponses = [...responses, newResponse];
    setResponses(updatedResponses);

   
    if (currentIndex === questions.length - 1) {
      submitAnswers(updatedResponses);
    } else {
      setCurrentIndex(currentIndex + 1);
      setLoader(false)
    }
  };


  

   const submitAnswers = async (responses) => {
    setLoader(true)
    try {
      const res = await axios.post(
        'https://evalcore-server.onrender.com/eval/submit',
        { responses },
        {
          headers: {
            Authorization: `Bearer ${token}` // Use context token
          }
        }
      );
      setReport(res.data.data);
    } catch (err) {
      console.error("Submission error:", err);
      calculateLocalReport(responses);
    }
    finally{
      setLoader(false)
    }
  };

 
  const calculateLocalReport = (responses) => {
    let totalScore = 0;
    responses.forEach(response => {
      const question = questions.find(q => q.id === response.questionId);
      if (question) {
        totalScore += question.options[response.answer - 1]?.weight || 0;
      }
    });

    setReport({
      score: totalScore,
      analysis: getAnalysis(totalScore),
      responses
    });
  };

  const getAnalysis = (score) => {
    if (score <= 5) return "Your mental health appears stable.";
    else if (score <= 10) return "Mild symptoms detected. Consider self-care.";
    else return "Recommend consulting a mental health professional.";
  };

  const restartTest = () => {
    setTestStarted(false);
    setCurrentIndex(0);
    setResponses([]);
    setReport(null);
  };

  return (<>
  <div className='land h-screen w-screen flex items-center justify-center'>


    <div className="p-6 max-w-md mx-auto my-auto bg-white/50 rounded-lg shadow-md">
      {!testStarted ? (
        <div className="text-center">
          <h1 className="text-2xl font-head mb-4">Mental Health Assessment</h1>
          <button
            onClick={() => setTestStarted(true)}
            className="px-6 py-2 bg-[#ff92ef] text-black shadow-md shadow-black rounded-lg hover:bg-blue-700"
          >
            Begin Test
          </button>
        </div>
      ) : report ? (
        <div className="report overflow-x-auto capitalize">
  <h2 className="text-xl font-bold mb-4">Your Report</h2>
  <table className="table-auto border-collapse border border-gray-300 w-full">
    <tbody>
      <tr>
        <td className="border border-gray-300 px-4 py-2 font-semibold">Score</td>
        <td className="border border-gray-300 px-4 py-2">{report.evaluation.score}</td>
      </tr>
      <tr>
        <td className="border border-gray-300 px-4 py-2 font-semibold">Severity</td>
        <td className="border border-gray-300 px-4 py-2">{report.evaluation.severity}</td>
      </tr>
      <tr>
        <td className="border border-gray-300 px-4 py-2 font-semibold">Analysis</td>
        <td className="border border-gray-300 px-4 py-2">{report.report.message}</td>
      </tr>
      <tr>
        <td className="border border-gray-300 px-4 py-2 font-semibold">Recommendations</td>
        <td className="border border-gray-300 px-4 py-2">
          <ul className="list-disc list-inside">
            {report.report.recommendations.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </td>
      </tr>
    </tbody>
  </table>

  <button
    onClick={restartTest}
    className="mt-4 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
  >
    Retake Test
  </button>
  <b className='capitalize ml-[150px] text-2xl font-thin underline'>{user.data.name}</b>
</div>

      ) : (
        <div className="question">
          <h3 className="text-lg font-semibold mb-4">
            {questions[currentIndex].text}
          </h3>
          <div className="space-y-2">
            {questions[currentIndex].options.map((option, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-left"
              >
                {option.text}
              </button>
            ))}
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Question {currentIndex + 1} of {questions.length}
          </p>
        </div>
      )}
    </div>
      </div>
  </>
  );
};

export default Dashboard;