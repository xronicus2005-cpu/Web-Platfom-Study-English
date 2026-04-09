import { useState, useEffect, useRef } from "react";
import "../../../styles/listening-style/Listening10.css"; 
import AnswersPage from "../../answer-page/AnswerPage";

// --- ASSET IMPORTS ---
import fullAudio from "../../../assets/audio/E13T2.mp3"; 
 

const Listening10 = () => {
  const [activePart, setActivePart] = useState(1);
  const [time, setTime] = useState(1800); 
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [highlightPopup, setHighlightPopup] = useState({ visible: false, x: 0, y: 0, range: null });
  
  const audioRef = useRef(null);
  const title = "E13T2";

  const correctAnswers = {
    1: "races", 2: "insurance", 3: "Jerriz", 4: "25", 5: "stadium", 6: "park", 7: "coffee", 8: "leader", 9: "route", 10: "lights",
    11: "C", 12: "B", 13: "C", 14: "B", 15: "B", 16: "A", 17: ["C", "E"], 18: ["C", "E"], 19: ["B", "D"], 20: ["B", "D"],
    21: "B", 22: "A", 23: "C", 24: "C", 25: "A", 26: "A", 27: "C", 28: "D", 29: "G", 30: "B",
    31: "location", 32: "world", 33: "personal", 34: "attention", 35: "name", 36: "network", 37: "frequency", 38: "colour", 39: "brain", 40: "self"
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

  // Logic for Multi-select (17-20)
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
            <h2 className="section-title">South City Cycling Club</h2>
            <div className="notes-container">
              <p>Example: Name of club secretary: Jim</p>
              <h3>Membership</h3>
              <ul>
                <li>Full membership costs $260; this covers cycling and <strong>1.</strong> <input type="text" className="blank-input" value={getVal(1)} onChange={(e)=>handleInputChange(1, e.target.value)} /> all over Australia</li>
                <li>Cost of membership includes the club fee and <strong>2.</strong> <input type="text" className="blank-input" value={getVal(2)} onChange={(e)=>handleInputChange(2, e.target.value)} /></li>
                <li>The club kit is made by a company called <strong>3.</strong> <input type="text" className="blank-input" value={getVal(3)} onChange={(e)=>handleInputChange(3, e.target.value)} /></li>
              </ul>
              <h3>Training rides</h3>
              <ul>
                <li>Level B: speed about <strong>4.</strong> <input type="text" className="blank-input" value={getVal(4)} onChange={(e)=>handleInputChange(4, e.target.value)} /> kph</li>
              </ul>
              <h3>Weekly sessions</h3>
              <ul>
                <li>Tuesdays at 5.30 am, meet at the <strong>5.</strong> <input type="text" className="blank-input" value={getVal(5)} onChange={(e)=>handleInputChange(5, e.target.value)} /></li>
                <li>Thursdays at 5.30 am, meet at the entrance to the <strong>6.</strong> <input type="text" className="blank-input" value={getVal(6)} onChange={(e)=>handleInputChange(6, e.target.value)} /></li>
              </ul>
              <h3>Further information</h3>
              <ul>
                <li>Members often have <strong>7.</strong> <input type="text" className="blank-input" value={getVal(7)} onChange={(e)=>handleInputChange(7, e.target.value)} /> together afterwards</li>
                <li>There is not always a <strong>8.</strong> <input type="text" className="blank-input" value={getVal(8)} onChange={(e)=>handleInputChange(8, e.target.value)} /> with the group on these rides</li>
                <li>Check and print the <strong>9.</strong> <input type="text" className="blank-input" value={getVal(9)} onChange={(e)=>handleInputChange(9, e.target.value)} /> on the website beforehand</li>
                <li>Bikes must have <strong>10.</strong> <input type="text" className="blank-input" value={getVal(10)} onChange={(e)=>handleInputChange(10, e.target.value)} /></li>
              </ul>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="test-section">
            <div className="instructions-box">
              <div className="ins-header">Questions 11-16</div>
              <div className="ins-body">Choose the correct letter, <strong>A, B or C</strong>.</div>
            </div>
            {[
              {q: 11, t: "How much time for volunteering does the company allow per employee?", opts: ["A. two hours per week", "B. one day per month", "C. 8 hours per year"]},
              {q: 12, t: "In feedback almost all employees said that volunteering improved their", opts: ["A. chances of promotion.", "B. job satisfaction.", "C. relationships with colleagues."]},
              {q: 13, t: "Last year some staff helped unemployed people with their", opts: ["A. literacy skills.", "B. job applications.", "C. communication skills."]},
              {q: 14, t: "This year the company will start a new volunteering project with a local", opts: ["A. school.", "B. park.", "C. charity."]},
              {q: 15, t: "Where will the Digital Inclusion Day be held?", opts: ["A. at the company's training facility", "B. at a college", "C. in a community centre"]},
              {q: 16, t: "What should staff do if they want to take part in the Digital Inclusion Day?", opts: ["A. fill in a form", "B. attend a training workshop", "C. get permission from their manager"]}
            ].map(item => (
              <div key={item.q} className="mcq-item">
                <p>{item.q}. {item.t}</p>
                {item.opts.map(o => (
                  <label key={o}><input type="radio" name={`q${item.q}`} checked={getVal(item.q) === o[0]} onChange={()=>handleInputChange(item.q, o[0])} /> {o}</label>
                ))}
              </div>
            ))}
            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 17-20</div>
              <div className="ins-body">Choose <strong>TWO</strong> letters, A-E.</div>
            </div>
            <div className="mcq-item">
                <p>17-18. Which TWO things are mentioned about the participants on the last Digital Inclusion Day?</p>
                {['A. They were all over 70.', 'B. They never used their computer.', 'C. Their phones were mostly old-fashioned.', 'D. They only used their phones for making calls.', 'E. They initially showed little interest.'].map(opt => (
                    <label key={opt}><input type="checkbox" checked={isSelected(17, 18, opt[0])} onChange={()=>handleMultiSelect(17, 18, opt[0])} /> {opt}</label>
                ))}
            </div>
            <div className="mcq-item">
                <p>19-20. Which TWO activities on the last Digital Inclusion Day did participants describe as useful?</p>
                {['A. learning to use tablets', 'B. communicating with family', 'C. shopping online', 'D. playing online games', 'E. sending emails'].map(opt => (
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
              <div className="ins-body">Choose the correct letter, <strong>A, B or C</strong>.</div>
            </div>
            {[
              {q: 21, t: "Russ says that his difficulty in planning the presentation is due to", opts: ["A. his lack of knowledge.", "B. uncertainty about goals.", "C. short preparation time."]},
              {q: 22, t: "Russ and his tutor agree that his approach in the presentation will be", opts: ["A. to concentrate on one field.", "B. follow chronological development.", "C. show range of applications."]},
              {q: 23, t: "In connection with slides, the tutor advises Russ to", opts: ["A. talk about things he has slides for.", "B. look for slides for his points.", "C. consider omitting slides."]},
              {q: 24, t: "They both agree that the best way for Russ to start is", opts: ["A. encourage audience talk.", "B. explain intentions.", "C. provide an example."]},
              {q: 25, t: "What does the tutor advise Russ to do next?", opts: ["A. summarise the main point", "B. read existing notes", "C. list topics to cover"]}
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
              <div className="ins-body">Match the comments <strong>A-G</strong> to aspects of previous presentation.</div>
            </div>
            <div className="matching-container">
                <div className="options-grid">
                    {["A. lacked a conclusion", "B. useful in the future", "C. not enough", "D. sometimes distracting", "E. showed originality", "F. covered a wide range", "G. not too technical"].map(opt => <div key={opt} className="opt-label">{opt}</div>)}
                </div>
                {[
                  {q: 26, l: "structure"}, {q: 27, l: "eye contact"}, {q: 28, l: "body language"}, {q: 29, l: "choice of words"}, {q: 30, l: "handouts"}
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
            <h2 className="section-title">Episodic memory</h2>
            <div className="notes-container">
              <p>Recall details, e.g. the time and <strong>31.</strong> <input type="text" className="blank-input" value={getVal(31)} onChange={(e)=>handleInputChange(31, e.target.value)} /> of events.</p>
              <p>Different to semantic memory - remembering general info about the <strong>32.</strong> <input type="text" className="blank-input" value={getVal(32)} onChange={(e)=>handleInputChange(32, e.target.value)} />, which does not involve recalling <strong>33.</strong> <input type="text" className="blank-input" value={getVal(33)} onChange={(e)=>handleInputChange(33, e.target.value)} /> info.</p>
              <h3>Encoding</h3>
              <ul>
                <li>The more <strong>34.</strong> <input type="text" className="blank-input" value={getVal(34)} onChange={(e)=>handleInputChange(34, e.target.value)} /> given to an event, the better it is encoded.</li>
                <li>To remember a <strong>35.</strong> <input type="text" className="blank-input" value={getVal(35)} onChange={(e)=>handleInputChange(35, e.target.value)} />, use a strategy.</li>
              </ul>
              <h3>Consolidation</h3>
              <ul>
                <li>Best when added to a <strong>36.</strong> <input type="text" className="blank-input" value={getVal(36)} onChange={(e)=>handleInputChange(36, e.target.value)} /> of related info.</li>
                <li>The <strong>37.</strong> <input type="text" className="blank-input" value={getVal(37)} onChange={(e)=>handleInputChange(37, e.target.value)} /> of retrieval affects memory strength.</li>
              </ul>
              <h3>Retrieval</h3>
              <ul>
                <li>Retrieval depends on prompt, e.g. the <strong>38.</strong> <input type="text" className="blank-input" value={getVal(38)} onChange={(e)=>handleInputChange(38, e.target.value)} /> of an object.</li>
              </ul>
              <h3>Episodic memory impairments</h3>
              <ul>
                <li>Games stimulating the <strong>39.</strong> <input type="text" className="blank-input" value={getVal(39)} onChange={(e)=>handleInputChange(39, e.target.value)} /> help schizophrenia patients.</li>
                <li>Autistic children difficulty due to absent concept of the <strong>40.</strong> <input type="text" className="blank-input" value={getVal(40)} onChange={(e)=>handleInputChange(40, e.target.value)} />.</li>
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

export default Listening10;