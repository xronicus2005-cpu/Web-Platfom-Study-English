import { useState, useEffect, useRef } from "react";
import "../../../styles/listening-style/Listening27.css";
import AnswersPage from "../../answer-page/AnswerPage";

// --- ASSET IMPORTS ---
import fullAudio from "../../../assets/audio/E17T3.mp3";


const Listening27 = () => {
  const [activePart, setActivePart] = useState(1);
  const [time, setTime] = useState(1800);
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [highlightPopup, setHighlightPopup] = useState({ visible: false, x: 0, y: 0, range: null });

  const audioRef = useRef(null);
  const title = "E17T3";

  const correctAnswers = {
    1: "family", 2: "fit", 3: "hotels", 4: "Carrowniskey", 5: "week", 6: "bay", 7: "September", 8: "19", 9: "30", 10: "boots",
    11: ["B", "E"], 12: ["B", "E"], 13: "C", 14: "C", 15: "A", 16: "E", 17: "D", 18: "G", 19: "F", 20: "C",
    21: "B", 22: "A", 23: "A", 24: "B", 25: "C", 26: "A", 27: "D", 28: "B", 29: "F", 30: "H",
    31: "mud", 32: "feathers", 33: "shape", 34: "moon", 35: "neck", 36: "evidence", 37: "destinations", 38: "oceans", 39: "recovery", 40: "atlas"
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
            <h2 className="section-title">Advice on surfing holidays</h2>
            <div className="notes-container">
                <h3>Jack's advice</h3>
                <ul>
                    <li>Recommends surfing for <strong>1.</strong> <input type="text" className="blank-input" value={getVal(1)} onChange={(e)=>handleInputChange(1, e.target.value)} /> holidays in the summer</li>
                    <li>Need to be quite <strong>2.</strong> <input type="text" className="blank-input" value={getVal(2)} onChange={(e)=>handleInputChange(2, e.target.value)} /></li>
                </ul>
                <h3>Irish surfing locations</h3>
                <p><strong>County Clare</strong></p>
                <ul>
                    <li>Lahinch has some good quality <strong>3.</strong> <input type="text" className="blank-input" value={getVal(3)} onChange={(e)=>handleInputChange(3, e.target.value)} /> and surf schools</li>
                    <li>There are famous cliffs nearby</li>
                </ul>
                <p><strong>County Mayo</strong></p>
                <ul>
                    <li>Good surf school at <strong>4.</strong> <input type="text" className="blank-input" value={getVal(4)} onChange={(e)=>handleInputChange(4, e.target.value)} /> beach</li>
                    <li>Surf camp lasts for one <strong>5.</strong> <input type="text" className="blank-input" value={getVal(5)} onChange={(e)=>handleInputChange(5, e.target.value)} /></li>
                    <li>Can also explore the local <strong>6.</strong> <input type="text" className="blank-input" value={getVal(6)} onChange={(e)=>handleInputChange(6, e.target.value)} /> by kayak</li>
                </ul>
                <h3>Weather</h3>
                <ul>
                    <li>Best month to go: <strong>7.</strong> <input type="text" className="blank-input" value={getVal(7)} onChange={(e)=>handleInputChange(7, e.target.value)} /></li>
                    <li>Average temperature in summer: approx. <strong>8.</strong> <input type="text" className="blank-input" value={getVal(8)} onChange={(e)=>handleInputChange(8, e.target.value)} /> degrees</li>
                </ul>
                <h3>Costs</h3>
                <ul>
                    <li>Wetsuit and surfboard: <strong>9.</strong> <input type="text" className="blank-input" value={getVal(9)} onChange={(e)=>handleInputChange(9, e.target.value)} /> euros per day</li>
                    <li>Also advisable to hire <strong>10.</strong> <input type="text" className="blank-input" value={getVal(10)} onChange={(e)=>handleInputChange(10, e.target.value)} /> for warmth</li>
                </ul>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="test-section">
            <div className="instructions-box">
              <div className="ins-header">Questions 11-12</div>
              <div className="ins-body">Choose <strong>TWO</strong> letters, A-E.</div>
            </div>
            <div className="mcq-item">
                <p>11-12. Which TWO facts are given about the school’s extended hours childcare service?</p>
                {['A. It started recently.', 'B. More children attend after school than before school.', 'C. An average of 50 children attend in the mornings.', 'D. A child cannot attend both the before and after school sessions.', 'E. The maximum number of children who can attend is 70.'].map(opt => (
                    <label key={opt}><input type="checkbox" checked={isSelected(11, 12, opt[0])} onChange={()=>handleMultiSelect(11, 12, opt[0])} /> {opt}</label>
                ))}
            </div>

            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 13-15</div>
              <div className="ins-body">Choose the correct letter, <strong>A, B or C</strong>.</div>
            </div>
            {[
              {q: 13, t: "How much does childcare cost for a complete afternoon session per child?", opts: ["A. £3.50", "B. £5.70", "C. £7.20"]},
              {q: 14, t: "What does the manager say about food?", opts: ["A. Children with allergies should bring their own food.", "B. Children may bring healthy snacks with them.", "C. Children are given a proper meal at 5 p.m."]},
              {q: 15, t: "What is different about arrangements in the school holidays?", opts: ["A. Children from other schools can attend.", "B. Older children can attend.", "C. A greater number of children can attend."]}
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
              <div className="ins-body">What information is given about each activity? Choose <strong>A-G</strong>.</div>
            </div>
            <div className="matching-container">
                <div className="options-grid">
                    {["A. Limited availability", "B. No longer available", "C. For over 8s only", "D. Requires parent help", "E. Additional fee", "F. New activity", "G. Requested by children"].map(opt => <div key={opt} className="opt-label">{opt}</div>)}
                </div>
                {[
                  {q: 16, l: "Spanish"}, {q: 17, l: "Music"}, {q: 18, l: "Painting"},
                  {q: 19, l: "Yoga"}, {q: 20, l: "Cooking"}
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
              <div className="ins-body">Choose the correct letter, <strong>A, B or C</strong>.</div>
            </div>
            <h2 className="section-title">Holly's Work Placement Tutorial</h2>
            {[
              {q: 21, t: "Holly has chosen the Orion Stadium placement because", opts: ["A. it involves children.", "B. it is outdoors.", "C. it sounds like fun."]},
              {q: 22, t: "Which aspect of safety does Dr Green emphasise most?", opts: ["A. ensuring children stay in the stadium", "B. checking the equipment children will use", "C. removing obstacles in changing rooms"]},
              {q: 23, t: "What does Dr Green say about the spectators?", opts: ["A. They can be hard to manage.", "B. They make useful volunteers.", "C. They shouldn't take photographs."]},
              {q: 24, t: "What has affected the schedule in the past?", opts: ["A. bad weather", "B. an injury", "C. extra time"]}
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
              <div className="ins-body">What do Holly and her tutor agree is an important aspect of each skill? Choose <strong>A-H</strong>.</div>
            </div>
            <div className="matching-container">
                <div className="options-grid">
                    {["A. Flexible", "B. Detail-focused", "C. Smart appearance", "D. Hiding emotions", "E. Relying on experts", "F. Trusting own views", "G. One thing at a time", "H. Thinking of future"].map(opt => <div key={opt} className="opt-label">{opt}</div>)}
                </div>
                {[
                  {q: 25, l: "Communication"}, {q: 26, l: "Organisation"}, {q: 27, l: "Time management"},
                  {q: 28, l: "Creativity"}, {q: 29, l: "Leadership"}, {q: 30, l: "Networking"}
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
            <h2 className="section-title">Bird Migration Theory</h2>
            <div className="notes-container">
                <h3>Hibernation theory</h3>
                <ul>
                    <li>It was believed that birds hibernated underwater or buried themselves in <strong>31.</strong> <input type="text" className="blank-input" value={getVal(31)} onChange={(e)=>handleInputChange(31, e.target.value)} />.</li>
                    <li>Disproved by experiments on caged birds.</li>
                </ul>
                <h3>Transmutation theory</h3>
                <ul>
                    <li>Aristotle believed redstarts experience the loss of <strong>32.</strong> <input type="text" className="blank-input" value={getVal(32)} onChange={(e)=>handleInputChange(32, e.target.value)} /> and turned into robins.</li>
                    <li>Assumptions were logical because the two species had a similar <strong>33.</strong> <input type="text" className="blank-input" value={getVal(33)} onChange={(e)=>handleInputChange(33, e.target.value)} />.</li>
                </ul>
                <h3>17th century & Developments</h3>
                <ul>
                    <li>Charles Morton popularised the idea that birds fly to the <strong>34.</strong> <input type="text" className="blank-input" value={getVal(34)} onChange={(e)=>handleInputChange(34, e.target.value)} /> in winter.</li>
                    <li>In 1822, a stork was killed in Germany with an African spear in its <strong>35.</strong> <input type="text" className="blank-input" value={getVal(35)} onChange={(e)=>handleInputChange(35, e.target.value)} />.</li>
                    <li>Previously there had been no <strong>36.</strong> <input type="text" className="blank-input" value={getVal(36)} onChange={(e)=>handleInputChange(36, e.target.value)} /> that storks migrate to Africa.</li>
                    <li>Little known about <strong>37.</strong> <input type="text" className="blank-input" value={getVal(37)} onChange={(e)=>handleInputChange(37, e.target.value)} /> until ringing established.</li>
                    <li>Thought large birds carried small birds across huge <strong>38.</strong> <input type="text" className="blank-input" value={getVal(38)} onChange={(e)=>handleInputChange(38, e.target.value)} />.</li>
                    <li>Ringing depended on the '<strong>39.</strong> <input type="text" className="blank-input" value={getVal(39)} onChange={(e)=>handleInputChange(39, e.target.value)} />' of dead birds.</li>
                    <li>In 1931, the first <strong>40.</strong> <input type="text" className="blank-input" value={getVal(40)} onChange={(e)=>handleInputChange(40, e.target.value)} /> to show migration was printed.</li>
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

export default Listening27;
