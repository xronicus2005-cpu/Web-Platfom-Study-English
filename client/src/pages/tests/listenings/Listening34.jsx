import { useState, useEffect, useRef } from "react";
import "../../../styles/listening-style/Listening34.css";
import AnswersPage from "../../answer-page/AnswerPage";

// --- ASSET IMPORTS ---
import fullAudio from "../../../assets/audio/E19T2.mp3";


const Listening34 = () => {
  const [activePart, setActivePart] = useState(1);
  const [time, setTime] = useState(1800);
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);

  const audioRef = useRef(null);
  const title = "E19T2";

  const correctAnswers = {
    1: "Mathieson", 2: "beginners", 3: "college", 4: "New", 5: "11", 6: "instrument", 7: "ear", 8: "clapping", 9: "recording", 10: "alone",
    11: "A", 12: "B", 13: "A", 14: "B", 15: "C", 16: "A", 17: ["C", "E"], 18: ["C", "E"], 19: ["A", "B"], 20: ["A", "B"],
    21: "A", 22: "B", 23: "B", 24: "B", 25: "E", 26: "B", 27: "A", 28: "C", 29: "C", 30: "A",
    31: "move", 32: "short", 33: "discs", 34: "oxygen", 35: "tube", 36: "temperatures", 37: "protein", 38: "space", 39: "seaweed", 40: "endangered"
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

  if (isFinished) {
    return <AnswersPage userAnswers={answers} correctAnswers={correctAnswers} title={title}/>;
  }

  const renderPart = () => {
    switch (activePart) {
      case 1:
        return (
          <div className="test-section">
            <div className="instructions-box">
              <div className="ins-header">Questions 1-6</div>
              <div className="ins-body">Complete the form below. Write <strong>ONE WORD AND/OR A NUMBER</strong> for each answer.</div>
            </div>
            <h2 className="section-title">Guitar Group</h2>
            <div className="notes-container">
                <p><strong>Coordinator:</strong> Gary <strong>1.</strong> <input type="text" className="blank-input" value={getVal(1)} onChange={(e)=>handleInputChange(1, e.target.value)} /></p>
                <p><strong>Level:</strong> <strong>2.</strong> <input type="text" className="blank-input" value={getVal(2)} onChange={(e)=>handleInputChange(2, e.target.value)} /></p>
                <p><strong>Place:</strong> The <strong>3.</strong> <input type="text" className="blank-input" value={getVal(3)} onChange={(e)=>handleInputChange(3, e.target.value)} />, <strong>4.</strong> <input type="text" className="blank-input" value={getVal(4)} onChange={(e)=>handleInputChange(4, e.target.value)} /> Street, First floor, Room T347</p>
                <p><strong>Time:</strong> Thursday morning at <strong>5.</strong> <input type="text" className="blank-input" value={getVal(5)} onChange={(e)=>handleInputChange(5, e.target.value)} /></p>
                <p><strong>Recommended website:</strong> 'The perfect <strong>6.</strong> <input type="text" className="blank-input" value={getVal(6)} onChange={(e)=>handleInputChange(6, e.target.value)} />'</p>
            </div>

            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 7-10</div>
              <div className="ins-body">Complete the table below. Write <strong>ONE WORD ONLY</strong> for each answer.</div>
            </div>
            <table className="test-table">
                <thead>
                    <tr><th>Time</th><th>Activity</th><th>Notes</th></tr>
                </thead>
                <tbody>
                    <tr><td>5 minutes</td><td>tuning guitars</td><td>using an app or by <strong>7.</strong> <input type="text" className="blank-input" value={getVal(7)} onChange={(e)=>handleInputChange(7, e.target.value)} /></td></tr>
                    <tr><td>10 minutes</td><td>strumming chords</td><td>keeping time while the teacher is <strong>8.</strong> <input type="text" className="blank-input" value={getVal(8)} onChange={(e)=>handleInputChange(8, e.target.value)} /></td></tr>
                    <tr><td>15 minutes</td><td>playing songs</td><td>often listening to a <strong>9.</strong> <input type="text" className="blank-input" value={getVal(9)} onChange={(e)=>handleInputChange(9, e.target.value)} /> of a song</td></tr>
                    <tr><td>10 minutes</td><td>playing single notes</td><td>playing together, then <strong>10.</strong> <input type="text" className="blank-input" value={getVal(10)} onChange={(e)=>handleInputChange(10, e.target.value)} /></td></tr>
                </tbody>
            </table>
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
              {q: 11, t: "What made David leave London and move to Northsea?", opts: ["A. eager to develop a hobby.", "B. wanted shorter hours.", "C. website design job was unsatisfying."]},
              {q: 12, t: "The Lifeboat Institution in Northsea was built with money from", opts: ["A. local organisation.", "B. local resident.", "C. local council."]},
              {q: 13, t: "In his health assessment, the doctor was concerned that David", opts: ["A. might be colour blind.", "B. was short-sighted.", "C. had eye surgery."]},
              {q: 14, t: "They aim to launch the boat within", opts: ["A. five minutes.", "B. six to eight minutes.", "C. eight and a half minutes."]},
              {q: 15, t: "As a 'helmsman', David decides", opts: ["A. members of the crew.", "B. equipment necessary.", "C. if the boat should launch."]},
              {q: 16, t: "As well as the lifeboat, David", opts: ["A. gives talks on safety.", "B. helps with fundraising.", "C. recruits volunteers."]}
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
                <p>17-18. Which TWO things does David say about training?</p>
                {['A. Leadership skills.', 'B. Brief rope training.', 'C. Built mental strength.', 'D. Challenging casualty care.', 'E. Wave tank survival.'].map(opt => (
                    <label key={opt}><input type="checkbox" checked={isSelected(17, 18, opt[0])} onChange={()=>handleMultiSelect(17, 18, opt[0])} /> {opt}</label>
                ))}
            </div>
            <div className="mcq-item">
                <p>19-20. Which TWO things does David find most motivating?</p>
                {['A. Teamwork.', 'B. Winter experiences.', 'C. Being thanked.', 'D. Keeps him fit.', 'E. Developing equipment.'].map(opt => (
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
            {[
              {q: 21, t: "At first, Don thought the topic of recycling footwear might be too", opts: ["A. limited in scope.", "B. hard to research.", "C. boring."]},
              {q: 22, t: "When discussing trainers, Bella and Don disagree about", opts: ["A. popularity.", "B. school suitability.", "C. wear and tear."]},
              {q: 23, t: "Bella recycles shoes because", opts: ["A. no longer fit.", "B. no longer likes them.", "C. no longer in fashion."]},
              {q: 24, t: "What article detail confused Don?", opts: ["A. Consumption has risen.", "B. Less is recycled now.", "C. People dispose more."]}
            ].map(item => (
              <div key={item.q} className="mcq-item">
                <p>{item.q}. {item.t}</p>
                {item.opts.map(o => (
                  <label key={o}><input type="radio" name={`q${item.q}`} checked={getVal(item.q) === o[0]} onChange={()=>handleInputChange(item.q, o[0])} /> {o}</label>
                ))}
              </div>
            ))}
            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 25-28</div>
              <div className="ins-body">Why was the footwear rejected? Choose <strong>A-F</strong>.</div>
            </div>
            <div className="matching-container">
                <div className="options-grid">
                    {["A. Missing shoe", "B. Faded color", "C. Hole in it", "D. Brand new", "E. Too dirty", "F. Broken stitching"].map(opt => <div key={opt} className="opt-label">{opt}</div>)}
                </div>
                {[{q: 25, l: "high-heeled shoes"}, {q: 26, l: "ankle boots"}, {q: 27, l: "baby shoes"}, {q: 28, l: "trainers"}].map(item => (
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
              <div className="ins-body">Complete the notes. Write <strong>ONE WORD ONLY</strong> for each answer.</div>
            </div>
            <h2 className="section-title">Tardigrades</h2>
            <div className="notes-container">
                <p>Also known as water 'bears' (due to how they <strong>31.</strong> <input type="text" className="blank-input" value={getVal(31)} onChange={(e)=>handleInputChange(31, e.target.value)} />).</p>
                <h3>Physical appearance</h3>
                <ul>
                    <li>A <strong>32.</strong> <input type="text" className="blank-input" value={getVal(32)} onChange={(e)=>handleInputChange(32, e.target.value)} /> round body.</li>
                    <li>Claws or <strong>33.</strong> <input type="text" className="blank-input" value={getVal(33)} onChange={(e)=>handleInputChange(33, e.target.value)} /> for gripping.</li>
                    <li>Liquid carries both <strong>34.</strong> <input type="text" className="blank-input" value={getVal(34)} onChange={(e)=>handleInputChange(34, e.target.value)} /> and blood.</li>
                    <li>Mouth shaped like a <strong>35.</strong> <input type="text" className="blank-input" value={getVal(35)} onChange={(e)=>handleInputChange(35, e.target.value)} />.</li>
                </ul>
                <h3>Habitat</h3>
                <ul><li>Can exist in very low or high <strong>36.</strong> <input type="text" className="blank-input" value={getVal(36)} onChange={(e)=>handleInputChange(36, e.target.value)} />.</li></ul>
                <h3>Cryptobiosis</h3>
                <ul>
                    <li>A type of <strong>37.</strong> <input type="text" className="blank-input" value={getVal(37)} onChange={(e)=>handleInputChange(37, e.target.value)} /> protects DNA.</li>
                    <li>Research on how long they live in <strong>38.</strong> <input type="text" className="blank-input" value={getVal(38)} onChange={(e)=>handleInputChange(38, e.target.value)} />.</li>
                </ul>
                <h3>Feeding</h3>
                <ul><li>Consume liquids in moss or <strong>39.</strong> <input type="text" className="blank-input" value={getVal(39)} onChange={(e)=>handleInputChange(39, e.target.value)} />.</li></ul>
                <p>Status: Not considered <strong>40.</strong> <input type="text" className="blank-input" value={getVal(40)} onChange={(e)=>handleInputChange(40, e.target.value)} />.</p>
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="listening-light-theme">
      <div className="full-viewport-wrapper">
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

export default Listening34;
