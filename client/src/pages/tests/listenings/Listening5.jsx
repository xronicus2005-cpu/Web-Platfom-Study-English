import { useState, useEffect, useRef } from "react";
import "../../../styles/listening-style/Listening5.css"; 
import AnswersPage from "../../answer-page/AnswerPage";

// --- ASSET IMPORTS ---
import fullAudio from "../../../assets/audio/E12T1.mp3";  

const Listening5 = () => {
  const [activePart, setActivePart] = useState(1);
  const [time, setTime] = useState(1800); 
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [highlightPopup, setHighlightPopup] = useState({ visible: false, x: 0, y: 0, range: null });
  
  const audioRef = useRef(null);
  const title = "E12T1";

  const correctAnswers = {
    1: "mountains", 2: "horse", 3: "gardens", 4: "Lunch", 5: "map", 6: "experience", 7: "Ratchesons", 8: "helmet", 9: "shops", 10: "267",
    11: "A", 12: "C", 13: "C", 14: "C", 15: ["A", "E"], 16: ["A", "E"],
    17: "F", 18: "A", 19: "E", 20: "B",
    21: "B", 22: "C", 23: "B", 24: "budget", 25: "employment", 26: "safety", 27: "insurance", 28: "diary", 29: "database", 30: "museum",
    31: "damage", 32: "side effects", 33: "bridge", 34: "confusion", 35: "smartphone", 36: "resources", 37: "unnecessary", 38: "chocolate bar", 39: "problem", 40: "market share"
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

  const handleMultiSelect = (q1, q2, val) => {
    if (isFinished) return;
    const current = [answers[q1], answers[q2]];
    if (current.includes(val)) {
        if (answers[q1] === val) setAnswers(prev => ({ ...prev, [q1]: "" }));
        else setAnswers(prev => ({ ...prev, [q2]: "" }));
    } else {
        if (!answers[q1]) setAnswers(prev => ({ ...prev, [q1]: val }));
        else if (!answers[q2]) setAnswers(prev => ({ ...prev, [q2]: val }));
    }
  };

  const isSelected = (q1, q2, val) => answers[q1] === val || answers[q2] === val;

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
            <h2 className="section-title">FAMILY EXCURSIONS</h2>
            <div className="notes-container">
                <h4>Cruise on a lake</h4>
                <ul>
                    <li>Can take photos of the <strong>1.</strong> <input type="text" className="blank-input" value={getVal(1)} onChange={(e)=>handleInputChange(1, e.target.value)} /> that surround the lake.</li>
                </ul>
                <h4>Farm visit</h4>
                <ul>
                    <li>Visit includes a 40-minute ride on a <strong>2.</strong> <input type="text" className="blank-input" value={getVal(2)} onChange={(e)=>handleInputChange(2, e.target.value)} /></li>
                    <li>Walk in the farm's <strong>3.</strong> <input type="text" className="blank-input" value={getVal(3)} onChange={(e)=>handleInputChange(3, e.target.value)} /> by the lake.</li>
                    <li><strong>4.</strong> <input type="text" className="blank-input" value={getVal(4)} onChange={(e)=>handleInputChange(4, e.target.value)} /> is available at extra cost.</li>
                </ul>
                <h4>Cycling trips</h4>
                <ul>
                    <li>A <strong>5.</strong> <input type="text" className="blank-input" value={getVal(5)} onChange={(e)=>handleInputChange(5, e.target.value)} /> is provided.</li>
                    <li>Only suitable for cyclists with some <strong>6.</strong> <input type="text" className="blank-input" value={getVal(6)} onChange={(e)=>handleInputChange(6, e.target.value)} />.</li>
                    <li>Bikes hired from <strong>7.</strong> <input type="text" className="blank-input" value={getVal(7)} onChange={(e)=>handleInputChange(7, e.target.value)} /></li>
                    <li>Cyclists need a <strong>8.</strong> <input type="text" className="blank-input" value={getVal(8)} onChange={(e)=>handleInputChange(8, e.target.value)} /> (can be hired).</li>
                    <li>There are no <strong>9.</strong> <input type="text" className="blank-input" value={getVal(9)} onChange={(e)=>handleInputChange(9, e.target.value)} /> or accommodation in the area.</li>
                </ul>
                <h4>Cost</h4>
                <ul>
                    <li>Total cost for family: $ <strong>10.</strong> <input type="text" className="blank-input" value={getVal(10)} onChange={(e)=>handleInputChange(10, e.target.value)} /></li>
                </ul>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="test-section">
            <div className="instructions-box">
              <div className="ins-header">Questions 11-14</div>
              <div className="ins-body">Choose the correct letter, <strong>A, B or C</strong>.</div>
            </div>
            {[
                {q: 11, t: "What do most people like about the job of kitchen assistant?", opts: ["A. variety of work", "B. friendly atmosphere", "C. opportunities for promotion"]},
                {q: 12, t: "The manager is concerned about some of the new staff's", opts: ["A. jewellery.", "B. hair styles.", "C. shoes."]},
                {q: 13, t: "The manager says the day is likely to be busy because", opts: ["A. it is a public holiday.", "B. the head chef is absent.", "C. the restaurant is almost fully booked."]},
                {q: 14, t: "Only staff 18 or older are allowed to use", opts: ["A. the waste disposal unit.", "B. the electric mixer.", "C. the meat slicer."]}
            ].map(item => (
                <div key={item.q} className="mcq-item">
                    <p>{item.q}. {item.t}</p>
                    {item.opts.map(o => (
                        <label key={o}><input type="radio" name={`q${item.q}`} checked={getVal(item.q) === o[0]} onChange={()=>handleInputChange(item.q, o[0])} /> {o}</label>
                    ))}
                </div>
            ))}

            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 15-16</div>
              <div className="ins-body">Choose <strong>TWO</strong> letters, A-E. Stressful things about the job?</div>
            </div>
            <div className="mcq-item">
                {['A. follow orders immediately.', 'B. kitchen gets hot.', 'C. no breaks.', 'D. overtime.', 'E. physically demanding.'].map(opt => (
                    <label key={opt}><input type="checkbox" checked={isSelected(15, 16, opt[0])} onChange={()=>handleMultiSelect(15, 16, opt[0])} /> {opt}</label>
                ))}
            </div>

            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 17-20</div>
              <div className="ins-body">Match responsibilities <strong>A-F</strong> to the staff.</div>
            </div>
            <div className="matching-container">
                <div className="options-grid">
                    {["A. Training courses", "B. Food stocks", "C. First aid", "D. Breakages", "E. Staff discounts", "F. Timetables"].map(opt => <div key={opt} className="opt-label">{opt}</div>)}
                </div>
                {[17,18,19,20].map(q => {
                    const names = {17:"Joy Parkins", 18:"David Field", 19:"Dexter Wills", 20:"Mike Smith"};
                    return (
                        <div key={q} className="map-q-row">
                            <span>{q}. {names[q]}</span>
                            <input type="text" className="blank-input small" maxLength="1" value={getVal(q)} onChange={(e)=>handleInputChange(q, e.target.value.toUpperCase())} />
                        </div>
                    );
                })}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="test-section">
            <div className="instructions-box">
              <div className="ins-header">Questions 21-23</div>
              <div className="ins-body">Choose correct letter, <strong>A, B or C</strong>.</div>
            </div>
            {[
                {q: 21, t: "Main topic of the paper?", opts: ["A. library organization in different countries", "B. changes in society reflected in libraries", "C. how funding has changed"]},
                {q: 22, t: "Disadvantage of free digitalised books?", opts: ["A. long time to read.", "B. difficult to read.", "C. they are generally old."]},
                {q: 23, t: "Stewart expects that in the future libraries will", opts: ["A. maintain traditional function.", "B. become centres for local communities.", "C. no longer contain books."]}
            ].map(item => (
                <div key={item.q} className="mcq-item">
                    <p>{item.q}. {item.t}</p>
                    {item.opts.map(o => (
                        <label key={o}><input type="radio" name={`q${item.q}`} checked={getVal(item.q) === o[0]} onChange={()=>handleInputChange(item.q, o[0])} /> {o}</label>
                    ))}
                </div>
            ))}

            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 24-30</div>
              <div className="ins-body">Complete the notes. Write <strong>ONE WORD ONLY</strong> for each answer.</div>
            </div>
            <div className="notes-container">
                <h4>Study of local library: possible questions</h4>
                <ul>
                    <li>Whether it has a <strong>24.</strong> <input type="text" className="blank-input" value={getVal(24)} onChange={(e)=>handleInputChange(24, e.target.value)} /> of its own.</li>
                    <li>Affected by laws regarding all aspects of <strong>25.</strong> <input type="text" className="blank-input" value={getVal(25)} onChange={(e)=>handleInputChange(25, e.target.value)} /></li>
                    <li>Design needs to take <strong>26.</strong> <input type="text" className="blank-input" value={getVal(26)} onChange={(e)=>handleInputChange(26, e.target.value)} /> of customers into account.</li>
                    <li>What <strong>27.</strong> <input type="text" className="blank-input" value={getVal(27)} onChange={(e)=>handleInputChange(27, e.target.value)} /> is required in case of accidents.</li>
                    <li>Why a famous person's <strong>28.</strong> <input type="text" className="blank-input" value={getVal(28)} onChange={(e)=>handleInputChange(28, e.target.value)} /> is located in the library.</li>
                    <li>Whether it has a <strong>29.</strong> <input type="text" className="blank-input" value={getVal(29)} onChange={(e)=>handleInputChange(29, e.target.value)} /> of local organisations.</li>
                    <li>How it's different from a library in a <strong>30.</strong> <input type="text" className="blank-input" value={getVal(30)} onChange={(e)=>handleInputChange(30, e.target.value)} /></li>
                </ul>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="test-section">
            <div className="instructions-box">
              <div className="ins-header">Questions 31-40</div>
              <div className="ins-body">Write <strong>NO MORE THAN TWO WORDS</strong> for each answer.</div>
            </div>
            <h2 className="section-title">Four Business Values</h2>
            <div className="notes-container">
                <p>Many business values result in <strong>31.</strong> <input type="text" className="blank-input" value={getVal(31)} onChange={(e)=>handleInputChange(31, e.target.value)} />.</p>
                <p>Managers must deal with potential <strong>32.</strong> <input type="text" className="blank-input" value={getVal(32)} onChange={(e)=>handleInputChange(32, e.target.value)} />.</p>
                
                <h4>Collaboration</h4>
                <ul>
                    <li>Team had to build a <strong>33.</strong> <input type="text" className="blank-input" value={getVal(33)} onChange={(e)=>handleInputChange(33, e.target.value)} /></li>
                    <li>Other teams experienced <strong>34.</strong> <input type="text" className="blank-input" value={getVal(34)} onChange={(e)=>handleInputChange(34, e.target.value)} /> from collaborating.</li>
                    <li>Sales of a <strong>35.</strong> <input type="text" className="blank-input" value={getVal(35)} onChange={(e)=>handleInputChange(35, e.target.value)} /> were poor due to collaboration.</li>
                </ul>

                <h4>Industriousness</h4>
                <ul>
                    <li>Hard work may waste company <strong>36.</strong> <input type="text" className="blank-input" value={getVal(36)} onChange={(e)=>handleInputChange(36, e.target.value)} /></li>
                    <li>'Lazy' refers to people avoiding tasks that are <strong>37.</strong> <input type="text" className="blank-input" value={getVal(37)} onChange={(e)=>handleInputChange(37, e.target.value)} /></li>
                </ul>

                <h4>Creativity</h4>
                <ul>
                    <li>Campaign for a <strong>38.</strong> <input type="text" className="blank-input" value={getVal(38)} onChange={(e)=>handleInputChange(38, e.target.value)} /> failed to boost sales.</li>
                    <li>Creativity should respond to a particular <strong>39.</strong> <input type="text" className="blank-input" value={getVal(39)} onChange={(e)=>handleInputChange(39, e.target.value)} /></li>
                </ul>

                <h4>Excellence</h4>
                <ul>
                    <li>Pioneers had a <strong>40.</strong> <input type="text" className="blank-input" value={getVal(40)} onChange={(e)=>handleInputChange(40, e.target.value)} /> higher than followers.</li>
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

export default Listening5;