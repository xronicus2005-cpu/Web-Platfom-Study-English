import { useState, useEffect, useRef } from "react";
import "../../../styles/listening-style/Listening26.css";
import AnswersPage from "../../answer-page/AnswerPage";

// --- ASSET IMPORTS ---
import fullAudio from "../../../assets/audio/E17T2.mp3";


const Listening26 = () => {
  const [activePart, setActivePart] = useState(1);
  const [time, setTime] = useState(1800);
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [highlightPopup, setHighlightPopup] = useState({ visible: false, x: 0, y: 0, range: null });

  const audioRef = useRef(null);
  const title = "E17T2";

  const correctAnswers = {
    1: "collecting", 2: "records", 3: "West", 4: "transport", 5: "art", 6: "hospital", 7: "garden", 8: "quiz", 9: "tickets", 10: "poster",
    11: "B", 12: "C", 13: "C", 14: "B", 15: "D", 16: "C", 17: "G", 18: "A", 19: "E", 20: "F",
    21: ["D", "E"], 22: ["D", "E"], 23: "D", 24: "C", 25: "A", 26: "E", 27: "F", 28: "B", 29: "C", 30: "C",
    31: "321,000", 32: "vocabulary", 33: "podcast", 34: "smartphones", 35: "bilingual", 36: "playground", 37: "picture", 38: "grammar", 39: "identity", 40: "fluent"
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
              <div className="ins-header">Questions 1-7</div>
              <div className="ins-body">Complete the notes below. Write <strong>ONE WORD ONLY</strong> for each answer.</div>
            </div>
            <h2 className="section-title">Opportunities for voluntary work in Southoe village</h2>
            <div className="notes-container">
                <h3>Library</h3>
                <ul>
                    <li>Help with <strong>1.</strong> <input type="text" className="blank-input" value={getVal(1)} onChange={(e)=>handleInputChange(1, e.target.value)} /> books (times to be arranged)</li>
                    <li>Help needed to keep <strong>2.</strong> <input type="text" className="blank-input" value={getVal(2)} onChange={(e)=>handleInputChange(2, e.target.value)} /> of books up to date</li>
                    <li>Library is in the <strong>3.</strong> <input type="text" className="blank-input" value={getVal(3)} onChange={(e)=>handleInputChange(3, e.target.value)} /> Room in the village hall</li>
                </ul>
                <h3>Lunch club</h3>
                <ul>
                    <li>Help by providing <strong>4.</strong> <input type="text" className="blank-input" value={getVal(4)} onChange={(e)=>handleInputChange(4, e.target.value)} /></li>
                    <li>Help with hobbies such as <strong>5.</strong> <input type="text" className="blank-input" value={getVal(5)} onChange={(e)=>handleInputChange(5, e.target.value)} /></li>
                </ul>
                <h3>Help for individuals needed next week</h3>
                <ul>
                    <li>Taking Mrs Carroll to <strong>6.</strong> <input type="text" className="blank-input" value={getVal(6)} onChange={(e)=>handleInputChange(6, e.target.value)} /></li>
                    <li>Work in the <strong>7.</strong> <input type="text" className="blank-input" value={getVal(7)} onChange={(e)=>handleInputChange(7, e.target.value)} /> at Mr Selsbury's house</li>
                </ul>
            </div>

            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 8-10</div>
              <div className="ins-body">Complete the table below. Write <strong>ONE WORD ONLY</strong> for each answer.</div>
            </div>
            <table className="test-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Event</th>
                        <th>Location</th>
                        <th>Help needed</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>19 Oct</td>
                        <td><strong>8.</strong> <input type="text" className="blank-input" value={getVal(8)} onChange={(e)=>handleInputChange(8, e.target.value)} /></td>
                        <td>Village hall</td>
                        <td>providing refreshments</td>
                    </tr>
                    <tr>
                        <td>18 Nov</td>
                        <td>dance</td>
                        <td>Village hall</td>
                        <td>Checking <strong>9.</strong> <input type="text" className="blank-input" value={getVal(9)} onChange={(e)=>handleInputChange(9, e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td>31 Dec</td>
                        <td>New Year's Eve party</td>
                        <td>Mountfort Hotel</td>
                        <td>designing the <strong>10.</strong> <input type="text" className="blank-input" value={getVal(10)} onChange={(e)=>handleInputChange(10, e.target.value)} /></td>
                    </tr>
                </tbody>
            </table>
          </div>
        );
      case 2:
        return (
          <div className="test-section">
            <div className="instructions-box">
              <div className="ins-header">Questions 11-14</div>
              <div className="ins-body">Choose the correct letter, <strong>A, B or C</strong>.</div>
            </div>
            <h2 className="section-title">Oniton Hall</h2>
            {[
              {q: 11, t: "Many past owners made changes to", opts: ["A. the gardens.", "B. the house.", "C. the farm."]},
              {q: 12, t: "Sir Edward Downes built Oniton Hall because he wanted", opts: ["A. a place for discussing politics.", "B. a place to display his wealth.", "C. a place for artists and writers."]},
              {q: 13, t: "Visitors can learn about the work of servants in the past from", opts: ["A. audio guides.", "B. photographs.", "C. people in costume."]},
              {q: 14, t: "What is new for children at Oniton Hall?", opts: ["A. clothes for dressing up", "B. mini tractors", "C. the adventure playground"]}
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
              <div className="ins-body">Which activity is offered at each location? Choose <strong>A-H</strong>.</div>
            </div>
            <div className="matching-container">
                <div className="options-grid">
                    {["A. shopping", "B. watching milking", "C. old equipment", "D. eating and drinking", "E. starting a trip", "F. rare breeds", "G. helping look after animals", "H. using tools"].map(opt => <div key={opt} className="opt-label">{opt}</div>)}
                </div>
                {[
                  {q: 15, l: "dairy"}, {q: 16, l: "large barn"}, {q: 17, l: "small barn"},
                  {q: 18, l: "stables"}, {q: 19, l: "shed"}, {q: 20, l: "parkland"}
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
              <div className="ins-header">Questions 21-22</div>
              <div className="ins-body">Choose <strong>TWO</strong> letters, A-E.</div>
            </div>
            <div className="mcq-item">
                <p>21-22. Which TWO things do the students agree they need to include in their reviews of Romeo and Juliet?</p>
                {['A. analysis of the text', 'B. a summary of the plot', 'C. a description of the theatre', 'D. a personal reaction', 'E. a reference to particular scenes'].map(opt => (
                    <label key={opt}><input type="checkbox" checked={isSelected(21, 22, opt[0])} onChange={()=>handleMultiSelect(21, 22, opt[0])} /> {opt}</label>
                ))}
            </div>

            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 23-27</div>
              <div className="ins-body">Which opinion do the speakers give? Choose <strong>A-G</strong>.</div>
            </div>
            <div className="matching-container">
                <div className="options-grid">
                    {["A. Expected more traditional", "B. Thought this was original", "C. Right atmosphere", "D. Major strength", "E. Both disappointed", "F. Disagree on reasons for issue", "G. Disagree on improvement"].map(opt => <div key={opt} className="opt-label">{opt}</div>)}
                </div>
                {[
                  {q: 23, l: "the set"}, {q: 24, l: "the lighting"}, {q: 25, l: "the costume design"},
                  {q: 26, l: "the music"}, {q: 27, l: "the actors' delivery"}
                ].map(item => (
                  <div key={item.q} className="map-q-row">
                    <span>{item.q}. {item.l}</span>
                    <input type="text" className="blank-input small" maxLength="1" value={getVal(item.q)} onChange={(e)=>handleInputChange(item.q, e.target.value.toUpperCase())} />
                  </div>
                ))}
            </div>

            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 28-30</div>
              <div className="ins-body">Choose the correct letter, <strong>A, B or C</strong>.</div>
            </div>
            {[
              {q: 28, t: "The students think the story is relevant today because", opts: ["A. it illustrates how conflict starts.", "B. it deals with family problems.", "C. it teaches about relationships."]},
              {q: 29, t: "The students found watching it in another language", opts: ["A. frustrating.", "B. demanding.", "C. moving."]},
              {q: 30, t: "Why do they think Shakespeare has international appeal?", opts: ["A. exciting stories.", "B. recognisable characters.", "C. interpreted in many ways."]}
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
              <div className="ins-body">Complete the notes. Write <strong>ONE WORD AND/OR A NUMBER</strong> for each answer.</div>
            </div>
            <h2 className="section-title">The impact of digital technology on the Icelandic language</h2>
            <div className="notes-container">
                <h3>The Icelandic language</h3>
                <ul>
                    <li>has approximately <strong>31.</strong> <input type="text" className="blank-input" value={getVal(31)} onChange={(e)=>handleInputChange(31, e.target.value)} /> speakers</li>
                    <li>has a <strong>32.</strong> <input type="text" className="blank-input" value={getVal(32)} onChange={(e)=>handleInputChange(32, e.target.value)} /> that is still growing</li>
                    <li>has not changed a lot over the last thousand years</li>
                    <li>has its own words for concepts, such as web browser and <strong>33.</strong> <input type="text" className="blank-input" value={getVal(33)} onChange={(e)=>handleInputChange(33, e.target.value)} /></li>
                </ul>
                <h3>Young speakers</h3>
                <ul>
                    <li>are big users of technology, such as <strong>34.</strong> <input type="text" className="blank-input" value={getVal(34)} onChange={(e)=>handleInputChange(34, e.target.value)} /></li>
                    <li>are becoming <strong>35.</strong> <input type="text" className="blank-input" value={getVal(35)} onChange={(e)=>handleInputChange(35, e.target.value)} /> very quickly</li>
                    <li>discussing using English in the <strong>36.</strong> <input type="text" className="blank-input" value={getVal(36)} onChange={(e)=>handleInputChange(36, e.target.value)} /> at school</li>
                    <li>better able to identify the content of a <strong>37.</strong> <input type="text" className="blank-input" value={getVal(37)} onChange={(e)=>handleInputChange(37, e.target.value)} /> in English</li>
                </ul>
                <h3>Contextual Factors</h3>
                <ul>
                    <li>Tech companies struggle with how complicated its <strong>38.</strong> <input type="text" className="blank-input" value={getVal(38)} onChange={(e)=>handleInputChange(38, e.target.value)} /> is</li>
                    <li>Government worries young Icelanders may lose their <strong>39.</strong> <input type="text" className="blank-input" value={getVal(39)} onChange={(e)=>handleInputChange(39, e.target.value)} /></li>
                    <li>Worried about children not being <strong>40.</strong> <input type="text" className="blank-input" value={getVal(40)} onChange={(e)=>handleInputChange(40, e.target.value)} /> in either language</li>
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

export default Listening26;
