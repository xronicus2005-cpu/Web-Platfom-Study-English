import { useState, useEffect, useRef } from "react";
import "../../../styles/listening-style/Listening18.css";
import AnswersPage from "../../answer-page/AnswerPage";

// --- ASSET IMPORTS ---
import fullAudio from "../../../assets/audio/E15T2.mp3";
import photo from "../../../assets/testPhotos/C15T2.png"

const Listening18 = () => {
  const [activePart, setActivePart] = useState(1);
  const [time, setTime] = useState(1800);
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [highlightPopup, setHighlightPopup] = useState({ visible: false, x: 0, y: 0, range: null });

  const audioRef = useRef(null);
  const title = "E15T2";

  const correctAnswers = {
    1: "Eustatis", 2: "review", 3: "dance", 4: "Chat", 5: "healthy", 6: "posters", 7: "wood", 8: "lake", 9: "insects", 10: "blog",
    11: "C", 12: "A", 13: "B", 14: "C", 15: "E", 16: "C", 17: "B", 18: "A", 19: "G", 20: "D",
    21: ["B", "D"], 22: ["B", "D"], 23: ["B", "C"], 24: ["B", "C"], 25: "G", 26: "B", 27: "D", 28: "C", 29: "H", 30: "F",
    31: "irrigation", 32: "women", 33: "wire", 34: "seeds", 35: "posts", 36: "transport", 37: "preservation", 38: "fish", 39: "bees", 40: "design"
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
              <div className="ins-header">Questions 1-4</div>
              <div className="ins-body">Complete the table below. Write <strong>ONE WORD ONLY</strong> for each answer.</div>
            </div>
            <h2 className="section-title">Festival information</h2>
            <table className="listening-table">
                <thead>
                    <tr><th>Date</th><th>Type of event</th><th>Details</th></tr>
                </thead>
                <tbody>
                    <tr><td>17th</td><td>a concert</td><td>performers from Canada</td></tr>
                    <tr><td>18th</td><td>a ballet</td><td>company called <strong>1.</strong> <input type="text" className="blank-input" value={getVal(1)} onChange={(e)=>handleInputChange(1, e.target.value)} /></td></tr>
                    <tr><td>19th-20th (afternoon)</td><td>a play</td><td>type of play: a comedy called Jemima has had a good <strong>2.</strong> <input type="text" className="blank-input" value={getVal(2)} onChange={(e)=>handleInputChange(2, e.target.value)} /></td></tr>
                    <tr><td>20th (evening)</td><td>A <strong>3.</strong> <input type="text" className="blank-input" value={getVal(3)} onChange={(e)=>handleInputChange(3, e.target.value)} /> show</td><td>show is called <strong>4.</strong> <input type="text" className="blank-input" value={getVal(4)} onChange={(e)=>handleInputChange(4, e.target.value)} /></td></tr>
                </tbody>
            </table>

            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 5-10</div>
              <div className="ins-body">Complete the notes below. Write <strong>ONE WORD ONLY</strong> for each answer.</div>
            </div>
            <div className="notes-container">
                <h3>Workshops</h3>
                <ul>
                    <li>Making <strong>5.</strong> <input type="text" className="blank-input" value={getVal(5)} onChange={(e)=>handleInputChange(5, e.target.value)} /> food</li>
                    <li>(children only) Making <strong>6.</strong> <input type="text" className="blank-input" value={getVal(6)} onChange={(e)=>handleInputChange(6, e.target.value)} /></li>
                    <li>(adults only) Making toys from <strong>7.</strong> <input type="text" className="blank-input" value={getVal(7)} onChange={(e)=>handleInputChange(7, e.target.value)} /> using various tools</li>
                </ul>
                <h3>Outdoor activities</h3>
                <ul>
                    <li>Swimming in the <strong>8.</strong> <input type="text" className="blank-input" value={getVal(8)} onChange={(e)=>handleInputChange(8, e.target.value)} /></li>
                    <li>Walking in the woods, led by an expert on <strong>9.</strong> <input type="text" className="blank-input" value={getVal(9)} onChange={(e)=>handleInputChange(9, e.target.value)} /></li>
                    <li>See the festival organiser's <strong>10.</strong> <input type="text" className="blank-input" value={getVal(10)} onChange={(e)=>handleInputChange(10, e.target.value)} /> for more information</li>
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
            <h2 className="section-title">Minster Park</h2>
            {[
              {q: 11, t: "The park was originally established", opts: ["A. as an amenity provided by the city council.", "B. as land belonging to a private house.", "C. as a shared area set up by the local community."]},
              {q: 12, t: "Why is there a statue of Diane Gosforth in the park?", opts: ["A. She was a resident who helped to lead a campaign.", "B. She was a council member responsible for giving access.", "C. She was a senior worker at the park for many years."]},
              {q: 13, t: "During the First World War, the park was mainly used for", opts: ["A. exercises by troops.", "B. growing vegetables.", "C. public meetings."]},
              {q: 14, t: "When did the physical transformation of the park begin?", opts: ["A. 2013", "B. 2015", "C. 2016"]}
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
              <div className="ins-body">Label the map below. Choose the correct letter, <strong>A-I</strong>.</div>
            </div>
            <div className="map-container">
                {/* Simplified Map representation */}
                <div className="map-placeholder">
                  <img src={photo} alt="map" className="map-photo"/>
                </div>
                {[15, 16, 17, 18, 19, 20].map(num => (
                  <div key={num} className="map-q-row">
                    <span>{num}. {num===15?"statue of Diane Gosforth":num===16?"wooden sculptures":num===17?"playground":num===18?"maze":num===19?"tennis courts":"fitness area"}</span>
                    <input type="text" className="blank-input small" maxLength="1" value={getVal(num)} onChange={(e)=>handleInputChange(num, e.target.value.toUpperCase())} />
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
                <p>21-22. Which TWO groups of people is the display primarily intended for?</p>
                {['A. English department students', 'B. local residents', 'C. teaching staff', 'D. potential new students', 'E. students from other departments'].map(opt => (
                    <label key={opt}><input type="checkbox" checked={isSelected(21, 22, opt[0])} onChange={()=>handleMultiSelect(21, 22, opt[0])} /> {opt}</label>
                ))}
            </div>
            <div className="mcq-item">
                <p>23-24. Cathy and Graham's TWO reasons for choosing Charles Dickens?</p>
                {['A. inspired others to improve society', 'B. used publications to draw attention to problems', 'C. novels are well-known now', 'D. consulted on social issues', 'E. reputation has changed'].map(opt => (
                    <label key={opt}><input type="checkbox" checked={isSelected(23, 24, opt[0])} onChange={()=>handleMultiSelect(23, 24, opt[0])} /> {opt}</label>
                ))}
            </div>

            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 25-30</div>
              <div className="ins-body">What topic do they choose for each novel? Choose <strong>A-H</strong>.</div>
            </div>
            <div className="matching-container">
                <div className="options-grid">
                    {["A. poverty", "B. education", "C. travels", "D. entertainment", "E. crime/law", "F. wealth", "G. medicine", "H. a woman's life"].map(opt => <div key={opt} className="opt-label">{opt}</div>)}
                </div>
                {[
                  {q: 25, l: "The Pickwick Papers"}, {q: 26, l: "Oliver Twist"}, {q: 27, l: "Nicholas Nickleby"},
                  {q: 28, l: "Martin Chuzzlewit"}, {q: 29, l: "Bleak House"}, {q: 30, l: "Little Dorrit"}
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
            <h2 className="section-title">Agricultural programme in Mozambique</h2>
            <div className="notes-container">
                <p>It focused on a dry and arid region near the Limpopo River.</p>
                <ul>
                    <li><strong>31.</strong> <input type="text" className="blank-input" value={getVal(31)} onChange={(e)=>handleInputChange(31, e.target.value)} /> was seen as the main priority to ensure the supply of water.</li>
                    <li>Most of the work was done by <strong>32.</strong> <input type="text" className="blank-input" value={getVal(32)} onChange={(e)=>handleInputChange(32, e.target.value)} />.</li>
                    <li>The programme provided <strong>33.</strong> <input type="text" className="blank-input" value={getVal(33)} onChange={(e)=>handleInputChange(33, e.target.value)} /> for the fences and <strong>34.</strong> <input type="text" className="blank-input" value={getVal(34)} onChange={(e)=>handleInputChange(34, e.target.value)} /> for suitable crops.</li>
                    <li>The farmers provided labour and <strong>35.</strong> <input type="text" className="blank-input" value={getVal(35)} onChange={(e)=>handleInputChange(35, e.target.value)} /> for the fences.</li>
                </ul>
                <h3>Further developments</h3>
                <ul>
                    <li>Difficulties due to lack of <strong>36.</strong> <input type="text" className="blank-input" value={getVal(36)} onChange={(e)=>handleInputChange(36, e.target.value)} />.</li>
                    <li>Training in methods of food <strong>37.</strong> <input type="text" className="blank-input" value={getVal(37)} onChange={(e)=>handleInputChange(37, e.target.value)} />.</li>
                    <li>Special places where <strong>38.</strong> <input type="text" className="blank-input" value={getVal(38)} onChange={(e)=>handleInputChange(38, e.target.value)} /> could be kept.</li>
                    <li>Local people suggested keeping <strong>39.</strong> <input type="text" className="blank-input" value={getVal(39)} onChange={(e)=>handleInputChange(39, e.target.value)} />.</li>
                </ul>
                <p><strong>Evaluation:</strong> Enough time must be allowed, particularly for the <strong>40.</strong> <input type="text" className="blank-input" value={getVal(40)} onChange={(e)=>handleInputChange(40, e.target.value)} /> phase.</p>
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

export default Listening18;
