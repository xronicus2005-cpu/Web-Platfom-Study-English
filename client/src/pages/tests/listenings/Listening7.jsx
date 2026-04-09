import { useState, useEffect, useRef } from "react";
import "../../../styles/listening-style/Listening7.css"; 
import AnswersPage from "../../answer-page/AnswerPage";

// --- ASSET IMPORTS ---
import fullAudio from "../../../assets/audio/E12T3.mp3"; 

const Listening7 = () => {
  const [activePart, setActivePart] = useState(1);
  const [time, setTime] = useState(1800); 
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [highlightPopup, setHighlightPopup] = useState({ visible: false, x: 0, y: 0, range: null });
  
  const audioRef = useRef(null);
  const title = "E12T3";

  const correctAnswers = {
    1: "travel", 2: "history", 3: "study", 4: "teenagers", 5: "kitchen", 6: "crime", 7: "appointment", 8: "sugar", 9: "stamps", 10: "parking",
    11: ["D", "E"], 12: ["D", "E"],
    13: ["A", "C"], 14: ["A", "C"],
    15: "C", 16: "B", 17: "A",
    18: "stress", 19: "weight", 20: "families",
    21: "C", 22: "E", 23: "H", 24: "B", 25: "A", 26: "F",
    27: "A", 28: "C", 29: "B", 30: "B",
    31: "insects", 32: "behaviour", 33: "father", 34: "complex", 35: "reproduction", 36: "control", 37: "ducks", 38: "language", 39: "food", 40: "cost"
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

  // Logic for Multi-select (11-14)
  const handleMultiSelect = (q1, q2, val) => {
    if (isFinished) return;
    const current = [answers[q1], answers[q2]];
    if (current.includes(val)) {
        if (answers[q1] === val) setAnswers(prev => ({ ...prev, [q1]: "" }));
        else setAnswers(prev => ({ ...prev, [q2]: "" }));
    } else {
        if (!answers[q1]) setAnswers(prev => ({ ...prev, [q1]: val }));
        else if (!answers[q2]) setAnswers(prev => ({ ...prev, [q2]: val }));
    }
  };

  const isSelected = (q1, q2, val) => answers[q1] === val || answers[q2] === val;

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
            <h2 className="section-title">PUBLIC LIBRARY</h2>
            <div className="notes-container">
                <p>Example: The library re-opened last month.</p>
                <h4>The library now has</h4>
                <ul>
                    <li>a seating area with magazines</li>
                    <li>an expanded section for books on <strong>1.</strong> <input type="text" className="blank-input" value={getVal(1)} onChange={(e)=>handleInputChange(1, e.target.value)} /></li>
                    <li>a new section on local <strong>2.</strong> <input type="text" className="blank-input" value={getVal(2)} onChange={(e)=>handleInputChange(2, e.target.value)} /></li>
                    <li>a community room for meetings (also possible to <strong>3.</strong> <input type="text" className="blank-input" value={getVal(3)} onChange={(e)=>handleInputChange(3, e.target.value)} /> there)</li>
                    <li>a new section of books for <strong>4.</strong> <input type="text" className="blank-input" value={getVal(4)} onChange={(e)=>handleInputChange(4, e.target.value)} /></li>
                </ul>
                <h4>For younger children</h4>
                <ul>
                    <li>the next Science Club meeting: experiments using things from your <strong>5.</strong> <input type="text" className="blank-input" value={getVal(5)} onChange={(e)=>handleInputChange(5, e.target.value)} /></li>
                    <li>Reading Challenge: read six books during the holidays</li>
                </ul>
                <h4>For adults</h4>
                <ul>
                    <li>this Friday: a local author talks about a novel based on a real <strong>6.</strong> <input type="text" className="blank-input" value={getVal(6)} onChange={(e)=>handleInputChange(6, e.target.value)} /></li>
                    <li>IT support is available on Tuesdays — no <strong>7.</strong> <input type="text" className="blank-input" value={getVal(7)} onChange={(e)=>handleInputChange(7, e.target.value)} /> is necessary</li>
                    <li>free check of blood <strong>8.</strong> <input type="text" className="blank-input" value={getVal(8)} onChange={(e)=>handleInputChange(8, e.target.value)} /> and cholesterol levels (over 60s only)</li>
                </ul>
                <h4>Other information</h4>
                <ul>
                    <li>the library shop sells wall-charts, cards and <strong>9.</strong> <input type="text" className="blank-input" value={getVal(9)} onChange={(e)=>handleInputChange(9, e.target.value)} /></li>
                    <li>evenings and weekends: free <strong>10.</strong> <input type="text" className="blank-input" value={getVal(10)} onChange={(e)=>handleInputChange(10, e.target.value)} /> is available</li>
                </ul>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="test-section">
            <div className="instructions-box">
              <div className="ins-header">Questions 11-14</div>
              <div className="ins-body">Choose <strong>TWO</strong> letters, A-E.</div>
            </div>
            <div className="mcq-item">
                <p>11-12. Which TWO age groups are taking increasing numbers of holidays with BC Travel?</p>
                {['A. 16-30 years', 'B. 31-42 years', 'C. 43-54 years', 'D. 55-64 years', 'E. over 65 years'].map(opt => (
                    <label key={opt}><input type="checkbox" checked={isSelected(11, 12, opt[0])} onChange={()=>handleMultiSelect(11, 12, opt[0])} /> {opt}</label>
                ))}
            </div>
            <div className="mcq-item">
                <p>13-14. Which TWO are the main reasons given for the popularity of activity holidays?</p>
                {['A. Clients make new friends.', 'B. Clients learn a useful skill.', 'C. Clients learn about a different culture.', 'D. Clients are excited by the risk involved.', 'E. Clients find them good value for money.'].map(opt => (
                    <label key={opt}><input type="checkbox" checked={isSelected(13, 14, opt[0])} onChange={()=>handleMultiSelect(13, 14, opt[0])} /> {opt}</label>
                ))}
            </div>

            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 15-17</div>
              <div className="ins-body">Choose the correct letter, <strong>A, B or C</strong>.</div>
            </div>
            {[
                {q:15, t:"How does BC Travel plan to expand the painting holidays?", opts:["A. by adding to the number of locations", "B. by increasing the range of levels", "C. by employing more teachers"]},
                {q:16, t:"Why are BC Travel's cooking holidays unusual?", opts:["A. They only use organic foods.", "B. They have an international focus.", "C. They mainly involve vegetarian dishes."]},
                {q:17, t:"What does the speaker say about the photography holidays?", opts:["A. Clients receive individual tuition.", "B. The tutors are also trained guides.", "C. Advice is given on selling photographs."]}
            ].map(item => (
                <div key={item.q} className="mcq-item">
                    <p>{item.q}. {item.t}</p>
                    {item.opts.map(o => (
                        <label key={o}><input type="radio" name={`q${item.q}`} checked={getVal(item.q) === o[0]} onChange={()=>handleInputChange(item.q, o[0])} /> {o}</label>
                    ))}
                </div>
            ))}

            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 18-20</div>
              <div className="ins-body">Complete the table. Write <strong>ONE WORD ONLY</strong> for each answer.</div>
            </div>
            <h2 className="section-title">Fitness Holidays</h2>
            <table className="listening-table">
                <thead>
                    <tr><th>Location</th><th>Main focus</th><th>Other comments</th></tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Ireland and Italy</td>
                        <td>general fitness</td>
                        <td>personally designed programme; also reduces <strong>18.</strong> <input type="text" className="blank-input" value={getVal(18)} onChange={(e)=>handleInputChange(18, e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td>Greece</td>
                        <td><strong>19.</strong> <input type="text" className="blank-input" value={getVal(19)} onChange={(e)=>handleInputChange(19, e.target.value)} /> control</td>
                        <td>includes exercise on the beach</td>
                    </tr>
                    <tr>
                        <td>Morocco</td>
                        <td>mountain biking</td>
                        <td>wide variety of levels; one holiday that is specially designed for <strong>20.</strong> <input type="text" className="blank-input" value={getVal(20)} onChange={(e)=>handleInputChange(20, e.target.value)} /></td>
                    </tr>
                </tbody>
            </table>
          </div>
        );
      case 3:
        return (
          <div className="test-section">
            <div className="instructions-box">
              <div className="ins-header">Questions 21-26</div>
              <div className="ins-body">Complete the flowchart. Choose the correct letter, <strong>A-H</strong>.</div>
            </div>
            <div className="options-grid">
                {["A. patterns", "B. names", "C. sources", "D. questions", "E. employees", "F. solutions", "G. headings", "H. officials"].map(opt => <div key={opt} className="opt-label">{opt}</div>)}
            </div>
            <div className="flowchart-container">
                <div className="flow-step">Locate and read relevant articles, noting key information and also <strong>21.</strong> <input type="text" className="blank-input small" maxLength="1" value={getVal(21)} onChange={(e)=>handleInputChange(21, e.target.value.toUpperCase())} />.</div>
                <div className="flow-arrow">↓</div>
                <div className="flow-step">Select interviewees - these may be site <strong>22.</strong> <input type="text" className="blank-input small" maxLength="1" value={getVal(22)} onChange={(e)=>handleInputChange(22, e.target.value.toUpperCase())} />, visitors or city <strong>23.</strong> <input type="text" className="blank-input small" maxLength="1" value={getVal(23)} onChange={(e)=>handleInputChange(23, e.target.value.toUpperCase())} />.</div>
                <div className="flow-arrow">↓</div>
                <div className="flow-step">Check whether <strong>24.</strong> <input type="text" className="blank-input small" maxLength="1" value={getVal(24)} onChange={(e)=>handleInputChange(24, e.target.value.toUpperCase())} /> of interviewees can be used.</div>
                <div className="flow-arrow">↓</div>
                <div className="flow-step">Select relevant information and try to identify <strong>25.</strong> <input type="text" className="blank-input small" maxLength="1" value={getVal(25)} onChange={(e)=>handleInputChange(25, e.target.value.toUpperCase())} />.</div>
                <div className="flow-arrow">↓</div>
                <div className="flow-step">Do NOT end with <strong>26.</strong> <input type="text" className="blank-input small" maxLength="1" value={getVal(26)} onChange={(e)=>handleInputChange(26, e.target.value.toUpperCase())} />.</div>
            </div>

            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 27-30</div>
              <div className="ins-body">Choose the correct letter, <strong>A, B or C</strong>.</div>
            </div>
            {[
                {q:27, t:"Natalie and Dave agree one reason why so few people visit Horton Castle is that", opts:["A. the publicity is poor.", "B. it is difficult to get to.", "C. there is little there of interest."]},
                {q:28, t:"Natalie and Dave agree that the greatest problem with a visitor centre could be", opts:["A. covering the investment costs.", "B. finding a big enough space for it.", "C. dealing with planning restrictions."]},
                {q:29, t:"What does Dave say about conditions in the town of Horton?", opts:["A. There is a lot of unemployment.", "B. There are few people of working age.", "C. There are opportunities for skilled workers."]},
                {q:30, t:"According to Natalie, one way to prevent damage to the castle site would be to", opts:["A. insist visitors have a guide.", "B. make visitors keep to the paths.", "C. limit visitor numbers."]}
            ].map(item => (
                <div key={item.q} className="mcq-item">
                    <p>{item.q}. {item.t}</p>
                    {item.opts.map(o => (
                        <label key={o}><input type="radio" name={`q${item.q}`} checked={getVal(item.q) === o[0]} onChange={()=>handleInputChange(item.q, o[0])} /> {o}</label>
                    ))}
                </div>
            ))}
          </div>
        );
      case 4:
        return (
          <div className="test-section">
            <div className="instructions-box">
              <div className="ins-header">Questions 31-40</div>
              <div className="ins-body">Write <strong>ONE WORD ONLY</strong> for each answer.</div>
            </div>
            <h2 className="section-title">The Effects of Environmental Change on Birds</h2>
            <div className="notes-container">
                <h4>Mercury (Hg)</h4>
                <ul>
                    <li>Highly toxic; released into atmosphere from coal.</li>
                    <li>In water it may be consumed by fish.</li>
                    <li>Recently found to affect birds which feed on <strong>31.</strong> <input type="text" className="blank-input" value={getVal(31)} onChange={(e)=>handleInputChange(31, e.target.value)} /></li>
                </ul>
                <h4>Research on effects of mercury on birds</h4>
                <ul>
                    <li>investigating: effects on birds' <strong>32.</strong> <input type="text" className="blank-input" value={getVal(32)} onChange={(e)=>handleInputChange(32, e.target.value)} /> or mental processes.</li>
                    <li>effects on bird song (usually learned from a bird's <strong>33.</strong> <input type="text" className="blank-input" value={getVal(33)} onChange={(e)=>handleInputChange(33, e.target.value)} />)</li>
                </ul>
                <h4>Findings</h4>
                <ul>
                    <li>songs learned by birds exposed to mercury are less <strong>34.</strong> <input type="text" className="blank-input" value={getVal(34)} onChange={(e)=>handleInputChange(34, e.target.value)} /></li>
                    <li>this may have a negative effect on birds' <strong>35.</strong> <input type="text" className="blank-input" value={getVal(35)} onChange={(e)=>handleInputChange(35, e.target.value)} /></li>
                </ul>
                <h4>Lab-based studies</h4>
                <ul>
                    <li>allow more <strong>36.</strong> <input type="text" className="blank-input" value={getVal(36)} onChange={(e)=>handleInputChange(36, e.target.value)} /> for the experimenter</li>
                </ul>
                <h4>Implications for humans</h4>
                <ul>
                    <li>Migrating birds such as <strong>37.</strong> <input type="text" className="blank-input" value={getVal(37)} onChange={(e)=>handleInputChange(37, e.target.value)} /> containing mercury may be eaten by humans.</li>
                    <li>Mercury also causes problems in learning <strong>38.</strong> <input type="text" className="blank-input" value={getVal(38)} onChange={(e)=>handleInputChange(38, e.target.value)} /></li>
                    <li>Mercury in a mother's body from <strong>39.</strong> <input type="text" className="blank-input" value={getVal(39)} onChange={(e)=>handleInputChange(39, e.target.value)} /> may affect the unborn child.</li>
                    <li>New regulations for emissions will affect everyone's energy <strong>40.</strong> <input type="text" className="blank-input" value={getVal(40)} onChange={(e)=>handleInputChange(40, e.target.value)} /></li>
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

export default Listening7;