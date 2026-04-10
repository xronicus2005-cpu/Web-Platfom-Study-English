import { useState, useEffect, useRef } from "react";
import "../../../styles/listening-style/Listening19.css";
import AnswersPage from "../../answer-page/AnswerPage";

// --- ASSET IMPORTS ---
import fullAudio from "../../../assets/audio/E15T3.mp3";


const Listening19 = () => {
  const [activePart, setActivePart] = useState(1);
  const [time, setTime] = useState(1800);
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [highlightPopup, setHighlightPopup] = useState({ visible: false, x: 0, y: 0, range: null });

  const audioRef = useRef(null);
  const title = "E15T3";

  const correctAnswers = {
    1: "furniture", 2: "meetings", 3: "diary", 4: "detail", 5: "1", 6: "deliveries", 7: "tidy", 8: "team", 9: "heavy", 10: "customer",
    11: "B", 12: "A", 13: "C", 14: "B", 15: "C", 16: "B", 17: ["B", "D"], 18: ["B", "D"], 19: ["A", "E"], 20: ["A", "E"],
    21: "page", 22: "size", 23: "graphic", 24: "structure", 25: "purpose", 26: "assumption", 27: "A", 28: "C", 29: "C", 30: "B",
    31: "mud", 32: "clay", 33: "metal", 34: "hair", 35: "baths", 36: "disease", 37: "perfume", 38: "salt", 39: "science", 40: "tax"
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
            <h2 className="section-title">Employment Agency: Possible Jobs</h2>
            <div className="notes-container">
                <h3>First Job</h3>
                <p>Administrative assistant in a company that produces <strong>1.</strong> <input type="text" className="blank-input" value={getVal(1)} onChange={(e)=>handleInputChange(1, e.target.value)} /> (North London)</p>
                <ul>
                    <li>go to <strong>2.</strong> <input type="text" className="blank-input" value={getVal(2)} onChange={(e)=>handleInputChange(2, e.target.value)} /> and take notes</li>
                    <li>management of <strong>3.</strong> <input type="text" className="blank-input" value={getVal(3)} onChange={(e)=>handleInputChange(3, e.target.value)} /></li>
                    <li>attention to <strong>4.</strong> <input type="text" className="blank-input" value={getVal(4)} onChange={(e)=>handleInputChange(4, e.target.value)} /></li>
                    <li>need a minimum of <strong>5.</strong> <input type="text" className="blank-input" value={getVal(5)} onChange={(e)=>handleInputChange(5, e.target.value)} /> of experience of teleconferencing</li>
                </ul>
                <h3>Second Job</h3>
                <p>Warehouse assistant in South London</p>
                <ul>
                    <li>managing <strong>6.</strong> <input type="text" className="blank-input" value={getVal(6)} onChange={(e)=>handleInputChange(6, e.target.value)} /></li>
                    <li>very organised and <strong>7.</strong> <input type="text" className="blank-input" value={getVal(7)} onChange={(e)=>handleInputChange(7, e.target.value)} /></li>
                    <li>used to working in a <strong>8.</strong> <input type="text" className="blank-input" value={getVal(8)} onChange={(e)=>handleInputChange(8, e.target.value)} /></li>
                    <li>able to cope with items that are <strong>9.</strong> <input type="text" className="blank-input" value={getVal(9)} onChange={(e)=>handleInputChange(9, e.target.value)} /></li>
                    <li>Need experience of: driving in London, warehouse work, <strong>10.</strong> <input type="text" className="blank-input" value={getVal(10)} onChange={(e)=>handleInputChange(10, e.target.value)} /> service</li>
                </ul>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="test-section">
            <div className="instructions-box">
              <div className="ins-header">Questions 11-16</div>
              <div className="ins-body">Choose the correct letter, <strong>A, B or C</strong>.</div>
            </div>
            <h2 className="section-title">Street Play Scheme</h2>
            {[
              {q: 11, t: "When did the Street Play Scheme first take place?", opts: ["A. two years ago", "B. three years ago", "C. six years ago"]},
              {q: 12, t: "How often is Beechwood Road closed to traffic now?", opts: ["A. once a week", "B. on Saturdays and Sundays", "C. once a month"]},
              {q: 13, t: "Who is responsible for closing the road?", opts: ["A. a council official", "B. the police", "C. local wardens"]},
              {q: 14, t: "Residents who want to use their cars", opts: ["A. have to park in another street.", "B. must drive very slowly.", "C. need permission from a warden."]},
              {q: 15, t: "Alice says that Street Play Schemes are most needed in", opts: ["A. wealthy areas.", "B. quiet suburban areas.", "C. areas with heavy traffic."]},
              {q: 16, t: "What has been the reaction of residents who are not parents?", opts: ["A. Many of them were unhappy at first.", "B. They like seeing children play in the street.", "C. They are surprised by the lack of noise."]}
            ].map(item => (
              <div key={item.q} className="mcq-item">
                <p>{item.q}. {item.t}</p>
                {item.opts.map(o => (
                  <label key={o}><input type="radio" name={`q${item.q}`} checked={getVal(item.q) === o[0]} onChange={()=>handleInputChange(item.q, o[0])} /> {o}</label>
                ))}
              </div>
            ))}
            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 17-20</div>
              <div className="ins-body">Choose <strong>TWO</strong> letters, A-E.</div>
            </div>
            <div className="mcq-item">
                <p>17-18. Which TWO benefits for children does Alice think are most important?</p>
                {['A. increased physical activity', 'B. increased sense of independence', 'C. learn new games', 'D. part of a community', 'E. make new friends'].map(opt => (
                    <label key={opt}><input type="checkbox" checked={isSelected(17, 18, opt[0])} onChange={()=>handleMultiSelect(17, 18, opt[0])} /> {opt}</label>
                ))}
            </div>
            <div className="mcq-item">
                <p>19-20. Which TWO results of the King Street experiment surprised Alice?</p>
                {['A. more shoppers', 'B. improved safety', 'C. less air pollution', 'D. more relaxed atmosphere', 'E. less noise pollution'].map(opt => (
                    <label key={opt}><input type="checkbox" checked={isSelected(19, 20, opt[0])} onChange={()=>handleMultiSelect(19, 20, opt[0])} /> {opt}</label>
                ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="test-section">
            <div className="instructions-box">
              <div className="ins-header">Questions 21-26</div>
              <div className="ins-body">Complete the notes. Write <strong>ONE WORD ONLY</strong>.</div>
            </div>
            <h2 className="section-title">What Hazel should analyse about items in newspapers:</h2>
            <div className="notes-container">
                <ul>
                    <li>What <strong>21.</strong> <input type="text" className="blank-input" value={getVal(21)} onChange={(e)=>handleInputChange(21, e.target.value)} /> the item is on</li>
                    <li>the <strong>22.</strong> <input type="text" className="blank-input" value={getVal(22)} onChange={(e)=>handleInputChange(22, e.target.value)} /> of the item, including the headline</li>
                    <li>any <strong>23.</strong> <input type="text" className="blank-input" value={getVal(23)} onChange={(e)=>handleInputChange(23, e.target.value)} /> accompanying the item</li>
                    <li>the <strong>24.</strong> <input type="text" className="blank-input" value={getVal(24)} onChange={(e)=>handleInputChange(24, e.target.value)} /> of the item</li>
                    <li>the writer's main <strong>25.</strong> <input type="text" className="blank-input" value={getVal(25)} onChange={(e)=>handleInputChange(25, e.target.value)} /></li>
                    <li>the <strong>26.</strong> <input type="text" className="blank-input" value={getVal(26)} onChange={(e)=>handleInputChange(26, e.target.value)} /> the writer may make about the reader</li>
                </ul>
            </div>
            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 27-30</div>
              <div className="ins-body">What does Hazel decide for each article type? Choose <strong>A-C</strong>.</div>
            </div>
            <div className="matching-container">
                <div className="options-grid">
                    {["A. definitely look", "B. may look", "C. definitely won't look"].map(opt => <div key={opt} className="opt-label">{opt}</div>)}
                </div>
                {[
                  {q: 27, l: "national news item"}, {q: 28, l: "editorial"}, {q: 29, l: "human interest"}, {q: 30, l: "arts"}
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
            <h2 className="section-title">Early history of keeping clean</h2>
            <div className="notes-container">
                <p>Prehistoric times: water was used to wash off <strong>31.</strong> <input type="text" className="blank-input" value={getVal(31)} onChange={(e)=>handleInputChange(31, e.target.value)} /></p>
                <p>Ancient Babylon: soap-like material found in <strong>32.</strong> <input type="text" className="blank-input" value={getVal(32)} onChange={(e)=>handleInputChange(32, e.target.value)} /> cylinders</p>
                <p>Ancient Greece: used a strigil - scraper made of <strong>33.</strong> <input type="text" className="blank-input" value={getVal(33)} onChange={(e)=>handleInputChange(33, e.target.value)} /></p>
                <p>Ancient Germany and Gaul: used soap to colour their <strong>34.</strong> <input type="text" className="blank-input" value={getVal(34)} onChange={(e)=>handleInputChange(34, e.target.value)} /></p>
                <p>Ancient Rome: water carried to Roman <strong>35.</strong> <input type="text" className="blank-input" value={getVal(35)} onChange={(e)=>handleInputChange(35, e.target.value)} /> by aqueducts</p>
                <p>Middle Ages: decline in bathing contributed to occurrence of <strong>36.</strong> <input type="text" className="blank-input" value={getVal(36)} onChange={(e)=>handleInputChange(36, e.target.value)} />. <strong>37.</strong> <input type="text" className="blank-input" value={getVal(37)} onChange={(e)=>handleInputChange(37, e.target.value)} /> began to be added to soap.</p>
                <p>1791: Leblanc invented a way of making soda ash from <strong>38.</strong> <input type="text" className="blank-input" value={getVal(38)} onChange={(e)=>handleInputChange(38, e.target.value)} /></p>
                <p>Early 1800s: Chevreul turned soapmaking into a <strong>39.</strong> <input type="text" className="blank-input" value={getVal(39)} onChange={(e)=>handleInputChange(39, e.target.value)} /></p>
                <p>From 1800s: there was no longer a <strong>40.</strong> <input type="text" className="blank-input" value={getVal(40)} onChange={(e)=>handleInputChange(40, e.target.value)} /> on soap.</p>
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

export default Listening19;
