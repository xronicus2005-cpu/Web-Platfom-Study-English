import { useState, useEffect, useRef } from "react";
import "../../../styles/listening-style/Listening25.css";
import AnswersPage from "../../answer-page/AnswerPage";

// --- ASSET IMPORTS ---
import fullAudio from "../../../assets/audio/E17T1.mp3";


const Listening25 = () => {
  const [activePart, setActivePart] = useState(1);
  const [time, setTime] = useState(1800);
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [highlightPopup, setHighlightPopup] = useState({ visible: false, x: 0, y: 0, range: null });

  const audioRef = useRef(null);
  const title = "E17T1";

  const correctAnswers = {
    1: "litter", 2: "dogs", 3: "insects", 4: "butterflies", 5: "wall", 6: "island", 7: "boots", 8: "beginners", 9: "spoons", 10: "35",
    11: "A", 12: "C", 13: "B", 14: "B", 15: ["A", "D"], 16: ["A", "D"], 17: ["B", "C"], 18: ["B", "C"], 19: ["D", "E"], 20: ["D", "E"],
    21: "A", 22: "B", 23: "B", 24: "A", 25: "C", 26: "C", 27: "A", 28: "E", 29: "F", 30: "C",
    31: "puzzle", 32: "logic", 33: "confusion", 34: "meditation", 35: "stone", 36: "coins", 37: "tree", 38: "breathing", 39: "paper", 40: "anxiety"
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
            <h2 className="section-title">Buckworth Conservation Group</h2>
            <div className="notes-container">
                <h3>Regular activities</h3>
                <p>Beach</p>
                <ul>
                    <li>making sure the beach does not have <strong>1.</strong> <input type="text" className="blank-input" value={getVal(1)} onChange={(e)=>handleInputChange(1, e.target.value)} /> on it</li>
                    <li>no <strong>2.</strong> <input type="text" className="blank-input" value={getVal(2)} onChange={(e)=>handleInputChange(2, e.target.value)} /></li>
                </ul>
                <p>Nature reserve</p>
                <ul>
                    <li>maintaining paths</li>
                    <li>nesting boxes for birds installed</li>
                    <li>next task is taking action to attract <strong>3.</strong> <input type="text" className="blank-input" value={getVal(3)} onChange={(e)=>handleInputChange(3, e.target.value)} /> to the place</li>
                    <li>identifying types of <strong>4.</strong> <input type="text" className="blank-input" value={getVal(4)} onChange={(e)=>handleInputChange(4, e.target.value)} /></li>
                    <li>building a new <strong>5.</strong> <input type="text" className="blank-input" value={getVal(5)} onChange={(e)=>handleInputChange(5, e.target.value)} /></li>
                </ul>
                <h3>Forthcoming events</h3>
                <p>Saturday</p>
                <ul>
                    <li>meet at Dunsmore Beach car park</li>
                    <li>walk across the sands and reach the <strong>6.</strong> <input type="text" className="blank-input" value={getVal(6)} onChange={(e)=>handleInputChange(6, e.target.value)} /></li>
                    <li>take a picnic</li>
                    <li>wear appropriate <strong>7.</strong> <input type="text" className="blank-input" value={getVal(7)} onChange={(e)=>handleInputChange(7, e.target.value)} /></li>
                </ul>
                <p>Woodwork session</p>
                <ul>
                    <li>suitable for <strong>8.</strong> <input type="text" className="blank-input" value={getVal(8)} onChange={(e)=>handleInputChange(8, e.target.value)} /> to participate in</li>
                    <li>making <strong>9.</strong> <input type="text" className="blank-input" value={getVal(9)} onChange={(e)=>handleInputChange(9, e.target.value)} /> out of wood</li>
                    <li>17th, from 10 a.m. to 3 p.m.</li>
                    <li>cost of session (no camping): £ <strong>10.</strong> <input type="text" className="blank-input" value={getVal(10)} onChange={(e)=>handleInputChange(10, e.target.value)} /></li>
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
            <h2 className="section-title">Boat trip round Tasmania</h2>
            {[
              {q: 11, t: "What is the maximum number of people who can stand on each side of the boat?", opts: ["A. 9", "B. 15", "C. 18"]},
              {q: 12, t: "What colour are the tour boats?", opts: ["A. dark red", "B. jet black", "C. light green"]},
              {q: 13, t: "Which lunchbox is suitable for someone who doesn't eat meat or fish?", opts: ["A. Lunchbox 1", "B. Lunchbox 2", "C. Lunchbox 3"]},
              {q: 14, t: "What should people do with their litter?", opts: ["A. take it home", "B. hand it to a member of staff", "C. put it in the bins provided on the boat"]}
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
              <div className="ins-body">Choose <strong>TWO</strong> letters, A-E.</div>
            </div>
            <div className="mcq-item">
                <p>15-16. Which TWO features of the lighthouse does Lou mention?</p>
                {['A. why it was built', 'B. who built it', 'C. how long it took to build', 'D. who staffed it', 'E. what it was built with'].map(opt => (
                    <label key={opt}><input type="checkbox" checked={isSelected(15, 16, opt[0])} onChange={()=>handleMultiSelect(15, 16, opt[0])} /> {opt}</label>
                ))}
            </div>
            <div className="mcq-item">
                <p>17-18. Which TWO types of creature might come close to the boat?</p>
                {['A. sea eagles', 'B. fur seals', 'C. dolphins', 'D. whales', 'E. penguins'].map(opt => (
                    <label key={opt}><input type="checkbox" checked={isSelected(17, 18, opt[0])} onChange={()=>handleMultiSelect(17, 18, opt[0])} /> {opt}</label>
                ))}
            </div>
            <div className="mcq-item">
                <p>19-20. Which TWO points does Lou make about the caves?</p>
                {['A. Only large tourist boats can visit them.', 'B. The entrances to them are often blocked.', 'C. It is too dangerous for individuals to go near them.', 'D. Someone will explain what is inside them.', 'E. They cannot be reached on foot.'].map(opt => (
                    <label key={opt}><input type="checkbox" checked={isSelected(19, 20, opt[0])} onChange={()=>handleMultiSelect(19, 20, opt[0])} /> {opt}</label>
                ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="test-section">
            <div className="instructions-box">
              <div className="ins-header">Questions 21-26</div>
              <div className="ins-body">Choose the correct letter, <strong>A, B or C</strong>.</div>
            </div>
            <h2 className="section-title">Work experience for veterinary science students</h2>
            {[
              {q: 21, t: "What problem did both Diana and Tim have when arranging their work experience?", opts: ["A. making initial contact with suitable farms", "B. organising transport to and from the farm", "C. finding a placement for the required length of time"]},
              {q: 22, t: "Tim was pleased to be able to help", opts: ["A. a lamb that had a broken leg.", "B. a sheep that was having difficulty giving birth.", "C. a newly born lamb that was having trouble feeding."]},
              {q: 23, t: "Diana says the sheep on her farm", opts: ["A. were of various different varieties", "B. were mainly reared for their meat", "C. had better quality wool than sheep on the hills"]},
              {q: 24, t: "What did the students learn about adding supplements to chicken feed?", opts: ["A. These should only be given if specially needed.", "B. It is worth paying extra for the most effective ones.", "C. The amount given at one time should be limited."]},
              {q: 25, t: "What happened when Diana was working with dairy cows?", opts: ["A. She identified some cows incorrectly.", "B. She accidentally threw some milk away.", "C. She made a mistake when storing milk."]},
              {q: 26, t: "What did both farmers mention about vets and farming?", opts: ["A. Vets are failing to cope with some aspects of animal health.", "B. There needs to be a fundamental change in the training of vets.", "C. Some jobs could be done by the farmer rather than by a vet."]}
            ].map(item => (
              <div key={item.q} className="mcq-item">
                <p>{item.q}. {item.t}</p>
                {item.opts.map(o => (
                  <label key={o}><input type="radio" name={`q${item.q}`} checked={getVal(item.q) === o[0]} onChange={()=>handleInputChange(item.q, o[0])} /> {o}</label>
                ))}
              </div>
            ))}

            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 27-30</div>
              <div className="ins-body">What opinion do the students give about each module? Choose <strong>A-F</strong>.</div>
            </div>
            <div className="matching-container">
                <div className="options-grid">
                    {["A. Tim found this easier than expected.", "B. Tim thought this was not very clearly organised.", "C. Diana may do further study on this.", "D. Both found the reading difficult.", "E. Tim was shocked at something he learned.", "F. Both surprised how little is known about some aspects."].map(opt => <div key={opt} className="opt-label">{opt}</div>)}
                </div>
                {[
                  {q: 27, l: "Medical terminology"}, {q: 28, l: "Diet and nutrition"}, {q: 29, l: "Animal disease"}, {q: 30, l: "Wildlife medication"}
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
            <h2 className="section-title">Labyrinths</h2>
            <div className="notes-container">
                <h3>Definition</h3>
                <p>a winding spiral path leading to a central area</p>
                <h3>Labyrinths compared with mazes</h3>
                <ul>
                    <li>Mazes are a type of <strong>31.</strong> <input type="text" className="blank-input" value={getVal(31)} onChange={(e)=>handleInputChange(31, e.target.value)} /></li>
                    <li><strong>32.</strong> <input type="text" className="blank-input" value={getVal(32)} onChange={(e)=>handleInputChange(32, e.target.value)} /> is needed to navigate through a maze</li>
                    <li>the word 'maze' is derived from a word meaning a feeling of <strong>33.</strong> <input type="text" className="blank-input" value={getVal(33)} onChange={(e)=>handleInputChange(33, e.target.value)} /></li>
                    <li>they have frequently been used in <strong>34.</strong> <input type="text" className="blank-input" value={getVal(34)} onChange={(e)=>handleInputChange(34, e.target.value)} /> and prayer</li>
                </ul>
                <h3>Early examples of the labyrinth spiral</h3>
                <ul>
                    <li>Ancient carvings on <strong>35.</strong> <input type="text" className="blank-input" value={getVal(35)} onChange={(e)=>handleInputChange(35, e.target.value)} /> have been found across many cultures</li>
                    <li>Ancient Greeks used the symbol on <strong>36.</strong> <input type="text" className="blank-input" value={getVal(36)} onChange={(e)=>handleInputChange(36, e.target.value)} /></li>
                </ul>
                <h3>Walking labyrinths</h3>
                <ul>
                    <li>The largest surviving example of a turf labyrinth once had a big <strong>37.</strong> <input type="text" className="blank-input" value={getVal(37)} onChange={(e)=>handleInputChange(37, e.target.value)} /> at its centre</li>
                    <li>Walking a maze can reduce a person's <strong>38.</strong> <input type="text" className="blank-input" value={getVal(38)} onChange={(e)=>handleInputChange(38, e.target.value)} /> rate</li>
                    <li>patients who can't walk can use 'finger labyrinths' made from <strong>39.</strong> <input type="text" className="blank-input" value={getVal(39)} onChange={(e)=>handleInputChange(39, e.target.value)} /></li>
                    <li>Alzheimer's sufferers experience less <strong>40.</strong> <input type="text" className="blank-input" value={getVal(40)} onChange={(e)=>handleInputChange(40, e.target.value)} /></li>
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

export default Listening25;
