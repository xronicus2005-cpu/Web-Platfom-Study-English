import { useState, useEffect, useRef } from "react";
import "../../../styles/listening-style/Listening29.css";
import AnswersPage from "../../answer-page/AnswerPage";

// --- ASSET IMPORTS ---
import fullAudio from "../../../assets/audio/E18T1.mp3";


const Listening29 = () => {
  const [activePart, setActivePart] = useState(1);
  const [time, setTime] = useState(1800);
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [highlightPopup, setHighlightPopup] = useState({ visible: false, x: 0, y: 0, range: null });

  const audioRef = useRef(null);
  const title = "E18T1";

  const correctAnswers = {
    1: "DW30 7YZ", 2: "24th April", 3: "dentist", 4: "parking", 5: "Claxby", 6: "late", 7: "evening", 8: "supermarket", 9: "pollution", 10: "storage",
    11: "C", 12: "A", 13: "A", 14: ["B", "E"], 15: ["B", "E"], 16: "B", 17: "G", 18: "D", 19: "A", 20: "F",
    21: "A", 22: "B", 23: "A", 24: "C", 25: "B", 26: "A", 27: ["B", "E"], 28: ["B", "E"], 29: ["A", "C"], 30: ["A", "C"],
    31: "fences", 32: "family", 33: "helicopters", 34: "stress", 35: "sides", 36: "breathing", 37: "feet", 38: "employment", 39: "weapons", 40: "tourism"
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
            <h2 className="section-title">Transport survey</h2>
            <div className="notes-container">
                <p><strong>Name:</strong> Sadie Jones</p>
                <p><strong>Year of birth:</strong> 1991</p>
                <p><strong>Postcode:</strong> <strong>1.</strong> <input type="text" className="blank-input" value={getVal(1)} onChange={(e)=>handleInputChange(1, e.target.value)} /></p>

                <h3>Travelling by bus</h3>
                <ul>
                    <li>Date of bus journey: <strong>2.</strong> <input type="text" className="blank-input" value={getVal(2)} onChange={(e)=>handleInputChange(2, e.target.value)} /></li>
                    <li>Reason for trip: shopping and visit to the <strong>3.</strong> <input type="text" className="blank-input" value={getVal(3)} onChange={(e)=>handleInputChange(3, e.target.value)} /></li>
                    <li>Travelled by bus because cost of <strong>4.</strong> <input type="text" className="blank-input" value={getVal(4)} onChange={(e)=>handleInputChange(4, e.target.value)} /> too high</li>
                    <li>Got on bus at <strong>5.</strong> <input type="text" className="blank-input" value={getVal(5)} onChange={(e)=>handleInputChange(5, e.target.value)} /> Street</li>
                </ul>

                <h3>Complaints about bus service:</h3>
                <ul>
                    <li>bus today was <strong>6.</strong> <input type="text" className="blank-input" value={getVal(6)} onChange={(e)=>handleInputChange(6, e.target.value)} /></li>
                    <li>frequency of buses in the <strong>7.</strong> <input type="text" className="blank-input" value={getVal(7)} onChange={(e)=>handleInputChange(7, e.target.value)} /></li>
                </ul>

                <h3>Travelling by car</h3>
                <ul>
                    <li>Goes to the <strong>8.</strong> <input type="text" className="blank-input" value={getVal(8)} onChange={(e)=>handleInputChange(8, e.target.value)} /> by car</li>
                </ul>

                <h3>Travelling by bicycle</h3>
                <ul>
                    <li>Dislikes travelling by bike in the city centre because of the <strong>9.</strong> <input type="text" className="blank-input" value={getVal(9)} onChange={(e)=>handleInputChange(9, e.target.value)} /></li>
                    <li>Doesn't own a bike because of a lack of <strong>10.</strong> <input type="text" className="blank-input" value={getVal(10)} onChange={(e)=>handleInputChange(10, e.target.value)} /></li>
                </ul>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="test-section">
            <div className="instructions-box">
              <div className="ins-header">Questions 11-13</div>
              <div className="ins-body">Choose the correct letter, <strong>A, B or C</strong>.</div>
            </div>
            <h2 className="section-title">Becoming a volunteer for ACE</h2>
            {[
              {q: 11, t: "Why does the speaker apologise about the seats?", opts: ["A. They are too small.", "B. There are not enough of them.", "C. Some of them are very close together."]},
              {q: 12, t: "What does the speaker say about the age of volunteers?", opts: ["A. The age of volunteers is less important than other factors.", "B. Young volunteers are less reliable than older ones.", "C. Most volunteers are about 60 years old."]},
              {q: 13, t: "What does the speaker say about training?", opts: ["A. It is continuous.", "B. It is conducted by a manager.", "C. It takes place online."]}
            ].map(item => (
              <div key={item.q} className="mcq-item">
                <p>{item.q}. {item.t}</p>
                {item.opts.map(o => (
                  <label key={o}><input type="radio" name={`q${item.q}`} checked={getVal(item.q) === o[0]} onChange={()=>handleInputChange(item.q, o[0])} /> {o}</label>
                ))}
              </div>
            ))}

            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 14-15</div>
              <div className="ins-body">Choose <strong>TWO</strong> letters, A-E.</div>
            </div>
            <div className="mcq-item">
                <p>14-15. Which TWO issues does the speaker ask the audience to consider before they apply?</p>
                {['A. financial situation', 'B. level of commitment', 'C. work experience', 'D. ambition', 'E. availability'].map(opt => (
                    <label key={opt}><input type="checkbox" checked={isSelected(14, 15, opt[0])} onChange={()=>handleMultiSelect(14, 15, opt[0])} /> {opt}</label>
                ))}
            </div>

            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 16-20</div>
              <div className="ins-body">What would be helpful for each area? Choose <strong>A-G</strong>.</div>
            </div>
            <div className="matching-container">
                <div className="options-grid">
                    {["A. Experience on stage", "B. Original, new ideas", "C. Parenting skills", "D. Understanding of food", "E. Retail experience", "F. Good memory", "G. Good fitness"].map(opt => <div key={opt} className="opt-label">{opt}</div>)}
                </div>
                {[
                  {q: 16, l: "Fundraising"}, {q: 17, l: "Litter collection"}, {q: 18, l: "'Playmates'"},
                  {q: 19, l: "Story club"}, {q: 20, l: "First aid"}
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
            <h2 className="section-title">Talk on jobs in fashion design</h2>
            {[
              {q: 21, t: "What problem did Chantal have at the start of the talk?", opts: ["A. View blocked.", "B. Unable to find seat.", "C. Students talking."]},
              {q: 22, t: "What were Hugo and Chantal surprised to hear?", opts: ["A. More competitive.", "B. More variety.", "C. Some areas more exciting."]},
              {q: 23, t: "Hugo and Chantal agree that the speaker's message was", opts: ["A. unfair to them at times.", "B. hard for them to follow.", "C. critical of the industry."]},
              {q: 24, t: "What do Hugo and Chantal criticise about school careers advice?", opts: ["A. when received", "B. how much given", "C. who gave the advice"]},
              {q: 25, t: "When discussing their future, Hugo and Chantal disagree on", opts: ["A. best career.", "B. when to choose.", "C. why they would like it."]},
              {q: 26, t: "How does Hugo feel about being an unpaid assistant?", opts: ["A. Realistic.", "B. Dishonest.", "C. Others want change."]}
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
                <p>27-28. Which TWO mistakes did the speaker admit she made in her first job?</p>
                {['A. Dishonest to employer', 'B. Attention to looks', 'C. Expecting fame', 'D. Trying to earn a lot', 'E. Openly disliking client'].map(opt => (
                    <label key={opt}><input type="checkbox" checked={isSelected(27, 28, opt[0])} onChange={()=>handleMultiSelect(27, 28, opt[0])} /> {opt}</label>
                ))}
            </div>
            <div className="mcq-item">
                <p>29-30. Which TWO pieces of retail info do they agree would be useful?</p>
                {['A. Reasons for returns', 'B. Time to shop', 'C. Designs people can\'t find', 'D. Best time for buying', 'E. Popular sizes'].map(opt => (
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
            <h2 className="section-title">Elephant translocation</h2>
            <div className="notes-container">
                <h3>Problems caused by elephant overpopulation</h3>
                <ul>
                    <li>greater competition, causing hunger</li>
                    <li>damage to <strong>31.</strong> <input type="text" className="blank-input" value={getVal(31)} onChange={(e)=>handleInputChange(31, e.target.value)} /> in the park</li>
                </ul>
                <h3>The translocation process</h3>
                <ul>
                    <li>a suitable group from the same <strong>32.</strong> <input type="text" className="blank-input" value={getVal(32)} onChange={(e)=>handleInputChange(32, e.target.value)} /> was selected</li>
                    <li>vets used <strong>33.</strong> <input type="text" className="blank-input" value={getVal(33)} onChange={(e)=>handleInputChange(33, e.target.value)} /> to guide the elephants</li>
                    <li>immobilised with tranquilisers</li>
                    <li>process had to be completed quickly to reduce <strong>34.</strong> <input type="text" className="blank-input" value={getVal(34)} onChange={(e)=>handleInputChange(34, e.target.value)} /></li>
                    <li>elephants had to be turned on their <strong>35.</strong> <input type="text" className="blank-input" value={getVal(35)} onChange={(e)=>handleInputChange(35, e.target.value)} /> to avoid lung damage</li>
                    <li>elephants' <strong>36.</strong> <input type="text" className="blank-input" value={getVal(36)} onChange={(e)=>handleInputChange(36, e.target.value)} /> had to be monitored constantly</li>
                    <li>data including the size of their tusks and <strong>37.</strong> <input type="text" className="blank-input" value={getVal(37)} onChange={(e)=>handleInputChange(37, e.target.value)} /> was taken</li>
                </ul>
                <h3>Advantages of translocation</h3>
                <ul>
                    <li><strong>38.</strong> <input type="text" className="blank-input" value={getVal(38)} onChange={(e)=>handleInputChange(38, e.target.value)} /> opportunities</li>
                    <li>reduction in the number of poachers and <strong>39.</strong> <input type="text" className="blank-input" value={getVal(39)} onChange={(e)=>handleInputChange(39, e.target.value)} /></li>
                    <li>increase in <strong>40.</strong> <input type="text" className="blank-input" value={getVal(40)} onChange={(e)=>handleInputChange(40, e.target.value)} /> as contributor to GDP</li>
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

export default Listening29;
