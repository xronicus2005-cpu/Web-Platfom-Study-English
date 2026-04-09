import { useState, useEffect, useRef } from "react";
import "../../../styles/listening-style/Listening4.css"; 
import AnswersPage from "../../answer-page/AnswerPage";

// --- ASSET IMPORTS ---
import photo from "../../../assets/testPhotos/C11T4.png"; 
import fullAudio from "../../../assets/audio/E11T4.mp3"; 

const Listening4 = () => {
  const [activePart, setActivePart] = useState(1);
  const [time, setTime] = useState(1800); 
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [highlightPopup, setHighlightPopup] = useState({ visible: false, x: 0, y: 0, range: null });
  
  const audioRef = useRef(null);
  const title = "E11T4";

  const correctAnswers = {
    1: "Secondary", 2: "flute", 3: "cinema", 4: "concert", 5: "market", 6: "Bythwaite", 7: "actor",
    8: "A", 9: "B", 10: "C",
    11: "E", 12: "D", 13: "G", 14: "B", 15: "C", 16: "A",
    17: "F", 18: "H", 19: "C", 20: "B",
    21: ["B", "D"], 22: ["B", "D"], 
    23: ["A", "B"], 24: ["A", "B"], 
    25: ["B", "E"], 26: ["B", "E"],
    27: "C", 28: "A", 29: "A", 30: "C",
    31: "dry", 32: "hard", 33: "sugar", 34: "roots", 35: "moist", 
    36: "variety", 37: "cattle", 38: "gardens", 39: "grasses", 40: "payment"
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

  // Logic for Multi-select (21-26)
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
              <div className="ins-header">Questions 1-7</div>
              <div className="ins-body">Complete the table below. Write <strong>ONE WORD AND/OR A NUMBER</strong> for each answer.</div>
            </div>
            <table className="listening-table">
                <thead>
                    <tr><th>Event</th><th>Cost</th><th>Venue</th><th>Notes</th></tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Jazz band</td>
                        <td>£15</td>
                        <td>The <input type="text" className="blank-input" value={getVal(1)} onChange={(e)=>handleInputChange(1, e.target.value)} /> (1) school</td>
                        <td>Carolyn Hart (plays the <input type="text" className="blank-input" value={getVal(2)} onChange={(e)=>handleInputChange(2, e.target.value)} /> (2))</td>
                    </tr>
                    <tr>
                        <td>Duck races</td>
                        <td>£1 per duck</td>
                        <td>Behind the <input type="text" className="blank-input" value={getVal(3)} onChange={(e)=>handleInputChange(3, e.target.value)} /> (3)</td>
                        <td>Prize: tickets for <input type="text" className="blank-input" value={getVal(4)} onChange={(e)=>handleInputChange(4, e.target.value)} /> (4). Sold in <input type="text" className="blank-input" value={getVal(5)} onChange={(e)=>handleInputChange(5, e.target.value)} /> (5)</td>
                    </tr>
                    <tr>
                        <td>Flower show</td>
                        <td>Free</td>
                        <td><input type="text" className="blank-input" value={getVal(6)} onChange={(e)=>handleInputChange(6, e.target.value)} /> (6) Hall</td>
                        <td>Prizes presented by a well-known <input type="text" className="blank-input" value={getVal(7)} onChange={(e)=>handleInputChange(7, e.target.value)} /> (7)</td>
                    </tr>
                </tbody>
            </table>

            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 8-10</div>
              <div className="ins-body">Who is each play suitable for? Choose <strong>A-C</strong>.</div>
            </div>
            <div className="matching-container">
                <p>A. children | B. adults | C. all ages</p>
                {[8,9,10].map(q => (
                    <div key={q} className="map-q-row">
                        <span>{q}. {q===8 ? "The Mystery of Muldoon" : q===9 ? "Fire and Flood" : "Silly Sailor"}</span>
                        <input type="text" className="blank-input small" maxLength="1" value={getVal(q)} onChange={(e)=>handleInputChange(q, e.target.value.toUpperCase())} />
                    </div>
                ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="test-section">
            <div className="instructions-box">
              <div className="ins-header">Questions 11-16</div>
              <div className="ins-body">Choose correct letter, <strong>A-G</strong>.</div>
            </div>
            <div className="matching-container">
                <div className="options-grid">
                    {["A. Given by one person", "B. Recently publicised", "C. From public", "D. From artists", "E. Most popular", "F. Largest in country", "G. Relocated"].map(opt => <div key={opt} className="opt-label">{opt}</div>)}
                </div>
                {[11,12,13,14,15,16].map(q => {
                    const n = {11:"20th/21st-century paintings", 12:"19th-century paintings", 13:"Sculptures", 14:"'Around world' exhibition", 15:"Coins", 16:"Porcelain and glass"}[q];
                    return (
                        <div key={q} className="map-q-row">
                            <span>{q}. {n}</span>
                            <input type="text" className="blank-input small" maxLength="1" value={getVal(q)} onChange={(e)=>handleInputChange(q, e.target.value.toUpperCase())} />
                        </div>
                    );
                })}
            </div>

            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 17-20</div>
              <div className="ins-body">Label the plan. Choose <strong>A-H</strong>.</div>
            </div>
            <div className="map-container">
                <img src={photo} alt="Museum Plan" className="map-placeholder" />
                <div style={{height: '200px', background: '#eee', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}> [ MAP IMAGE HERE ] </div>
                {[17,18,19,20].map(q => (
                    <div key={q} className="map-q-row">
                        <span>{q}. {q===17?"restaurant":q===18?"café":q===19?"baby-changing":"cloakroom"}</span>
                        <input type="text" className="blank-input small" maxLength="1" value={getVal(q)} onChange={(e)=>handleInputChange(q, e.target.value.toUpperCase())} />
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
              <div className="ins-body">Choose <strong>TWO</strong> letters, A-E.</div>
            </div>
            
            <div className="mcq-item">
                <p>21-22. Characteristics shared by subjects?</p>
                {['A. won prizes', 'B. made recordings', 'C. under 27', 'D. toured internationally', 'E. played string instrument'].map(opt => (
                    <label key={opt}><input type="checkbox" checked={isSelected(21, 22, opt[0])} onChange={()=>handleMultiSelect(21, 22, opt[0])} /> {opt}</label>
                ))}
            </div>

            <div className="mcq-item">
                <p>23-24. Points about telephone interviews?</p>
                {['A. rich data collected', 'B. top performers involved', 'C. stressful atmosphere', 'D. limited times', 'E. technical problems'].map(opt => (
                    <label key={opt}><input type="checkbox" checked={isSelected(23, 24, opt[0])} onChange={()=>handleMultiSelect(23, 24, opt[0])} /> {opt}</label>
                ))}
            </div>

            <div className="mcq-item">
                <p>25-26. Topics originally intended to investigate?</p>
                {['A. regulations', 'B. audience reactions', 'C. performer attitudes', 'D. performer roles', 'E. instrument/dress links'].map(opt => (
                    <label key={opt}><input type="checkbox" checked={isSelected(25, 26, opt[0])} onChange={()=>handleMultiSelect(25, 26, opt[0])} /> {opt}</label>
                ))}
            </div>

            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 27-30</div>
              <div className="ins-body">Choose correct letter, <strong>A, B or C</strong>.</div>
            </div>
            {[
                {q:27, t:"Joanna concentrated on women because", opts:["A. influenced by fashion.", "B. more controversy.", "C. code is less strict."]},
                {q:28, t:"Frost suggests popular music dress is affected by", opts:["A. wish to be taken seriously.", "B. tendency to copy.", "C. masculine nature of music."]},
                {q:29, t:"What did subjects say about the audience?", opts:["A. linked to respect.", "B. should not distract.", "C. audience should dress up."]},
                {q:30, t:"Musicians could learn about", opts:["A. physical freedom.", "B. improving performance.", "C. protecting against injury."]}
            ].map(item => (
                <div key={item.q} className="mcq-item">
                    <p>{item.q}. {item.t}</p>
                    {item.opts.map(o => (
                        <label key={o}><input type="radio" name={`q${item.q}`} checked={getVal(item.q) === o[0]} onChange={()=>handleInputChange(item.q, o[0])} /> {o}</label>
                    ))}
                </div>
            ))}
          </div>
        );
      case 4:
        return (
          <div className="test-section">
            <div className="instructions-box">
              <div className="ins-header">Questions 31-40</div>
              <div className="ins-body">Write <strong>ONE WORD ONLY</strong> for each answer.</div>
            </div>
            <h2 className="section-title">SOIL TO REDUCE CO₂</h2>
            <div className="notes-container">
                <ul>
                    <li>Erosion likely in soil that is <strong>31.</strong> <input type="text" className="blank-input" value={getVal(31)} onChange={(e)=>handleInputChange(31, e.target.value)} /></li>
                    <li>Lal found soil in Africa was very <strong>32.</strong> <input type="text" className="blank-input" value={getVal(32)} onChange={(e)=>handleInputChange(32, e.target.value)} /></li>
                    <li>Plants turn CO₂ into substances like <strong>33.</strong> <input type="text" className="blank-input" value={getVal(33)} onChange={(e)=>handleInputChange(33, e.target.value)} /></li>
                    <li>CO₂ moves from <strong>34.</strong> <input type="text" className="blank-input" value={getVal(34)} onChange={(e)=>handleInputChange(34, e.target.value)} /> to microbes.</li>
                    <li>Regenerative ag ensures soil stays fertile and <strong>35.</strong> <input type="text" className="blank-input" value={getVal(35)} onChange={(e)=>handleInputChange(35, e.target.value)} /></li>
                    <li>Increasing the <strong>36.</strong> <input type="text" className="blank-input" value={getVal(36)} onChange={(e)=>handleInputChange(36, e.target.value)} /> of plants.</li>
                    <li>California study on a big <strong>37.</strong> <input type="text" className="blank-input" value={getVal(37)} onChange={(e)=>handleInputChange(37, e.target.value)} /> farm.</li>
                    <li>Uses waste from agriculture and <strong>38.</strong> <input type="text" className="blank-input" value={getVal(38)} onChange={(e)=>handleInputChange(38, e.target.value)} /></li>
                    <li>Australia uses <strong>39.</strong> <input type="text" className="blank-input" value={getVal(39)} onChange={(e)=>handleInputChange(39, e.target.value)} /> that are green.</li>
                    <li>Giving farmers <strong>40.</strong> <input type="text" className="blank-input" value={getVal(40)} onChange={(e)=>handleInputChange(40, e.target.value)} /> for storage.</li>
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

export default Listening4;