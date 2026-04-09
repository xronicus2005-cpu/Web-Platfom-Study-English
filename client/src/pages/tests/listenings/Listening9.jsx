import { useState, useEffect, useRef } from "react";
import "../../../styles/listening-style/Listening9.css"; 
import AnswersPage from "../../answer-page/AnswerPage";

// --- ASSET IMPORTS ---
import fullAudio from "../../../assets/audio/E13T1.mp3";
import photo from "../../../assets/testPhotos/C13T1.png"


const Listening9 = () => {
  const [activePart, setActivePart] = useState(1);
  const [time, setTime] = useState(1800); 
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [highlightPopup, setHighlightPopup] = useState({ visible: false, x: 0, y: 0, range: null });
  
  const audioRef = useRef(null);
  const title = "E13T1";

  const correctAnswers = {
    1: "choose", 2: "private", 3: "20 percent", 4: "healthy", 5: "bones", 6: "lecture", 7: "Arresta", 8: "vegetarian", 9: "market", 10: "knife",
    11: "B", 12: "C", 13: "B", 14: "E", 15: "D", 16: "B", 17: "G", 18: "C", 19: "H", 20: "I",
    21: "A", 22: "C", 23: "B", 24: "C", 25: "B", 26: "G", 27: "C", 28: "H", 29: "A", 30: "E",
    31: "crow", 32: "cliffs", 33: "speed", 34: "brain", 35: "food", 36: "behaviour", 37: "new", 38: "stress", 39: "tails", 40: "permanent"
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
              <div className="ins-body">Complete the table below. Write <strong>ONE WORD AND/OR A NUMBER</strong> for each answer.</div>
            </div>
            <h2 className="section-title">COOKERY CLASSES</h2>
            <table className="listening-table">
                <thead>
                    <tr>
                        <th>Cookery Class</th>
                        <th>Focus</th>
                        <th>Other Information</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>The Food (Example)</td>
                        <td>how to <strong>1.</strong> <input type="text" className="blank-input" value={getVal(1)} onChange={(e)=>handleInputChange(1, e.target.value)} /> and cook seasonal products</td>
                        <td>small classes; also offers <strong>2.</strong> <input type="text" className="blank-input" value={getVal(2)} onChange={(e)=>handleInputChange(2, e.target.value)} /> classes; returns get a <strong>3.</strong> <input type="text" className="blank-input" value={getVal(3)} onChange={(e)=>handleInputChange(3, e.target.value)} /> discount</td>
                    </tr>
                    <tr>
                        <td>Bond's Cookery School</td>
                        <td>food that is <strong>4.</strong> <input type="text" className="blank-input" value={getVal(4)} onChange={(e)=>handleInputChange(4, e.target.value)} /></td>
                        <td>includes recipes to strengthen your <strong>5.</strong> <input type="text" className="blank-input" value={getVal(5)} onChange={(e)=>handleInputChange(5, e.target.value)} />; free <strong>6.</strong> <input type="text" className="blank-input" value={getVal(6)} onChange={(e)=>handleInputChange(6, e.target.value)} /> every Thursday</td>
                    </tr>
                    <tr>
                        <td>The <strong>7.</strong> <input type="text" className="blank-input" value={getVal(7)} onChange={(e)=>handleInputChange(7, e.target.value)} /> Centre</td>
                        <td>Mainly <strong>8.</strong> <input type="text" className="blank-input" value={getVal(8)} onChange={(e)=>handleInputChange(8, e.target.value)} /> food</td>
                        <td>located near the <strong>9.</strong> <input type="text" className="blank-input" value={getVal(9)} onChange={(e)=>handleInputChange(9, e.target.value)} />; skills with a <strong>10.</strong> <input type="text" className="blank-input" value={getVal(10)} onChange={(e)=>handleInputChange(10, e.target.value)} /> sometimes available</td>
                    </tr>
                </tbody>
            </table>
          </div>
        );
      case 2:
        return (
          <div className="test-section">
            <div className="instructions-box">
              <div className="ins-header">Questions 11-13</div>
              <div className="ins-body">Choose the correct letter, <strong>A, B or C</strong>.</div>
            </div>
            {[
              {q: 11, t: "Why are changes needed to traffic systems in Granford?", opts: ["A. Traffic accidents have risen.", "B. Amount of traffic has increased.", "C. Types of vehicles have changed."]},
              {q: 12, t: "In a survey, local residents particularly complained about", opts: ["A. dangerous driving by parents.", "B. pollution from trucks.", "C. inconvenience from parked cars."]},
              {q: 13, t: "According to the speaker, one problem with the new regulations will be", opts: ["A. raising money to pay for them.", "B. finding a way to make people follow them.", "C. getting the support of the police."]}
            ].map(item => (
              <div key={item.q} className="mcq-item">
                <p>{item.q}. {item.t}</p>
                {item.opts.map(o => (
                  <label key={o}><input type="radio" name={`q${item.q}`} checked={getVal(item.q) === o[0]} onChange={()=>handleInputChange(item.q, o[0])} /> {o}</label>
                ))}
              </div>
            ))}

            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 14-20</div>
              <div className="ins-body">Label the map below. Choose the correct letter, <strong>A-I</strong>.</div>
            </div>
            <div className="map-container">
               <div className="map-placeholder">
                <img src={photo} alt="map" className="map-photo"/>
               </div>
               <div className="matching-grid">
                  {[
                    {q: 14, l: "New traffic lights"}, {q: 15, l: "Pedestrian crossing"}, {q: 16, l: "Parking allowed"},
                    {q: 17, l: "New 'No Parking' sign"}, {q: 18, l: "New disabled parking spaces"}, {q: 19, l: "Widened pavement"},
                    {q: 20, l: "Lorry loading/unloading restrictions"}
                  ].map(item => (
                    <div key={item.q} className="map-q-row">
                      <span>{item.q}. {item.l}</span>
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
              <div className="ins-header">Questions 21-25</div>
              <div className="ins-body">Choose the correct letter, <strong>A, B or C</strong>.</div>
            </div>
            {[
              {q: 21, t: "Why is Jack interested in seed germination?", opts: ["A. He may do a related module later.", "B. Career in plant science.", "C. Choosing it for dissertation."]},
              {q: 22, t: "The main advantage of their present experiment is it can be", opts: ["A. described easily.", "B. carried out inside lab.", "C. completed in time available."]},
              {q: 23, t: "What do they decide to check with their tutor?", opts: ["A. if aim is appropriate", "B. if anyone else chose this", "C. final grade contribution"]},
              {q: 24, t: "Graves' book is disappointing because", opts: ["A. misses recent advances.", "B. content irrelevant.", "C. focus is theoretical."]},
              {q: 25, t: "Jack says Lee Hall's article analysis of statistics is", opts: ["A. diagrams are useful.", "B. analysis is thorough.", "C. findings after fires are surprising."]}
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
              <div className="ins-body">Complete the flowchart. Choose <strong>A-H</strong>.</div>
            </div>
            <div className="flowchart-container">
              <div className="options-grid" style={{marginBottom: '20px'}}>
                {["A. container", "B. soil", "C. weight", "D. condition", "E. height", "F. colour", "G. types", "H. depths"].map(opt => <div key={opt} className="opt-label">{opt}</div>)}
              </div>
              <div className="flow-step">Select seeds of different <strong>26.</strong> <input type="text" className="blank-input small" maxLength="1" value={getVal(26)} onChange={(e)=>handleInputChange(26, e.target.value.toUpperCase())} /></div>
              <div className="flow-arrow">↓</div>
              <div className="flow-step">Measure and record the <strong>27.</strong> <input type="text" className="blank-input small" maxLength="1" value={getVal(27)} onChange={(e)=>handleInputChange(27, e.target.value.toUpperCase())} /> of each.</div>
              <div className="flow-arrow">↓</div>
              <div className="flow-step">Decide on the <strong>28.</strong> <input type="text" className="blank-input small" maxLength="1" value={getVal(28)} onChange={(e)=>handleInputChange(28, e.target.value.toUpperCase())} /> to be used.</div>
              <div className="flow-arrow">↓</div>
              <div className="flow-step">Use a different <strong>29.</strong> <input type="text" className="blank-input small" maxLength="1" value={getVal(29)} onChange={(e)=>handleInputChange(29, e.target.value.toUpperCase())} /> and label it.</div>
              <div className="flow-arrow">↓</div>
              <div className="flow-step">After 3 weeks, record the <strong>30.</strong> <input type="text" className="blank-input small" maxLength="1" value={getVal(30)} onChange={(e)=>handleInputChange(30, e.target.value.toUpperCase())} />.</div>
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
            <h2 className="section-title">Effects of urban environments on animals</h2>
            <div className="notes-container">
                <ul>
                    <li>The <strong>31.</strong> <input type="text" className="blank-input" value={getVal(31)} onChange={(e)=>handleInputChange(31, e.target.value)} /> - because of adaptability</li>
                    <li>The pigeon - city walls are similar to <strong>32.</strong> <input type="text" className="blank-input" value={getVal(32)} onChange={(e)=>handleInputChange(32, e.target.value)} /></li>
                    <li>Adaptation occurring with unusual <strong>33.</strong> <input type="text" className="blank-input" value={getVal(33)} onChange={(e)=>handleInputChange(33, e.target.value)} /></li>
                </ul>
                <h4>Recent research</h4>
                <ul>
                    <li>Small mammals museum specimens: size of <strong>34.</strong> <input type="text" className="blank-input" value={getVal(34)} onChange={(e)=>handleInputChange(34, e.target.value)} /> increased.</li>
                    <li>Need to locate new sources of <strong>35.</strong> <input type="text" className="blank-input" value={getVal(35)} onChange={(e)=>handleInputChange(35, e.target.value)} /></li>
                    <li>Catarina Miranda: focused on <strong>36.</strong> <input type="text" className="blank-input" value={getVal(36)} onChange={(e)=>handleInputChange(36, e.target.value)} /> of blackbirds.</li>
                    <li>Urban birds afraid of situations that were <strong>37.</strong> <input type="text" className="blank-input" value={getVal(37)} onChange={(e)=>handleInputChange(37, e.target.value)} /></li>
                    <li>Jonathan Atwell: animals respond to <strong>38.</strong> <input type="text" className="blank-input" value={getVal(38)} onChange={(e)=>handleInputChange(38, e.target.value)} /> by lower hormones.</li>
                    <li>Urban squirrels use their <strong>39.</strong> <input type="text" className="blank-input" value={getVal(39)} onChange={(e)=>handleInputChange(39, e.target.value)} /> to communicate.</li>
                    <li>Some changes may not be <strong>40.</strong> <input type="text" className="blank-input" value={getVal(40)} onChange={(e)=>handleInputChange(40, e.target.value)} /></li>
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

export default Listening9;