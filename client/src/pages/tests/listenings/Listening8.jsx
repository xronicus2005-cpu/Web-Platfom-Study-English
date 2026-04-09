import { useState, useEffect, useRef } from "react";
import "../../../styles/listening-style/Listening8.css"; 
import AnswersPage from "../../answer-page/AnswerPage";

// --- ASSET IMPORTS ---
import fullAudio from "../../../assets/audio/E12T4.mp3"; 
import photo from "../../../assets/testPhotos/C12T4.png"

 

const Listening8 = () => {
  const [activePart, setActivePart] = useState(1);
  const [time, setTime] = useState(1800); 
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [highlightPopup, setHighlightPopup] = useState({ visible: false, x: 0, y: 0, range: null });
  
  const audioRef = useRef(null);
  const title = "E12T4";

  const correctAnswers = {
    1: "temporary", 2: "doctor", 3: "Africa", 4: "youth", 5: "May", 6: "cheese", 7: "Arbuthnot", 8: "DG7 4PH", 9: "Tuesday", 10: "talk",
    11: "A", 12: "C", 13: "B", 14: "B",
    15: "H", 16: "C", 17: "F", 18: "G", 19: "I", 20: "B",
    21: "classification", 22: "worst", 23: "slides", 24: "issues",
    25: "F", 26: "A", 27: "E", 28: "C", 29: "G", 30: "B",
    31: "garden", 32: "political", 33: "work", 34: "fountain", 35: "social", 36: "lively", 37: "training", 38: "culture", 39: "nature", 40: "silent"
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
            <h2 className="section-title">Cycle tour leader: Applicant enquiry</h2>
            <div className="notes-container">
                <p>Example: Name: Margaret</p>
                <h4>About the applicant:</h4>
                <ul>
                    <li>wants a <strong>1.</strong> <input type="text" className="blank-input" value={getVal(1)} onChange={(e)=>handleInputChange(1, e.target.value)} /> job</li>
                    <li>will soon start work as a <strong>2.</strong> <input type="text" className="blank-input" value={getVal(2)} onChange={(e)=>handleInputChange(2, e.target.value)} /></li>
                    <li>has led cycle trips in <strong>3.</strong> <input type="text" className="blank-input" value={getVal(3)} onChange={(e)=>handleInputChange(3, e.target.value)} /></li>
                    <li>currently doing voluntary work with members of a <strong>4.</strong> <input type="text" className="blank-input" value={getVal(4)} onChange={(e)=>handleInputChange(4, e.target.value)} /> club</li>
                    <li>available for five months from the 1st of <strong>5.</strong> <input type="text" className="blank-input" value={getVal(5)} onChange={(e)=>handleInputChange(5, e.target.value)} /></li>
                    <li>can't eat <strong>6.</strong> <input type="text" className="blank-input" value={getVal(6)} onChange={(e)=>handleInputChange(6, e.target.value)} /></li>
                </ul>
                <h4>Contact details:</h4>
                <ul>
                    <li>address: 27 <strong>7.</strong> <input type="text" className="blank-input" value={getVal(7)} onChange={(e)=>handleInputChange(7, e.target.value)} /> Place, Dumfries</li>
                    <li>postcode: <strong>8.</strong> <input type="text" className="blank-input" value={getVal(8)} onChange={(e)=>handleInputChange(8, e.target.value)} /></li>
                </ul>
                <h4>Interview:</h4>
                <ul>
                    <li>at 2.30 pm on <strong>9.</strong> <input type="text" className="blank-input" value={getVal(9)} onChange={(e)=>handleInputChange(9, e.target.value)} /></li>
                    <li>will plan a short <strong>10.</strong> <input type="text" className="blank-input" value={getVal(10)} onChange={(e)=>handleInputChange(10, e.target.value)} /> about being a tour guide</li>
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
              {q: 11, t: "Which is the most rapidly-growing group of residents in Sheepmarket?", opts: ["A. young professional people", "B. students from the university", "C. employees in the local market"]},
              {q: 12, t: "The speaker recommends the side streets for their", opts: ["A. international restaurants.", "B. historical buildings.", "C. arts and crafts."]},
              {q: 13, t: "Clothes for the Young Fashion competition must be", opts: ["A. modelled by the designers themselves.", "B. inspired by aspects of contemporary culture.", "C. made from locally produced materials."]},
              {q: 14, t: "Car parking is free in some car parks if you", opts: ["A. stay for less than an hour.", "B. buy something in the shops.", "C. park in the evenings or at weekends."]}
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
              <div className="ins-body">Label the map. Choose the correct letter, <strong>A-I</strong>.</div>
            </div>
            <div className="map-container">
               {/* Map visual representation would go here */}
               
               <div className="map-placeholder">
                <img src={photo} className="map-photo" alt="map" />
               </div>
               <div className="matching-grid">
                  {[
                    {q: 15, l: "The Reynolds House"}, {q: 16, l: "The Thumb"}, {q: 17, l: "The Museum"},
                    {q: 18, l: "The Contemporary Art Gallery"}, {q: 19, l: "The Warner Gallery"}, {q: 20, l: "Nucleus"}
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
              <div className="ins-header">Questions 21-24</div>
              <div className="ins-body">Complete the table below. Write <strong>ONE WORD ONLY</strong>.</div>
            </div>
            <table className="listening-table">
                <thead>
                    <tr><th>Stages</th><th>Work still to be done</th></tr>
                </thead>
                <tbody>
                    <tr><td>Giannetti's book containing a <strong>21.</strong> <input type="text" className="blank-input" value={getVal(21)} onChange={(e)=>handleInputChange(21, e.target.value)} /></td><td>Organise notes</td></tr>
                    <tr><td>Suggest the <strong>22.</strong> <input type="text" className="blank-input" value={getVal(22)} onChange={(e)=>handleInputChange(22, e.target.value)} /> adaptations</td><td>Done</td></tr>
                    <tr><td>Present Rachel Malchow's ideas</td><td>Prepare some <strong>23.</strong> <input type="text" className="blank-input" value={getVal(23)} onChange={(e)=>handleInputChange(23, e.target.value)} /></td></tr>
                    <tr><td>Discuss relationship between adaptations and <strong>24.</strong> <input type="text" className="blank-input" value={getVal(24)} onChange={(e)=>handleInputChange(24, e.target.value)} /></td><td>Done</td></tr>
                </tbody>
            </table>

            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 25-30</div>
              <div className="ins-body">Match film comments <strong>A-G</strong> to the films.</div>
            </div>
            <div className="matching-container">
                <div className="options-grid">
                    {["A. Historical period", "B. Only parts of play", "C. Too similar to other films", "D. Unpopular", "E. Different period", "F. Different country", "G. Variety of art forms"].map(opt => <div key={opt} className="opt-label">{opt}</div>)}
                </div>
                {[
                  {q: 25, n: '"Ran"'}, {q: 26, n: '"Much Ado About Nothing"'}, {q: 27, n: '"Romeo & Juliet"'},
                  {q: 28, n: '"Hamlet"'}, {q: 29, n: '"Prospero\'s Books"'}, {q: 30, n: '"Looking for Richard"'}
                ].map(item => (
                  <div key={item.q} className="map-q-row">
                    <span>{item.q}. {item.n}</span>
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
            <h2 className="section-title">Noise in Cities</h2>
            <div className="notes-container">
                <h4>Noise 'maps'</h4>
                <ul>
                    <li>do not show other sources, e.g. neighbours in their <strong>31.</strong> <input type="text" className="blank-input" value={getVal(31)} onChange={(e)=>handleInputChange(31, e.target.value)} /></li>
                    <li>noise is a <strong>32.</strong> <input type="text" className="blank-input" value={getVal(32)} onChange={(e)=>handleInputChange(32, e.target.value)} /> issue that must be dealt with</li>
                    <li>effect on the <strong>33.</strong> <input type="text" className="blank-input" value={getVal(33)} onChange={(e)=>handleInputChange(33, e.target.value)} /> of schoolchildren</li>
                </ul>
                <h4>Different types of noise</h4>
                <ul>
                    <li>pleasant sounds e.g. a <strong>34.</strong> <input type="text" className="blank-input" value={getVal(34)} onChange={(e)=>handleInputChange(34, e.target.value)} /> in town</li>
                    <li>researchers use methods from <strong>35.</strong> <input type="text" className="blank-input" value={getVal(35)} onChange={(e)=>handleInputChange(35, e.target.value)} /> sciences</li>
                </ul>
                <h4>What people want</h4>
                <ul>
                    <li>environments which are <strong>36.</strong> <input type="text" className="blank-input" value={getVal(36)} onChange={(e)=>handleInputChange(36, e.target.value)} />, but also allow relaxation</li>
                    <li>architects do not get much <strong>37.</strong> <input type="text" className="blank-input" value={getVal(37)} onChange={(e)=>handleInputChange(37, e.target.value)} /> in acoustics</li>
                </ul>
                <h4>Understanding sound as an art form</h4>
                <ul>
                    <li>how sound relates to <strong>38.</strong> <input type="text" className="blank-input" value={getVal(38)} onChange={(e)=>handleInputChange(38, e.target.value)} /></li>
                    <li>whether physics helps us understand the <strong>39.</strong> <input type="text" className="blank-input" value={getVal(39)} onChange={(e)=>handleInputChange(39, e.target.value)} /> of sound</li>
                    <li>current disadvantage of VR programs: they are <strong>40.</strong> <input type="text" className="blank-input" value={getVal(40)} onChange={(e)=>handleInputChange(40, e.target.value)} /></li>
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

export default Listening8;