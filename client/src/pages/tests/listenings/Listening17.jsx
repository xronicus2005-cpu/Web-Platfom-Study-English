import { useState, useEffect, useRef } from "react";
import "../../../styles/listening-style/Listening17.css";
import AnswersPage from "../../answer-page/AnswerPage";

// --- ASSET IMPORTS ---
import fullAudio from "../../../assets/audio/E15T1.mp3";


const Listening17 = () => {
  const [activePart, setActivePart] = useState(1);
  const [time, setTime] = useState(1800);
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [highlightPopup, setHighlightPopup] = useState({ visible: false, x: 0, y: 0, range: null });

  const audioRef = useRef(null);
  const title = "E15T1";

  const correctAnswers = {
    1: "Jamieson", 2: "afternoon", 3: "communication", 4: "week", 5: "10", 6: "suit", 7: "passport", 8: "personality", 9: "feedback", 10: "time",
    11: "A", 12: "B", 13: "A", 14: "C", 15: "river", 16: "1422", 17: "top", 18: "pass", 19: "steam", 20: "capital",
    21: "G", 22: "F", 23: "A", 24: "E", 25: "B", 26: "C", 27: "C", 28: "A", 29: ["B", "D"], 30: ["B", "D"],
    31: "shelter", 32: "oil", 33: "roads", 34: "insects", 35: "grass", 36: "water", 37: "soil", 38: "dry", 39: "simple", 40: "nest"
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
            <h2 className="section-title">Bankside Recruitment Agency</h2>
            <div className="notes-container">
              <p>Address of agency: 497 Eastside, Docklands</p>
              <div className="form-row"><span className="label">Name of agent: Becky</span> <strong>1.</strong> <input type="text" className="blank-input" value={getVal(1)} onChange={(e)=>handleInputChange(1, e.target.value)} /></div>
              <p>Phone number: 07866 510333</p>
              <div className="form-row"><span className="label">Best to call her in the:</span> <strong>2.</strong> <input type="text" className="blank-input" value={getVal(2)} onChange={(e)=>handleInputChange(2, e.target.value)} /></div>

              <h3>Typical jobs</h3>
              <ul>
                <li>Clerical and admin roles, mainly in the finance industry</li>
                <li>Must have good <strong>3.</strong> <input type="text" className="blank-input" value={getVal(3)} onChange={(e)=>handleInputChange(3, e.target.value)} /> skills</li>
                <li>Jobs are usually for at least one <strong>4.</strong> <input type="text" className="blank-input" value={getVal(4)} onChange={(e)=>handleInputChange(4, e.target.value)} /></li>
                <li>Pay is usually £ <strong>5.</strong> <input type="text" className="blank-input" value={getVal(5)} onChange={(e)=>handleInputChange(5, e.target.value)} /> per hour</li>
              </ul>

              <h3>Registration process</h3>
              <ul>
                <li>Wear a <strong>6.</strong> <input type="text" className="blank-input" value={getVal(6)} onChange={(e)=>handleInputChange(6, e.target.value)} /> to the interview</li>
                <li>Must bring your <strong>7.</strong> <input type="text" className="blank-input" value={getVal(7)} onChange={(e)=>handleInputChange(7, e.target.value)} /> to the interview</li>
                <li>They will ask questions about each applicant's <strong>8.</strong> <input type="text" className="blank-input" value={getVal(8)} onChange={(e)=>handleInputChange(8, e.target.value)} /></li>
              </ul>

              <h3>Advantages of using an agency</h3>
              <ul>
                <li>The <strong>9.</strong> <input type="text" className="blank-input" value={getVal(9)} onChange={(e)=>handleInputChange(9, e.target.value)} /> you receive at interview will benefit you</li>
                <li>Will get access to vacancies which are not advertised</li>
                <li>Less <strong>10.</strong> <input type="text" className="blank-input" value={getVal(10)} onChange={(e)=>handleInputChange(10, e.target.value)} /> is involved in applying for jobs</li>
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
            <h2 className="section-title">Matthews Island Holidays</h2>
            {[
              {q: 11, t: "According to the speaker, the company", opts: ["A. has been in business for longer than most of its competitors.", "B. arranges holidays to more destinations than its competitors.", "C. has more customers than its competitors."]},
              {q: 12, t: "Where can customers meet the tour manager before travelling to the Isle of Man?", opts: ["A. Liverpool", "B. Heysham", "C. Luton"]},
              {q: 13, t: "How many lunches are included in the price of the holiday?", opts: ["A. three", "B. four", "C. five"]},
              {q: 14, t: "Customers have to pay extra for", opts: ["A. guaranteeing themselves a larger room.", "B. booking at short notice.", "C. transferring to another date."]}
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
              <div className="ins-body">Complete the table below. Write <strong>ONE WORD AND/OR A NUMBER</strong> for each answer.</div>
            </div>
            <h2 className="section-title">Timetable for Isle of Man holiday</h2>
            <table className="listening-table">
                <thead>
                    <tr><th>Day</th><th>Activity</th><th>Notes</th></tr>
                </thead>
                <tbody>
                    <tr><td>Day 1</td><td>Arrive</td><td>Introduction by manager. Hotel dining room has view of the <strong>15.</strong> <input type="text" className="blank-input" value={getVal(15)} onChange={(e)=>handleInputChange(15, e.target.value)} /></td></tr>
                    <tr><td>Day 2</td><td>Tynwald Exhibition and Peel</td><td>Tynwald may have been founded in <strong>16.</strong> <input type="text" className="blank-input" value={getVal(16)} onChange={(e)=>handleInputChange(16, e.target.value)} /> not 979.</td></tr>
                    <tr><td>Day 3</td><td>Trip to Snaefell</td><td>Travel along promenade in a tram; train to Laxey; train to the <strong>17.</strong> <input type="text" className="blank-input" value={getVal(17)} onChange={(e)=>handleInputChange(17, e.target.value)} /> of Snaefell</td></tr>
                    <tr><td>Day 4</td><td>Free day</td><td>Company provides a <strong>18.</strong> <input type="text" className="blank-input" value={getVal(18)} onChange={(e)=>handleInputChange(18, e.target.value)} /> for local transport and heritage sites.</td></tr>
                    <tr><td>Day 5</td><td>Take the <strong>19.</strong> <input type="text" className="blank-input" value={getVal(19)} onChange={(e)=>handleInputChange(19, e.target.value)} /> railway train from Douglas to Port Erin</td><td>Free time, then coach to Castletown — former <strong>20.</strong> <input type="text" className="blank-input" value={getVal(20)} onChange={(e)=>handleInputChange(20, e.target.value)} /> has old castle.</td></tr>
                </tbody>
            </table>
          </div>
        );
      case 3:
        return (
          <div className="test-section">
            <div className="instructions-box">
              <div className="ins-header">Questions 21-26</div>
              <div className="ins-body">What did findings of previous research claim about child personality? Choose <strong>A-H</strong>.</div>
            </div>
            <div className="matching-container">
                <div className="options-grid">
                    {["A. outgoing", "B. selfish", "C. independent", "D. attention-seeking", "E. introverted", "F. co-operative", "G. caring", "H. competitive"].map(opt => <div key={opt} className="opt-label">{opt}</div>)}
                </div>
                {[
                  {q: 21, l: "the eldest child"}, {q: 22, l: "a middle child"}, {q: 23, l: "the youngest child"},
                  {q: 24, l: "a twin"}, {q: 25, l: "an only child"}, {q: 26, l: "a child with much older siblings"}
                ].map(item => (
                  <div key={item.q} className="map-q-row">
                    <span>{item.q}. {item.l}</span>
                    <input type="text" className="blank-input small" maxLength="1" value={getVal(item.q)} onChange={(e)=>handleInputChange(item.q, e.target.value.toUpperCase())} />
                  </div>
                ))}
            </div>

            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 27-28</div>
              <div className="ins-body">Choose the correct letter, <strong>A, B or C</strong>.</div>
            </div>
            {[
              {q: 27, t: "What do the speakers say about the evidence relating to birth order and academic success?", opts: ["A. Conflict about oldest performing best in IQ tests.", "B. Birth order has less influence than socio-economic status.", "C. Some studies neglected important factors like family size."]},
              {q: 28, t: "What does Ruth think is surprising about oldest children's academic performance?", opts: ["A. It is thanks to their roles as teachers for younger siblings.", "B. Advantages only lead to a slightly higher level of achievement.", "C. Extra parental attention makes little difference."]}
            ].map(item => (
              <div key={item.q} className="mcq-item">
                <p>{item.q}. {item.t}</p>
                {item.opts.map(o => (
                  <label key={o}><input type="radio" name={`q${item.q}`} checked={getVal(item.q) === o[0]} onChange={()=>handleInputChange(item.q, o[0])} /> {o}</label>
                ))}
              </div>
            ))}

            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 29-30</div>
              <div className="ins-body">Choose <strong>TWO</strong> letters, A-E.</div>
            </div>
            <div className="mcq-item">
                <p>29-30. Which TWO experiences of sibling rivalry were valuable for them?</p>
                {['A. learning to share', 'B. learning to stand up for oneself', 'C. learning to be a good loser', 'D. learning to be tolerant', 'E. learning to say sorry'].map(opt => (
                    <label key={opt}><input type="checkbox" checked={isSelected(29, 30, opt[0])} onChange={()=>handleMultiSelect(29, 30, opt[0])} /> {opt}</label>
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
            <h2 className="section-title">The Eucalyptus Tree in Australia</h2>
            <div className="notes-container">
                <h3>Importance</h3>
                <ul>
                    <li>provides <strong>31.</strong> <input type="text" className="blank-input" value={getVal(31)} onChange={(e)=>handleInputChange(31, e.target.value)} /> and food</li>
                    <li>leaves provide <strong>32.</strong> <input type="text" className="blank-input" value={getVal(32)} onChange={(e)=>handleInputChange(32, e.target.value)} /> used as disinfectant</li>
                </ul>
                <h3>Reasons for present decline</h3>
                <p><strong>A) Diseases:</strong> 'Mundulla Yellows' caused by lime used for <strong>33.</strong> <input type="text" className="blank-input" value={getVal(33)} onChange={(e)=>handleInputChange(33, e.target.value)} />. 'Die-back' caused by <strong>34.</strong> <input type="text" className="blank-input" value={getVal(34)} onChange={(e)=>handleInputChange(34, e.target.value)} /> feeding on leaves.</p>
                <p><strong>B) Bushfires:</strong></p>
                <ul>
                    <li>High-frequency fires lead to <strong>35.</strong> <input type="text" className="blank-input" value={getVal(35)} onChange={(e)=>handleInputChange(35, e.target.value)} />.</li>
                    <li>Mid-frequency fires make more <strong>36.</strong> <input type="text" className="blank-input" value={getVal(36)} onChange={(e)=>handleInputChange(36, e.target.value)} /> available and maintain the <strong>37.</strong> <input type="text" className="blank-input" value={getVal(37)} onChange={(e)=>handleInputChange(37, e.target.value)} />.</li>
                    <li>Low-frequency fires result in ' <strong>38.</strong> <input type="text" className="blank-input" value={getVal(38)} onChange={(e)=>handleInputChange(38, e.target.value)} /> rainforest', which is a <strong>39.</strong> <input type="text" className="blank-input" value={getVal(39)} onChange={(e)=>handleInputChange(39, e.target.value)} /> ecosystem and ideal for the <strong>40.</strong> <input type="text" className="blank-input" value={getVal(40)} onChange={(e)=>handleInputChange(40, e.target.value)} /> of the bell-miner bird.</li>
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

export default Listening17;
