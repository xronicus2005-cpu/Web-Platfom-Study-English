import { useState, useEffect, useRef } from "react";
import "../../../styles/listening-style/Listening31.css";
import AnswersPage from "../../answer-page/AnswerPage";

// --- ASSET IMPORTS ---
import fullAudio from "../../../assets/audio/E18T3.mp3";


const Listening31 = () => {
  const [activePart, setActivePart] = useState(1);
  const [time, setTime] = useState(1800);
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [highlightPopup, setHighlightPopup] = useState({ visible: false, x: 0, y: 0, range: null });

  const audioRef = useRef(null);
  const title = "E18T3";

  const correctAnswers = {
    1: "Marrowfield", 2: "Relative", 3: "Socialize", 4: "Full", 5: "Domestic Life", 6: "Clouds", 7: "Timing", 8: "Animal Magic", 9: "Movement", 10: "Dark",
    11: ["B", "C"], 12: ["B", "C"], 13: ["B", "D"], 14: ["B", "D"], 15: "C", 16: "B", 17: "B", 18: "C", 19: "A", 20: "A",
    21: ["A", "E"], 22: ["A", "E"], 23: ["B", "D"], 24: ["B", "D"], 25: "G", 26: "E", 27: "B", 28: "C", 29: "F", 30: "A",
    31: "Technical", 32: "Cheap", 33: "Thousands", 34: "Identification", 35: "Tracking", 36: "Military", 37: "Location", 38: "Prediction", 39: "Database", 40: "Trust"
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
              <div className="ins-body">Complete the form below. Write <strong>ONE WORD AND/OR A NUMBER</strong> for each answer.</div>
            </div>
            <h2 className="section-title">Wayside Camera Club membership form</h2>
            <div className="notes-container">
                <p><strong>Name:</strong> Dan Green</p>
                <p><strong>Email address:</strong> dan1068@market.com</p>
                <p><strong>Home address:</strong> 52 <strong>1.</strong> <input type="text" className="blank-input" value={getVal(1)} onChange={(e)=>handleInputChange(1, e.target.value)} /> Street, Peacetown</p>
                <p><strong>Heard about us:</strong> from a <strong>2.</strong> <input type="text" className="blank-input" value={getVal(2)} onChange={(e)=>handleInputChange(2, e.target.value)} /></p>
                <p><strong>Reason for joining:</strong> to enter competitions; to <strong>3.</strong> <input type="text" className="blank-input" value={getVal(3)} onChange={(e)=>handleInputChange(3, e.target.value)} /></p>
                <p><strong>Type of membership:</strong> <strong>4.</strong> <input type="text" className="blank-input" value={getVal(4)} onChange={(e)=>handleInputChange(4, e.target.value)} /> membership (£30)</p>
            </div>

            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 5-10</div>
              <div className="ins-body">Complete the table below. Write <strong>NO MORE THAN TWO WORDS</strong> for each answer.</div>
            </div>
            <table className="test-table">
                <thead>
                    <tr>
                        <th>Title of competition</th>
                        <th>Instructions</th>
                        <th>Feedback to Dan</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>' <strong>5.</strong> <input type="text" className="blank-input" value={getVal(5)} onChange={(e)=>handleInputChange(5, e.target.value)} /> '</td>
                        <td>A scene in the home</td>
                        <td>The picture's composition was not good.</td>
                    </tr>
                    <tr>
                        <td>'Beautiful Sunsets'</td>
                        <td>Scene must show some <strong>6.</strong> <input type="text" className="blank-input" value={getVal(6)} onChange={(e)=>handleInputChange(6, e.target.value)} /></td>
                        <td>The <strong>7.</strong> <input type="text" className="blank-input" value={getVal(7)} onChange={(e)=>handleInputChange(7, e.target.value)} /> was wrong.</td>
                    </tr>
                    <tr>
                        <td>' <strong>8.</strong> <input type="text" className="blank-input" value={getVal(8)} onChange={(e)=>handleInputChange(8, e.target.value)} /> '</td>
                        <td>Scene must show <strong>9.</strong> <input type="text" className="blank-input" value={getVal(9)} onChange={(e)=>handleInputChange(9, e.target.value)} /></td>
                        <td>The photograph was too <strong>10.</strong> <input type="text" className="blank-input" value={getVal(10)} onChange={(e)=>handleInputChange(10, e.target.value)} /></td>
                    </tr>
                </tbody>
            </table>
          </div>
        );
      case 2:
        return (
          <div className="test-section">
            <div className="instructions-box">
              <div className="ins-header">Questions 11-12</div>
              <div className="ins-body">Choose <strong>TWO</strong> letters, A-E.</div>
            </div>
            <div className="mcq-item">
                <p>11-12. Which TWO warnings does Dan give about picking mushrooms?</p>
                {['A. Don\'t pick more than one variety at a time.', 'B. Don\'t pick mushrooms near busy roads.', 'C. Don\'t eat mushrooms given to you.', 'D. Don\'t eat mushrooms while picking them.', 'E. Don\'t pick old mushrooms.'].map(opt => (
                    <label key={opt}><input type="checkbox" checked={isSelected(11, 12, opt[0])} onChange={()=>handleMultiSelect(11, 12, opt[0])} /> {opt}</label>
                ))}
            </div>

            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 13-14</div>
              <div className="ins-body">Choose <strong>TWO</strong> letters, A-E.</div>
            </div>
            <div className="mcq-item">
                <p>13-14. Which TWO ideas about wild mushrooms does Dan say are correct?</p>
                {['A. Mushrooms should always be peeled.', 'B. Mushrooms eaten by animals may be unsafe.', 'C. Cooking destroys toxins.', 'D. Brightly coloured mushrooms can be edible.', 'E. All poisonous mushrooms have a bad smell.'].map(opt => (
                    <label key={opt}><input type="checkbox" checked={isSelected(13, 14, opt[0])} onChange={()=>handleMultiSelect(13, 14, opt[0])} /> {opt}</label>
                ))}
            </div>

            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 15-20</div>
              <div className="ins-body">Choose the correct letter, <strong>A, B or C</strong>.</div>
            </div>
            {[
              {q: 15, t: "What advice does Dan give about picking mushrooms in parks?", opts: ["A. Choose wooded areas.", "B. Don't disturb wildlife.", "C. Get there early."]},
              {q: 16, t: "Dan says it is a good idea for beginners to", opts: ["A. use a mushroom app.", "B. join a group.", "C. take a reference book."]},
              {q: 17, t: "What does Dan say is important for conservation?", opts: ["A. selecting only fully grown mushrooms", "B. picking a limited amount", "C. avoiding areas with rare species"]},
              {q: 18, t: "Why are some wild mushrooms in decline?", opts: ["A. huge restaurant demand.", "B. lack of rain.", "C. rise in local building developments."]},
              {q: 19, t: "When storing mushrooms, people should", opts: ["A. keep in fridge for max two days.", "B. keep in brown bag in dark room.", "C. leave them for a period after washing."]},
              {q: 20, t: "What does Dan say about trying new varieties?", opts: ["A. Experiment with different recipes.", "B. Expect strong taste.", "C. Cook for a long time."]}
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
      case 3:
        return (
          <div className="test-section">
            <div className="instructions-box">
              <div className="ins-header">Questions 21-22</div>
              <div className="ins-body">Choose <strong>TWO</strong> letters, A-E.</div>
            </div>
            <div className="mcq-item">
                <p>21-22. Which TWO opinions about the Luddites do the students express?</p>
                {['A. Actions were ineffective.', 'B. Still influential today.', 'C. Received unfair criticism.', 'D. Were proved right.', 'E. Attitude is understandable.'].map(opt => (
                    <label key={opt}><input type="checkbox" checked={isSelected(21, 22, opt[0])} onChange={()=>handleMultiSelect(21, 22, opt[0])} /> {opt}</label>
                ))}
            </div>

            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 23-24</div>
              <div className="ins-body">Choose <strong>TWO</strong> letters, A-E.</div>
            </div>
            <div className="mcq-item">
                <p>23-24. Which TWO predictions about the future of work are the students doubtful about?</p>
                {['A. Work more rewarding.', 'B. Unemployment will fall.', 'C. Delay retiring.', 'D. Working hours shorter.', 'E. Change jobs more frequently.'].map(opt => (
                    <label key={opt}><input type="checkbox" checked={isSelected(23, 24, opt[0])} onChange={()=>handleMultiSelect(23, 24, opt[0])} /> {opt}</label>
                ))}
            </div>

            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 25-30</div>
              <div className="ins-body">What comment do they make about each job? Choose <strong>A-G</strong>.</div>
            </div>
            <div className="matching-container">
                <div className="options-grid">
                    {["A. Likely at risk", "B. More interesting role", "C. Sector numbers fallen dramatically", "D. More qualifications required", "E. Increased jobs due to disposable income", "F. Significant rise in demand", "G. Employment and productivity risen"].map(opt => <div key={opt} className="opt-label">{opt}</div>)}
                </div>
                {[
                  {q: 25, l: "Accountants"}, {q: 26, l: "Hairdressers"}, {q: 27, l: "Administrative staff"},
                  {q: 28, l: "Agricultural workers"}, {q: 29, l: "Care workers"}, {q: 30, l: "Bank clerks"}
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
              <div className="ins-body">Complete the notes. Write <strong>ONE WORD ONLY</strong> for each answer.</div>
            </div>
            <h2 className="section-title">Space Traffic Management</h2>
            <div className="notes-container">
                <p>A Space Traffic Management system would aim to set up legal and <strong>31.</strong> <input type="text" className="blank-input" value={getVal(31)} onChange={(e)=>handleInputChange(31, e.target.value)} /> ways of improving safety.</p>
                <h3>Problems in developing effective STM</h3>
                <ul>
                    <li>Satellites are now quite <strong>32.</strong> <input type="text" className="blank-input" value={getVal(32)} onChange={(e)=>handleInputChange(32, e.target.value)} /> and widespread (e.g. constellations of <strong>33.</strong> <input type="text" className="blank-input" value={getVal(33)} onChange={(e)=>handleInputChange(33, e.target.value)} />).</li>
                    <li>Not required to transmit info for <strong>34.</strong> <input type="text" className="blank-input" value={getVal(34)} onChange={(e)=>handleInputChange(34, e.target.value)} />.</li>
                    <li>Few systems for <strong>35.</strong> <input type="text" className="blank-input" value={getVal(35)} onChange={(e)=>handleInputChange(35, e.target.value)} /> satellites.</li>
                    <li>Operators unwilling to share details for <strong>36.</strong> <input type="text" className="blank-input" value={getVal(36)} onChange={(e)=>handleInputChange(36, e.target.value)} /> or commercial reasons.</li>
                    <li>Hard to collect object's <strong>37.</strong> <input type="text" className="blank-input" value={getVal(37)} onChange={(e)=>handleInputChange(37, e.target.value)} /> at a given time.</li>
                    <li>Scientists can only make a <strong>38.</strong> <input type="text" className="blank-input" value={getVal(38)} onChange={(e)=>handleInputChange(38, e.target.value)} /> about where it goes.</li>
                </ul>
                <h3>Solutions</h3>
                <ul>
                    <li>Information should be combined in one <strong>39.</strong> <input type="text" className="blank-input" value={getVal(39)} onChange={(e)=>handleInputChange(39, e.target.value)} />.</li>
                    <li>Must create <strong>40.</strong> <input type="text" className="blank-input" value={getVal(40)} onChange={(e)=>handleInputChange(40, e.target.value)} /> in its users.</li>
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

export default Listening31;
