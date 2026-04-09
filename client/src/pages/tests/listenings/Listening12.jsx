import { useState, useEffect, useRef } from "react";
import "../../../styles/listening-style/Listening12.css"; 
import AnswersPage from "../../answer-page/AnswerPage";

// --- ASSET IMPORTS ---
import fullAudio from "../../../assets/audio/E13T4.mp3"; 


const Listening12 = () => {
  const [activePart, setActivePart] = useState(1);
  const [time, setTime] = useState(1800); 
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [highlightPopup, setHighlightPopup] = useState({ visible: false, x: 0, y: 0, range: null });
  
  const audioRef = useRef(null);
  const title = "E13T4";

  const correctAnswers = {
    1: "Finance", 2: "Maths", 3: "business", 4: "17", 5: "holiday", 6: "college", 7: "location", 8: "jeans", 9: "late", 10: "smile",
    11: "A", 12: "B", 13: "A", 14: "C", 15: "A", 16: "B", 17: "B", 18: "D", 19: "A", 20: "E",
    21: "A", 22: "A", 23: "C", 24: "C", 25: "B", 26: "A", 27: ["B", "C"], 28: ["B", "C"], 29: ["D", "E"], 30: ["D", "E"],
    31: "destruction", 32: "universities", 33: "political", 34: "port", 35: "slaves", 36: "taxation", 37: "sugar", 38: "tea", 39: "transportation", 40: "night"
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

  // Logic for Multi-select (27-30)
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
            <h2 className="section-title">Alex's Training</h2>
            <div className="notes-container">
              <p>Example: Alex completed his training in: (2014)</p>
              <h3>About the applicant:</h3>
              <ul>
                <li>At first, Alex did his training in the <strong>1.</strong> <input type="text" className="blank-input" value={getVal(1)} onChange={(e)=>handleInputChange(1, e.target.value)} /> department.</li>
                <li>Alex didn't have a qualification from school in <strong>2.</strong> <input type="text" className="blank-input" value={getVal(2)} onChange={(e)=>handleInputChange(2, e.target.value)} />.</li>
                <li>Alex thinks he should have done the diploma in <strong>3.</strong> <input type="text" className="blank-input" value={getVal(3)} onChange={(e)=>handleInputChange(3, e.target.value)} /> skills.</li>
                <li>Age of other trainees: the youngest was <strong>4.</strong> <input type="text" className="blank-input" value={getVal(4)} onChange={(e)=>handleInputChange(4, e.target.value)} />.</li>
              </ul>
              <h3>Benefits of doing training at JPNW:</h3>
              <ul>
                <li>Trainees receive the same amount of <strong>5.</strong> <input type="text" className="blank-input" value={getVal(5)} onChange={(e)=>handleInputChange(5, e.target.value)} /> as permanent staff.</li>
                <li>Trainees go to <strong>6.</strong> <input type="text" className="blank-input" value={getVal(6)} onChange={(e)=>handleInputChange(6, e.target.value)} /> one day per month.</li>
                <li>The company is in a convenient <strong>7.</strong> <input type="text" className="blank-input" value={getVal(7)} onChange={(e)=>handleInputChange(7, e.target.value)} />.</li>
              </ul>
              <h3>Advice for interview:</h3>
              <ul>
                <li>Don't wear <strong>8.</strong> <input type="text" className="blank-input" value={getVal(8)} onChange={(e)=>handleInputChange(8, e.target.value)} />.</li>
                <li>Don't be <strong>9.</strong> <input type="text" className="blank-input" value={getVal(9)} onChange={(e)=>handleInputChange(9, e.target.value)} />.</li>
                <li>Make sure you <strong>10.</strong> <input type="text" className="blank-input" value={getVal(10)} onChange={(e)=>handleInputChange(10, e.target.value)} />.</li>
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
              {q: 11, t: "Annie recommends that when cross-country skiing, visitors should", opts: ["A. get away from the regular trails.", "B. stop to enjoy views of the scenery.", "C. go at a slow speed at the beginning."]},
              {q: 12, t: "What does Annie tell the group about this afternoon's dog-sled trip?", opts: ["A. Those who want to can take part in a race.", "B. Anyone has the chance to drive a team of dogs.", "C. One group member will be chosen to lead the trail."]},
              {q: 13, t: "What does Annie say about the team relay event?", opts: ["A. All participants receive a medal.", "B. The course is 4 km long.", "C. Each team is led by a teacher."]},
              {q: 14, t: "On the snow-shoe trip, the visitors will", opts: ["A. visit an old gold mine.", "B. learn about unusual flowers.", "C. climb to the top of a mountain."]},
              {q: 15, t: "The cost of accommodation in the mountain hut includes", opts: ["A. a supply of drinking water.", "B. transport of visitors' luggage.", "C. cooked meals."]},
              {q: 16, t: "If there is a storm while the visitors are in the hut, they should", opts: ["A. contact the bus driver.", "B. wait until the weather improves.", "C. use the emergency locator beacon."]}
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
              <div className="ins-body">Match trails to information <strong>A-F</strong>.</div>
            </div>
            <div className="matching-container">
                <div className="options-grid">
                    {["A. Good place to stop/rest", "B. Suitable for all abilities", "C. Involves crossing a river", "D. Demands a lot of skill", "E. Closed in bad weather", "F. Very narrow sections"].map(opt => <div key={opt} className="opt-label">{opt}</div>)}
                </div>
                {[
                  {q: 17, l: "Highland Trail"}, {q: 18, l: "Pine Trail"}, {q: 19, l: "Stony Trail"}, {q: 20, l: "Loser's Trail"}
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
              <div className="ins-header">Questions 21-26</div>
              <div className="ins-body">Choose the correct letter, <strong>A, B or C</strong>.</div>
            </div>
            {[
              {q: 21, t: "What was Jack's attitude to nutritional food labels before this project?", opts: ["A. He didn't read everything on them.", "B. He didn't think they were important.", "C. He thought they were too complicated."]},
              {q: 22, t: "Alice says that before doing this project,", opts: ["A. she was unaware of what certain foods contained.", "B. she was too lazy to read food labels.", "C. she was only interested in the number of calories."]},
              {q: 23, t: "When discussing supermarket brands of pizza, Jack agrees with Alice that", opts: ["A. the list of ingredients is shocking.", "B. he will hesitate before buying pizza again.", "C. the nutritional label is misleading."]},
              {q: 24, t: "Jack prefers the daily value system to other labelling systems because it is", opts: ["A. more accessible.", "B. more logical.", "C. more comprehensive."]},
              {q: 25, t: "What surprised both students about one flavour of crisps?", opts: ["A. Incorrect percentage of additives.", "B. Product did not contain any meat.", "C. Labels did not list all ingredients."]},
              {q: 26, t: "What do the students think about research into nutritional food labelling?", opts: ["A. It did not produce clear results.", "B. It focused on the wrong people.", "C. It made unrealistic recommendations."]}
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
              <div className="ins-body">Choose <strong>TWO</strong> letters.</div>
            </div>
            <div className="mcq-item">
                <p>27-28. TWO things that surprised students about the traffic-light system?</p>
                {['A. widespread use', 'B. voluntary for supermarkets', 'C. little research before introduction', 'D. unpopularity with manufacturers', 'E. use of certain colours'].map(opt => (
                    <label key={opt}><input type="checkbox" checked={isSelected(27, 28, opt[0])} onChange={()=>handleMultiSelect(27, 28, opt[0])} /> {opt}</label>
                ))}
            </div>
            <div className="mcq-item">
                <p>29-30. TWO things true about participants in the study?</p>
                {['A. low literacy levels', 'B. regular consumers', 'C. selected randomly', 'D. all socio-economic groups', 'E. interviewed face-to-face'].map(opt => (
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
            <h2 className="section-title">The history of coffee</h2>
            <div className="notes-container">
                <h3>Coffee in the Arab world</h3>
                <ul>
                    <li>1623: In Constantinople, the ruler ordered the <strong>31.</strong> <input type="text" className="blank-input" value={getVal(31)} onChange={(e)=>handleInputChange(31, e.target.value)} /> of every coffee house.</li>
                </ul>
                <h3>Coffee arrives in Europe</h3>
                <ul>
                    <li>Coffee shops were compared to <strong>32.</strong> <input type="text" className="blank-input" value={getVal(32)} onChange={(e)=>handleInputChange(32, e.target.value)} />.</li>
                    <li>They played an important part in social and <strong>33.</strong> <input type="text" className="blank-input" value={getVal(33)} onChange={(e)=>handleInputChange(33, e.target.value)} /> changes.</li>
                </ul>
                <h3>Coffee and European colonisation</h3>
                <ul>
                    <li>Types were often named according to the <strong>34.</strong> <input type="text" className="blank-input" value={getVal(34)} onChange={(e)=>handleInputChange(34, e.target.value)} /> they came from.</li>
                    <li>In Brazil, most cultivation depended on <strong>35.</strong> <input type="text" className="blank-input" value={getVal(35)} onChange={(e)=>handleInputChange(35, e.target.value)} />.</li>
                    <li>In Java, coffee was used as a form of <strong>36.</strong> <input type="text" className="blank-input" value={getVal(36)} onChange={(e)=>handleInputChange(36, e.target.value)} />.</li>
                    <li>Coffee became almost as important as <strong>37.</strong> <input type="text" className="blank-input" value={getVal(37)} onChange={(e)=>handleInputChange(37, e.target.value)} />.</li>
                    <li>Movement toward consumption of <strong>38.</strong> <input type="text" className="blank-input" value={getVal(38)} onChange={(e)=>handleInputChange(38, e.target.value)} /> in Britain didn't happen in USA.</li>
                </ul>
                <h3>Coffee in the 19th century</h3>
                <ul>
                    <li>Prices dropped because of improvements in <strong>39.</strong> <input type="text" className="blank-input" value={getVal(39)} onChange={(e)=>handleInputChange(39, e.target.value)} />.</li>
                    <li>Coffee helped industrial workers to work at <strong>40.</strong> <input type="text" className="blank-input" value={getVal(40)} onChange={(e)=>handleInputChange(40, e.target.value)} />.</li>
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

export default Listening12;