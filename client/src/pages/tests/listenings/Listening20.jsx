import { useState, useEffect, useRef } from "react";
import "../../../styles/listening-style/Listening20.css";
import AnswersPage from "../../answer-page/AnswerPage";

// --- ASSET IMPORTS ---
import fullAudio from "../../../assets/audio/E15T4.mp3";
import photo from "../../../assets/testPhotos/C15T4.png"


const Listening20 = () => {
  const [activePart, setActivePart] = useState(1);
  const [time, setTime] = useState(1800);
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [highlightPopup, setHighlightPopup] = useState({ visible: false, x: 0, y: 0, range: null });

  const audioRef = useRef(null);
  const title = "E15T4";

  const correctAnswers = {
    1: "journalist", 2: "shopping", 3: "Staunfirth", 4: "return", 5: "23.70", 6: "online", 7: "delay", 8: "information", 9: "platform", 10: "parking",
    11: "D", 12: "C", 13: "G", 14: "H", 15: "A", 16: "E", 17: ["A", "D"], 18: ["A", "D"], 19: ["A", "C"], 20: ["A", "C"],
    21: "B", 22: "A", 23: "B", 24: "A", 25: "A", 26: "A", 27: "B", 28: "B", 29: "A", 30: "C",
    31: "wealth", 32: "technology", 33: "power", 34: "textiles", 35: "machines", 36: "newspapers", 37: "local", 38: "lighting", 39: "windows", 40: "advertising"
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
            <h2 className="section-title">Customer Satisfaction Survey</h2>
            <div className="notes-container">
                <h3>Customer details</h3>
                <p>Name: Sophie Bird</p>
                <div className="form-row">Occupation: <strong>1.</strong> <input type="text" className="blank-input" value={getVal(1)} onChange={(e)=>handleInputChange(1, e.target.value)} /></div>
                <div className="form-row">Reason for travel today: <strong>2.</strong> <input type="text" className="blank-input" value={getVal(2)} onChange={(e)=>handleInputChange(2, e.target.value)} /></div>

                <h3>Journey information</h3>
                <div className="form-row">Name of station returning to: <strong>3.</strong> <input type="text" className="blank-input" value={getVal(3)} onChange={(e)=>handleInputChange(3, e.target.value)} /></div>
                <div className="form-row">Type of ticket purchased: standard <strong>4.</strong> <input type="text" className="blank-input" value={getVal(4)} onChange={(e)=>handleInputChange(4, e.target.value)} /> ticket</div>
                <div className="form-row">Cost of ticket: £ <strong>5.</strong> <input type="text" className="blank-input" value={getVal(5)} onChange={(e)=>handleInputChange(5, e.target.value)} /></div>
                <div className="form-row">Where ticket was bought: <strong>6.</strong> <input type="text" className="blank-input" value={getVal(6)} onChange={(e)=>handleInputChange(6, e.target.value)} /></div>

                <h3>Satisfaction with journey</h3>
                <p>Most satisfied with: the wifi</p>
                <div className="form-row">Least satisfied with: the <strong>7.</strong> <input type="text" className="blank-input" value={getVal(7)} onChange={(e)=>handleInputChange(7, e.target.value)} /> this morning</div>

                <h3>Satisfaction with station facilities</h3>
                <div className="form-row">Most satisfied with: how much <strong>8.</strong> <input type="text" className="blank-input" value={getVal(8)} onChange={(e)=>handleInputChange(8, e.target.value)} /> was provided</div>
                <div className="form-row">Least satisfied with: lack of seats, particularly on the <strong>9.</strong> <input type="text" className="blank-input" value={getVal(9)} onChange={(e)=>handleInputChange(9, e.target.value)} /></div>
                <div className="form-row">Neither satisfied nor dissatisfied with: the <strong>10.</strong> <input type="text" className="blank-input" value={getVal(10)} onChange={(e)=>handleInputChange(10, e.target.value)} /> available</div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="test-section">
            <div className="instructions-box">
              <div className="ins-header">Questions 11-16</div>
              <div className="ins-body">Label the map below. Choose the correct letter, <strong>A-H</strong>, next to Questions 11-16.</div>
            </div>
            <div className="map-container">
                <div className="map-image-placeholder">
                    <img src={photo} alt="map" className="map-photo"/>
                </div>
                {[
                  {q: 11, l: "café"}, {q: 12, l: "toilets"}, {q: 13, l: "formal gardens"},
                  {q: 14, l: "outdoor gym"}, {q: 15, l: "skateboard ramp"}, {q: 16, l: "wild flowers"}
                ].map(item => (
                  <div key={item.q} className="map-q-row">
                    <span>{item.q}. {item.l}</span>
                    <input type="text" className="blank-input small" maxLength="1" value={getVal(item.q)} onChange={(e)=>handleInputChange(item.q, e.target.value.toUpperCase())} />
                  </div>
                ))}
            </div>

            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 17-20</div>
              <div className="ins-body">Choose <strong>TWO</strong> letters, A-E.</div>
            </div>
            <div className="mcq-item">
                <p>17-18. What does the speaker say about the adventure playground?</p>
                {['A. Children must be supervised.', 'B. It costs more in winter.', 'C. Some activities are only for younger children.', 'D. No payment is required.', 'E. It was recently expanded.'].map(opt => (
                    <label key={opt}><input type="checkbox" checked={isSelected(17, 18, opt[0])} onChange={()=>handleMultiSelect(17, 18, opt[0])} /> {opt}</label>
                ))}
            </div>
            <div className="mcq-item">
                <p>19-20. What does the speaker say about the glass houses?</p>
                {['A. They are closed at weekends.', 'B. Volunteers are needed to work there.', 'C. They were badly damaged by fire.', 'D. More money is needed to repair glass.', 'E. Visitors can see palm trees from tropical regions.'].map(opt => (
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
              <div className="ins-body">Choose the correct letter, <strong>A, B or C</strong>.</div>
            </div>
            <h2 className="section-title">Presentation about refrigeration</h2>
            {[
              {q: 21, t: "What did Annie discover from reading about icehouses?", opts: ["A. why they were first created", "B. how the ice was kept frozen", "C. where they were located"]},
              {q: 22, t: "What point does Annie make about refrigeration in ancient Rome?", opts: ["A. It became a commercial business.", "B. It used snow from nearby.", "C. It took a long time to become popular."]},
              {q: 23, t: "In connection with modern refrigerators, both Annie and Jack are worried about", opts: ["A. the complexity of the technology.", "B. the fact that some are disposed of irresponsibly.", "C. the large number that quickly break down."]},
              {q: 24, t: "What do Jack and Annie agree regarding domestic fridges?", opts: ["A. They are generally good value for money.", "B. There are plenty of useful variations.", "C. They are more useful than other domestic appliances."]}
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
              <div className="ins-body">Who is going to do research into each topic? Choose <strong>A, B or C</strong>.</div>
            </div>
            <div className="matching-container">
                <div className="options-grid">
                    {["A. Annie", "B. Jack", "C. both Annie and Jack"].map(opt => <div key={opt} className="opt-label">{opt}</div>)}
                </div>
                {[
                  {q: 25, l: "the goods that are refrigerated"}, {q: 26, l: "the effects on health"}, {q: 27, l: "the impact on food producers"},
                  {q: 28, l: "the impact on cities"}, {q: 29, l: "refrigerated transport"}, {q: 30, l: "domestic fridges"}
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
              <div className="ins-body">Complete the notes below. Write <strong>ONE WORD ONLY</strong> for each answer.</div>
            </div>
            <h2 className="section-title">How the Industrial Revolution affected life in Britain</h2>
            <div className="notes-container">
                <p>19th century: For the first time, people's possessions were used to measure Britain's <strong>31.</strong> <input type="text" className="blank-input" value={getVal(31)} onChange={(e)=>handleInputChange(31, e.target.value)} />.</p>
                <p>Developments in production of goods and in <strong>32.</strong> <input type="text" className="blank-input" value={getVal(32)} onChange={(e)=>handleInputChange(32, e.target.value)} /> greatly changed lives.</p>

                <h3>MAIN AREAS OF CHANGE</h3>
                <h4>Manufacturing</h4>
                <ul>
                    <li>The Revolution would not have happened without the new types of <strong>33.</strong> <input type="text" className="blank-input" value={getVal(33)} onChange={(e)=>handleInputChange(33, e.target.value)} /> that were used then.</li>
                    <li>The leading industry was <strong>34.</strong> <input type="text" className="blank-input" value={getVal(34)} onChange={(e)=>handleInputChange(34, e.target.value)} />.</li>
                    <li>New <strong>35.</strong> <input type="text" className="blank-input" value={getVal(35)} onChange={(e)=>handleInputChange(35, e.target.value)} /> made factories necessary.</li>
                </ul>
                <h4>Transport</h4>
                <ul>
                    <li>Greater access to <strong>36.</strong> <input type="text" className="blank-input" value={getVal(36)} onChange={(e)=>handleInputChange(36, e.target.value)} /> made people more aware of what they could buy.</li>
                    <li>People were not limited to buying <strong>37.</strong> <input type="text" className="blank-input" value={getVal(37)} onChange={(e)=>handleInputChange(37, e.target.value)} /> goods.</li>
                </ul>
                <h4>Retailing</h4>
                <ul>
                    <li>Inside stores: better <strong>38.</strong> <input type="text" className="blank-input" value={getVal(38)} onChange={(e)=>handleInputChange(38, e.target.value)} />.</li>
                    <li>Outside stores: <strong>39.</strong> <input type="text" className="blank-input" value={getVal(39)} onChange={(e)=>handleInputChange(39, e.target.value)} /> were bigger.</li>
                    <li><strong>40.</strong> <input type="text" className="blank-input" value={getVal(40)} onChange={(e)=>handleInputChange(40, e.target.value)} /> that was persuasive became common.</li>
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

export default Listening20;
