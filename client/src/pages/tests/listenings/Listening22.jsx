import { useState, useEffect, useRef } from "react";
import "../../../styles/listening-style/Listening22.css";
import AnswersPage from "../../answer-page/AnswerPage";

// --- ASSET IMPORTS ---
import fullAudio from "../../../assets/audio/E16T2.mp3";


const Listening22 = () => {
  const [activePart, setActivePart] = useState(1);
  const [time, setTime] = useState(1800);
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [highlightPopup, setHighlightPopup] = useState({ visible: false, x: 0, y: 0, range: null });

  const audioRef = useRef(null);
  const title = "E16T2";

  const correctAnswers = {
    1: "frame", 2: "195", 3: "payment", 4: "Grandparents", 5: "color", 6: "hand", 7: "background", 8: "focus", 9: "10", 10: "plastic",
    11: "C", 12: "B", 13: "A", 14: "A", 15: "C", 16: "D", 17: "A", 18: "B", 19: ["A", "B"], 20: ["A", "B"],
    21: "B", 22: "A", 23: "A", 24: "C", 25: "history", 26: "paper", 27: "humans", 28: "stress", 29: "graph", 30: "evaluate",
    31: "creativity", 32: "therapy", 33: "fitness", 34: "balance", 35: "brain", 36: "motivation", 37: "isolation", 38: "calories", 39: "obesity", 40: "habit"
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
            <h2 className="section-title">Copying photos to digital format</h2>
            <div className="notes-container">
                <p>Name of company: Picturerep</p>
                <h3>Requirements</h3>
                <ul>
                    <li>Maximum size of photos is 30 cm, minimum size 4 cm.</li>
                    <li>Photos must not be in a <strong>1.</strong> <input type="text" className="blank-input" value={getVal(1)} onChange={(e)=>handleInputChange(1, e.target.value)} /> or an album.</li>
                </ul>
                <h3>Cost</h3>
                <ul>
                    <li>The cost for 360 photos is £ <strong>2.</strong> <input type="text" className="blank-input" value={getVal(2)} onChange={(e)=>handleInputChange(2, e.target.value)} /> (including one disk).</li>
                    <li>Before the completed order is sent, <strong>3.</strong> <input type="text" className="blank-input" value={getVal(3)} onChange={(e)=>handleInputChange(3, e.target.value)} /> is required.</li>
                </ul>
                <h3>Services included in the price</h3>
                <ul>
                    <li>Photos can be placed in a folder, e.g. with the name <strong>4.</strong> <input type="text" className="blank-input" value={getVal(4)} onChange={(e)=>handleInputChange(4, e.target.value)} />.</li>
                    <li>The <strong>5.</strong> <input type="text" className="blank-input" value={getVal(5)} onChange={(e)=>handleInputChange(5, e.target.value)} /> and contrast can be improved if necessary.</li>
                    <li>Photos which are very fragile will be scanned by <strong>6.</strong> <input type="text" className="blank-input" value={getVal(6)} onChange={(e)=>handleInputChange(6, e.target.value)} />.</li>
                </ul>
                <h3>Special restore service (costs extra)</h3>
                <ul>
                    <li>It may be possible to remove an object from a photo, or change the <strong>7.</strong> <input type="text" className="blank-input" value={getVal(7)} onChange={(e)=>handleInputChange(7, e.target.value)} />.</li>
                    <li>A photo which is not correctly in <strong>8.</strong> <input type="text" className="blank-input" value={getVal(8)} onChange={(e)=>handleInputChange(8, e.target.value)} /> cannot be fixed.</li>
                </ul>
                <h3>Other information</h3>
                <ul>
                    <li>Orders are completed within <strong>9.</strong> <input type="text" className="blank-input" value={getVal(9)} onChange={(e)=>handleInputChange(9, e.target.value)} />.</li>
                    <li>Send the photos in a box (not <strong>10.</strong> <input type="text" className="blank-input" value={getVal(10)} onChange={(e)=>handleInputChange(10, e.target.value)} />).</li>
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
            <h2 className="section-title">Dartfield House school</h2>
            {[
              {q: 11, t: "Dartfield House school used to be", opts: ["A. a tourist information centre.", "B. a private home.", "C. a local council building."]},
              {q: 12, t: "What is planned with regard to the lower school?", opts: ["A. All buildings on the main site will be improved.", "B. The lower school site will be used for new homes.", "C. Additional school buildings will be constructed on the lower school site."]},
              {q: 13, t: "The catering has been changed because of", opts: ["A. long queuing times.", "B. changes to the school timetable.", "C. dissatisfaction with the menus."]},
              {q: 14, t: "Parents are asked to", opts: ["A. help their children to decide in advance which serving point to use.", "B. make sure their children have enough money for food.", "C. advise their children on healthy food to eat."]},
              {q: 15, t: "What does the speaker say about the existing canteen?", opts: ["A. Food will still be served there.", "B. Only staff will have access to it.", "C. Pupils can take their food into it."]}
            ].map(item => (
              <div key={item.q} className="mcq-item">
                <p>{item.q}. {item.t}</p>
                {item.opts.map(o => (
                  <label key={o}><input type="radio" name={`q${item.q}`} checked={getVal(item.q) === o[0]} onChange={()=>handleInputChange(item.q, o[0])} /> {o}</label>
                ))}
              </div>
            ))}

            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 16-18</div>
              <div className="ins-body">What comment does the speaker make about serving points? Choose <strong>A-D</strong>.</div>
            </div>
            <div className="matching-container">
                <div className="options-grid">
                    {["A. pupils help plan menus", "B. only vegetarian food", "C. different food every week", "D. daily change in menu"].map(opt => <div key={opt} className="opt-label">{opt}</div>)}
                </div>
                {[
                  {q: 16, l: "World Adventures"}, {q: 17, l: "Street Life"}, {q: 18, l: "Speedy Italian"}
                ].map(item => (
                  <div key={item.q} className="map-q-row">
                    <span>{item.q}. {item.l}</span>
                    <input type="text" className="blank-input small" maxLength="1" value={getVal(item.q)} onChange={(e)=>handleInputChange(item.q, e.target.value.toUpperCase())} />
                  </div>
                ))}
            </div>

            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 19-20</div>
              <div className="ins-body">Which <strong>TWO</strong> optional after-school lessons are new? Choose <strong>A-E</strong>.</div>
            </div>
            <div className="mcq-item">
                {['A. swimming', 'B. piano', 'C. acting', 'D. cycling', 'E. theatre sound and lighting'].map(opt => (
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
            <h2 className="section-title">Assignment on sleep and dreams</h2>
            {[
              {q: 21, t: "Luke read that one reason why we often forget dreams is that", opts: ["A. our memories cannot cope with too much information.", "B. we might otherwise be confused about what is real.", "C. we do not think they are important."]},
              {q: 22, t: "What do Luke and Susie agree about dreams predicting the future?", opts: ["A. It may just be due to chance.", "B. It only happens with certain types of event.", "C. It happens more often than some people think."]},
              {q: 23, t: "Susie says that a study on pre-school children having a short nap in the day", opts: ["A. had controversial results.", "B. used faulty research methodology.", "C. failed to reach any clear conclusions."]},
              {q: 24, t: "In their last assignment, both students had problems with", opts: ["A. statistical analysis.", "B. making an action plan.", "C. self-assessment."]}
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
              <div className="ins-body">Complete the flowchart below. Write <strong>ONE WORD ONLY</strong>.</div>
            </div>
            <div className="flowchart-container">
                <p>Decide on sample: Twelve students from the <strong>25.</strong> <input type="text" className="blank-input" value={getVal(25)} onChange={(e)=>handleInputChange(25, e.target.value)} /> department</p>
                <p>↓</p>
                <p>Decide on procedure: Answers on <strong>26.</strong> <input type="text" className="blank-input" value={getVal(26)} onChange={(e)=>handleInputChange(26, e.target.value)} /></p>
                <p>↓</p>
                <p>Check ethical guidelines for working with <strong>27.</strong> <input type="text" className="blank-input" value={getVal(27)} onChange={(e)=>handleInputChange(27, e.target.value)} /></p>
                <p>Ensure risk is assessed and <strong>28.</strong> <input type="text" className="blank-input" value={getVal(28)} onChange={(e)=>handleInputChange(28, e.target.value)} /> is kept to a minimum</p>
                <p>↓</p>
                <p>Calculate correlation and make a <strong>29.</strong> <input type="text" className="blank-input" value={getVal(29)} onChange={(e)=>handleInputChange(29, e.target.value)} /></p>
                <p>↓</p>
                <p><strong>30.</strong> <input type="text" className="blank-input" value={getVal(30)} onChange={(e)=>handleInputChange(30, e.target.value)} /> the research</p>
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
            <h2 className="section-title">Health benefits of dance</h2>
            <div className="notes-container">
                <p>Recent findings: An experiment on university students suggested that dance increases <strong>31.</strong> <input type="text" className="blank-input" value={getVal(31)} onChange={(e)=>handleInputChange(31, e.target.value)} />.</p>
                <p>For those with mental illness, dance could be used as a form of <strong>32.</strong> <input type="text" className="blank-input" value={getVal(32)} onChange={(e)=>handleInputChange(32, e.target.value)} />.</p>
                <h3>Benefits for older people</h3>
                <ul>
                    <li>Accessible for people with low levels of <strong>33.</strong> <input type="text" className="blank-input" value={getVal(33)} onChange={(e)=>handleInputChange(33, e.target.value)} />.</li>
                    <li>Better <strong>34.</strong> <input type="text" className="blank-input" value={getVal(34)} onChange={(e)=>handleInputChange(34, e.target.value)} /> reduces risk of accidents.</li>
                    <li>Improves <strong>35.</strong> <input type="text" className="blank-input" value={getVal(35)} onChange={(e)=>handleInputChange(35, e.target.value)} /> function by making it work faster.</li>
                    <li>Gives people more <strong>36.</strong> <input type="text" className="blank-input" value={getVal(36)} onChange={(e)=>handleInputChange(36, e.target.value)} /> to take exercise.</li>
                    <li>Can lessen the feeling of <strong>37.</strong> <input type="text" className="blank-input" value={getVal(37)} onChange={(e)=>handleInputChange(37, e.target.value)} />, common in older people.</li>
                </ul>
                <h3>Benefits of Zumba</h3>
                <ul>
                    <li>Uses up as many <strong>38.</strong> <input type="text" className="blank-input" value={getVal(38)} onChange={(e)=>handleInputChange(38, e.target.value)} /> as intense forms of exercise.</li>
                    <li>Women suffering from <strong>39.</strong> <input type="text" className="blank-input" value={getVal(39)} onChange={(e)=>handleInputChange(39, e.target.value)} /> benefited from doing Zumba.</li>
                    <li>Zumba became a <strong>40.</strong> <input type="text" className="blank-input" value={getVal(40)} onChange={(e)=>handleInputChange(40, e.target.value)} /> for the participants.</li>
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

export default Listening22;
