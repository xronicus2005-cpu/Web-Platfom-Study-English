import { useState, useEffect, useRef } from "react";
import "../../../styles/listening-style/Listening24.css";
import AnswersPage from "../../answer-page/AnswerPage";

// --- ASSET IMPORTS ---
import fullAudio from "../../../assets/audio/E16T4.mp3";
import photo from "../../../assets/testPhotos/C16T4.png"


const Listening24 = () => {
  const [activePart, setActivePart] = useState(1);
  const [time, setTime] = useState(1800);
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [highlightPopup, setHighlightPopup] = useState({ visible: false, x: 0, y: 0, range: null });

  const audioRef = useRef(null);
  const title = "E16T4";

  const correctAnswers = {
    1: "28", 2: "550", 3: "Chervil", 4: "garage", 5: "garden", 6: "parking", 7: "wood", 8: "bridge", 9: "monument", 10: "March",
    11: "C", 12: "A", 13: "B", 14: "B", 15: "C", 16: "F", 17: "A", 18: "I", 19: "E", 20: "H",
    21: ["B", "C"], 22: ["B", "C"], 23: ["C", "E"], 24: ["C", "E"], 25: "C", 26: "F", 27: "D", 28: "E", 29: "B", 30: "A",
    31: ["spice", "spices"], 32: ["colony", "settlement"], 33: "fat", 34: "head", 35: "movement", 36: ["balance", "balancing"], 37: "brain", 38: "smell", 39: "rats", 40: "forest"
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
            <h2 className="section-title">Holiday rental</h2>
            <div className="notes-container">
                <p>Owners' names: Jack Fitzgerald and Shirley Fitzgerald</p>
                <h3>Granary Cottage</h3>
                <ul>
                    <li>available for week beginning <strong>1.</strong> <input type="text" className="blank-input" value={getVal(1)} onChange={(e)=>handleInputChange(1, e.target.value)} /> May</li>
                    <li>cost for the week: £ <strong>2.</strong> <input type="text" className="blank-input" value={getVal(2)} onChange={(e)=>handleInputChange(2, e.target.value)} /></li>
                </ul>
                <h3><strong>3.</strong> <input type="text" className="blank-input" value={getVal(3)} onChange={(e)=>handleInputChange(3, e.target.value)} /> Cottage</h3>
                <ul>
                    <li>cost for the week: £480</li>
                    <li>building was originally a <strong>4.</strong> <input type="text" className="blank-input" value={getVal(4)} onChange={(e)=>handleInputChange(4, e.target.value)} /></li>
                    <li>walk through doors from living room into a <strong>5.</strong> <input type="text" className="blank-input" value={getVal(5)} onChange={(e)=>handleInputChange(5, e.target.value)} /></li>
                    <li>several <strong>6.</strong> <input type="text" className="blank-input" value={getVal(6)} onChange={(e)=>handleInputChange(6, e.target.value)} /> spaces at the front</li>
                    <li>bathroom has a shower</li>
                    <li>central heating and stove that burns <strong>7.</strong> <input type="text" className="blank-input" value={getVal(7)} onChange={(e)=>handleInputChange(7, e.target.value)} /></li>
                    <li>views of old <strong>8.</strong> <input type="text" className="blank-input" value={getVal(8)} onChange={(e)=>handleInputChange(8, e.target.value)} /> from living room</li>
                    <li>view of hilltop <strong>9.</strong> <input type="text" className="blank-input" value={getVal(9)} onChange={(e)=>handleInputChange(9, e.target.value)} /> from the bedroom</li>
                </ul>
                <h3>Payment</h3>
                <ul>
                    <li>deposit: £144</li>
                    <li>deadline for final payment: end of <strong>10.</strong> <input type="text" className="blank-input" value={getVal(10)} onChange={(e)=>handleInputChange(10, e.target.value)} /></li>
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
            <h2 className="section-title">Local council report on traffic and highways</h2>
            {[
              {q: 11, t: "A survey found people's main concern about traffic in the area was", opts: ["A. cuts to public transport.", "B. poor maintenance of roads.", "C. changes in the type of traffic."]},
              {q: 12, t: "Which change will shortly be made to the cycle path next to the river?", opts: ["A. It will be widened.", "B. It will be extended.", "C. It will be resurfaced."]},
              {q: 13, t: "Plans for a pedestrian crossing have been postponed because", opts: ["A. the Post Office has moved.", "B. the proposed location is unsafe.", "C. funding is not available at present."]},
              {q: 14, t: "On Station Road, notices have been erected", opts: ["A. telling cyclists not to leave their bikes outside the station ticket office.", "B. asking motorists to switch off engines when waiting at the level crossing.", "C. warning pedestrians to leave enough time when crossing the railway line."]}
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
              <div className="ins-body">Label the map below. Choose the correct letter, <strong>A-I</strong>.</div>
            </div>
            <div className="map-container">
                <div className="map-image-placeholder">
                    <img src={photo} alt="map" className="map-photo"/>
                </div>
                {[
                  {q: 15, l: "New car park"}, {q: 16, l: "New cricket pitch"}, {q: 17, l: "Children's playground"},
                  {q: 18, l: "Skateboard ramp"}, {q: 19, l: "Pavilion"}, {q: 20, l: "Notice board"}
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
                <p>21-22. Which TWO benefits of city bike-sharing schemes do the students agree are the most important?</p>
                {['A. reducing noise pollution', 'B. reducing traffic congestion', 'C. improving air quality', 'D. encouraging health and fitness', 'E. making cycling affordable'].map(opt => (
                    <label key={opt}><input type="checkbox" checked={isSelected(21, 22, opt[0])} onChange={()=>handleMultiSelect(21, 22, opt[0])} /> {opt}</label>
                ))}
            </div>
            <div className="mcq-item">
                <p>23-24. Which TWO things do the students think are necessary for successful bike-sharing schemes?</p>
                {['A. Bikes should have a GPS system.', 'B. The app should be easy to use.', 'C. Public awareness should be raised.', 'D. Only one scheme should be available.', 'E. There should be a large network of cycle lanes.'].map(opt => (
                    <label key={opt}><input type="checkbox" checked={isSelected(23, 24, opt[0])} onChange={()=>handleMultiSelect(23, 24, opt[0])} /> {opt}</label>
                ))}
            </div>

            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 25-30</div>
              <div className="ins-body">What is the speakers' opinion of schemes in each city? Choose <strong>A-G</strong>.</div>
            </div>
            <div className="matching-container">
                <div className="options-grid">
                    {["A. Disappointing agreement", "B. Should be cheaper", "C. Surprised by success", "D. Investment required", "E. Well designed system", "F. Disagree on reasons for success", "G. Expanded too quickly"].map(opt => <div key={opt} className="opt-label">{opt}</div>)}
                </div>
                {[
                  {q: 25, l: "Amsterdam"}, {q: 26, l: "Dublin"}, {q: 27, l: "London"},
                  {q: 28, l: "Buenos Aires"}, {q: 29, l: "New York"}, {q: 30, l: "Sydney"}
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
            <h2 className="section-title">THE EXTINCTION OF THE DODO BIRD</h2>
            <div className="notes-container">
                <p>The dodo was a large flightless bird which used to inhabit the island of Mauritius.</p>
                <h3>History</h3>
                <ul>
                    <li>1507 - Portuguese ships transporting <strong>31.</strong> <input type="text" className="blank-input" value={getVal(31)} onChange={(e)=>handleInputChange(31, e.target.value)} /> stopped at the island to collect food and water.</li>
                    <li>1638 - The Dutch established a <strong>32.</strong> <input type="text" className="blank-input" value={getVal(32)} onChange={(e)=>handleInputChange(32, e.target.value)} /> on the island.</li>
                </ul>
                <h3>Description</h3>
                <ul>
                    <li>A Dutch painting suggests the dodo was very <strong>33.</strong> <input type="text" className="blank-input" value={getVal(33)} onChange={(e)=>handleInputChange(33, e.target.value)} />.</li>
                    <li>The only remaining soft tissue is a dried <strong>34.</strong> <input type="text" className="blank-input" value={getVal(34)} onChange={(e)=>handleInputChange(34, e.target.value)} />.</li>
                    <li>Recent studies suggest the birds were capable of rapid <strong>35.</strong> <input type="text" className="blank-input" value={getVal(35)} onChange={(e)=>handleInputChange(35, e.target.value)} />.</li>
                    <li>Thought they used small wings to maintain <strong>36.</strong> <input type="text" className="blank-input" value={getVal(36)} onChange={(e)=>handleInputChange(36, e.target.value)} />.</li>
                    <li>Their <strong>37.</strong> <input type="text" className="blank-input" value={getVal(37)} onChange={(e)=>handleInputChange(37, e.target.value)} /> was of average size.</li>
                    <li>Their sense of <strong>38.</strong> <input type="text" className="blank-input" value={getVal(38)} onChange={(e)=>handleInputChange(38, e.target.value)} /> enabled them to find food.</li>
                </ul>
                <h3>Reasons for extinction</h3>
                <ul>
                    <li><strong>39.</strong> <input type="text" className="blank-input" value={getVal(39)} onChange={(e)=>handleInputChange(39, e.target.value)} /> also escaped onto the island and ate the birds' eggs.</li>
                    <li>The arrival of farming meant the <strong>40.</strong> <input type="text" className="blank-input" value={getVal(40)} onChange={(e)=>handleInputChange(40, e.target.value)} /> was destroyed.</li>
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

export default Listening24;
