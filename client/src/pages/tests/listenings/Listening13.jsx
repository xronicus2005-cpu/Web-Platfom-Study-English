import { useState, useEffect, useRef } from "react";
import "../../../styles/listening-style/Listening13.css";
import AnswersPage from "../../answer-page/AnswerPage";

// --- ASSET IMPORTS ---
import fullAudio from "../../../assets/audio/E14T1.mp3";


const Listening13 = () => {
  const [activePart, setActivePart] = useState(1);
  const [time, setTime] = useState(1800);
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [highlightPopup, setHighlightPopup] = useState({ visible: false, x: 0, y: 0, range: null });

  const audioRef = useRef(null);
  const title = "E14T1";

  const correctAnswers = {
    1: "Canadian", 2: "furniture", 3: "Park", 4: "250", 5: "phone", 6: "10 September", 7: "museum", 8: "time", 9: "blonde", 10: "87954 82361",
    11: ["A", "C"], 12: ["A", "C"], 13: ["B", "E"], 14: ["B", "E"], 15: "B", 16: "B", 17: "C", 18: "A", 19: "A", 20: "C",
    21: "B", 22: "A", 23: "C", 24: "B", 25: "A", 26: "B", 27: "A", 28: "F", 29: "G", 30: "C",
    31: "industry", 32: "constant", 33: "direction", 34: "floor", 35: "predictable", 36: "bay", 37: "gates", 38: "fuel", 39: "jobs", 40: "migration"
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
              <div className="ins-body">Complete the form below. Write <strong>ONE WORD AND/OR A NUMBER</strong> for each answer.</div>
            </div>
            <h2 className="section-title">CRIME REPORT FORM</h2>
            <div className="form-container">
               <div className="form-row"><span className="label">Type of crime:</span> <span>theft</span></div>
               <hr/>
               <h3>Personal information</h3>
               <div className="form-row"><span className="label">Name:</span> <span>Louise (Example)</span></div>
               <div className="form-row"><span className="label">Nationality:</span> <strong>1.</strong> <input type="text" className="blank-input" value={getVal(1)} onChange={(e)=>handleInputChange(1, e.target.value)} /></div>
               <div className="form-row"><span className="label">Reason for visit:</span> <span>business (to buy antique <strong>2.</strong> <input type="text" className="blank-input" value={getVal(2)} onChange={(e)=>handleInputChange(2, e.target.value)} />)</span></div>
               <div className="form-row"><span className="label">Current address:</span> <strong>3.</strong> <input type="text" className="blank-input" value={getVal(3)} onChange={(e)=>handleInputChange(3, e.target.value)} /> Apartments (No 15)</div>
               <hr/>
               <h3>Details of theft</h3>
               <div className="form-row"><span className="label">Items stolen:</span>
                 <ul>
                    <li>wallet containing £ <strong>4.</strong> <input type="text" className="blank-input" value={getVal(4)} onChange={(e)=>handleInputChange(4, e.target.value)} /></li>
                    <li>a <strong>5.</strong> <input type="text" className="blank-input" value={getVal(5)} onChange={(e)=>handleInputChange(5, e.target.value)} /></li>
                 </ul>
               </div>
               <div className="form-row"><span className="label">Date of theft:</span> <strong>6.</strong> <input type="text" className="blank-input" value={getVal(6)} onChange={(e)=>handleInputChange(6, e.target.value)} /></div>
               <div className="form-row"><span className="label">Location:</span> <span>outside the <strong>7.</strong> <input type="text" className="blank-input" value={getVal(7)} onChange={(e)=>handleInputChange(7, e.target.value)} /> at about 4 pm</span></div>
               <div className="form-row"><span className="label">Details of suspect:</span>
                 <ul>
                    <li>some boys asked for the <strong>8.</strong> <input type="text" className="blank-input" value={getVal(8)} onChange={(e)=>handleInputChange(8, e.target.value)} /> then ran off</li>
                    <li>slim build with <strong>9.</strong> <input type="text" className="blank-input" value={getVal(9)} onChange={(e)=>handleInputChange(9, e.target.value)} /> hair</li>
                 </ul>
               </div>
               <div className="form-row"><span className="label">Crime reference number:</span> <strong>10.</strong> <input type="text" className="blank-input" value={getVal(10)} onChange={(e)=>handleInputChange(10, e.target.value)} /></div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="test-section">
            <div className="instructions-box">
              <div className="ins-header">Questions 11-14</div>
              <div className="ins-body">Choose <strong>TWO</strong> letters.</div>
            </div>
            <div className="mcq-item">
                <p>11-12. Which TWO pieces of advice for the first week does the manager give?</p>
                {['A. get to know colleagues', 'B. learn from any mistakes', 'C. ask lots of questions', 'D. react positively to feedback', 'E. enjoy new challenges'].map(opt => (
                    <label key={opt}><input type="checkbox" checked={isSelected(11, 12, opt[0])} onChange={()=>handleMultiSelect(11, 12, opt[0])} /> {opt}</label>
                ))}
            </div>
            <div className="mcq-item">
                <p>13-14. Which TWO things does the manager say mentors can help with?</p>
                {['A. confidence-building', 'B. making career plans', 'C. completing difficult tasks', 'D. making a weekly timetable', 'E. reviewing progress'].map(opt => (
                    <label key={opt}><input type="checkbox" checked={isSelected(13, 14, opt[0])} onChange={()=>handleMultiSelect(13, 14, opt[0])} /> {opt}</label>
                ))}
            </div>
            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 15-20</div>
              <div className="ins-body">Aspects of company policy: <strong>A, B or C</strong>.</div>
            </div>
            <div className="matching-container">
                <div className="options-grid">
                    {["A. It is encouraged.", "B. There are some restrictions.", "C. It is against the rules."].map(opt => <div key={opt} className="opt-label">{opt}</div>)}
                </div>
                {[
                  {q: 15, l: "Using the internet"}, {q: 16, l: "Flexible working"}, {q: 17, l: "Booking holidays"},
                  {q: 18, l: "Working overtime"}, {q: 19, l: "Wearing trainers"}, {q: 20, l: "Bringing food to work"}
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
              <div className="ins-header">Questions 21-25</div>
              <div className="ins-body">Choose <strong>A, B or C</strong>.</div>
            </div>
            {[
              {q: 21, t: "Carla and Rob were surprised to learn that coastal cities", opts: ["A. contain half world's population.", "B. include most of largest cities.", "C. growing twice as fast."]},
              {q: 22, t: "Rob says building cities near rivers", opts: ["A. may bring pollution.", "B. reduce land for agriculture.", "C. countryside spoiled by industry."]},
              {q: 23, t: "Mistake in Miami's drainage channels in 1950s?", opts: ["A. Not enough of them.", "B. Unsuitable materials.", "C. No allowance for climate change."]},
              {q: 24, t: "Authorities in Miami should immediately", opts: ["A. restore ecosystems.", "B. pay for flood prevention.", "C. stop disposing waste in ocean."]},
              {q: 25, t: "Priority for international action?", opts: ["A. greater coordination.", "B. more sharing of info.", "C. shared policies."]}
            ].map(item => (
              <div key={item.q} className="mcq-item">
                <p>{item.q}. {item.t}</p>
                {item.opts.map(o => (
                  <label key={o}><input type="radio" name={`q${item.q}`} checked={getVal(item.q) === o[0]} onChange={()=>handleInputChange(item.q, o[0])} /> {o}</label>
                ))}
              </div>
            ))}
            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 26-30</div>
              <div className="ins-body">Presentation decisions: <strong>A-G</strong>.</div>
            </div>
            <div className="matching-container">
                <div className="options-grid">
                    {["A. use visuals", "B. keep it short", "C. involve students", "D. check accuracy", "E. provide handout", "F. focus on one example", "G. online research"].map(opt => <div key={opt} className="opt-label">{opt}</div>)}
                </div>
                {[
                  {q: 26, l: "Historical background"}, {q: 27, l: "Geographical factors"}, {q: 28, l: "Past mistakes"},
                  {q: 29, l: "Future risks"}, {q: 30, l: "International implications"}
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
              <div className="ins-body">Complete the notes. Write <strong>ONE WORD ONLY</strong>.</div>
            </div>
            <h2 className="section-title">Marine renewable energy</h2>
            <div className="notes-container">
                <p>More energy required because of growth in population and <strong>31.</strong> <input type="text" className="blank-input" value={getVal(31)} onChange={(e)=>handleInputChange(31, e.target.value)} /></p>
                <h3>Wave energy</h3>
                <ul>
                    <li>Advantage: waves provide a <strong>32.</strong> <input type="text" className="blank-input" value={getVal(32)} onChange={(e)=>handleInputChange(32, e.target.value)} /> source.</li>
                    <li>Problem: waves can move in any <strong>33.</strong> <input type="text" className="blank-input" value={getVal(33)} onChange={(e)=>handleInputChange(33, e.target.value)} />.</li>
                    <li>Movement of sand on the <strong>34.</strong> <input type="text" className="blank-input" value={getVal(34)} onChange={(e)=>handleInputChange(34, e.target.value)} /> of the ocean.</li>
                </ul>
                <h3>Tidal energy</h3>
                <ul>
                    <li>Tides are more <strong>35.</strong> <input type="text" className="blank-input" value={getVal(35)} onChange={(e)=>handleInputChange(35, e.target.value)} /> than waves.</li>
                    <li>Swansea lagoon: created in a <strong>36.</strong> <input type="text" className="blank-input" value={getVal(36)} onChange={(e)=>handleInputChange(36, e.target.value)} />.</li>
                    <li>Water released through <strong>37.</strong> <input type="text" className="blank-input" value={getVal(37)} onChange={(e)=>handleInputChange(37, e.target.value)} />.</li>
                    <li>No <strong>38.</strong> <input type="text" className="blank-input" value={getVal(38)} onChange={(e)=>handleInputChange(38, e.target.value)} /> is required.</li>
                    <li>Likely to create a number of <strong>39.</strong> <input type="text" className="blank-input" value={getVal(39)} onChange={(e)=>handleInputChange(39, e.target.value)} />.</li>
                    <li>Problem: affect <strong>40.</strong> <input type="text" className="blank-input" value={getVal(40)} onChange={(e)=>handleInputChange(40, e.target.value)} /> of birds/fish.</li>
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

export default Listening13;
