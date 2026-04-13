import { useState, useEffect, useRef } from "react";
import "../../../styles/listening-style/Listening23.css";
import AnswersPage from "../../answer-page/AnswerPage";

// --- ASSET IMPORTS ---
import fullAudio from "../../../assets/audio/E16T3.mp3";


const Listening23 = () => {
  const [activePart, setActivePart] = useState(1);
  const [time, setTime] = useState(1800);
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [highlightPopup, setHighlightPopup] = useState({ visible: false, x: 0, y: 0, range: null });

  const audioRef = useRef(null);
  const title = "E16T3";

  const correctAnswers = {
    1: "park", 2: "blue", 3: "reference", 4: "story", 5: "rain", 6: "snack", 7: "medication", 8: "helmet", 9: "tent", 10: "199",
    11: ["C", "E"], 12: ["C", "E"], 13: ["B", "C"], 14: ["B", "C"], 15: "D", 16: "F", 17: "A", 18: "H", 19: "C", 20: "G",
    21: ["A", "D"], 22: ["A", "D"], 23: ["C", "E"], 24: ["C", "E"], 25: "C", 26: "A", 27: "B", 28: "A", 29: "A", 30: "C",
    31: "grandmother", 32: "decade", 33: "equipment", 34: "economic", 35: "basic", 36: "round", 37: "bone", 38: "rough", 39: "styles", 40: "sheep"
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
            <h2 className="section-title">JUNIOR CYCLE CAMP</h2>
            <div className="notes-container">
                <p>The course focuses on skills and safety.</p>
                <p>Charlie would be placed in Level 5.</p>
                <div className="form-row">1. First of all, children at this level are taken to practise in a <input type="text" className="blank-input" value={getVal(1)} onChange={(e)=>handleInputChange(1, e.target.value)} />.</div>

                <h3>Instructors</h3>
                <div className="form-row">2. Instructors wear <input type="text" className="blank-input" value={getVal(2)} onChange={(e)=>handleInputChange(2, e.target.value)} /> shirts.</div>
                <div className="form-row">3. A <input type="text" className="blank-input" value={getVal(3)} onChange={(e)=>handleInputChange(3, e.target.value)} /> is required and training is given.</div>

                <h3>Classes</h3>
                <p>The size of the classes is limited.</p>
                <div className="form-row">4. There are quiet times during the morning for a <input type="text" className="blank-input" value={getVal(4)} onChange={(e)=>handleInputChange(4, e.target.value)} /> or a game.</div>
                <div className="form-row">5. Classes are held even if there is <input type="text" className="blank-input" value={getVal(5)} onChange={(e)=>handleInputChange(5, e.target.value)} />.</div>

                <h3>What to bring</h3>
                <ul>
                    <li>a change of clothing</li>
                    <li>6. a <input type="text" className="blank-input" value={getVal(6)} onChange={(e)=>handleInputChange(6, e.target.value)} /></li>
                    <li>shoes (not sandals)</li>
                    <li>7. Charlie's <input type="text" className="blank-input" value={getVal(7)} onChange={(e)=>handleInputChange(7, e.target.value)} /></li>
                </ul>

                <h3>Day 1</h3>
                <p>Charlie should arrive at 9.20 am on the first day.</p>
                <div className="form-row">8. Before the class, his <input type="text" className="blank-input" value={getVal(8)} onChange={(e)=>handleInputChange(8, e.target.value)} /> will be checked.</div>
                <div className="form-row">9. He should then go to the <input type="text" className="blank-input" value={getVal(9)} onChange={(e)=>handleInputChange(9, e.target.value)} /> to meet his class instructor.</div>

                <h3>Cost</h3>
                <div className="form-row">10. The course costs $ <input type="text" className="blank-input" value={getVal(10)} onChange={(e)=>handleInputChange(10, e.target.value)} /> per week.</div>
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
                <p>11-12. According to Megan, what are the TWO main advantages of working in the agriculture and horticulture sectors?</p>
                {['A. the active lifestyle', 'B. the above-average salaries', 'C. the flexible working opportunities', 'D. the opportunities for overseas travel', 'E. the chance to be in a natural environment'].map(opt => (
                    <label key={opt}><input type="checkbox" checked={isSelected(11, 12, opt[0])} onChange={()=>handleMultiSelect(11, 12, opt[0])} /> {opt}</label>
                ))}
            </div>
            <div className="mcq-item">
                <p>13-14. Which TWO of the following are likely to be disadvantages for people working outdoors?</p>
                {['A. the increasing risk of accidents', 'B. being in a very quiet location', 'C. difficult weather conditions at times', 'D. the cost of housing', 'E. the level of physical fitness required'].map(opt => (
                    <label key={opt}><input type="checkbox" checked={isSelected(13, 14, opt[0])} onChange={()=>handleMultiSelect(13, 14, opt[0])} /> {opt}</label>
                ))}
            </div>

            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 15-20</div>
              <div className="ins-body">What information does Megan give about each job? Choose <strong>A-H</strong>.</div>
            </div>
            <div className="matching-container">
                <div className="options-grid">
                    {["A. not permanent", "B. leading a team", "C. experience not essential", "D. intensive but fun", "E. overtime pay", "F. rapid promotion", "G. accommodation available", "H. local travel involved"].map(opt => <div key={opt} className="opt-label">{opt}</div>)}
                </div>
                {[
                  {q: 15, l: "Fresh food commercial manager"}, {q: 16, l: "Agronomist"}, {q: 17, l: "Fresh produce buyer"},
                  {q: 18, l: "Garden centre sales manager"}, {q: 19, l: "Tree technician"}, {q: 20, l: "Farm worker"}
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
                <p>21-22. Which TWO points does Adam make about his experiment on artificial sweeteners?</p>
                {['A. The results were what he had predicted.', 'B. The experiment was simple to set up.', 'C. A large sample of people was tested.', 'D. The subjects were unaware of what they were drinking.', 'E. The test was repeated several times for each person.'].map(opt => (
                    <label key={opt}><input type="checkbox" checked={isSelected(21, 22, opt[0])} onChange={()=>handleMultiSelect(21, 22, opt[0])} /> {opt}</label>
                ))}
            </div>
            <div className="mcq-item">
                <p>23-24. Which TWO problems did Rosie have when measuring the fat content of nuts?</p>
                {['A. She used the wrong sort of nuts.', 'B. She used an unsuitable chemical.', 'C. She did not grind the nuts finely enough.', 'D. The information on the nut package was incorrect.', 'E. The weighing scales may have been unsuitable.'].map(opt => (
                    <label key={opt}><input type="checkbox" checked={isSelected(23, 24, opt[0])} onChange={()=>handleMultiSelect(23, 24, opt[0])} /> {opt}</label>
                ))}
            </div>

            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 25-30</div>
              <div className="ins-body">Choose the correct letter, <strong>A, B or C</strong>.</div>
            </div>
            {[
              {q: 25, t: "Adam suggests that restaurants could reduce obesity if their menus", opts: ["A. offered fewer options.", "B. had more low-calorie foods.", "C. were organised in a particular way."]},
              {q: 26, t: "The students agree that food manufacturers deliberately", opts: ["A. make calorie counts hard to understand.", "B. fail to provide accurate calorie counts.", "C. use ineffective methods to reduce calories."]},
              {q: 27, t: "What does Rosie say about levels of exercise in England?", opts: ["A. The amount recommended is much too low.", "B. Most people overestimate how much they do.", "C. Women now exercise more than they used to."]},
              {q: 28, t: "Adam refers to stairs in a train station to illustrate", opts: ["A. practical changes that can influence behaviour.", "B. methods of helping people who have mobility problems.", "C. ways of preventing accidents."]},
              {q: 29, t: "What do the students agree about including exercise in their presentation?", opts: ["A. They should probably leave it out.", "B. They need to do more research on it.", "C. They should discuss this with their tutor."]},
              {q: 30, t: "What are the students going to do next for their presentation?", opts: ["A. prepare some slides for it", "B. find out how long they have for it", "C. decide on its content and organisation"]}
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
              <div className="ins-body">Complete the notes below. Write <strong>ONE WORD ONLY</strong> for each answer.</div>
            </div>
            <h2 className="section-title">Hand knitting</h2>
            <div className="notes-container">
                <h3>Interest in knitting</h3>
                <p>Knitting has a long history around the world.</p>
                <div className="form-row">31. We imagine someone like a <input type="text" className="blank-input" value={getVal(31)} onChange={(e)=>handleInputChange(31, e.target.value)} /> knitting.</div>
                <div className="form-row">32. A <input type="text" className="blank-input" value={getVal(32)} onChange={(e)=>handleInputChange(32, e.target.value)} /> ago, knitting was expected to disappear.</div>
                <div className="form-row">33. People are buying more <input type="text" className="blank-input" value={getVal(33)} onChange={(e)=>handleInputChange(33, e.target.value)} /> for knitting nowadays.</div>

                <h3>Benefits of knitting</h3>
                <div className="form-row">34. gives support in times of <input type="text" className="blank-input" value={getVal(34)} onChange={(e)=>handleInputChange(34, e.target.value)} /> difficulty</div>
                <div className="form-row">35. requires only <input type="text" className="blank-input" value={getVal(35)} onChange={(e)=>handleInputChange(35, e.target.value)} /> skills and little money to start</div>

                <h3>Early knitting</h3>
                <div className="form-row">36. Findings show early knitted items to be <input type="text" className="blank-input" value={getVal(36)} onChange={(e)=>handleInputChange(36, e.target.value)} /> in shape.</div>
                <div className="form-row">37. The first needles were made of natural materials such as wood and <input type="text" className="blank-input" value={getVal(37)} onChange={(e)=>handleInputChange(37, e.target.value)} />.</div>
                <div className="form-row">38. Early yarns felt <input type="text" className="blank-input" value={getVal(38)} onChange={(e)=>handleInputChange(38, e.target.value)} /> to touch.</div>
                <div className="form-row">39. Geographical areas had their own <input type="text" className="blank-input" value={getVal(39)} onChange={(e)=>handleInputChange(39, e.target.value)} /> of knitting.</div>
                <div className="form-row">40. Everyday tasks like looking after <input type="text" className="blank-input" value={getVal(40)} onChange={(e)=>handleInputChange(40, e.target.value)} /> were done while knitting.</div>
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

export default Listening23;
