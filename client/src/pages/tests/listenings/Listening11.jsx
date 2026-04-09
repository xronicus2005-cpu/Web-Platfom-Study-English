import { useState, useEffect, useRef } from "react";
import "../../../styles/listening-style/Listening11.css"; 
import AnswersPage from "../../answer-page/AnswerPage";

// --- ASSET IMPORTS ---
import fullAudio from "../../../assets/audio/E13T3.mp3"; 


const Listening11 = () => {
  const [activePart, setActivePart] = useState(1);
  const [time, setTime] = useState(1800); 
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [highlightPopup, setHighlightPopup] = useState({ visible: false, x: 0, y: 0, range: null });
  
  const audioRef = useRef(null);
  const title = "E13T3";

  const correctAnswers = {
    1: "850", 2: "bike", 3: "parking", 4: "30", 5: "weekends", 6: "cinema", 7: "hospital", 8: "dentist", 9: "Thursday", 10: "café",
    11: "F", 12: "D", 13: "A", 14: "B", 15: "C", 16: "G", 17: ["B", "C"], 18: ["B", "C"], 19: ["B", "D"], 20: ["B", "D"],
    21: "C", 22: "A", 23: "A", 24: "B", 25: "C", 26: "F", 27: "H", 28: "D", 29: "A", 30: "E",
    31: "tongue", 32: "plants", 33: "snakes", 34: "sky", 35: "partner", 36: "contact", 37: "protection", 38: "tail", 39: "steps", 40: "injury"
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
            <h2 className="section-title">Moving to Banford City</h2>
            <div className="notes-container">
              <p>Example: Suburb of Linda recommends: (Banford)</p>
              <h3>Accommodation</h3>
              <ul>
                <li>Average rent: £ <strong>1.</strong> <input type="text" className="blank-input" value={getVal(1)} onChange={(e)=>handleInputChange(1, e.target.value)} /> a month</li>
              </ul>
              <h3>Transport</h3>
              <ul>
                <li>Linda travels to work by <strong>2.</strong> <input type="text" className="blank-input" value={getVal(2)} onChange={(e)=>handleInputChange(2, e.target.value)} /></li>
                <li>Limited <strong>3.</strong> <input type="text" className="blank-input" value={getVal(3)} onChange={(e)=>handleInputChange(3, e.target.value)} /> in city centre</li>
                <li>Trains to London every <strong>4.</strong> <input type="text" className="blank-input" value={getVal(4)} onChange={(e)=>handleInputChange(4, e.target.value)} /> minutes</li>
                <li>Poor train service at <strong>5.</strong> <input type="text" className="blank-input" value={getVal(5)} onChange={(e)=>handleInputChange(5, e.target.value)} /></li>
              </ul>
              <h3>Advantages of living in Banford</h3>
              <ul>
                <li>New <strong>6.</strong> <input type="text" className="blank-input" value={getVal(6)} onChange={(e)=>handleInputChange(6, e.target.value)} /> opened recently</li>
                <li><strong>7.</strong> <input type="text" className="blank-input" value={getVal(7)} onChange={(e)=>handleInputChange(7, e.target.value)} /> has excellent reputation</li>
                <li>Good <strong>8.</strong> <input type="text" className="blank-input" value={getVal(8)} onChange={(e)=>handleInputChange(8, e.target.value)} /> on Bridge Street</li>
              </ul>
              <h3>Meet Linda</h3>
              <ul>
                <li>Meet Linda on <strong>9.</strong> <input type="text" className="blank-input" value={getVal(9)} onChange={(e)=>handleInputChange(9, e.target.value)} /> after 5.30 pm</li>
                <li>In the <strong>10.</strong> <input type="text" className="blank-input" value={getVal(10)} onChange={(e)=>handleInputChange(10, e.target.value)} /> opposite the station</li>
              </ul>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="test-section">
            <div className="instructions-box">
              <div className="ins-header">Questions 11-16</div>
              <div className="ins-body">Match physical activities to advantages <strong>A-G</strong>.</div>
            </div>
            <div className="matching-container">
                <div className="options-grid">
                    {["A. not seasonal", "B. enjoyable", "C. low risk injury", "D. level unimportant", "E. sociable", "F. fast results", "G. motivating"].map(opt => <div key={opt} className="opt-label">{opt}</div>)}
                </div>
                {[
                  {q: 11, l: "using a gym"}, {q: 12, l: "running"}, {q: 13, l: "swimming"},
                  {q: 14, l: "cycling"}, {q: 15, l: "doing yoga"}, {q: 16, l: "personal trainer"}
                ].map(item => (
                  <div key={item.q} className="map-q-row">
                    <span>{item.q}. {item.l}</span>
                    <input type="text" className="blank-input small" maxLength="1" value={getVal(item.q)} onChange={(e)=>handleInputChange(item.q, e.target.value.toUpperCase())} />
                  </div>
                ))}
            </div>
            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 17-20</div>
              <div className="ins-body">Choose <strong>TWO</strong> letters.</div>
            </div>
            <div className="mcq-item">
                <p>17-18. TWO reasons people give up going to the gym?</p>
                {['A. lack of time', 'B. loss of confidence', 'C. too much effort', 'D. high costs', 'E. less successful than others'].map(opt => (
                    <label key={opt}><input type="checkbox" checked={isSelected(17, 18, opt[0])} onChange={()=>handleMultiSelect(17, 18, opt[0])} /> {opt}</label>
                ))}
            </div>
            <div className="mcq-item">
                <p>19-20. TWO pieces of advice for setting goals?</p>
                {['A. write goals down', 'B. achievable aims', 'C. set time limit', 'D. give rewards', 'E. challenge yourself'].map(opt => (
                    <label key={opt}><input type="checkbox" checked={isSelected(19, 20, opt[0])} onChange={()=>handleMultiSelect(19, 20, opt[0])} /> {opt}</label>
                ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="test-section">
            <div className="instructions-box">
              <div className="ins-header">Questions 21-24</div>
              <div className="ins-body">Choose <strong>A, B or C</strong>.</div>
            </div>
            {[
              {q: 21, t: "What first inspired Jim?", opts: ["A. textiles in exhibition", "B. botanic garden book", "C. carpets on holiday"]},
              {q: 22, t: "Jim's practical investigation involved", opts: ["A. range of dyes / different fibres.", "B. different dyes / one fibre.", "C. one dye / range of fibres."]},
              {q: 23, t: "Jim was surprised by", opts: ["A. amount of material needed.", "B. internet availability.", "C. soaking time required."]},
              {q: 24, t: "Problem with tartrazine dye?", opts: ["A. allergic reaction.", "B. not permanent on cotton.", "C. ineffective on nylon."]}
            ].map(item => (
              <div key={item.q} className="mcq-item">
                <p>{item.q}. {item.t}</p>
                {item.opts.map(o => (
                  <label key={o}><input type="radio" name={`q${item.q}`} checked={getVal(item.q) === o[0]} onChange={()=>handleInputChange(item.q, o[0])} /> {o}</label>
                ))}
              </div>
            ))}
            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 25-30</div>
              <div className="ins-body">Match problem <strong>A-H</strong> to natural dyes.</div>
            </div>
            <div className="matching-container">
                <div className="options-grid">
                    {["A. expensive", "B. colour too strong", "C. not long-lasting", "D. poisonous", "E. damage fabric", "F. unexpected colour", "G. unsuitable for some", "H. not available"].map(opt => <div key={opt} className="opt-label">{opt}</div>)}
                </div>
                {[
                  {q: 25, l: "turmeric"}, {q: 26, l: "beetroot"}, {q: 27, l: "Tyrian purple"},
                  {q: 28, l: "logwood"}, {q: 29, l: "cochineal"}, {q: 30, l: "metal oxide"}
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
            <h2 className="section-title">The sleepy lizard (tiliqua rugosa)</h2>
            <div className="notes-container">
                <h3>Description</h3>
                <ul>
                    <li>Recognisable by their blue <strong>31.</strong> <input type="text" className="blank-input" value={getVal(31)} onChange={(e)=>handleInputChange(31, e.target.value)} /></li>
                    <li>Diet consists mainly of <strong>32.</strong> <input type="text" className="blank-input" value={getVal(32)} onChange={(e)=>handleInputChange(32, e.target.value)} /></li>
                    <li>Main predators are birds and <strong>33.</strong> <input type="text" className="blank-input" value={getVal(33)} onChange={(e)=>handleInputChange(33, e.target.value)} /></li>
                </ul>
                <h3>Navigation study</h3>
                <ul>
                    <li>Lizards can use the <strong>34.</strong> <input type="text" className="blank-input" value={getVal(34)} onChange={(e)=>handleInputChange(34, e.target.value)} /> to help navigate.</li>
                </ul>
                <h3>Observations in the wild</h3>
                <ul>
                    <li>Lizards keep the same <strong>35.</strong> <input type="text" className="blank-input" value={getVal(35)} onChange={(e)=>handleInputChange(35, e.target.value)} /> for several years.</li>
                    <li>Reasons: improve survival of young (little <strong>36.</strong> <input type="text" className="blank-input" value={getVal(36)} onChange={(e)=>handleInputChange(36, e.target.value)} /> noted), or provide <strong>37.</strong> <input type="text" className="blank-input" value={getVal(37)} onChange={(e)=>handleInputChange(37, e.target.value)} /> for females.</li>
                </ul>
                <h3>Tracking study</h3>
                <ul>
                    <li>GPS attached to the <strong>38.</strong> <input type="text" className="blank-input" value={getVal(38)} onChange={(e)=>handleInputChange(38, e.target.value)} />.</li>
                    <li>Information on location and number of <strong>39.</strong> <input type="text" className="blank-input" value={getVal(39)} onChange={(e)=>handleInputChange(39, e.target.value)} /> taken.</li>
                    <li>Lizards avoid one another to reduce chances of <strong>40.</strong> <input type="text" className="blank-input" value={getVal(40)} onChange={(e)=>handleInputChange(40, e.target.value)} /></li>
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

export default Listening11;