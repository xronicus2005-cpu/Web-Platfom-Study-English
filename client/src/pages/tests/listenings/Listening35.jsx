import { useState, useEffect, useRef } from "react";
import "../../../styles/listening-style/Listening35.css";
import AnswersPage from "../../answer-page/AnswerPage";

// --- ASSET IMPORTS ---
import fullAudio from "../../../assets/audio/E19T3.mp3";


const Listening35 = () => {
  const [activePart, setActivePart] = useState(1);
  const [time, setTime] = useState(1800);
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);

  const audioRef = useRef(null);
  const title = "E19T3";

  const correctAnswers = {
    1: "harbour", 2: "bridge", 3: "3.30", 4: "Rose", 5: "sign", 6: "purple", 7: "samphire", 8: "melon", 9: "coconut", 10: "strawberry",
    11: "C", 12: "D", 13: "F", 14: "G", 15: "B", 16: "H", 17: ["D", "E"], 18: ["D", "E"], 19: ["B", "C"], 20: ["B", "C"],
    21: "C", 22: "B", 23: "A", 24: "A", 25: "C", 26: "C", 27: "H", 28: "E", 29: "B", 30: "F",
    31: "clothing", 32: "mouths", 33: "salt", 34: "toothpaste", 35: "fertilisers", 36: "nutrients", 37: "growth", 38: "weight", 39: "acid", 40: "society"
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
            <h2 className="section-title">Local food shops</h2>
            <div className="notes-container">
                <h3>Where to go</h3>
                <ul>
                    <li>Kite Place - near the <strong>1.</strong> <input type="text" className="blank-input" value={getVal(1)} onChange={(e)=>handleInputChange(1, e.target.value)} /></li>
                </ul>
                <h3>Fish market</h3>
                <ul>
                    <li>cross the <strong>2.</strong> <input type="text" className="blank-input" value={getVal(2)} onChange={(e)=>handleInputChange(2, e.target.value)} /> and turn right</li>
                    <li>best to go before <strong>3.</strong> <input type="text" className="blank-input" value={getVal(3)} onChange={(e)=>handleInputChange(3, e.target.value)} /> pm, earlier than closing time</li>
                </ul>
                <h3>Organic shop</h3>
                <ul>
                    <li>called ' <strong>4.</strong> <input type="text" className="blank-input" value={getVal(4)} onChange={(e)=>handleInputChange(4, e.target.value)} /> '</li>
                    <li>below a restaurant in the large, grey building</li>
                    <li>look for the large <strong>5.</strong> <input type="text" className="blank-input" value={getVal(5)} onChange={(e)=>handleInputChange(5, e.target.value)} /> outside</li>
                </ul>
                <h3>Supermarket</h3>
                <ul>
                    <li>take a <strong>6.</strong> <input type="text" className="blank-input" value={getVal(6)} onChange={(e)=>handleInputChange(6, e.target.value)} /> minibus, number 289</li>
                </ul>
            </div>

            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 7-10</div>
              <div className="ins-body">Complete the table below. Write <strong>ONE WORD ONLY</strong> for each answer.</div>
            </div>
            <table className="test-table">
                <thead>
                    <tr><th>Shop</th><th>To buy</th><th>Other ideas</th></tr>
                </thead>
                <tbody>
                    <tr><td>Fish market</td><td>a dozen prawns</td><td>a handful of <strong>7.</strong> <input type="text" className="blank-input" value={getVal(7)} onChange={(e)=>handleInputChange(7, e.target.value)} /> (type of seaweed)</td></tr>
                    <tr><td>Organic shop</td><td>beans and a <strong>8.</strong> <input type="text" className="blank-input" value={getVal(8)} onChange={(e)=>handleInputChange(8, e.target.value)} /> for dessert</td><td>spices and <strong>9.</strong> <input type="text" className="blank-input" value={getVal(9)} onChange={(e)=>handleInputChange(9, e.target.value)} /></td></tr>
                    <tr><td>Bakery</td><td>a brown loaf</td><td>A <strong>10.</strong> <input type="text" className="blank-input" value={getVal(10)} onChange={(e)=>handleInputChange(10, e.target.value)} /> tart</td></tr>
                </tbody>
            </table>
          </div>
        );
      case 2:
        return (
          <div className="test-section">
            <div className="instructions-box">
              <div className="ins-header">Questions 11-16</div>
              <div className="ins-body">Choose the correct letter, <strong>A-H</strong>, for each workshop.</div>
            </div>
            <div className="matching-container">
                <div className="options-grid">
                    {["A. Painting and drawing", "B. Prize-winning author", "C. Children with a disability", "D. Drama activity", "E. New relationships", "F. Specific age group", "G. Unhappy feeling", "H. Particular culture"].map(opt => <div key={opt} className="opt-label">{opt}</div>)}
                </div>
                {[
                  {q: 11, l: "Superheroes"}, {q: 12, l: "Just do it"}, {q: 13, l: "Count on me"},
                  {q: 14, l: "Speak up"}, {q: 15, l: "Jump for joy"}, {q: 16, l: "Sticks and stones"}
                ].map(item => (
                  <div key={item.q} className="map-q-row">
                    <span>{item.q}. {item.l}</span>
                    <input type="text" className="blank-input small" maxLength="1" value={getVal(item.q)} onChange={(e)=>handleInputChange(item.q, e.target.value.toUpperCase())} />
                  </div>
                ))}
            </div>
            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 17-20</div>
              <div className="ins-body">Choose <strong>TWO</strong> letters for each set.</div>
            </div>
            <div className="mcq-item">
                <p>17-18. Which TWO reasons are given for recommending <em>Alive and Kicking</em>?</p>
                {['A. Appeal to both boys and girls.', 'B. Author is well known.', 'C. Colourful illustrations.', 'D. It is funny.', 'E. Deals with an important topic.'].map(opt => (
                    <label key={opt}><input type="checkbox" checked={isSelected(17, 18, opt[0])} onChange={()=>handleMultiSelect(17, 18, opt[0])} /> {opt}</label>
                ))}
            </div>
            <div className="mcq-item">
                <p>19-20. Which TWO pieces of advice are given to parents about reading?</p>
                {['A. Write down new vocabulary.', 'B. Allow audio books.', 'C. Get librarian recommendations.', 'D. Give choice of reading material.', 'E. Only read aloud until they are independent.'].map(opt => (
                    <label key={opt}><input type="checkbox" checked={isSelected(19, 20, opt[0])} onChange={()=>handleMultiSelect(19, 20, opt[0])} /> {opt}</label>
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
              {q: 21, t: "How does Clare feel about the students?", opts: ["A. worried about progress", "B. challenged by behaviour", "C. frustrated at lack of interest"]},
              {q: 22, t: "How does Jake react to diet experiment suggestion?", opts: ["A. concerned results not meaningful", "B. data might be hard to obtain", "C. conclusions might be upsetting"]},
              {q: 23, t: "Problem with animal experiment?", opts: ["A. may not apply to humans", "B. complicated permission", "C. students unhappy about animals"]},
              {q: 24, t: "What question should the experiment address?", opts: ["A. Can mice control food intake?", "B. Sugar lead to health problems?", "C. How do supplements affect health?"]},
              {q: 25, t: "Clare might also consider involving", opts: ["A. other food supplements", "B. different genetic strains", "C. varying amounts of exercise"]}
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
              <div className="ins-body">Complete the flowchart. Choose <strong>A-H</strong>.</div>
            </div>
            <div className="flowchart-box">
                <p>Choose mice which are all the same <strong>26.</strong> <input type="text" className="blank-input small" maxLength="1" value={getVal(26)} onChange={(e)=>handleInputChange(26, e.target.value.toUpperCase())} /></p>
                <p>↓</p>
                <p>Divide mice into two groups, each with a different <strong>27.</strong> <input type="text" className="blank-input small" maxLength="1" value={getVal(27)} onChange={(e)=>handleInputChange(27, e.target.value.toUpperCase())} /></p>
                <p>↓</p>
                <p>Feed group B sugar contained in <strong>28.</strong> <input type="text" className="blank-input small" maxLength="1" value={getVal(28)} onChange={(e)=>handleInputChange(28, e.target.value.toUpperCase())} /></p>
                <p>↓</p>
                <p>Place in weighing chamber to prevent <strong>29.</strong> <input type="text" className="blank-input small" maxLength="1" value={getVal(29)} onChange={(e)=>handleInputChange(29, e.target.value.toUpperCase())} /></p>
                <p>↓</p>
                <p>Do all necessary <strong>30.</strong> <input type="text" className="blank-input small" maxLength="1" value={getVal(30)} onChange={(e)=>handleInputChange(30, e.target.value.toUpperCase())} /></p>
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
            <h2 className="section-title">Microplastics</h2>
            <div className="notes-container">
                <p>Source: fibres from some <strong>31.</strong> <input type="text" className="blank-input" value={getVal(31)} onChange={(e)=>handleInputChange(31, e.target.value)} /> during washing.</p>
                <h3>Effects</h3>
                <ul>
                    <li>Injuries to the <strong>32.</strong> <input type="text" className="blank-input" value={getVal(32)} onChange={(e)=>handleInputChange(32, e.target.value)} /> of wildlife.</li>
                    <li>Enter food chain via water, <strong>33.</strong> <input type="text" className="blank-input" value={getVal(33)} onChange={(e)=>handleInputChange(33, e.target.value)} /> and seafood.</li>
                    <li>Banned in skin cleaning and <strong>34.</strong> <input type="text" className="blank-input" value={getVal(34)} onChange={(e)=>handleInputChange(34, e.target.value)} />.</li>
                    <li>Enter soil through air, rain and <strong>35.</strong> <input type="text" className="blank-input" value={getVal(35)} onChange={(e)=>handleInputChange(35, e.target.value)} />.</li>
                </ul>
                <h3>Study on Earthworms</h3>
                <ul>
                    <li>Earthworms add <strong>36.</strong> <input type="text" className="blank-input" value={getVal(36)} onChange={(e)=>handleInputChange(36, e.target.value)} /> to soil.</li>
                    <li>Effect on the <strong>37.</strong> <input type="text" className="blank-input" value={getVal(37)} onChange={(e)=>handleInputChange(37, e.target.value)} /> of plants.</li>
                    <li>Found <strong>38.</strong> <input type="text" className="blank-input" value={getVal(38)} onChange={(e)=>handleInputChange(38, e.target.value)} /> loss in earthworms.</li>
                    <li>Found rise in level of <strong>39.</strong> <input type="text" className="blank-input" value={getVal(39)} onChange={(e)=>handleInputChange(39, e.target.value)} /> in soil.</li>
                    <li>Changes damage both ecosystems and <strong>40.</strong> <input type="text" className="blank-input" value={getVal(40)} onChange={(e)=>handleInputChange(40, e.target.value)} />.</li>
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

export default Listening35;
