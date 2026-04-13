import { useState, useEffect, useRef } from "react";
import "../../../styles/listening-style/Listening21.css";
import AnswersPage from "../../answer-page/AnswerPage";

// --- ASSET IMPORTS ---
import fullAudio from "../../../assets/audio/E16T1.mp3";
import photo from "../../../assets/testPhotos/C16T1.png";


const Listening21 = () => {
  const [activePart, setActivePart] = useState(1);
  const [time, setTime] = useState(1800);
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [highlightPopup, setHighlightPopup] = useState({ visible: false, x: 0, y: 0, range: null });

  const audioRef = useRef(null);
  const title = "E16T1";

  const correctAnswers = {
    1: "egg", 2: "tower", 3: "car", 4: "animals", 5: "bridge", 6: ["movie", "film"], 7: "decorate", 8: "Wednesdays", 9: "Fradstone", 10: "parking",
    11: "C", 12: "A", 13: "B", 14: "C", 15: "H", 16: "C", 17: "G", 18: "B", 19: "I", 20: "A",
    21: ["C", "E"], 22: ["C", "E"], 23: ["D", "E"], 24: ["D", "E"], 25: "D", 26: "C", 27: "E", 28: "H", 29: "F", 30: "B",
    31: "practical", 32: "publication", 33: "choices", 34: "negative", 35: "play", 36: "capitalism", 37: "depression", 38: "logic", 39: "opportunity", 40: ["practice", "practise"]
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
            <h2 className="section-title">Children's Engineering Workshops</h2>
            <div className="notes-container">
                <h3>Tiny Engineers (ages 4-5)</h3>
                <p>Activities</p>
                <ul>
                    <li>Create a cover for an <strong>1.</strong> <input type="text" className="blank-input" value={getVal(1)} onChange={(e)=>handleInputChange(1, e.target.value)} /> so they can drop it from a height without breaking it.</li>
                    <li>Take part in a competition to build the tallest <strong>2.</strong> <input type="text" className="blank-input" value={getVal(2)} onChange={(e)=>handleInputChange(2, e.target.value)} />.</li>
                    <li>Make a <strong>3.</strong> <input type="text" className="blank-input" value={getVal(3)} onChange={(e)=>handleInputChange(3, e.target.value)} /> powered by a balloon.</li>
                </ul>
                <h3>Junior Engineers (ages 6-8)</h3>
                <p>Activities</p>
                <ul>
                    <li>Build model cars, trucks and <strong>4.</strong> <input type="text" className="blank-input" value={getVal(4)} onChange={(e)=>handleInputChange(4, e.target.value)} /> and learn how to program them.</li>
                    <li>Take part in a competition to build the longest <strong>5.</strong> <input type="text" className="blank-input" value={getVal(5)} onChange={(e)=>handleInputChange(5, e.target.value)} /> using card and wood.</li>
                    <li>Create a short <strong>6.</strong> <input type="text" className="blank-input" value={getVal(6)} onChange={(e)=>handleInputChange(6, e.target.value)} /> with special software.</li>
                    <li>Build, <strong>7.</strong> <input type="text" className="blank-input" value={getVal(7)} onChange={(e)=>handleInputChange(7, e.target.value)} /> and program a humanoid robot.</li>
                </ul>
                <p>Cost for a five-week block: £50. Held on <strong>8.</strong> <input type="text" className="blank-input" value={getVal(8)} onChange={(e)=>handleInputChange(8, e.target.value)} /> from 10 am to 11 am.</p>
                <p>Location: Building 10A, <strong>9.</strong> <input type="text" className="blank-input" value={getVal(9)} onChange={(e)=>handleInputChange(9, e.target.value)} /> Industrial Estate, Grasford. Plenty of <strong>10.</strong> <input type="text" className="blank-input" value={getVal(10)} onChange={(e)=>handleInputChange(10, e.target.value)} /> is available.</p>
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
            <h2 className="section-title">Stevenson's Site Visit</h2>
            {[
              {q: 11, t: "Stevenson's was founded in", opts: ["A. 1923.", "B. 1924.", "C. 1926."]},
              {q: 12, t: "Originally, Stevenson's manufactured goods for", opts: ["A. the healthcare industry.", "B. the automotive industry.", "C. the machine tools industry."]},
              {q: 13, t: "What does the speaker say about the company premises?", opts: ["A. The company has recently moved.", "B. The company has no plans to move.", "C. The company is going to move shortly."]},
              {q: 14, t: "The programme for the work experience group includes", opts: ["A. time to do research.", "B. meetings with a teacher.", "C. talks by staff."]}
            ].map(item => (
              <div key={item.q} className="mcq-item">
                <p>{item.q}. {item.t}</p>
                {item.opts.map(o => (
                  <label key={o}><input type="radio" name={`q${item.q}`} checked={getVal(item.q) === o[0]} onChange={()=>handleInputChange(item.q, o[0])} /> {o}</label>
                ))}
              </div>
            ))}

            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 15-20</div>
              <div className="ins-body">Label the map below. Choose the correct letter, <strong>A-J</strong>.</div>
            </div>
            <div className="map-container">
                <div className="map-image-placeholder">
                    <img src={photo} alt="map" className="map-photo"/>
                </div>
                {[
                  {q: 15, l: "coffee room"}, {q: 16, l: "warehouse"}, {q: 17, l: "staff canteen"},
                  {q: 18, l: "meeting room"}, {q: 19, l: "human resources"}, {q: 20, l: "boardroom"}
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
              <div className="ins-header">Questions 21-24</div>
              <div className="ins-body">Choose <strong>TWO</strong> letters, A-E.</div>
            </div>
            <div className="mcq-item">
                <p>21-22. Which TWO parts of the introductory stage to their art projects do Jess and Tom agree were useful?</p>
                {['A. the Bird Park visit', 'B. the workshop sessions', 'C. the Natural History Museum visit', 'D. projects done in previous years', 'E. handouts with research sources'].map(opt => (
                    <label key={opt}><input type="checkbox" checked={isSelected(21, 22, opt[0])} onChange={()=>handleMultiSelect(21, 22, opt[0])} /> {opt}</label>
                ))}
            </div>
            <div className="mcq-item">
                <p>23-24. Which TWO ways do both Jess and Tom decide to change their proposals?</p>
                {['A. giving a rationale for action plans', 'B. being less specific about outcome', 'C. adding a video diary presentation', 'D. providing a timeline and a mind map', 'E. making their notes more evaluative'].map(opt => (
                    <label key={opt}><input type="checkbox" checked={isSelected(23, 24, opt[0])} onChange={()=>handleMultiSelect(23, 24, opt[0])} /> {opt}</label>
                ))}
            </div>

            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 25-30</div>
              <div className="ins-body">Which personal meaning do the students give each picture? Choose <strong>A-H</strong>.</div>
            </div>
            <div className="matching-container">
                <div className="options-grid">
                    {["A. childhood memory", "B. hope for future", "C. fast movement", "D. potential threat", "E. power of colour", "F. continuity of life", "G. protection of nature", "H. confused attitude to nature"].map(opt => <div key={opt} className="opt-label">{opt}</div>)}
                </div>
                {[
                  {q: 25, l: "Falcon (Landseer)"}, {q: 26, l: "Fish hawk (Audubon)"}, {q: 27, l: "Kingfisher (van Gogh)"},
                  {q: 28, l: "Portrait of William Wells"}, {q: 29, l: "Vairumati (Gauguin)"}, {q: 30, l: "Portrait of Giovanni de Medici"}
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
            <h2 className="section-title">Stoicism</h2>
            <div className="notes-container">
                <p>Stoicism is still relevant today because of its <strong>31.</strong> <input type="text" className="blank-input" value={getVal(31)} onChange={(e)=>handleInputChange(31, e.target.value)} /> appeal.</p>
                <p>The Stoics' ideas are surprisingly well known, despite not being intended for <strong>32.</strong> <input type="text" className="blank-input" value={getVal(32)} onChange={(e)=>handleInputChange(32, e.target.value)} />.</p>
                <ul>
                    <li>Epictetus said external events cannot be controlled but the <strong>33.</strong> <input type="text" className="blank-input" value={getVal(33)} onChange={(e)=>handleInputChange(33, e.target.value)} /> people make can be.</li>
                    <li>A Stoic has a different view on experiences others consider <strong>34.</strong> <input type="text" className="blank-input" value={getVal(34)} onChange={(e)=>handleInputChange(34, e.target.value)} />.</li>
                    <li>George Washington organised a <strong>35.</strong> <input type="text" className="blank-input" value={getVal(35)} onChange={(e)=>handleInputChange(35, e.target.value)} /> about Cato.</li>
                    <li>Adam Smith's ideas on <strong>36.</strong> <input type="text" className="blank-input" value={getVal(36)} onChange={(e)=>handleInputChange(36, e.target.value)} /> were influenced by Stoicism.</li>
                </ul>
                <p>Cognitive Behaviour Therapy (CBT)</p>
                <ul>
                    <li>The treatment for <strong>37.</strong> <input type="text" className="blank-input" value={getVal(37)} onChange={(e)=>handleInputChange(37, e.target.value)} /> is based on Stoicism.</li>
                    <li>People learn to base thinking on <strong>38.</strong> <input type="text" className="blank-input" value={getVal(38)} onChange={(e)=>handleInputChange(38, e.target.value)} />.</li>
                </ul>
                <p>In business, identify obstacles as <strong>39.</strong> <input type="text" className="blank-input" value={getVal(39)} onChange={(e)=>handleInputChange(39, e.target.value)} />. It requires a lot of <strong>40.</strong> <input type="text" className="blank-input" value={getVal(40)} onChange={(e)=>handleInputChange(40, e.target.value)} /> but can help lead a good life.</p>
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

export default Listening21;
