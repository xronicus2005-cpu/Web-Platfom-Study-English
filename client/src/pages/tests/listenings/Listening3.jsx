import { useState, useEffect, useRef } from "react";
import "../../../styles/listening-style/Listening3.css"; 
import AnswersPage from "../../answer-page/AnswerPage";

// --- IMPORT YOUR ASSETS HERE ---
import fullAudio from "../../../assets/audio/E11T3.mp3";


const Listening3 = () => {
  const [activePart, setActivePart] = useState(1);
  const [time, setTime] = useState(0); // Default 30 mins
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

  // Logic to sync timer with Audio Duration
  const handleMetadata = () => {
    if (audioRef.current) {
      // Sets the countdown to exactly the length of the audio file
      setTime(Math.floor(audioRef.current.duration));
    }
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
                <h4 className="topic-header">Paxton Nature Reserve</h4>
                <ul>
                    <li>Paxton is a good place for seeing rare <input type="text" placeholder="7" className="blank-input" value={getVal(7)} onChange={(e)=>handleInputChange(7, e.target.value)} /> all year round.</li>
                    <li>This is a particularly good time for seeing certain unusual <input type="text" placeholder="8" className="blank-input" value={getVal(8)} onChange={(e)=>handleInputChange(8, e.target.value)} />.</li>
                    <li>Visitors will be able to learn about <input type="text" className="blank-input" placeholder="9" value={getVal(9)} onChange={(e)=>handleInputChange(9, e.target.value)} /> and then collect some.</li>
                    <li>Part of the <input type="text" className="blank-input" value={getVal(10)} placeholder="10" onChange={(e)=>handleInputChange(10, e.target.value)} /> has been made suitable for swimming.</li>
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
              { q: 11, text: "In Shona's opinion, why do fewer people use buses in Barford these days?", options: ["A. The buses are old and uncomfortable..", "B. Fares have gone up too much.", "C. There are not so many bus routes."] },
              { q: 12, text: "What change in the road network is known to have benefited the town most?", options: ["A. the construction of a bypass", "B. development of cycle paths", "C. banning cars from certain streets"] },
              { q: 13, text: "What is the problem affecting shopping in the town centre?", options: ["A. lack of parking spaces", "B. lack of major retailers", "C. lack of restaurants and cafes"] },
              { q: 14, text: "What does Shona say about medical facilities in Barford?", options: ["A. There is no hospital.", "B. New medical practices are planned.", "C. the number of dentists is too low."] },
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

            <div className="wrap-grid">
              <div className="options-grid">
                {["A. It will move to a new location.", "B. It will have its opening hours extended.", "C. It will be refurbished.", "D. It will be used for a different purpose.", "E. It will have its opening hours reduced", "F. It will have new management", "G. It will be expanded"].map(opt => <div key={opt} className="opt-label">{opt}</div>)}
              </div>
            </div>


            <div className="matching-container">

                <div className="questions-stack">
                    {[{q:16, n:"railway station car park"}, {q:17, n:"cinema"}, {q:18, n:"indoor market"}, {q:19, n:"library"}, {q:20, n:"nature reserve"}].map(item => (
                        <div key={item.q} className="map-q-row">
                            <span>{item.q}. {item.n}</span>
                            <input type="text" className="blank-input small" placeholder={item.q} maxLength="1" value={getVal(item.q)} onChange={(e)=>handleInputChange(item.q, e.target.value.toUpperCase())} />
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
                        <td>A <input type="text" className="blank-input" placeholder="21" value={getVal(21)} onChange={(e)=>handleInputChange(21, e.target.value)} />surrounded by trees</td>
                        <td>Add Malcolm and a <input type="text" className="blank-input" placeholder="22" value={getVal(22)} onChange={(e)=>handleInputChange(22, e.target.value)} />noticing him</td>
                    </tr>
                    <tr>
                        <td>People who are <input type="text" className="blank-input" value={getVal(23)} placeholder="23" onChange={(e)=>handleInputChange(23, e.target.value)} />outside the forest</td>
                        <td>Add Malcolm sitting on a tree trunk and <input type="text" className="blank-input" placeholder="24" value={getVal(24)} onChange={(e)=>handleInputChange(24, e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td>Ice-skaters on <input type="text" className="blank-input" value={getVal(25)} placeholder="25" onChange={(e)=>handleInputChange(25, e.target.value)} /> covered with ice</td>
                        <td>Add a <input type="text" className="blank-input" placeholder="26" value={getVal(26)} onChange={(e)=>handleInputChange(26, e.target.value)} />for each person</td>
                    </tr>
                </tbody>
            </table>

            <div className="instructions-box" style={{marginTop: '40px'}}>
              <div className="ins-header">Questions 27-30</div>
              <div className="ins-body">Who is going to write each part? Choose letter, <strong>A-D</strong>.</div>
            </div>

            <div className="wrap-grid">

              <div className="options-grid">
                <p className="opt-label">A. Helen only</p>
                <p className="opt-label">B. Jeremy only</p>
                <p className="opt-label">C. both Helen and Jeremy</p>
                <p className="opt-label">D. neither Helen nor Jeremy</p>
              </div>

            </div>


                
              <div className="matching-container">
                {[27,28,29,30].map(q => {
                    const labels = {27: "planned the project", 28: "ideas for stories", 29: "interpretation", 30: "comments on illustrations"};
                    return (
                        <div key={q} className="map-q-row">
                            <span>{q}. {labels[q]}</span>
                            <input type="text" placeholder={q} className="blank-input small" maxLength="1" value={getVal(q)} onChange={(e)=>handleInputChange(q, e.target.value.toUpperCase())} />
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
                <h6 className="info-just">Ethnography: research which explores human cultures</h6>

                <h4>It can be used in business:</h4>
                <ul>
                  <li>to investigate customer needs and  <input type="text" placeholder="31" className="blank-input" value={getVal(31)} onChange={(e)=>handleInputChange(31, e.target.value)} />.</li>
                  <li>to help companies develop new designs</li>
                </ul>
                
                
                <h4>Examples of ethnographic research in business</h4>
                
                <h5>Kitchen equipment</h5>
                <ul>
                     <li>Researchers found that cooks could not easily see the  <input type="text" placeholder="32" className="blank-input" value={getVal(32)} onChange={(e)=>handleInputChange(32, e.target.value)} /> in measuring cups.</li>
                </ul>

                <h5>Cell phones</h5>
                  <ul>
                    <li>In Uganda, customers paid to use the cell phones of entrepreneurs.</li>
                    <li>These customers wanted to check the  <input type="text" placeholder="33" className="blank-input" value={getVal(33)} onChange={(e)=>handleInputChange(33, e.target.value)} /> used.</li>
                  </ul>

                <h5>Computer companies</h5>
                <ul>
                  <li>There was a need to develop  <input type="text" placeholder="34" className="blank-input" value={getVal(34)} onChange={(e)=>handleInputChange(34, e.target.value)} />     to improve communication between system administrators and colleagues.</li>
                </ul>
                
                <h5>Hospitals</h5>
                <ul> 
                   <li>Nurses needed to access information about  <input type="text" placeholder="35" className="blank-input" value={getVal(35)} onChange={(e)=>handleInputChange(35, e.target.value)} /> in different parts of the hospital.</li>
                </ul>

                <h5>Airlines</h5>
                <ul>
                   <li>Respondents recorded information about their  <input type="text" placeholder="36"  className="blank-input" value={getVal(36)} onChange={(e)=>handleInputChange(36, e.target.value)} /> while travelling.</li>
                </ul>
                   

                   
                   
                

                <h4>Principles of ethnographic research in business</h4>
                <ul>
                  <li>The researcher does not start off with a hypothesis.</li>
                    <li>Participants may be selected by criteria such as age, <input type="text" placeholder="37" className="blank-input" value={getVal(37)} onChange={(e)=>handleInputChange(37, e.target.value)} /> or product used.</li>
                    <li>The participants must feel  <input type="text" className="blank-input" placeholder="38" value={getVal(38)} onChange={(e)=>handleInputChange(38, e.target.value)} /> about taking part in the research.</li>
                    <li>There is usually direct  <input type="text" className="blank-input" placeholder="39" value={getVal(39)} onChange={(e)=>handleInputChange(39, e.target.value)} /> of the participants.</li>
                    <li>The interview is guided by the participant.</li>
                    <li>A lot of time is needed for the  <input type="text" placeholder="40" className="blank-input" value={getVal(40)} onChange={(e)=>handleInputChange(40, e.target.value)} /> of the data.</li>
                    <li>Researchers look for a meaningful pattern in the data.</li>
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
            <audio ref={audioRef} autoPlay className="custom-compact-player" controls src={fullAudio} onLoadedMetadata={handleMetadata}></audio>
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