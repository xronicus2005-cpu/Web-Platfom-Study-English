import { useState, useEffect, useRef } from "react";
import "../../../styles/listening-style/Listening28.css";
import AnswersPage from "../../answer-page/AnswerPage";

// --- ASSET IMPORTS ---
import fullAudio from "../../../assets/audio/E17T4.mp3";


const Listening28 = () => {
  const [activePart, setActivePart] = useState(1);
  const [time, setTime] = useState(1800);
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [highlightPopup, setHighlightPopup] = useState({ visible: false, x: 0, y: 0, range: null });

  const audioRef = useRef(null);
  const title = "E17T4";

  const correctAnswers = {
    1: "floor", 2: "fridge", 3: "shirts", 4: "windows", 5: "balcony", 6: "electrician", 7: "dust", 8: "police", 9: "training", 10: "review",
    11: "A", 12: "A", 13: "A", 14: "C", 15: "A", 16: "C", 17: "B", 18: "C", 19: "B", 20: "A",
    21: ["C", "E"], 22: ["C", "E"], 23: ["A", "D"], 24: ["A", "D"], 25: "B", 26: "F", 27: "A", 28: "D", 29: "C", 30: "G",
    31: "golden", 32: "healthy", 33: "climate", 34: "rocks", 35: "diameter", 36: "tube", 37: "fire", 38: "steam", 39: "cloudy", 40: "litre"
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
              <div className="ins-body">Complete the notes below. Write <strong>ONE WORD ONLY</strong> for each answer.</div>
            </div>
            <h2 className="section-title">Easy Life Cleaning Services</h2>
            <div className="notes-container">
                <h3>Basic cleaning package offered</h3>
                <ul>
                    <li>Cleaning all surfaces</li>
                    <li>Cleaning the <strong>1.</strong> <input type="text" className="blank-input" value={getVal(1)} onChange={(e)=>handleInputChange(1, e.target.value)} /> throughout the apartment</li>
                    <li>Cleaning shower, sinks, toilet etc.</li>
                </ul>
                <h3>Additional services agreed</h3>
                <p>Every week</p>
                <ul>
                    <li>Cleaning the <strong>2.</strong> <input type="text" className="blank-input" value={getVal(2)} onChange={(e)=>handleInputChange(2, e.target.value)} /></li>
                    <li>Ironing clothes - <strong>3.</strong> <input type="text" className="blank-input" value={getVal(3)} onChange={(e)=>handleInputChange(3, e.target.value)} /> only</li>
                </ul>
                <p>Every month</p>
                <ul>
                    <li>Cleaning all the <strong>4.</strong> <input type="text" className="blank-input" value={getVal(4)} onChange={(e)=>handleInputChange(4, e.target.value)} /> from the inside</li>
                    <li>Washing down the <strong>5.</strong> <input type="text" className="blank-input" value={getVal(5)} onChange={(e)=>handleInputChange(5, e.target.value)} /></li>
                </ul>
                <h3>Other possibilities</h3>
                <ul>
                    <li>They can organise a plumber or an <strong>6.</strong> <input type="text" className="blank-input" value={getVal(6)} onChange={(e)=>handleInputChange(6, e.target.value)} /> if necessary.</li>
                    <li>A special cleaning service is available for customers who are allergic to <strong>7.</strong> <input type="text" className="blank-input" value={getVal(7)} onChange={(e)=>handleInputChange(7, e.target.value)} />.</li>
                </ul>
                <h3>Information on the cleaners</h3>
                <ul>
                    <li>Before being hired, all cleaners have a background check carried out by the <strong>8.</strong> <input type="text" className="blank-input" value={getVal(8)} onChange={(e)=>handleInputChange(8, e.target.value)} />.</li>
                    <li>References are required.</li>
                    <li>All cleaners are given <strong>9.</strong> <input type="text" className="blank-input" value={getVal(9)} onChange={(e)=>handleInputChange(9, e.target.value)} /> for two weeks.</li>
                    <li>Customers send a <strong>10.</strong> <input type="text" className="blank-input" value={getVal(10)} onChange={(e)=>handleInputChange(10, e.target.value)} /> after each visit.</li>
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
              {q: 11, t: "Many hotel managers are unaware that their staff often leave because of", opts: ["A. a lack of training.", "B. long hours.", "C. low pay."]},
              {q: 12, t: "What is the impact of high staff turnover on managers?", opts: ["A. an increased workload", "B. low morale", "C. an inability to meet targets"]},
              {q: 13, t: "What mistake should managers always avoid?", opts: ["A. failing to treat staff equally", "B. reorganising shifts without warning", "C. neglecting to have enough staff during busy periods"]},
              {q: 14, t: "What unexpected benefit did Dunwich Hotel notice after improving staff retention rates?", opts: ["A. a fall in customer complaints", "B. an increase in loyalty club membership", "C. a rise in spending per customer"]}
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
              <div className="ins-body">Which way of reducing staff turnover was used? Choose <strong>A-C</strong>.</div>
            </div>
            <div className="matching-container">
                <div className="options-grid">
                    {["A. improving relationships and teamwork", "B. offering incentives and financial benefits", "C. providing career opportunities"].map(opt => <div key={opt} className="opt-label">{opt}</div>)}
                </div>
                {[
                  {q: 15, l: "The Sun Club"}, {q: 16, l: "The Portland"}, {q: 17, l: "Bluewater Hotels"},
                  {q: 18, l: "Pentlow Hotels"}, {q: 19, l: "Green Planet"}, {q: 20, l: "The Amesbury"}
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
                <p>21-22. Which TWO points do Thomas and Jeanne make about Thomas's sporting activities at school?</p>
                {['A. He should have felt more positive about them.', 'B. The training was too challenging for him.', 'C. He could have worked harder at them.', 'D. His parents were disappointed in him.', 'E. His fellow students admired him.'].map(opt => (
                    <label key={opt}><input type="checkbox" checked={isSelected(21, 22, opt[0])} onChange={()=>handleMultiSelect(21, 22, opt[0])} /> {opt}</label>
                ))}
            </div>
            <div className="mcq-item">
                <p>23-24. Which TWO feelings did Thomas experience when he was in Kenya?</p>
                {['A. disbelief', 'B. relief', 'C. stress', 'D. gratitude', 'E. homesickness'].map(opt => (
                    <label key={opt}><input type="checkbox" checked={isSelected(23, 24, opt[0])} onChange={()=>handleMultiSelect(23, 24, opt[0])} /> {opt}</label>
                ))}
            </div>

            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 25-30</div>
              <div className="ins-body">What comment do the students make about the development of each item? Choose <strong>A-H</strong>.</div>
            </div>
            <div className="matching-container">
                <div className="options-grid">
                    {["A. excessive sweating", "B. material mass produced for other purpose", "C. people made own", "D. replaced often", "E. expensive material", "F. unpopular with spectators", "G. caused injuries", "H. no one liked it at first"].map(opt => <div key={opt} className="opt-label">{opt}</div>)}
                </div>
                {[
                  {q: 25, l: "the table tennis bat"}, {q: 26, l: "the cricket helmet"}, {q: 27, l: "the cycle helmet"},
                  {q: 28, l: "the golf club"}, {q: 29, l: "the hockey stick"}, {q: 30, l: "the football"}
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
            <h2 className="section-title">Maple syrup</h2>
            <div className="notes-container">
                <h3>What is maple syrup?</h3>
                <ul>
                    <li>made from the sap of the maple tree</li>
                    <li>colour described as <strong>31.</strong> <input type="text" className="blank-input" value={getVal(31)} onChange={(e)=>handleInputChange(31, e.target.value)} /></li>
                    <li>very <strong>32.</strong> <input type="text" className="blank-input" value={getVal(32)} onChange={(e)=>handleInputChange(32, e.target.value)} /> compared to refined sugar</li>
                </ul>
                <h3>The maple tree</h3>
                <ul>
                    <li>best growing conditions and <strong>33.</strong> <input type="text" className="blank-input" value={getVal(33)} onChange={(e)=>handleInputChange(33, e.target.value)} /> are in Canada and North America</li>
                </ul>
                <h3>Early maple sugar producers</h3>
                <ul>
                    <li>used hot <strong>34.</strong> <input type="text" className="blank-input" value={getVal(34)} onChange={(e)=>handleInputChange(34, e.target.value)} /> to heat the sap</li>
                </ul>
                <h3>Today's maple syrup</h3>
                <p>The trees</p>
                <ul>
                    <li>Tree trunks may not have the correct <strong>35.</strong> <input type="text" className="blank-input" value={getVal(35)} onChange={(e)=>handleInputChange(35, e.target.value)} /> until 40 years.</li>
                </ul>
                <p>The production</p>
                <ul>
                    <li>A tap is drilled into the trunk and a <strong>36.</strong> <input type="text" className="blank-input" value={getVal(36)} onChange={(e)=>handleInputChange(36, e.target.value)} /> carries the sap into a bucket.</li>
                    <li>Large pans called evaporators are heated by means of a <strong>37.</strong> <input type="text" className="blank-input" value={getVal(37)} onChange={(e)=>handleInputChange(37, e.target.value)} />.</li>
                    <li>A lot of <strong>38.</strong> <input type="text" className="blank-input" value={getVal(38)} onChange={(e)=>handleInputChange(38, e.target.value)} /> is produced during evaporation.</li>
                    <li>'Sugar sand' is removed because it makes the syrup look <strong>39.</strong> <input type="text" className="blank-input" value={getVal(39)} onChange={(e)=>handleInputChange(39, e.target.value)} />.</li>
                    <li>A huge quantity of sap is needed to make a <strong>40.</strong> <input type="text" className="blank-input" value={getVal(40)} onChange={(e)=>handleInputChange(40, e.target.value)} /> of maple syrup.</li>
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

export default Listening28;
