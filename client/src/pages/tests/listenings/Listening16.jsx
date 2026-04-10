import { useState, useEffect, useRef } from "react";
import "../../../styles/listening-style/Listening16.css";
import AnswersPage from "../../answer-page/AnswerPage";

// --- ASSET IMPORTS ---
import fullAudio from "../../../assets/audio/E14T4.mp3";


const Listening16 = () => {
  const [activePart, setActivePart] = useState(1);
  const [time, setTime] = useState(1800);
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [highlightPopup, setHighlightPopup] = useState({ visible: false, x: 0, y: 0, range: null });

  const audioRef = useRef(null);
  const title = "E14T4";

  const correctAnswers = {
    1: "85", 2: "roses", 3: "trees", 4: "stage", 5: "speech", 6: "support", 7: "cabins", 8: "C", 9: "A", 10: "B",
    11: "G", 12: "D", 13: "A", 14: "E", 15: "F", 16: "B", 17: ["A", "D"], 18: ["A", "D"], 19: ["A", "D"], 20: ["A", "D"],
    21: "A", 22: "C", 23: "A", 24: "B", 25: "B", 26: "F", 27: "E", 28: "C", 29: "B", 30: "G",
    31: "spring", 32: "tools", 33: "maps", 34: "heavy", 35: "marble", 36: "light", 37: "camera", 38: "medical", 39: "eyes", 40: "wine"
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
              <div className="ins-header">Questions 1-7</div>
              <div className="ins-body">Complete the notes below. Write <strong>ONE WORD AND/OR A NUMBER</strong> for each answer.</div>
            </div>
            <h2 className="section-title">Enquiry about booking hotel room for event</h2>
            <div className="notes-container">
              <p>(Example) Andrew is the: Manager</p>
              <h3>Rooms</h3>
              <h4>Adelphi Room</h4>
              <ul>
                <li>number of people who can sit down to eat: <strong>1.</strong> <input type="text" className="blank-input" value={getVal(1)} onChange={(e)=>handleInputChange(1, e.target.value)} /></li>
                <li>has a gallery suitable for musicians</li>
                <li>can go out and see the <strong>2.</strong> <input type="text" className="blank-input" value={getVal(2)} onChange={(e)=>handleInputChange(2, e.target.value)} /> in pots on the terrace</li>
                <li>terrace has a view of a group of <strong>3.</strong> <input type="text" className="blank-input" value={getVal(3)} onChange={(e)=>handleInputChange(3, e.target.value)} /></li>
              </ul>
              <h4>Carlton Room</h4>
              <ul>
                <li>number of people who can sit down to eat: 110</li>
                <li>has a <strong>4.</strong> <input type="text" className="blank-input" value={getVal(4)} onChange={(e)=>handleInputChange(4, e.target.value)} /></li>
                <li>view of the lake</li>
              </ul>
              <h3>Options</h3>
              <ul>
                <li>Master of Ceremonies: can give a <strong>5.</strong> <input type="text" className="blank-input" value={getVal(5)} onChange={(e)=>handleInputChange(5, e.target.value)} /> while people are eating; will provide <strong>6.</strong> <input type="text" className="blank-input" value={getVal(6)} onChange={(e)=>handleInputChange(6, e.target.value)} /> if there are any problems</li>
                <li>Accommodation: in hotel rooms or <strong>7.</strong> <input type="text" className="blank-input" value={getVal(7)} onChange={(e)=>handleInputChange(7, e.target.value)} /></li>
              </ul>
            </div>
            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 8-10</div>
              <div className="ins-body">What is said about hotel facilities? Choose <strong>A-C</strong>.</div>
            </div>
            <div className="matching-container">
                <div className="options-grid">
                    {["A. included in cost", "B. available at extra charge", "C. not available"].map(opt => <div key={opt} className="opt-label">{opt}</div>)}
                </div>
                {[
                  {q: 8, l: "outdoor swimming pool"}, {q: 9, l: "gym"}, {q: 10, l: "tennis courts"}
                ].map(item => (
                  <div key={item.q} className="map-q-row">
                    <span>{item.q}. {item.l}</span>
                    <input type="text" className="blank-input small" maxLength="1" value={getVal(item.q)} onChange={(e)=>handleInputChange(item.q, e.target.value.toUpperCase())} />
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
              <div className="ins-body">What information is given about excursions? Choose <strong>A-H</strong>.</div>
            </div>
            <div className="matching-container">
                <div className="options-grid full">
                    {["A. downhill", "B. beginners", "C. good weather", "D. food included", "E. no charge", "F. swimming possible", "G. fully booked", "H. transport not included"].map(opt => <div key={opt} className="opt-label">{opt}</div>)}
                </div>
                {[
                  {q: 11, l: "dolphin watching"}, {q: 12, l: "forest walk"}, {q: 13, l: "cycle trip"},
                  {q: 14, l: "local craft tour"}, {q: 15, l: "observatory trip"}, {q: 16, l: "horse riding"}
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
                <p>17-18. TWO things said about "Musical Favourites"?</p>
                {['A. pay extra for drinks', 'B. book in advance', 'C. reduction for two tickets', 'D. meet the performers', 'E. take part in show'].map(opt => (
                    <label key={opt}><input type="checkbox" checked={isSelected(17, 18, opt[0])} onChange={()=>handleMultiSelect(17, 18, opt[0])} /> {opt}</label>
                ))}
            </div>
            <div className="mcq-item">
                <p>19-20. TWO things said about the Castle Feast?</p>
                {['A. dance after meal', 'B. choice of food', 'C. historical costume', 'D. knives and forks not used', 'E. horse races'].map(opt => (
                    <label key={opt}><input type="checkbox" checked={isSelected(19, 20, opt[0])} onChange={()=>handleMultiSelect(19, 20, opt[0])} /> {opt}</label>
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
              {q: 21, t: "What does Trevor find interesting about children's literature?", opts: ["A. authors may not realise values they teach.", "B. entertaining and educational at once.", "C. adults expect imitation."]},
              {q: 22, t: "Trevor says the module made him", opts: ["A. analyse stories his niece reads.", "B. wonder how popularity reflects quality.", "C. decide to write stories."]},
              {q: 23, t: "Stephanie is interested in Pictures module because", opts: ["A. intends to become illustrator.", "B. remembers beautiful childhood illustrations.", "C. illustrations more important than words."]},
              {q: 24, t: "Trevor and Stephanie agree that comics", opts: ["A. are inferior to books.", "B. potential for being useful.", "C. discourage imagination."]},
              {q: 25, t: "Regarding gendered books, Trevor was surprised", opts: ["A. how long distinction went unquestioned.", "B. how few books aimed at both.", "C. how many enjoyed books for opposite sex."]}
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
              <div className="ins-body">Comment on each story: <strong>A-G</strong>.</div>
            </div>
            <div className="matching-container">
                <div className="options-grid">
                    {["A. translated", "B. hard to read", "C. inspired different art", "D. more popular than others", "E. refers to another book", "F. started a new genre", "G. unlikely topic"].map(opt => <div key={opt} className="opt-label">{opt}</div>)}
                </div>
                {[
                  {q: 26, l: "Perrault's fairy tales"}, {q: 27, l: "The Swiss Family Robinson"},
                  {q: 28, l: "The Nutcracker..."}, {q: 29, l: "Lord of the Rings"}, {q: 30, l: "War Horse"}
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
            <h2 className="section-title">The hunt for sunken settlements and ancient shipwrecks</h2>
            <div className="notes-container">
                <h3>ATLIT-YAM</h3>
                <ul>
                    <li>Stone homes had a courtyard and large stones round a <strong>31.</strong> <input type="text" className="blank-input" value={getVal(31)} onChange={(e)=>handleInputChange(31, e.target.value)} /></li>
                    <li>Research carried out into structures, <strong>32.</strong> <input type="text" className="blank-input" value={getVal(32)} onChange={(e)=>handleInputChange(32, e.target.value)} /> and remains.</li>
                </ul>
                <h3>TRADITIONAL AUVs</h3>
                <ul>
                    <li>Used in oil industry to make <strong>33.</strong> <input type="text" className="blank-input" value={getVal(33)} onChange={(e)=>handleInputChange(33, e.target.value)} /></li>
                    <li>Problem: expensive and <strong>34.</strong> <input type="text" className="blank-input" value={getVal(34)} onChange={(e)=>handleInputChange(34, e.target.value)} /></li>
                </ul>
                <h3>LATEST AUVs</h3>
                <ul>
                    <li>Marzamemi: ships carrying architectural elements made of <strong>35.</strong> <input type="text" className="blank-input" value={getVal(35)} onChange={(e)=>handleInputChange(35, e.target.value)} /></li>
                    <li><strong>36.</strong> <input type="text" className="blank-input" value={getVal(36)} onChange={(e)=>handleInputChange(36, e.target.value)} /> is used for short distance communication.</li>
                    <li>AUV can send data to another with a better <strong>37.</strong> <input type="text" className="blank-input" value={getVal(37)} onChange={(e)=>handleInputChange(37, e.target.value)} /></li>
                </ul>
                <h3>Gulf of Baratti:</h3>
                <ul>
                    <li>one carrying <strong>38.</strong> <input type="text" className="blank-input" value={getVal(38)} onChange={(e)=>handleInputChange(38, e.target.value)} /> supplies.</li>
                    <li>tablets may have been used for cleaning the <strong>39.</strong> <input type="text" className="blank-input" value={getVal(39)} onChange={(e)=>handleInputChange(39, e.target.value)} /></li>
                    <li>others carrying olive oil or <strong>40.</strong> <input type="text" className="blank-input" value={getVal(40)} onChange={(e)=>handleInputChange(40, e.target.value)} /></li>
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

export default Listening16;
