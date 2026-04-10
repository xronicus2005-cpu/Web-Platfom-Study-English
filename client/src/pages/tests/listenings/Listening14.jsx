import { useState, useEffect, useRef } from "react";
import "../../../styles/listening-style/Listening14.css";
import AnswersPage from "../../answer-page/AnswerPage";

// --- ASSET IMPORTS ---
import fullAudio from "../../../assets/audio/E14T2.mp3";
import photo from "../../../assets/testPhotos/C14T2.png"


const Listening14 = () => {
  const [activePart, setActivePart] = useState(1);
  const [time, setTime] = useState(1800);
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [highlightPopup, setHighlightPopup] = useState({ visible: false, x: 0, y: 0, range: null });

  const audioRef = useRef(null);
  const title = "E14T2";

  const correctAnswers = {
    1: "219 442 9785", 2: "10 October", 3: "manager", 4: "Cawley", 5: "knee", 6: "3 weeks", 7: "tennis", 8: "running", 9: "shoulder", 10: "vitamins",
    11: "B", 12: "C", 13: "C", 14: "B", 15: "A", 16: "H", 17: "D", 18: "F", 19: "A", 20: "E",
    21: "B", 22: "C", 23: "A", 24: "A", 25: "E", 26: "D", 27: "A", 28: "H", 29: "G", 30: "C",
    31: "dances", 32: "survival", 33: "clouds", 34: "festivals", 35: "comets", 36: "sky", 37: "instruments", 38: "thermometer", 39: "storms", 40: "telegraph"
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
              <div className="ins-body">Complete the notes below. Write <strong>ONE WORD AND/OR A NUMBER</strong> for each answer.</div>
            </div>
            <h2 className="section-title">TOTAL HEALTH CLINIC</h2>
            <div className="form-container">
              <h3>PATIENT DETAILS</h3>
              <h4>Personal information</h4>
              <p>(Example) Name: Julie Anne</p>
              <div className="form-row"><span className="label">Contact phone:</span> <strong>1.</strong> <input type="text" className="blank-input" value={getVal(1)} onChange={(e)=>handleInputChange(1, e.target.value)} /></div>
              <div className="form-row"><span className="label">Date of birth:</span> <strong>2.</strong> <input type="text" className="blank-input" value={getVal(2)} onChange={(e)=>handleInputChange(2, e.target.value)} />, 1992</div>
              <div className="form-row"><span className="label">Occupation:</span> works as a <strong>3.</strong> <input type="text" className="blank-input" value={getVal(3)} onChange={(e)=>handleInputChange(3, e.target.value)} /></div>
              <div className="form-row"><span className="label">Insurance company:</span> <strong>4.</strong> <input type="text" className="blank-input" value={getVal(4)} onChange={(e)=>handleInputChange(4, e.target.value)} /> Life Insurance</div>

              <h4>Details of the problem</h4>
              <div className="form-row"><span className="label">Type of problem:</span> pain in her left <strong>5.</strong> <input type="text" className="blank-input" value={getVal(5)} onChange={(e)=>handleInputChange(5, e.target.value)} /></div>
              <div className="form-row"><span className="label">When it began:</span> <strong>6.</strong> <input type="text" className="blank-input" value={getVal(6)} onChange={(e)=>handleInputChange(6, e.target.value)} /> ago</div>

              <h4>Other information</h4>
              <p>Sports played:</p>
              <ul>
                <li>belongs to a <strong>7.</strong> <input type="text" className="blank-input" value={getVal(7)} onChange={(e)=>handleInputChange(7, e.target.value)} /> club</li>
                <li>goes <strong>8.</strong> <input type="text" className="blank-input" value={getVal(8)} onChange={(e)=>handleInputChange(8, e.target.value)} /> regularly</li>
              </ul>
              <p>Medical history:</p>
              <ul>
                <li>injured her <strong>9.</strong> <input type="text" className="blank-input" value={getVal(9)} onChange={(e)=>handleInputChange(9, e.target.value)} /> last year</li>
                <li>no regular medication apart from <strong>10.</strong> <input type="text" className="blank-input" value={getVal(10)} onChange={(e)=>handleInputChange(10, e.target.value)} /></li>
              </ul>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="test-section">
            <div className="instructions-box">
              <div className="ins-header">Questions 11-15</div>
              <div className="ins-body">Choose the correct letter, <strong>A, B or C</strong>.</div>
            </div>
            <h2 className="section-title">Visit to Branley Castle</h2>
            {[
              {q: 11, t: "Before Queen Elizabeth I visited the castle in 1576,", opts: ["A. repairs were carried out to the guest rooms.", "B. a new building was constructed for her.", "C. a fire damaged part of the main hall."]},
              {q: 12, t: "In 1982, the castle was sold to", opts: ["A. the government.", "B. the Fenys family.", "C. an entertainment company."]},
              {q: 13, t: "In some of the rooms, visitors can", opts: ["A. speak to experts on the history of the castle.", "B. interact with actors dressed as famous characters.", "C. see models of historical figures moving and talking."]},
              {q: 14, t: "In the castle park, visitors can", opts: ["A. see an 800-year-old tree.", "B. go to an art exhibition.", "C. visit a small zoo."]},
              {q: 15, t: "At the end of the visit, the group will have", opts: ["A. afternoon tea in the conservatory.", "B. the chance to meet the castle's owners.", "C. a photograph together on the Great Staircase."]}
            ].map(item => (
              <div key={item.q} className="mcq-item">
                <p>{item.q}. {item.t}</p>
                {item.opts.map(o => (
                  <label key={o}><input type="radio" name={`q${item.q}`} checked={getVal(item.q) === o[0]} onChange={()=>handleInputChange(item.q, o[0])} /> {o}</label>
                ))}
              </div>
            ))}
            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 16-20</div>
                <div className="ins-body">Label the plan below. Choose the correct letter, <strong>A-H</strong>.</div>
            </div>
            <div className="map-matching">
                {/* Plan labels A-H would ideally be displayed here with a mock-up image description */}
                <img className="image-description-box" src={photo} alt="map" />

                {[
                  {q: 16, l: "Starting point for walking the walls"}, {q: 17, l: "Bow and arrow display"},
                  {q: 18, l: "Hunting birds display"}, {q: 19, l: "Traditional dancing"}, {q: 20, l: "Shop"}
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
              <div className="ins-body">Choose <strong>A, B or C</strong>.</div>
            </div>
            <h2 className="section-title">Woolly mammoths on St Paul's Island</h2>
            {[
              {q: 21, t: "How will Rosie and Martin introduce their presentation?", opts: ["A. with a drawing of woolly mammoths.", "B. with a timeline showing when they lived.", "C. with a video clip."]},
              {q: 22, t: "What was surprising about the mammoth tooth found by Russell Graham?", opts: ["A. It was still embedded in the jawbone.", "B. It was from an unknown species.", "C. It was not as old as remains from elsewhere."]},
              {q: 23, t: "The students will use an animated diagram to demonstrate how the mammoths", opts: ["A. became isolated on the island.", "B. spread from the island.", "C. coexisted with other animals."]},
              {q: 24, t: "According to Martin, what is unusual about the date of the mammoths' extinction?", opts: ["A. how exact it is", "B. how early it is", "C. how it was established"]}
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
              <div className="ins-body">Presentation actions: <strong>A-H</strong>.</div>
            </div>
            <div className="matching-container">
                <div className="options-grid">
                    {["A. interactive", "B. reduce visuals", "C. personal opinions", "D. contact researcher", "E. detailed notes", "F. find info online", "G. check timing", "H. organise clearly"].map(opt => <div key={opt} className="opt-label">{opt}</div>)}
                </div>
                {[
                  {q: 25, l: "Introduction"}, {q: 26, l: "Discovery of tooth"}, {q: 27, l: "Initial questions"},
                  {q: 28, l: "Further research"}, {q: 29, l: "Findings / explanations"}, {q: 30, l: "Relevance today"}
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
            <h2 className="section-title">The history of weather forecasting</h2>
            <div className="notes-container">
                <h3>Ancient cultures</h3>
                <ul>
                    <li>Cultures invented <strong>31.</strong> <input type="text" className="blank-input" value={getVal(31)} onChange={(e)=>handleInputChange(31, e.target.value)} /> to make weather gods friendly.</li>
                    <li>Observe the sky to ensure their <strong>32.</strong> <input type="text" className="blank-input" value={getVal(32)} onChange={(e)=>handleInputChange(32, e.target.value)} />.</li>
                    <li>Babylonians (650 BC) used weather phenomena such as <strong>33.</strong> <input type="text" className="blank-input" value={getVal(33)} onChange={(e)=>handleInputChange(33, e.target.value)} />.</li>
                    <li>Chinese (300 BC) had calendar made of <strong>34.</strong> <input type="text" className="blank-input" value={getVal(34)} onChange={(e)=>handleInputChange(34, e.target.value)} />.</li>
                </ul>
                <h3>Ancient Greeks</h3>
                <ul>
                    <li>Aristotle described haloes and <strong>35.</strong> <input type="text" className="blank-input" value={getVal(35)} onChange={(e)=>handleInputChange(35, e.target.value)} />.</li>
                </ul>
                <h3>Middle Ages</h3>
                <ul>
                    <li>Proverbs about significance of the color of the <strong>36.</strong> <input type="text" className="blank-input" value={getVal(36)} onChange={(e)=>handleInputChange(36, e.target.value)} />.</li>
                </ul>
                <h3>15th-19th centuries</h3>
                <ul>
                    <li>Scientists recognized value of <strong>37.</strong> <input type="text" className="blank-input" value={getVal(37)} onChange={(e)=>handleInputChange(37, e.target.value)} /> for first time.</li>
                    <li>Galileo invented the <strong>38.</strong> <input type="text" className="blank-input" value={getVal(38)} onChange={(e)=>handleInputChange(38, e.target.value)} />.</li>
                    <li>Franklin identified the movement of <strong>39.</strong> <input type="text" className="blank-input" value={getVal(39)} onChange={(e)=>handleInputChange(39, e.target.value)} />.</li>
                    <li>19th century: data sent via <strong>40.</strong> <input type="text" className="blank-input" value={getVal(40)} onChange={(e)=>handleInputChange(40, e.target.value)} />.</li>
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

export default Listening14;
