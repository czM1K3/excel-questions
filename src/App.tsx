import { useEffect, useState } from 'react';
import './App.css';
import { parseXlsx } from './lib/parse';
import type { Row } from "read-excel-file";
import { generateNumberInRange, generateNumbers } from './lib/generateNumbers';
import { Question } from './types/question';

const App = () => {
  const [data, setData] = useState<Row[]>([]);
  const [headers, setHeaders] = useState<Row>();
  const [question, setQuestion] = useState<Question | null>(null);

  useEffect(() => {
    (async () => {
      const { data, headers } = await parseXlsx();
      setData(data);
      setHeaders(headers);
    })();
  }, []);

  const pickQuestion = () => {
    const indexes = generateNumbers(data.length, 3);
    const correctIndex = indexes[Math.floor(Math.random() * indexes.length)];
    if (Math.random() > 0.5) {
      const questionIndex = 0;
      const askingIndex = generateNumberInRange(6, 9);
      setQuestion({
        question: correctIndex,
        answers: indexes,
        askingIndex: questionIndex,
        responseIndex: askingIndex,
        selectedIndex: null,
      });
    } else {
      const questionIndex = 1;
      const askingIndex = generateNumberInRange(3, 5);
      setQuestion({
        question: correctIndex,
        answers: indexes,
        askingIndex: questionIndex,
        responseIndex: askingIndex,
        selectedIndex: null,
      });
    }
  };

  return (
    <div className="all">
      <div className="main">
        {question && (
          <>
            <h1>{data[question.question][question.askingIndex].toString()}</h1>
            {headers && <h2>{headers[question.responseIndex].toString()}:</h2>}
            {question.answers.map((answerIndex) => (
              <button
                onClick={() => {
                  setQuestion({
                    ...question,
                    selectedIndex: answerIndex,
                  })
                }}
                key={answerIndex}
              >{data[answerIndex][question.responseIndex].toString()}</button>
            ))}
            {question.selectedIndex !== null ? (
              <h2>{data[question.question][question.responseIndex].toString()}</h2>
            ) : (
              <h2>Klikni na ot??zku</h2>
            )}
          </>
        )}
        {data && <button onClick={() => pickQuestion()}>Generovat</button>}
      </div>      
      <div className="config">
        <a href="/cetba.xlsx">
          <button>Template</button>
        </a>
        <form>
          <input type="file" onChange={async (e) => {
            const files = e.target.files;
            if (files && files.length === 1) {
              const file = files[0];
              if (!file.name.endsWith('.xlsx')) {
                alert("Only .xlsx files are accepted");
                return;
              }
              const { data, headers } = await parseXlsx(file);
              setData(data);
              setHeaders(headers);
            }
          }} />
        </form>
      </div>
    </div>
  );
};

export default App;
