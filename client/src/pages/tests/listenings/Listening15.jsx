import { useState, useEffect, useRef } from "react";
import "../../../styles/listening-style/Listening15.css";
import AnswersPage from "../../answer-page/AnswerPage";

// --- ASSET IMPORTS ---
import fullAudio from "../../../assets/audio/E14T3.mp3";


const Listening15 = () => {
  const [activePart, setActivePart] = useState(1);
  const [time, setTime] = useState(1800);
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [highlightPopup, setHighlightPopup] = useState({ visible: false, x: 0, y: 0, range: null });

  const audioRef = useRef(null);
  const title = "E14T3";

  const correctAnswers = {
    1: "Tesla", 2: "microphone", 3: "exhibition", 4: "wifi", 5: "45", 6: "135", 7: "pool", 8: "airport", 9: "sea", 10: "clubs",
    11: ["B", "D"], 12: ["B", "D"], 13: ["C", "E"], 14: ["C", "E"], 15: "F", 16: "A", 17: "E", 18: "G", 19: "D", 20: "C",
    21: "50", 22: "regional", 23: "carnival", 24: "drummer", 25: "film", 26: "parade", 27: "D", 28: "B", 29: "E", 30: "F",
    31: "violin", 32: "energy", 33: "complex", 34: "opera", 35: "disturbing", 36: "clarinet", 37: "diversity", 38: "physics", 39: "dance", 40: "Olympics"
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

  const handleMultiSelect = (qStart, qEnd, val) => {
    if (isFinished) return;
    const currentValues = [];
    for(let i = qStart; i <= qEnd; i++) if(answers[i]) currentValues.push(answers[i]);

    if (currentValues.includes(val)) {
      for(let i = qStart; i <= qEnd; i++) {
        if(answers[i] === val) {
          setAnswers(prev => ({ ...prev, [i]: "" }));
          break;
        }
      }
    } else {
      for(let i = qStart; i <= qEnd; i++) {
        if(!answers[i]) {
          setAnswers(prev => ({ ...prev, [i]: val }));
          break;
        }
      }
    }
  };

  const isSelected = (qStart, qEnd, val) => {
    for(let i = qStart; i <= qEnd; i++) if(answers[i] === val) return true;
    return false;
  };

  const handleMouseUp = (e) => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 0) {
      setHighlightPopup({ visible: true, x: e.pageX, y: e.pageY - 60, range: selection.getRangeAt(0) });
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
              <div className="ins-header">Questions 1-10</div>
              <div className="ins-body">Complete the notes below. Write <strong>ONE WORD AND/OR A NUMBER</strong> for each answer.</div>
            </div>
            <h2 className="section-title">Flanders Conference Hotel</h2>
            <div className="notes-container">
              <p>Example: Customer Services Manager: (Angela)</p>
              <h3>Date available</h3>
              <p>weekend beginning February 4th</p>
              <h3>Conference facilities</h3>
              <ul>
                <li>the <strong>1.</strong> <input type="text" className="blank-input" value={getVal(1)} onChange={(e)=>handleInputChange(1, e.target.value)} /> room for talks (projector and <strong>2.</strong> <input type="text" className="blank-input" value={getVal(2)} onChange={(e)=>handleInputChange(2, e.target.value)} /> available)</li>
                <li>area for coffee and an <strong>3.</strong> <input type="text" className="blank-input" value={getVal(3)} onChange={(e)=>handleInputChange(3, e.target.value)} /></li>
                <li>free <strong>4.</strong> <input type="text" className="blank-input" value={getVal(4)} onChange={(e)=>handleInputChange(4, e.target.value)} /> throughout</li>
                <li>a standard buffet lunch costs $ <strong>5.</strong> <input type="text" className="blank-input" value={getVal(5)} onChange={(e)=>handleInputChange(5, e.target.value)} /> per head</li>
              </ul>
              <h3>Accommodation</h3>
              <ul>
                <li>Rooms will cost $ <strong>6.</strong> <input type="text" className="blank-input" value={getVal(6)} onChange={(e)=>handleInputChange(6, e.target.value)} /> including breakfast.</li>
              </ul>
              <h3>Other facilities</h3>
              <ul>
                <li>The hotel also has a spa and rooftop <strong>7.</strong> <input type="text" className="blank-input" value={getVal(7)} onChange={(e)=>handleInputChange(7, e.target.value)} />.</li>
                <li>There's a free shuttle service to the <strong>8.</strong> <input type="text" className="blank-input" value={getVal(8)} onChange={(e)=>handleInputChange(8, e.target.value)} />.</li>
              </ul>
              <h3>Location</h3>
              <ul>
                <li>Wilby Street (quite near the <strong>9.</strong> <input type="text" className="blank-input" value={getVal(9)} onChange={(e)=>handleInputChange(9, e.target.value)} />)</li>
                <li>near to restaurants and many <strong>10.</strong> <input type="text" className="blank-input" value={getVal(10)} onChange={(e)=>handleInputChange(10, e.target.value)} /></li>
              </ul>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="test-section">
            <div className="instructions-box">
              <div className="ins-header">Questions 11-14</div>
              <div className="ins-body">Choose <strong>TWO</strong> letters, A-E.</div>
            </div>
            <div className="mcq-item">
                <p>11-12. Which TWO activities that volunteers do are mentioned?</p>
                {['A. decorating', 'B. cleaning', 'C. delivering meals', 'D. shopping', 'E. childcare'].map(opt => (
                    <label key={opt}><input type="checkbox" checked={isSelected(11, 12, opt[0])} onChange={()=>handleMultiSelect(11, 12, opt[0])} /> {opt}</label>
                ))}
            </div>
            <div className="mcq-item">
                <p>13-14. Which TWO ways that volunteers can benefit from volunteering are mentioned?</p>
                {['A. learning how to be part of a team', 'B. having a sense of purpose', 'C. realising how lucky they are', 'D. improved ability at time management', 'E. boosting their employment prospects'].map(opt => (
                    <label key={opt}><input type="checkbox" checked={isSelected(13, 14, opt[0])} onChange={()=>handleMultiSelect(13, 14, opt[0])} /> {opt}</label>
                ))}
            </div>
            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 15-20</div>
              <div className="ins-body">What has each volunteer helped someone to do? Choose <strong>A-G</strong>.</div>
            </div>
            <div className="matching-container">
                <div className="options-grid">
                    {["A. overcome physical difficulties", "B. rediscover skills", "C. improve communication", "D. solve problems independently", "E. escape isolation", "F. remember past times", "G. start a new hobby"].map(opt => <div key={opt} className="opt-label">{opt}</div>)}
                </div>
                {[
                  {q: 15, l: "Habib"}, {q: 16, l: "Consuela"}, {q: 17, l: "Minh"},
                  {q: 18, l: "Tanya"}, {q: 19, l: "Alexei"}, {q: 20, l: "Juba"}
                ].map(item => (
                  <div key={item.q} className="map-q-row">
                    <span>{item.q}. {item.l}</span>
                    <input type="text" className="blank-input small" maxLength="1" value={getVal(item.q)} onChange={(e)=>handleInputChange(item.q, e.target.value.toUpperCase())} />
                  </div>
                ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="test-section">
            <div className="instructions-box">
              <div className="ins-header">Questions 21-26</div>
              <div className="ins-body">Complete the notes below. Write <strong>ONE WORD AND/OR A NUMBER</strong> for each answer.</div>
            </div>
            <h2 className="section-title">Background on school marching band</h2>
            <div className="notes-container">
                <ul>
                    <li>It consists of around <strong>21.</strong> <input type="text" className="blank-input" value={getVal(21)} onChange={(e)=>handleInputChange(21, e.target.value)} /> students.</li>
                    <li>It is due to play in a <strong>22.</strong> <input type="text" className="blank-input" value={getVal(22)} onChange={(e)=>handleInputChange(22, e.target.value)} /> band competition.</li>
                    <li>It has been invited to play in the town's <strong>23.</strong> <input type="text" className="blank-input" value={getVal(23)} onChange={(e)=>handleInputChange(23, e.target.value)} />.</li>
                    <li>They have listened to a talk by a <strong>24.</strong> <input type="text" className="blank-input" value={getVal(24)} onChange={(e)=>handleInputChange(24, e.target.value)} />.</li>
                    <li>Joe will discuss a <strong>25.</strong> <input type="text" className="blank-input" value={getVal(25)} onChange={(e)=>handleInputChange(25, e.target.value)} /> with the band.</li>
                    <li>Joe hopes the band will attend a <strong>26.</strong> <input type="text" className="blank-input" value={getVal(26)} onChange={(e)=>handleInputChange(26, e.target.value)} /> next month.</li>
                </ul>
            </div>
            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 27-30</div>
              <div className="ins-body">What problem does Joe mention? Choose <strong>A-F</strong>.</div>
            </div>
            <div className="matching-container">
                <div className="options-grid">
                    {["A. rehearsal mistakes", "B. unhelpful suggestions", "C. rhythm difficulty", "D. misses rehearsals", "E. health problem", "F. doesn't mix with others"].map(opt => <div key={opt} className="opt-label">{opt}</div>)}
                </div>
                {[
                  {q: 27, l: "flautist"}, {q: 28, l: "trumpeter"}, {q: 29, l: "trombonist"}, {q: 30, l: "percussionist"}
                ].map(item => (
                  <div key={item.q} className="map-q-row">
                    <span>{item.q}. {item.l}</span>
                    <input type="text" className="blank-input small" maxLength="1" value={getVal(item.q)} onChange={(e)=>handleInputChange(item.q, e.target.value.toUpperCase())} />
                  </div>
                ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="test-section">
            <div className="instructions-box">
              <div className="ins-header">Questions 31-40</div>
              <div className="ins-body">Complete the notes. Write <strong>ONE WORD AND/OR A NUMBER</strong>.</div>
            </div>
            <h2 className="section-title">Concerts in university arts festival</h2>
            <div className="notes-container">
                <h3>Concert 1 (Liza Lim)</h3>
                <ul>
                    <li>studied piano and <strong>31.</strong> <input type="text" className="blank-input" value={getVal(31)} onChange={(e)=>handleInputChange(31, e.target.value)} /></li>
                    <li>compositions show a great deal of <strong>32.</strong> <input type="text" className="blank-input" value={getVal(32)} onChange={(e)=>handleInputChange(32, e.target.value)} /></li>
                    <li>music is expressive and also <strong>33.</strong> <input type="text" className="blank-input" value={getVal(33)} onChange={(e)=>handleInputChange(33, e.target.value)} /></li>
                    <li>festival includes her <strong>34.</strong> <input type="text" className="blank-input" value={getVal(34)} onChange={(e)=>handleInputChange(34, e.target.value)} /> called The Oresteia</li>
                    <li>described sounds in The Oresteia as <strong>35.</strong> <input type="text" className="blank-input" value={getVal(35)} onChange={(e)=>handleInputChange(35, e.target.value)} /></li>
                </ul>
                <h3>Concert 2 (Ross Edwards)</h3>
                <ul>
                    <li>The Tower of Remoteness is performed by piano and <strong>36.</strong> <input type="text" className="blank-input" value={getVal(36)} onChange={(e)=>handleInputChange(36, e.target.value)} /></li>
                    <li>celebrates Australia's cultural <strong>37.</strong> <input type="text" className="blank-input" value={getVal(37)} onChange={(e)=>handleInputChange(37, e.target.value)} /></li>
                </ul>
                <h3>Concert 3 (Carl Vine)</h3>
                <ul>
                    <li>studied <strong>38.</strong> <input type="text" className="blank-input" value={getVal(38)} onChange={(e)=>handleInputChange(38, e.target.value)} /> before music</li>
                    <li>well known as composer of music for <strong>39.</strong> <input type="text" className="blank-input" value={getVal(39)} onChange={(e)=>handleInputChange(39, e.target.value)} /></li>
                    <li>festival includes his music for the 1996 <strong>40.</strong> <input type="text" className="blank-input" value={getVal(40)} onChange={(e)=>handleInputChange(40, e.target.value)} /></li>
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

export default Listening15;
