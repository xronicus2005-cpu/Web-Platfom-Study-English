import { useState, useEffect, useRef } from "react";
import "../../../styles/listening-style/Listening1.css";
import photo from "../../../assets/testPhotos/C1T1.png";
import fullAudio from "../../../assets/audio/IELTS 11 Test 1.mp3";
import AnswersPage from "../../answer-page/AnswerPage";

const Listening1 = () => {
  const [activePart, setActivePart] = useState(1);
  const [time, setTime] = useState(0); // Initialize at 0
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [highlightPopup, setHighlightPopup] = useState({ visible: false, x: 0, y: 0, range: null });
  
  const audioRef = useRef(null);

  const correctAnswers = {
    1: "Charlton", 2: "115", 3: "cash", 4: "parking", 5: "music",
    6: "entry", 7: "stage", 8: "code", 9: "floor", 10: "decoration",
    11: "animal", 12: "tool", 13: "shoes", 14: "dog",
    15: "F", 16: "G", 17: "D", 18: "H", 19: "C", 20: "A",
    21: "C", 22: "B", 23: "B", 24: "C", 25: "A", 26: "B", 27: "C", 28: "A", 29: "B", 30: "A",
    31: "conservation", 32: "food", 33: "surface", 34: "oxygen", 35: "mammals",
    36: "ice", 37: "decline", 38: "map", 39: "migration", 40: "consumption"
  };

  const title = "E11T1"

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
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isFinished, time]);

  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleInputChange = (qNum, value) => {
    if (isFinished) return;
    setAnswers(prev => ({ ...prev, [qNum]: value }));
  };

  const getInputValue = (qNum) => answers[qNum] || "";

  const handleMouseUp = (e) => {
    if (["INPUT", "BUTTON", "LABEL"].includes(e.target.tagName)) return;
    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 0) {
      const range = selection.getRangeAt(0);
      setHighlightPopup({ visible: true, x: e.pageX, y: e.pageY - 60, range: range });
    } else {
      setHighlightPopup({ visible: false, x: 0, y: 0, range: null });
    }
  };

  const applyHighlight = (color) => {
    if (highlightPopup.range) {
      const span = document.createElement("span");
      span.style.backgroundColor = color;
      span.className = "highlighted-text";
      try { highlightPopup.range.surroundContents(span); } 
      catch (e) { console.warn("Highlight error"); }
    }
    setHighlightPopup({ visible: false, x: 0, y: 0, range: null });
    window.getSelection().removeAllRanges();
  };

  const getMapLabel = (num) => {
      const labels = {15: "Scarecrow", 16: "Maze", 17: "Café", 18: "Black Barn", 19: "Covered picnic area", 20: "Fiddy House"};
      return labels[num];
  }

  if (isFinished) {
    return <AnswersPage userAnswers={answers} correctAnswers={correctAnswers} title={title}/>;
  }

  const renderQuestions = () => {
    switch (activePart) {
      case 1:
        return (
          <div className="test-section">
            <div className="instructions-box">
              <div className="ins-header">Questions 1-10</div>
              <div className="ins-body">Complete the notes below. Write <strong>ONE WORD AND/OR A NUMBER</strong> for each answer.</div>
            </div>
            <h2 className="section-title">HIRING A PUBLIC ROOM</h2>
            <div className="notes-container">
                <p>Example: the Main Hall — seats 200</p>
                <h4>Room and cost</h4>
                <ul>
                    <li>the <input type="text" className="blank-input" value={getInputValue(1)} onChange={(e)=>handleInputChange(1, e.target.value)} placeholder="1" /> Room - seats 100</li>
                    <li>Cost of Main Hall for Saturday evening: £ <input type="text" className="blank-input" value={getInputValue(2)} onChange={(e)=>handleInputChange(2, e.target.value)} placeholder="2" /> + £250 deposit (<input type="text" className="blank-input" value={getInputValue(3)} onChange={(e)=>handleInputChange(3, e.target.value)} placeholder="3" /> payment is required)</li>
                    <li>Cost includes use of tables and chairs and also <input type="text" className="blank-input" value={getInputValue(4)} onChange={(e)=>handleInputChange(4, e.target.value)} placeholder="4" /></li>
                    <li>Additional charge for use of the kitchen: £25</li>
                </ul>
                <h4>Before the event</h4>
                <ul>
                    <li>We need a <input type="text" className="blank-input" value={getInputValue(5)} onChange={(e)=>handleInputChange(5, e.target.value)} placeholder="5" /> licence</li>
                    <li>Need to contact caretaker (Mr Evans) in advance to arrange <input type="text" className="blank-input" value={getInputValue(6)} onChange={(e)=>handleInputChange(6, e.target.value)} placeholder="6" /></li>
                </ul>
                <h4>During the event</h4>
                <ul>
                    <li>The building is no smoking</li>
                    <li>The band should use the <input type="text" className="blank-input" value={getInputValue(7)} onChange={(e)=>handleInputChange(7, e.target.value)} placeholder="7" /> door at the back</li>
                </ul>
                <h4>After the event</h4>
                <ul>
                    <li>Need to know the <input type="text" className="blank-input" value={getInputValue(8)} onChange={(e)=>handleInputChange(8, e.target.value)} placeholder="8" /> for the cleaning cupboard</li>
                    <li>The <input type="text" className="blank-input" value={getInputValue(9)} onChange={(e)=>handleInputChange(9, e.target.value)} placeholder="9" /> must be washed and rubbish placed in black bags</li>
                    <li>All <input type="text" className="blank-input" value={getInputValue(10)} onChange={(e)=>handleInputChange(10, e.target.value)} placeholder="10" /> must be taken down</li>
                </ul>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="test-section">
            <div className="instructions-box">
              <div className="ins-header">Questions 11-14</div>
              <div className="ins-body">Write <strong>ONE WORD</strong> for each answer.</div>
            </div>
            <h2 className="section-title">Fiddy Working Heritage Farm</h2>
            <ul>
                <li>take care not to harm any <input type="text" className="blank-input" value={getInputValue(11)} onChange={(e)=>handleInputChange(11, e.target.value)} placeholder="11" /></li>
                <li>not touch any <input type="text" className="blank-input" value={getInputValue(12)} onChange={(e)=>handleInputChange(12, e.target.value)} placeholder="12" /></li>
                <li>wear <input type="text" className="blank-input" value={getInputValue(13)} onChange={(e)=>handleInputChange(13, e.target.value)} placeholder="13" /></li>
                <li>not bring <input type="text" className="blank-input" value={getInputValue(14)} onChange={(e)=>handleInputChange(14, e.target.value)} placeholder="14" /> into the farm</li>
            </ul>
            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 15-20</div>
              <div className="ins-body">Label the map below. Choose the correct letter, <strong>A-I</strong>.</div>
            </div>
            <img className="map-placeholder" src={photo} alt="photo"/>
            <div className="map-questions">
                {[15,16,17,18,19,20].map(q => (
                    <div key={q} className="map-q-row">
                        <span>{q}. {getMapLabel(q)}</span>
                        <input type="text" className="blank-input small" value={getInputValue(q)} onChange={(e)=>handleInputChange(q, e.target.value)} maxLength="1" />
                    </div>
                ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="test-section">
             <div className="instructions-box">
              <div className="ins-header">Questions 21-30</div>
              <div className="ins-body">Choose the correct letter, <strong>A, B or C</strong>.</div>
            </div>
            <h2 className="section-title">Study on Gender in Physics</h2>
            <div className="mcq-container">
                  <div className="mcq-item">
                    <p>21. The students in Akira Miyake's study were all majoring in</p>
                    <label><input type="radio" name="q21" checked={answers[21] === 'A'} onChange={()=>handleInputChange(21, 'A')} /> A. physics.</label><br/>
                    <label><input type="radio" name="q21" checked={answers[21] === 'B'} onChange={()=>handleInputChange(21, 'B')} /> B. psychology or physics.</label><br/>
                    <label><input type="radio" name="q21" checked={answers[21] === 'C'} onChange={()=>handleInputChange(21, 'C')} /> C. science, technology, engineering or mathematics.</label>
                  </div>
                  <div className="mcq-item">
                    <p>22. The aim of Miyake's study was to investigate</p>
                    <label><input type="radio" name="q22" checked={answers[22] === 'A'} onChange={()=>handleInputChange(22, 'A')} /> A. what kind of women choose to study physics.</label><br/>
                    <label><input type="radio" name="q22" checked={answers[22] === 'B'} onChange={()=>handleInputChange(22, 'B')} /> B. a way of improving women's performance in physics.</label><br/>
                    <label><input type="radio" name="q22" checked={answers[22] === 'C'} onChange={()=>handleInputChange(22, 'C')} /> C. whether fewer women than men study physics at college.</label>
                  </div>
                  <div className="mcq-item">
                    <p>23. The female physics students were wrong to believe that</p>
                    <label><input type="radio" name="q23" checked={answers[23] === 'A'} onChange={()=>handleInputChange(23, 'A')} /> A. the teachers marked them in an unfair way.</label><br/>
                    <label><input type="radio" name="q23" checked={answers[23] === 'B'} onChange={()=>handleInputChange(23, 'B')} /> B. the male students expected them to do badly.</label><br/>
                    <label><input type="radio" name="q23" checked={answers[23] === 'C'} onChange={()=>handleInputChange(23, 'C')} /> C. their test results were lower than the male students'.</label>
                  </div>
                  <div className="mcq-item">
                    <p>24. Miyake's team asked the students to write about</p>
                    <label><input type="radio" name="q24" checked={answers[24] === 'A'} onChange={()=>handleInputChange(24, 'A')} /> A. what they enjoyed about studying physics.</label><br/>
                    <label><input type="radio" name="q24" checked={answers[24] === 'B'} onChange={()=>handleInputChange(24, 'B')} /> B. the successful experiences of other people.</label><br/>
                    <label><input type="radio" name="q24" checked={answers[24] === 'C'} onChange={()=>handleInputChange(24, 'C')} /> C. something that was important to them personally.</label>
                  </div>
                  <div className="mcq-item">
                    <p>25. What was the aim of the writing exercise done by the subjects?</p>
                    <label><input type="radio" name="q25" checked={answers[25] === 'A'} onChange={()=>handleInputChange(25, 'A')} /> A. to reduce stress</label><br/>
                    <label><input type="radio" name="q25" checked={answers[25] === 'B'} onChange={()=>handleInputChange(25, 'B')} /> B. to strengthen verbal ability</label><br/>
                    <label><input type="radio" name="q25" checked={answers[25] === 'C'} onChange={()=>handleInputChange(25, 'C')} /> C. to encourage logical thinking</label>
                  </div>
                  <div className="mcq-item">
                    <p>26. What surprised the researchers about the study?</p>
                    <label><input type="radio" name="q26" checked={answers[26] === 'A'} onChange={()=>handleInputChange(26, 'A')} /> A. how few students managed to get A grades</label><br/>
                    <label><input type="radio" name="q26" checked={answers[26] === 'B'} onChange={()=>handleInputChange(26, 'B')} /> B. the positive impact it had on physics results for women</label><br/>
                    <label><input type="radio" name="q26" checked={answers[26] === 'C'} onChange={()=>handleInputChange(26, 'C')} /> C. the difference between male and female performance</label>
                  </div>
                  <div className="mcq-item">
                    <p>27. Greg and Lisa think Miyake's results could have been affected by</p>
                    <label><input type="radio" name="q27" checked={answers[27] === 'A'} onChange={()=>handleInputChange(27, 'A')} /> A. the length of the writing task.</label><br/>
                    <label><input type="radio" name="q27" checked={answers[27] === 'B'} onChange={()=>handleInputChange(27, 'B')} /> B. the number of students who took part.</label><br/>
                    <label><input type="radio" name="q27" checked={answers[27] === 'C'} onChange={()=>handleInputChange(27, 'C')} /> C. the information the students were given.</label>
                  </div>
                  <div className="mcq-item">
                    <p>28. Greg and Lisa decide that in their own project, they will compare the effects of</p>
                    <label><input type="radio" name="q28" checked={answers[28] === 'A'} onChange={()=>handleInputChange(28, 'A')} /> A. two different writing tasks.</label><br/>
                    <label><input type="radio" name="q28" checked={answers[28] === 'B'} onChange={()=>handleInputChange(28, 'B')} /> B. a writing task with an oral task.</label><br/>
                    <label><input type="radio" name="q28" checked={answers[28] === 'C'} onChange={()=>handleInputChange(28, 'C')} /> C. two different oral tasks.</label>
                  </div>
                  <div className="mcq-item">
                    <p>29. The main finding of Smolinsky's research was that class teamwork activities</p>
                    <label><input type="radio" name="q29" checked={answers[29] === 'A'} onChange={()=>handleInputChange(29, 'A')} /> A. were most effective when done by all-women groups.</label><br/>
                    <label><input type="radio" name="q29" checked={answers[29] === 'B'} onChange={()=>handleInputChange(29, 'B')} /> B. had no effect on the performance of men or women.</label><br/>
                    <label><input type="radio" name="q29" checked={answers[29] === 'C'} onChange={()=>handleInputChange(29, 'C')} /> C. improved the results of men more than of women.</label>
                  </div>
                  <div className="mcq-item">
                    <p>30. What will Lisa and Greg do next?</p>
                    <label><input type="radio" name="q30" checked={answers[30] === 'A'} onChange={()=>handleInputChange(30, 'A')} /> A. talk to a professor</label><br/>
                    <label><input type="radio" name="q30" checked={answers[30] === 'B'} onChange={()=>handleInputChange(30, 'B')} /> B. observe a science class</label><br/>
                    <label><input type="radio" name="q30" checked={answers[30] === 'C'} onChange={()=>handleInputChange(30, 'C')} /> C. look at the science timetable</label>
                  </div>
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
            <h2 className="section-title">Ocean Biodiversity</h2>
            <div className="notes-container">
                <h4>Biodiversity hotspots</h4>
                <ul>
                    <li>important for locating targets for <input type="text" className="blank-input" value={getInputValue(31)} onChange={(e)=>handleInputChange(31, e.target.value)} placeholder="31" /></li>
                </ul>
                <h4>Boris Worm, 2005</h4>
                <ul>
                    <li>found hotspots were not always rich in <input type="text" className="blank-input" value={getInputValue(32)} onChange={(e)=>handleInputChange(32, e.target.value)} placeholder="32" /></li>
                    <li>had higher temperatures at the <input type="text" className="blank-input" value={getInputValue(33)} onChange={(e)=>handleInputChange(33, e.target.value)} placeholder="33" /></li>
                    <li>had sufficient <input type="text" className="blank-input" value={getInputValue(34)} onChange={(e)=>handleInputChange(34, e.target.value)} placeholder="34" /> in the water</li>
                </ul>
                <h4>Lisa Ballance, 2007</h4>
                <ul>
                    <li>looked for hotspots for marine <input type="text" className="blank-input" value={getInputValue(35)} onChange={(e)=>handleInputChange(35, e.target.value)} placeholder="35" /></li>
                </ul>
                <h4>Census of Marine Life</h4>
                <ul>
                    <li>found species living under the <input type="text" className="blank-input" value={getInputValue(36)} onChange={(e)=>handleInputChange(36, e.target.value)} placeholder="36" /></li>
                </ul>
                <h4>Global Marine Species Assessment</h4>
                <ul>
                    <li>rate of <input type="text" className="blank-input" value={getInputValue(37)} onChange={(e)=>handleInputChange(37, e.target.value)} placeholder="37" /></li>
                    <li>Aim: make a distribution <input type="text" className="blank-input" value={getInputValue(38)} onChange={(e)=>handleInputChange(38, e.target.value)} placeholder="38" /> for each one</li>
                </ul>
                <h4>Recommendations</h4>
                <ul>
                    <li>establish <input type="text" className="blank-input" value={getInputValue(39)} onChange={(e)=>handleInputChange(39, e.target.value)} placeholder="39" /> corridors</li>
                    <li>catch fish only for the purpose of <input type="text" className="blank-input" value={getInputValue(40)} onChange={(e)=>handleInputChange(40, e.target.value)} placeholder="40" /></li>
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
            <div className="timer-section">
              <div className="timer-badge">⏱ {formatTime()}</div>
            </div>
            <audio 
              ref={audioRef}
              onLoadedMetadata={handleMetadata} // Syncs timer to duration
              autoPlay 
              className="custom-compact-player" 
              controls  
              src={fullAudio}>
            </audio>
            <button className="finish-btn" onClick={() => setIsFinished(true)}>Finish Test</button>
          </div>
        </header>
        <nav className="part-navigation-bar">
          {[1, 2, 3, 4].map((n) => (
            <button key={n} className={`part-link ${activePart === n ? "active" : ""}`} onClick={() => setActivePart(n)}>Part {n}</button>
          ))}
        </nav>
        <main className="main-content-area">
          <div className="paper-container">{renderQuestions()}</div>
        </main>
      </div>
    </div>
  );
};


export default Listening1