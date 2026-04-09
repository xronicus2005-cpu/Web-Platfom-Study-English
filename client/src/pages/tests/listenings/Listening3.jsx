import { useState, useEffect, useRef } from "react";
import "../../../styles/listening-style/Listening3.css"; 
import AnswersPage from "../../answer-page/AnswerPage";

// --- IMPORT YOUR ASSETS HERE ---
import fullAudio from "../../../assets/audio/E11T3.mp3";


const Listening3 = () => {
  const [activePart, setActivePart] = useState(1);
  const [time, setTime] = useState(1800); // Default 30 mins
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [highlightPopup, setHighlightPopup] = useState({ visible: false, x: 0, y: 0, range: null });
  
  const audioRef = useRef(null);
  const title = "E11T3";

  const correctAnswers = {
    1: "B", 2: "C", 3: "B", 4: "A", 5: "C", 6: "A",
    7: "birds", 8: "flowers", 9: "mushrooms", 10: "river",
    11: "C", 12: "B", 13: "B", 14: "A", 15: "C",
    16: "G", 17: "A", 18: "C", 19: "B", 20: "F",
    21: "cave", 22: "tiger", 23: "dancing", 24: "crying", 25: "grass", 26: "scarf",
    27: "A", 28: "C", 29: "D", 30: "B",
    31: "attitudes", 32: "numbers", 33: "time", 34: "software", 35: "patients",
    36: "emotions", 37: "income", 38: "comfortable", 39: "observation", 40: "analysis"
  };

  useEffect(() => {
    if (isFinished || time <= 0) return;
    const timer = setInterval(() => {
      setTime((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [isFinished, time]);

  const formatTime = () => {
    const min = Math.floor(time / 60);
    const sec = time % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const handleInputChange = (qNum, value) => {
    if (isFinished) return;
    setAnswers(prev => ({ ...prev, [qNum]: value }));
  };

  const getVal = (qNum) => answers[qNum] || "";

  // Highlight Logic
  const handleMouseUp = (e) => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 0) {
      const range = selection.getRangeAt(0);
      setHighlightPopup({ visible: true, x: e.pageX, y: e.pageY - 60, range });
    } else {
      setHighlightPopup({ visible: false, x: 0, y: 0, range: null });
    }
  };

  const applyHighlight = (color) => {
    if (highlightPopup.range) {
      const span = document.createElement("span");
      span.style.backgroundColor = color;
      span.className = "highlighted-text";
      try { highlightPopup.range.surroundContents(span); } catch (e) {}
    }
    setHighlightPopup({ visible: false, x: 0, y: 0, range: null });
    window.getSelection().removeAllRanges();
  };

  if (isFinished) {
    return <AnswersPage userAnswers={answers} correctAnswers={correctAnswers} title={title}/>;
  }

  const renderPart = () => {
    switch (activePart) {
      case 1:
        return (
          <div className="test-section">
            <div className="instructions-box">
              <div className="ins-header">Questions 1-6</div>
              <div className="ins-body">Choose the correct letter, <strong>A, B or C</strong>.</div>
            </div>
            <h2 className="section-title">Free activities in the Burnham area</h2>
            {[
              { q: 1, text: "The 'Family Welcome' event in the art gallery begins at", options: ["A. 10 am.", "B. 10.30 am.", "C. 2 pm."] },
              { q: 2, text: "The film that is now shown in the 'Family Welcome' event is about", options: ["A. sculpture.", "B. painting.", "C. ceramics."] },
              { q: 3, text: "When do most of the free concerts take place?", options: ["A. in the morning", "B. at lunchtime", "C. in the evening"] },
              { q: 4, text: "Where will the 4 pm concert of Latin American music take place?", options: ["A. in a museum", "B. in a theatre", "C. in a library"] },
              { q: 5, text: "The boat race begins at", options: ["A. Summer Pool.", "B. Charlesworth Bridge.", "C. Offord Marina."] },
              { q: 6, text: "One of the boat race teams", options: ["A. won a regional competition earlier this year.", "B. has represented the region in a national competition.", "C. has won several regional competitions."] }
            ].map(item => (
              <div key={item.q} className="mcq-item">
                <p>{item.q}. {item.text}</p>
                {item.options.map(opt => (
                  <label key={opt}>
                    <input type="radio" name={`q${item.q}`} checked={getVal(item.q) === opt[0]} onChange={() => handleInputChange(item.q, opt[0])} /> {opt}
                  </label>
                ))}
              </div>
            ))}

            <div className="instructions-box" style={{marginTop: '40px'}}>
              <div className="ins-header">Questions 7-10</div>
              <div className="ins-body">Complete the sentences below. Write <strong>ONE WORD ONLY</strong> for each answer.</div>
            </div>
            <div className="notes-container">
                <h4>Paxton Nature Reserve</h4>
                <ul>
                    <li>7. Paxton is a good place for seeing rare <input type="text" className="blank-input" value={getVal(7)} onChange={(e)=>handleInputChange(7, e.target.value)} /> all year round.</li>
                    <li>8. This is a particularly good time for seeing certain unusual <input type="text" className="blank-input" value={getVal(8)} onChange={(e)=>handleInputChange(8, e.target.value)} />.</li>
                    <li>9. Visitors will be able to learn about <input type="text" className="blank-input" value={getVal(9)} onChange={(e)=>handleInputChange(9, e.target.value)} /> and then collect some.</li>
                    <li>10. Part of the <input type="text" className="blank-input" value={getVal(10)} onChange={(e)=>handleInputChange(10, e.target.value)} /> has been made suitable for swimming.</li>
                </ul>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="test-section">
            <div className="instructions-box">
              <div className="ins-header">Questions 11-15</div>
              <div className="ins-body">Choose the correct letter, <strong>A, B or C</strong>.</div>
            </div>
            <h2 className="section-title">Changes in Barford over the last 50 years</h2>
            {[
              { q: 11, text: "In Shona's opinion, why do fewer people use buses in Barford?", options: ["A. The buses are old.", "B. Fares have gone up.", "C. Not so many bus routes."] },
              { q: 12, text: "What change in the road network benefited the town most?", options: ["A. construction of a bypass", "B. development of cycle paths", "C. banning cars from certain streets"] },
              { q: 13, text: "What is the problem affecting shopping in the town centre?", options: ["A. lack of parking", "B. lack of major retailers", "C. lack of restaurants"] },
              { q: 14, text: "What does Shona say about medical facilities in Barford?", options: ["A. There is no hospital.", "B. New practices are planned.", "C. Number of dentists is low."] },
              { q: 15, text: "The largest number of people are employed in", options: ["A. manufacturing.", "B. services.", "C. education."] }
            ].map(item => (
              <div key={item.q} className="mcq-item">
                <p>{item.q}. {item.text}</p>
                {item.options.map(opt => (
                  <label key={opt}>
                    <input type="radio" name={`q${item.q}`} checked={getVal(item.q) === opt[0]} onChange={() => handleInputChange(item.q, opt[0])} /> {opt}
                  </label>
                ))}
              </div>
            ))}

            <div className="instructions-box" style={{marginTop: '40px'}}>
              <div className="ins-header">Questions 16-20</div>
              <div className="ins-body">What is planned for each facility? Choose correct letter, <strong>A-G</strong>.</div>
            </div>
            <div className="matching-container">
                <div className="options-grid">
                    {["A. New location", "B. Hours extended", "C. Refurbished", "D. Different purpose", "E. Hours reduced", "F. New management", "G. Expanded"].map(opt => <div key={opt} className="opt-label">{opt}</div>)}
                </div>
                <div className="questions-stack">
                    {[{q:16, n:"railway station car park"}, {q:17, n:"cinema"}, {q:18, n:"indoor market"}, {q:19, n:"library"}, {q:20, n:"nature reserve"}].map(item => (
                        <div key={item.q} className="map-q-row">
                            <span>{item.q}. {item.n}</span>
                            <input type="text" className="blank-input small" maxLength="1" value={getVal(item.q)} onChange={(e)=>handleInputChange(item.q, e.target.value.toUpperCase())} />
                        </div>
                    ))}
                </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="test-section">
            <div className="instructions-box">
              <div className="ins-header">Questions 21-26</div>
              <div className="ins-body">Complete the table below. Write <strong>ONE WORD ONLY</strong> for each answer.</div>
            </div>
            <table className="listening-table">
                <thead>
                    <tr><th>Subject of drawing</th><th>Change to be made</th></tr>
                </thead>
                <tbody>
                    <tr>
                        <td>A <input type="text" className="blank-input" value={getVal(21)} onChange={(e)=>handleInputChange(21, e.target.value)} /> (21) surrounded by trees</td>
                        <td>Add Malcolm and a <input type="text" className="blank-input" value={getVal(22)} onChange={(e)=>handleInputChange(22, e.target.value)} /> (22) noticing him</td>
                    </tr>
                    <tr>
                        <td>People who are <input type="text" className="blank-input" value={getVal(23)} onChange={(e)=>handleInputChange(23, e.target.value)} /> (23) outside the forest</td>
                        <td>Add Malcolm sitting on a tree trunk and <input type="text" className="blank-input" value={getVal(24)} onChange={(e)=>handleInputChange(24, e.target.value)} /> (24)</td>
                    </tr>
                    <tr>
                        <td>Ice-skaters on <input type="text" className="blank-input" value={getVal(25)} onChange={(e)=>handleInputChange(25, e.target.value)} /> (25) covered with ice</td>
                        <td>Add a <input type="text" className="blank-input" value={getVal(26)} onChange={(e)=>handleInputChange(26, e.target.value)} /> (26) for each person</td>
                    </tr>
                </tbody>
            </table>

            <div className="instructions-box" style={{marginTop: '40px'}}>
              <div className="ins-header">Questions 27-30</div>
              <div className="ins-body">Who is going to write each part? Choose letter, <strong>A-D</strong>.</div>
            </div>
            <div className="matching-container">
                <p>A. Helen only | B. Jeremy only | C. Both | D. Neither</p>
                {[27,28,29,30].map(q => {
                    const labels = {27: "planned the project", 28: "ideas for stories", 29: "interpretation", 30: "comments on illustrations"};
                    return (
                        <div key={q} className="map-q-row">
                            <span>{q}. {labels[q]}</span>
                            <input type="text" className="blank-input small" maxLength="1" value={getVal(q)} onChange={(e)=>handleInputChange(q, e.target.value.toUpperCase())} />
                        </div>
                    )
                })}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="test-section">
            <div className="instructions-box">
              <div className="ins-header">Questions 31-40</div>
              <div className="ins-body">Write <strong>ONE WORD ONLY</strong> for each answer.</div>
            </div>
            <h2 className="section-title">ETHNOGRAPHY IN BUSINESS</h2>
            <div className="notes-container">
                <p>Ethnography: research exploring human cultures. Used in business to investigate needs and <strong>31.</strong> <input type="text" className="blank-input" value={getVal(31)} onChange={(e)=>handleInputChange(31, e.target.value)} />.</p>
                
                <h4>Examples</h4>
                <ul>
                    <li>Kitchen: Cooks couldn't see <strong>32.</strong> <input type="text" className="blank-input" value={getVal(32)} onChange={(e)=>handleInputChange(32, e.target.value)} /> in cups.</li>
                    <li>Uganda: Cell phone users wanted to check <strong>33.</strong> <input type="text" className="blank-input" value={getVal(33)} onChange={(e)=>handleInputChange(33, e.target.value)} /> used.</li>
                    <li>Computer: Need to develop <strong>34.</strong> <input type="text" className="blank-input" value={getVal(34)} onChange={(e)=>handleInputChange(34, e.target.value)} /> for communication.</li>
                    <li>Hospitals: Info about <strong>35.</strong> <input type="text" className="blank-input" value={getVal(35)} onChange={(e)=>handleInputChange(35, e.target.value)} /> in different parts.</li>
                    <li>Airlines: Recorded <strong>36.</strong> <input type="text" className="blank-input" value={getVal(36)} onChange={(e)=>handleInputChange(36, e.target.value)} /> while travelling.</li>
                </ul>

                <h4>Principles</h4>
                <ul>
                    <li>Participants selected by age, <strong>37.</strong> <input type="text" className="blank-input" value={getVal(37)} onChange={(e)=>handleInputChange(37, e.target.value)} /> or product.</li>
                    <li>Must feel <strong>38.</strong> <input type="text" className="blank-input" value={getVal(38)} onChange={(e)=>handleInputChange(38, e.target.value)} /> about taking part.</li>
                    <li>Usually direct <strong>39.</strong> <input type="text" className="blank-input" value={getVal(39)} onChange={(e)=>handleInputChange(39, e.target.value)} /> of participants.</li>
                    <li>Need time for <strong>40.</strong> <input type="text" className="blank-input" value={getVal(40)} onChange={(e)=>handleInputChange(40, e.target.value)} /> of data.</li>
                </ul>
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="listening-light-theme" onMouseUp={handleMouseUp}>
      <div className="full-viewport-wrapper">
        {highlightPopup.visible && (
          <div className="highlight-tooltip" style={{ top: `${highlightPopup.y}px`, left: `${highlightPopup.x}px`, position: 'absolute' }}>
            <button className="h-btn red" onClick={() => applyHighlight("#ff4d4d")}></button>
            <button className="h-btn yel" onClick={() => applyHighlight("#ffd43b")}></button>
            <button className="h-btn blu" onClick={() => applyHighlight("#339af0")}></button>
          </div>
        )}
        <header className="test-header">
          <div className="header-flex-container">
            <div className="timer-badge">⏱ {formatTime()}</div>
            <audio ref={audioRef} autoPlay className="custom-compact-player" controls src={fullAudio}></audio>
            <button className="finish-btn" onClick={() => setIsFinished(true)}>Finish Test</button>
          </div>
        </header>
        <nav className="part-navigation-bar">
          {[1, 2, 3, 4].map((n) => (
            <button key={n} className={`part-link ${activePart === n ? "active" : ""}`} onClick={() => setActivePart(n)}>Part {n}</button>
          ))}
        </nav>
        <main className="main-content-area">
          <div className="paper-container">{renderPart()}</div>
        </main>
      </div>
    </div>
  );
};

export default Listening3;