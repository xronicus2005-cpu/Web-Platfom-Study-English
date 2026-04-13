import { useState, useEffect, useRef } from "react";
import "../../../styles/listening-style/Listening36.css";
import AnswersPage from "../../answer-page/AnswerPage";

// --- ASSET IMPORTS ---
import fullAudio from "../../../assets/audio/E19T4.mp3";


const Listening36 = () => {
  const [activePart, setActivePart] = useState(1);
  const [time, setTime] = useState(1800);
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);

  const audioRef = useRef(null);
  const title = "E19T4";

  const correctAnswers = {
    1: "Kaeden", 2: "locker", 3: "passport", 4: "uniform", 5: "third", 6: "0412665903", 7: "yellow", 8: "plastic", 9: "ice", 10: "gloves",
    11: ["C", "E"], 12: ["C", "E"], 13: ["A", "D"], 14: ["A", "D"], 15: "A", 16: "B", 17: "C", 18: "A", 19: "C", 20: "B",
    21: "A", 22: "C", 23: "A", 24: "B", 25: "C", 26: "D", 27: "F", 28: "A", 29: "C", 30: "G",
    31: "competition", 32: "food", 33: "disease", 34: "agriculture", 35: "maps", 36: "cattle", 37: "speed", 38: "monkeys", 39: "fishing", 40: "flooding"
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
              <div className="ins-body">Complete the notes below. Write <strong>ONE WORD AND/OR A NUMBER</strong> for each answer.</div>
            </div>
            <h2 className="section-title">First day at work</h2>
            <div className="notes-container">
                <p>Name of supervisor: <strong>1.</strong> <input type="text" className="blank-input" value={getVal(1)} onChange={(e)=>handleInputChange(1, e.target.value)} /></p>
                <p>Where to leave coat and bag: use <strong>2.</strong> <input type="text" className="blank-input" value={getVal(2)} onChange={(e)=>handleInputChange(2, e.target.value)} /> in staffroom</p>
                <h3>See Tiffany in HR:</h3>
                <ul>
                    <li>to give <strong>3.</strong> <input type="text" className="blank-input" value={getVal(3)} onChange={(e)=>handleInputChange(3, e.target.value)} /> number</li>
                    <li>to collect <strong>4.</strong> <input type="text" className="blank-input" value={getVal(4)} onChange={(e)=>handleInputChange(4, e.target.value)} /></li>
                </ul>
                <p>Location of HR office: on <strong>5.</strong> <input type="text" className="blank-input" value={getVal(5)} onChange={(e)=>handleInputChange(5, e.target.value)} /> floor</p>
                <p>Supervisor's mobile number: <strong>6.</strong> <input type="text" className="blank-input" value={getVal(6)} onChange={(e)=>handleInputChange(6, e.target.value)} /></p>
            </div>

            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 7-10</div>
              <div className="ins-body">Complete the table below. Write <strong>ONE WORD ONLY</strong> for each answer.</div>
            </div>
            <table className="test-table">
                <thead>
                    <tr><th>Section</th><th>Task 1</th><th>Task 2</th><th>Task 3</th></tr>
                </thead>
                <tbody>
                    <tr><td>Bakery section</td><td>Check sell-by dates</td><td>Change price labels</td><td>Use <strong>7.</strong> <input type="text" className="blank-input" value={getVal(7)} onChange={(e)=>handleInputChange(7, e.target.value)} /> labels</td></tr>
                    <tr><td>Sushi counter</td><td>Re-stock with <strong>8.</strong> <input type="text" className="blank-input" value={getVal(8)} onChange={(e)=>handleInputChange(8, e.target.value)} /> boxes</td><td>Wipe preparation area</td><td>Do not clean knives</td></tr>
                    <tr><td>Meat and fish</td><td>Clean serving area</td><td>Collect <strong>9.</strong> <input type="text" className="blank-input" value={getVal(9)} onChange={(e)=>handleInputChange(9, e.target.value)} /> for the fish</td><td>Must wear special <strong>10.</strong> <input type="text" className="blank-input" value={getVal(10)} onChange={(e)=>handleInputChange(10, e.target.value)} /></td></tr>
                </tbody>
            </table>
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
                <p>11-12. Which TWO problems with training programmes for new runners does Liz mention?</p>
                {['A. Risk of serious injury', 'B. Unsuitable for certain age groups', 'C. Unsuitable for health issues', 'D. Difficult to stay motivated', 'E. Lack of individual support'].map(opt => (
                    <label key={opt}><input type="checkbox" checked={isSelected(11, 12, opt[0])} onChange={()=>handleMultiSelect(11, 12, opt[0])} /> {opt}</label>
                ))}
            </div>
            <div className="mcq-item">
                <p>13-14. Which TWO tips does Liz recommend for new runners?</p>
                {['A. doing two runs a week', 'B. running in the evening', 'C. going on runs with a friend', 'D. listening to music during runs', 'E. running very slowly'].map(opt => (
                    <label key={opt}><input type="checkbox" checked={isSelected(13, 14, opt[0])} onChange={()=>handleMultiSelect(13, 14, opt[0])} /> {opt}</label>
                ))}
            </div>
            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 15-18</div>
              <div className="ins-body">What reason prevented joining? Choose <strong>A, B or C</strong>.</div>
            </div>
            <div className="matching-container">
                <p>A. lack of confidence | B. dislike of running | C. lack of time</p>
                {[{q: 15, l: "Ceri"}, {q: 16, l: "James"}, {q: 17, l: "Leo"}, {q: 18, l: "Mark"}].map(item => (
                  <div key={item.q} className="map-q-row">
                    <span>{item.q}. {item.l}</span>
                    <input type="text" className="blank-input small" maxLength="1" value={getVal(item.q)} onChange={(e)=>handleInputChange(item.q, e.target.value.toUpperCase())} />
                  </div>
                ))}
            </div>
            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 19-20</div>
              <div className="ins-body">Choose the correct letter, <strong>A, B or C</strong>.</div>
            </div>
            <div className="mcq-item">
                <p>19. What does Liz say about running her first marathon?</p>
                {['A. ambition', 'B. husband persuaded her', 'C. nearly gave up'].map(o => (
                  <label key={o}><input type="radio" name="q19" checked={getVal(19) === o[0]} onChange={()=>handleInputChange(19, o[0])} /> {o}</label>
                ))}
            </div>
            <div className="mcq-item">
                <p>20. Liz says new runners should sign up for a race</p>
                {['A. every six months', 'B. within a few weeks', 'C. after several practice runs'].map(o => (
                  <label key={o}><input type="radio" name="q20" checked={getVal(20) === o[0]} onChange={()=>handleInputChange(20, o[0])} /> {o}</label>
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
              {q: 21, t: "Kieran thinks packing advice is", opts: ["A. common sense", "B. hard to follow", "C. over-protective"]},
              {q: 22, t: "Jane's books from her grandfather", opts: ["A. not worth keeping", "B. go to collector", "C. sentimental value"]},
              {q: 23, t: "Hardback books should be", opts: ["A. put on display", "B. given as gifts", "C. attractively designed"]},
              {q: 24, t: "Taking a book from a shelf, Jane", opts: ["A. describes mistakes", "B. reflects on childhood", "C. explains removal"]},
              {q: 25, t: "Regarding new books, they suggest", opts: ["A. parents liked buying them", "B. would buy more", "C. not everyone can afford them"]}
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
              <div className="ins-body">Where are the books kept? Choose <strong>A-G</strong>.</div>
            </div>
            <div className="matching-container">

                <div className="options-grid">
                    {["A. near the entrance", "B. in the attic", "C. at the back of the shop", "D. on a high shelf", "E. near the stairs", "F. in a specially designed space", "G. within the cafe"].map(opt => <div key={opt} className="opt-label">{opt}</div>)}
                </div>

                {[{q: 26, l: "rare books"}, {q: 27, l: "children's books"}, {q: 28, l: "unwanted books"}, {q: 29, l: "requested books"}, {q: 30, l: "coursebooks"}].map(item => (
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
            <h2 className="section-title">Tree planting</h2>
            <div className="notes-container">
                <p>Not include invasive species because of <strong>31.</strong> <input type="text" className="blank-input" value={getVal(31)} onChange={(e)=>handleInputChange(31, e.target.value)} /> with native species.</p>
                <p>Provide sustainable sources of <strong>32.</strong> <input type="text" className="blank-input" value={getVal(32)} onChange={(e)=>handleInputChange(32, e.target.value)} /> for local people.</p>
                <p>Increase resistance to <strong>33.</strong> <input type="text" className="blank-input" value={getVal(33)} onChange={(e)=>handleInputChange(33, e.target.value)} /> and climate change.</p>
                <p>Not select land being used for <strong>34.</strong> <input type="text" className="blank-input" value={getVal(34)} onChange={(e)=>handleInputChange(34, e.target.value)} />.</p>
                <h3>Large-scale reforestation</h3>
                <ul>
                    <li>Base planning on accurate <strong>35.</strong> <input type="text" className="blank-input" value={getVal(35)} onChange={(e)=>handleInputChange(35, e.target.value)} />.</li>
                    <li>Drones identify areas endangered by keeping <strong>36.</strong> <input type="text" className="blank-input" value={getVal(36)} onChange={(e)=>handleInputChange(36, e.target.value)} /> and illegal logging.</li>
                </ul>
                <h3>Northern Thailand</h3>
                <ul>
                    <li>Native fig trees planted were important for increasing the <strong>37.</strong> <input type="text" className="blank-input" value={getVal(37)} onChange={(e)=>handleInputChange(37, e.target.value)} /> of recovery.</li>
                    <li>e.g., <strong>38.</strong> <input type="text" className="blank-input" value={getVal(38)} onChange={(e)=>handleInputChange(38, e.target.value)} /> were soon attracted.</li>
                </ul>
                <h3>Local communities</h3>
                <ul>
                    <li>Madagascar destruction made it difficult to live from <strong>39.</strong> <input type="text" className="blank-input" value={getVal(39)} onChange={(e)=>handleInputChange(39, e.target.value)} />.</li>
                    <li>Reforestation protects against risk of <strong>40.</strong> <input type="text" className="blank-input" value={getVal(40)} onChange={(e)=>handleInputChange(40, e.target.value)} />.</li>
                </ul>
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

export default Listening36;
