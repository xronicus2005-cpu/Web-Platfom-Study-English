import { useState, useEffect, useRef } from "react";
import "../../../styles/listening-style/Listening30.css";
import AnswersPage from "../../answer-page/AnswerPage";

// --- ASSET IMPORTS ---
import fullAudio from "../../../assets/audio/E18T2.mp3";
import photo from "../../../assets/testPhotos/C18T2.png"



const Listening30 = () => {
  const [activePart, setActivePart] = useState(1);
  const [time, setTime] = useState(1800);
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [highlightPopup, setHighlightPopup] = useState({ visible: false, x: 0, y: 0, range: null });

  const audioRef = useRef(null);
  const title = "E18T2";

  const correctAnswers = {
    1: "Training", 2: "Discount", 3: "Taxi", 4: "Service", 5: "English", 6: "Wivenhoe", 7: "Equipment", 8: "9.75", 9: "Deliveries", 10: "Sunday",
    11: ["B", "E"], 12: ["B", "E"], 13: ["B", "C"], 14: ["B", "C"], 15: "G", 16: "C", 17: "D", 18: "B", 19: "H", 20: "A",
    21: "C", 22: "A", 23: "B", 24: "B", 25: ["A", "B"], 26: ["A", "B"], 27: "D", 28: "A", 29: "C", 30: "F",
    31: "Convenient", 32: "Suits", 33: "Tailor", 34: "Profession", 35: "Visible", 36: "String", 37: "Waist", 38: "Perfume", 39: "Image", 40: "Handbag"
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
              <div className="ins-header">Questions 1-5</div>
              <div className="ins-body">Complete the notes below. Write <strong>ONE WORD ONLY</strong> for each answer.</div>
            </div>
            <h2 className="section-title">Working at Milo's Restaurants</h2>
            <div className="notes-container">
                <h3>Benefits</h3>
                <ul>
                    <li><strong>1.</strong> <input type="text" className="blank-input" value={getVal(1)} onChange={(e)=>handleInputChange(1, e.target.value)} /> provided for all staff</li>
                    <li><strong>2.</strong> <input type="text" className="blank-input" value={getVal(2)} onChange={(e)=>handleInputChange(2, e.target.value)} /> during weekdays at all Milo's Restaurants</li>
                    <li><strong>3.</strong> <input type="text" className="blank-input" value={getVal(3)} onChange={(e)=>handleInputChange(3, e.target.value)} /> provided after midnight</li>
                </ul>
                <h3>Person specification</h3>
                <ul>
                    <li>must be prepared to work well in a team</li>
                    <li>must care about maintaining a high standard of <strong>4.</strong> <input type="text" className="blank-input" value={getVal(4)} onChange={(e)=>handleInputChange(4, e.target.value)} /></li>
                    <li>must have a qualification in <strong>5.</strong> <input type="text" className="blank-input" value={getVal(5)} onChange={(e)=>handleInputChange(5, e.target.value)} /></li>
                </ul>
            </div>

            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 6-10</div>
              <div className="ins-body">Complete the table below. Write <strong>ONE WORD AND/OR A NUMBER</strong> for each answer.</div>
            </div>
            <table className="test-table">
                <thead>
                    <tr>
                        <th>Location</th>
                        <th>Job title</th>
                        <th>Responsibilities include</th>
                        <th>Pay and conditions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>6.</strong> <input type="text" className="blank-input" value={getVal(6)} onChange={(e)=>handleInputChange(6, e.target.value)} /> Street</td>
                        <td>Breakfast supervisor</td>
                        <td>Checking portions; Making sure <strong>7.</strong> <input type="text" className="blank-input" value={getVal(7)} onChange={(e)=>handleInputChange(7, e.target.value)} /> is clean</td>
                        <td>Starting salary £ <strong>8.</strong> <input type="text" className="blank-input" value={getVal(8)} onChange={(e)=>handleInputChange(8, e.target.value)} /> per hour</td>
                    </tr>
                    <tr>
                        <td>City Road</td>
                        <td>Junior chef</td>
                        <td>Supporting senior chefs; Maintaining stock and organising <strong>9.</strong> <input type="text" className="blank-input" value={getVal(9)} onChange={(e)=>handleInputChange(9, e.target.value)} /></td>
                        <td>Annual salary £23,000; No work on a <strong>10.</strong> <input type="text" className="blank-input" value={getVal(10)} onChange={(e)=>handleInputChange(10, e.target.value)} /> once a month</td>
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
                <p>11-12. What are the TWO main reasons why this site has been chosen for the housing development?</p>
                {['A. suitable geographical features', 'B. easy access to local facilities', 'C. good airport connections', 'D. land of little agricultural value', 'E. convenient for workers'].map(opt => (
                    <label key={opt}><input type="checkbox" checked={isSelected(11, 12, opt[0])} onChange={()=>handleMultiSelect(11, 12, opt[0])} /> {opt}</label>
                ))}
            </div>

            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 13-14</div>
              <div className="ins-body">Choose <strong>TWO</strong> letters, A-E.</div>
            </div>
            <div className="mcq-item">
                <p>13-14. Which TWO aspects of the planned housing development have people given positive feedback about?</p>
                {['A. facilities for cyclists', 'B. impact on environment', 'C. encouragement of good relations between residents', 'D. low cost of accommodation', 'E. rural location'].map(opt => (
                    <label key={opt}><input type="checkbox" checked={isSelected(13, 14, opt[0])} onChange={()=>handleMultiSelect(13, 14, opt[0])} /> {opt}</label>
                ))}
            </div>

            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 15-20</div>
              <div className="ins-body">Label the map. Choose the correct letter, <strong>A-I</strong>.</div>
            </div>

            <div className="map-image-placeholder">
                <img src={photo} alt="map" className="map-photo"/>
            </div>


            <div className="matching-container">
                {[
                  {q: 15, l: "School"}, {q: 16, l: "Sports centre"}, {q: 17, l: "Clinic"},
                  {q: 18, l: "Community centre"}, {q: 19, l: "Supermarket"}, {q: 20, l: "Playground"}
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
              <div className="ins-body">Choose the correct letter, <strong>A, B or C</strong>.</div>
            </div>
            {[
              {q: 21, t: "Why do the students think the Laki eruption of 1783 is so important?", opts: ["A. most severe modern eruption", "B. led to formal study of volcanoes", "C. profound effect on society"]},
              {q: 22, t: "What surprised Adam about observations made at the time?", opts: ["A. the number of places producing them", "B. the contradictions in them", "C. the lack of scientific data"]},
              {q: 23, t: "According to Michelle, what did contemporary sources say about the Laki haze?", opts: ["A. similar to ordinary fog", "B. associated with health issues", "C. blocked out the sun for weeks"]},
              {q: 24, t: "Adam corrects Michelle when she claims that Benjamin Franklin", opts: ["A. came to wrong conclusion", "B. was the first to identify the reason", "C. supported the opinions of others"]}
            ].map(item => (
              <div key={item.q} className="mcq-item">
                <p>{item.q}. {item.t}</p>
                {item.opts.map(o => (
                  <label key={o}><input type="radio" name={`q${item.q}`} checked={getVal(item.q) === o[0]} onChange={()=>handleInputChange(item.q, o[0])} /> {o}</label>
                ))}
              </div>
            ))}

            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 25-26</div>
              <div className="ins-body">Choose <strong>TWO</strong> letters, A-E.</div>
            </div>
            <div className="mcq-item">
                <p>25-26. Which TWO issues following the Laki eruption surprised the students?</p>
                {['A. how widespread effects were', 'B. how long-lasting effects were', 'C. number of deaths', 'D. speed of ash cloud', 'E. how people ignored signs'].map(opt => (
                    <label key={opt}><input type="checkbox" checked={isSelected(25, 26, opt[0])} onChange={()=>handleMultiSelect(25, 26, opt[0])} /> {opt}</label>
                ))}
            </div>

            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 27-30</div>
              <div className="ins-body">What comment do the students make about the impact on these countries? Choose <strong>A-F</strong>.</div>
            </div>
            <div className="matching-container">

                <div className="options-grid">
                    {["A. This country suffered the most severe loss of life", "B. The impact on agriculture was predictable.", "C. There was a significant increase in deaths of young people.", "D. Animals suffered from a sickness.", "E. This country saw the highest rise in food prices in the world.", "F. It caused a particularly harsh winter."].map(opt => <div key={opt} className="opt-label">{opt}</div>)}
                </div>


                {[
                  {q: 27, l: "Iceland"}, {q: 28, l: "Egypt"}, {q: 29, l: "UK"}, {q: 30, l: "USA"}
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
            <h2 className="section-title">Pockets</h2>
            <div className="notes-container">
                <h3>Reason for choice of subject</h3>
                <ul><li>They are <strong>31.</strong> <input type="text" className="blank-input" value={getVal(31)} onChange={(e)=>handleInputChange(31, e.target.value)} /> but can be overlooked.</li></ul>
                <h3>Pockets in men's clothes</h3>
                <ul>
                    <li>Men started to wear <strong>32.</strong> <input type="text" className="blank-input" value={getVal(32)} onChange={(e)=>handleInputChange(32, e.target.value)} /> in the 18th century.</li>
                    <li>A <strong>33.</strong> <input type="text" className="blank-input" value={getVal(33)} onChange={(e)=>handleInputChange(33, e.target.value)} /> sewed pockets into lining.</li>
                    <li>Bigger pockets for men who belonged to a certain type of <strong>34.</strong> <input type="text" className="blank-input" value={getVal(34)} onChange={(e)=>handleInputChange(34, e.target.value)} />.</li>
                </ul>
                <h3>Pockets in women's clothes</h3>
                <ul>
                    <li>Women's pockets were less <strong>35.</strong> <input type="text" className="blank-input" value={getVal(35)} onChange={(e)=>handleInputChange(35, e.target.value)} /> than men's.</li>
                    <li>Pockets produced in pairs using <strong>36.</strong> <input type="text" className="blank-input" value={getVal(36)} onChange={(e)=>handleInputChange(36, e.target.value)} /> to link them.</li>
                    <li>Hung from the women's <strong>37.</strong> <input type="text" className="blank-input" value={getVal(37)} onChange={(e)=>handleInputChange(37, e.target.value)} /> under skirts.</li>
                    <li>Items such as <strong>38.</strong> <input type="text" className="blank-input" value={getVal(38)} onChange={(e)=>handleInputChange(38, e.target.value)} /> could be reached through a gap.</li>
                    <li>When dresses changed, hidden pockets had negative effect on the <strong>39.</strong> <input type="text" className="blank-input" value={getVal(39)} onChange={(e)=>handleInputChange(39, e.target.value)} /> of women.</li>
                    <li>Women carried a <strong>40.</strong> <input type="text" className="blank-input" value={getVal(40)} onChange={(e)=>handleInputChange(40, e.target.value)} /> eventually.</li>
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

export default Listening30;
