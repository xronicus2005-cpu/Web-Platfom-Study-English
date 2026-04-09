import { useState, useEffect, useRef } from "react";
import "../../../styles/listening-style/Listening6.css"; 
import AnswersPage from "../../answer-page/AnswerPage";

// --- ASSET IMPORTS ---
import fullAudio from "../../../assets/audio/E12T2.mp3"; 


const Listening6 = () => {
  const [activePart, setActivePart] = useState(1);
  const [time, setTime] = useState(1800); 
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [highlightPopup, setHighlightPopup] = useState({ visible: false, x: 0, y: 0, range: null });
  
  const audioRef = useRef(null);
  const title = "E12T2";

  const correctAnswers = {
    1: "2.45", 2: "band", 3: "play", 4: "scientist", 5: "river", 6: "grandparents", 7: "Handsworth", 8: "traditional", 9: "outdoor", 10: "logo",
    11: "B", 12: "C", 13: "A", 14: "B", 15: "C",
    16: "F", 17: "B", 18: "E", 19: "G", 20: "C",
    21: "C", 22: "B", 23: "C", 24: "A", 25: "C",
    26: "E", 27: "G", 28: "D", 29: "C", 30: "A",
    31: "bullying", 32: "superiority", 33: "personality", 34: "structural", 35: "absence", 36: "confidence", 37: "visions", 38: "democratic", 39: "respect", 40: "mediator"
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
            <h2 className="section-title">Events during Kenton Festival</h2>
            <div className="notes-container">
                <p>Example: Start date: May</p>
                <h4>Opening ceremony (first day)</h4>
                <ul>
                    <li>In town centre, starting at <strong>1.</strong> <input type="text" className="blank-input" value={getVal(1)} onChange={(e)=>handleInputChange(1, e.target.value)} /></li>
                    <li>A <strong>2.</strong> <input type="text" className="blank-input" value={getVal(2)} onChange={(e)=>handleInputChange(2, e.target.value)} /> will perform.</li>
                    <li>Performance of a <strong>3.</strong> <input type="text" className="blank-input" value={getVal(3)} onChange={(e)=>handleInputChange(3, e.target.value)} /> about Helen Tungate (a <strong>4.</strong> <input type="text" className="blank-input" value={getVal(4)} onChange={(e)=>handleInputChange(4, e.target.value)} />).</li>
                    <li>Evening fireworks display situated across the <strong>5.</strong> <input type="text" className="blank-input" value={getVal(5)} onChange={(e)=>handleInputChange(5, e.target.value)} />.</li>
                </ul>
                <h4>Other events</h4>
                <ul>
                    <li>Videos about relationships that children have with their <strong>6.</strong> <input type="text" className="blank-input" value={getVal(6)} onChange={(e)=>handleInputChange(6, e.target.value)} /></li>
                    <li>Venue: <strong>7.</strong> <input type="text" className="blank-input" value={getVal(7)} onChange={(e)=>handleInputChange(7, e.target.value)} /> House</li>
                    <li>Performance of <strong>8.</strong> <input type="text" className="blank-input" value={getVal(8)} onChange={(e)=>handleInputChange(8, e.target.value)} /> dances.</li>
                    <li>Venue: the <strong>9.</strong> <input type="text" className="blank-input" value={getVal(9)} onChange={(e)=>handleInputChange(9, e.target.value)} /> market.</li>
                    <li>Shops which have the festival <strong>10.</strong> <input type="text" className="blank-input" value={getVal(10)} onChange={(e)=>handleInputChange(10, e.target.value)} /> in their windows.</li>
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
            {[
              {q: 11, t: "When the group meet at the airport they will have", opts: ["A. breakfast.", "B. coffee.", "C. lunch."]},
              {q: 12, t: "The group will be met at Munich Airport by", opts: ["A. an employee at the National Theatre.", "B. a theatre manager.", "C. a tour operator."]},
              {q: 13, t: "How much will they pay per night for a double room?", opts: ["A. 110 euros", "B. 120 euros", "C. 150 euros"]},
              {q: 14, t: "What type of restaurant will they go to on Tuesday evening?", opts: ["A. an Italian restaurant", "B. a Lebanese restaurant", "C. a typical restaurant of the region"]},
              {q: 15, t: "Who will they meet on Wednesday afternoon?", opts: ["A. an actor", "B. a playwright", "C. a theatre director"]}
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
              <div className="ins-body">Comments on plays. Choose correct letter, <strong>A-G</strong>.</div>
            </div>
            <div className="matching-container">
              <div className="options-grid">
                {["A. Playwright present", "B. Anniversary play", "C. Inside historic building", "D. Live music", "E. Outdoors", "F. First time performance", "G. Attended by officials"].map(opt => <div key={opt} className="opt-label">{opt}</div>)}
              </div>
              {[16,17,18,19,20].map(q => (
                <div key={q} className="map-q-row">
                  <span>{q}. {["Wednesday", "Thursday", "Friday", "Saturday", "Monday"][q-16]}</span>
                  <input type="text" className="blank-input small" maxLength="1" value={getVal(q)} onChange={(e)=>handleInputChange(q, e.target.value.toUpperCase())} />
                </div>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="test-section">
            <div className="instructions-box">
              <div className="ins-header">Questions 21-25</div>
              <div className="ins-body">Choose correct letter, <strong>A, B or C</strong>.</div>
            </div>
            {[
              {q: 21, t: "James chose Scandinavian Studies because as a child", opts: ["A. he went to Denmark.", "B. mother spoke Danish.", "C. Danish people visited his family."]},
              {q: 22, t: "When he graduates, James would like to", opts: ["A. take a postgraduate course.", "B. work in the media.", "C. become a translator."]},
              {q: 23, t: "Which course will end this term?", opts: ["A. Swedish cinema", "B. Danish television", "C. Scandinavian literature"]},
              {q: 24, t: "James's literature paper this term will be on", opts: ["A. 19th century playwrights.", "B. Icelandic sagas.", "C. modern novels."]},
              {q: 25, t: "Beth recommends the paper should be", opts: ["A. a historical overview.", "B. in-depth analysis of one writer.", "C. study of social background."]}
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
              <div className="ins-body">Complete the flowchart. Choose <strong>A-G</strong>.</div>
            </div>
            <div className="flowchart-container">
              <div className="flow-step">He'll read a <strong>26.</strong> <input type="text" className="blank-input small" maxLength="1" value={getVal(26)} onChange={(e)=>handleInputChange(26, e.target.value.toUpperCase())} /> and choose topic.</div>
              <div className="flow-arrow">↓</div>
              <div className="flow-step">He'll borrow a <strong>27.</strong> <input type="text" className="blank-input small" maxLength="1" value={getVal(27)} onChange={(e)=>handleInputChange(27, e.target.value.toUpperCase())} /> from Beth.</div>
              <div className="flow-arrow">↓</div>
              <div className="flow-step">He'll plan the <strong>28.</strong> <input type="text" className="blank-input small" maxLength="1" value={getVal(28)} onChange={(e)=>handleInputChange(28, e.target.value.toUpperCase())} /> of the paper.</div>
              <div className="flow-arrow">↓</div>
              <div className="flow-step">He'll read sources and write <strong>29.</strong> <input type="text" className="blank-input small" maxLength="1" value={getVal(29)} onChange={(e)=>handleInputChange(29, e.target.value.toUpperCase())} />.</div>
              <div className="flow-arrow">↓</div>
              <div className="flow-step">He'll write the paper using <strong>30.</strong> <input type="text" className="blank-input small" maxLength="1" value={getVal(30)} onChange={(e)=>handleInputChange(30, e.target.value.toUpperCase())} />.</div>
              <div className="options-grid" style={{marginTop: '20px'}}>
                {["A. bullet points", "B. film", "C. notes", "D. structure", "E. student paper", "F. textbook", "G. documentary"].map(opt => <div key={opt} className="opt-label">{opt}</div>)}
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="test-section">
            <div className="instructions-box">
              <div className="ins-header">Questions 31-40</div>
              <div className="ins-body">Write <strong>ONE WORD ONLY</strong> for each answer.</div>
            </div>
            <h2 className="section-title">Conflict at Work</h2>
            <div className="notes-container">
                <ul>
                    <li>Conflict mostly consists of behaviour in the category of <strong>31.</strong> <input type="text" className="blank-input" value={getVal(31)} onChange={(e)=>handleInputChange(31, e.target.value)} /></li>
                    <li>People wanting to prove their <strong>32.</strong> <input type="text" className="blank-input" value={getVal(32)} onChange={(e)=>handleInputChange(32, e.target.value)} /></li>
                    <li>Differences in <strong>33.</strong> <input type="text" className="blank-input" value={getVal(33)} onChange={(e)=>handleInputChange(33, e.target.value)} /> between people.</li>
                    <li>'<strong>34.</strong>' conflicts: concerned about own team than company.</li>
                    <li>Stress can cause <strong>35.</strong> <input type="text" className="blank-input" value={getVal(35)} onChange={(e)=>handleInputChange(35, e.target.value)} /> for months.</li>
                </ul>
                <h4>Chief Executives (CEOs)</h4>
                <ul>
                    <li>Many have both <strong>36.</strong> <input type="text" className="blank-input" value={getVal(36)} onChange={(e)=>handleInputChange(36, e.target.value)} /> and anxiety.</li>
                    <li>Conflict between people who have different <strong>37.</strong> <input type="text" className="blank-input" value={getVal(37)} onChange={(e)=>handleInputChange(37, e.target.value)} /></li>
                    <li>A structure that is more <strong>38.</strong> <input type="text" className="blank-input" value={getVal(38)} onChange={(e)=>handleInputChange(38, e.target.value)} /> may create uncertainty.</li>
                    <li>Bosses need to gain <strong>39.</strong> <input type="text" className="blank-input" value={getVal(39)} onChange={(e)=>handleInputChange(39, e.target.value)} /></li>
                    <li>Outside person given role of <strong>40.</strong> <input type="text" className="blank-input" value={getVal(40)} onChange={(e)=>handleInputChange(40, e.target.value)} />.</li>
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

export default Listening6;