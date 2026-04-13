import { useState, useEffect, useRef } from "react";
import "../../../styles/listening-style/Listening33.css";
import AnswersPage from "../../answer-page/AnswerPage";

// --- ASSET IMPORTS ---
import fullAudio from "../../../assets/audio/E19T1.mp3";
import photo from "../../../assets/testPhotos/C19T1.png"


const Listening33 = () => {
  const [activePart, setActivePart] = useState(1);
  const [time, setTime] = useState(1800);
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);

  const audioRef = useRef(null);
  const title = "E19T1";

  const correctAnswers = {
    1: "69", 2: "stream", 3: "data", 4: "map", 5: "visitors", 6: "sounds", 7: "freedom", 8: "skills", 9: "4.95", 10: "leaders",
    11: "B", 12: "A", 13: "B", 14: "C", 15: "A", 16: "G", 17: "C", 18: "B", 19: "D", 20: "A",
    21: ["B", "D"], 22: ["B", "D"], 23: ["A", "E"], 24: ["A", "E"], 25: "D", 26: "G", 27: "C", 28: "B", 29: "F", 30: "H",
    31: "walls", 32: "son", 33: "fuel", 34: "oxygen", 35: "rectangular", 36: "lamps", 37: "family", 38: "winter", 39: "soil", 40: "rain"
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
              <div className="ins-header">Questions 1-10</div>
              <div className="ins-body">Complete the notes below. Write <strong>ONE WORD AND/OR A NUMBER</strong> for each answer.</div>
            </div>
            <h2 className="section-title">Hinchingbrooke Country Park</h2>
            <div className="notes-container">
                <h3>The park</h3>
                <ul>
                    <li>Area: <strong>1.</strong> <input type="text" className="blank-input" value={getVal(1)} onChange={(e)=>handleInputChange(1, e.target.value)} /> hectares</li>
                    <li>Habitats: wetland, grassland and woodland</li>
                    <li>Wetland: lakes, ponds and a <strong>2.</strong> <input type="text" className="blank-input" value={getVal(2)} onChange={(e)=>handleInputChange(2, e.target.value)} /></li>
                </ul>
                <h3>Subjects studied in educational visits</h3>
                <ul>
                    <li>Science: Children look at <strong>3.</strong> <input type="text" className="blank-input" value={getVal(3)} onChange={(e)=>handleInputChange(3, e.target.value)} /> about plants, etc.</li>
                    <li>Geography: includes learning to use a <strong>4.</strong> <input type="text" className="blank-input" value={getVal(4)} onChange={(e)=>handleInputChange(4, e.target.value)} /> and compass</li>
                    <li>Leisure and tourism: mostly concentrates on the park's <strong>5.</strong> <input type="text" className="blank-input" value={getVal(5)} onChange={(e)=>handleInputChange(5, e.target.value)} /></li>
                    <li>Music: Children make <strong>6.</strong> <input type="text" className="blank-input" value={getVal(6)} onChange={(e)=>handleInputChange(6, e.target.value)} /> with natural materials.</li>
                </ul>
                <h3>Benefits of outdoor educational visits</h3>
                <ul>
                    <li>They give children a feeling of <strong>7.</strong> <input type="text" className="blank-input" value={getVal(7)} onChange={(e)=>handleInputChange(7, e.target.value)} /> that they may not have elsewhere.</li>
                    <li>Children learn new <strong>8.</strong> <input type="text" className="blank-input" value={getVal(8)} onChange={(e)=>handleInputChange(8, e.target.value)} /> and gain self-confidence.</li>
                </ul>
                <h3>Practical issues</h3>
                <ul>
                    <li>Cost per child: £ <strong>9.</strong> <input type="text" className="blank-input" value={getVal(9)} onChange={(e)=>handleInputChange(9, e.target.value)} /></li>
                    <li>Adults, such as <strong>10.</strong> <input type="text" className="blank-input" value={getVal(10)} onChange={(e)=>handleInputChange(10, e.target.value)} />, free</li>
                </ul>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="test-section">
            <div className="instructions-box">
              <div className="ins-header">Questions 11-15</div>
              <div className="ins-body">Choose the correct letter, <strong>A, B or C</strong>.</div>
            </div>
            <h2 className="section-title">Stanthorpe Twinning Association</h2>
            {[
              {q: 11, t: "During the visit to Malatte, in France, members especially enjoyed", opts: ["A. going to a theme park.", "B. experiencing a river trip.", "C. visiting a cheese factory."]},
              {q: 12, t: "What will happen in Stanthorpe to mark the 25th anniversary?", opts: ["A. A tree will be planted.", "B. A garden seat will be bought.", "C. A footbridge will be built."]},
              {q: 13, t: "Which event raised most funds this year?", opts: ["A. the film show", "B. the pancake evening", "C. the cookery demonstration"]},
              {q: 14, t: "For the first evening with the French visitors, host families are advised to", opts: ["A. take them for a walk.", "B. go to a local restaurant.", "C. have a meal at home."]},
              {q: 15, t: "On Saturday evening there will be the chance to", opts: ["A. listen to a concert.", "B. watch a match.", "C. take part in a competition."]}
            ].map(item => (
              <div key={item.q} className="mcq-item">
                <p>{item.q}. {item.t}</p>
                {item.opts.map(o => (
                  <label key={o}><input type="radio" name={`q${item.q}`} checked={getVal(item.q) === o[0]} onChange={()=>handleInputChange(item.q, o[0])} /> {o}</label>
                ))}
              </div>
            ))}
            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 16-20</div>
              <div className="ins-body">Label the map. Choose the correct letter, <strong>A-H</strong>.</div>
            </div>

            <div className="map-image-placeholder">
                <img src={photo} alt="map" className="map-photo"/>
            </div>

            <div className="matching-container">
                {[
                  {q: 16, l: "Farm shop"}, {q: 17, l: "Disabled entry"}, {q: 18, l: "Adventure playground"},
                  {q: 19, l: "Kitchen gardens"}, {q: 20, l: "The Temple of the Four Winds"}
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
                <p>21-22. Which TWO things did Colin find most satisfying about his bread reuse project?</p>
                {['A. support from local restaurants', 'B. good way to prevent waste', 'C. overcoming problems in a basic process', 'D. experimenting with designs and colours', 'E. learning how to apply 3-D printing'].map(opt => (
                    <label key={opt}><input type="checkbox" checked={isSelected(21, 22, opt[0])} onChange={()=>handleMultiSelect(21, 22, opt[0])} /> {opt}</label>
                ))}
            </div>
            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 23-24</div>
              <div className="ins-body">Choose <strong>TWO</strong> letters, A-E.</div>
            </div>
            <div className="mcq-item">
                <p>23-24. Which TWO ways could touch-sensitive sensors for food labels be developed in future?</p>
                {['A. medical products', 'B. fitness for consumption', 'C. use with drinks', 'D. applications for blind people', 'E. indicate the weight'].map(opt => (
                    <label key={opt}><input type="checkbox" checked={isSelected(23, 24, opt[0])} onChange={()=>handleMultiSelect(23, 24, opt[0])} /> {opt}</label>
                ))}
            </div>
            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 25-30</div>
              <div className="ins-body">What is the students' opinion about these food trends? Choose <strong>A-H</strong>.</div>
            </div>
            <div className="matching-container">

                <div className="options-grid">
                    {["A. This is only relevant to young people.", "B. This may have disappointing results.", "C. This already seems to be widespread.", "D. Retailers should do more to encourage this.", "E. More financial support is needed for this.", "F. Most people know little about this.", "G. There should be stricter regulations about this.", "H. This could be dangerous."].map(opt => <div key={opt} className="opt-label">{opt}</div>)}
                </div>

                {[
                  {q: 25, l: "Use of local products"}, {q: 26, l: "Reduction in unnecessary packaging"},
                  {q: 27, l: "Gluten-free and lactose-free food"}, {q: 28, l: "Branded products from chefs"},
                  {q: 29, l: "Ghost kitchens for takeaway"}, {q: 30, l: "Mushrooms for health concerns"}
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
            <h2 className="section-title">Céide Fields</h2>
            <div className="notes-container">
                <h3>Discovery</h3>
                <ul>
                    <li>In the 1930s, a teacher realised stones beneath the bog were once <strong>31.</strong> <input type="text" className="blank-input" value={getVal(31)} onChange={(e)=>handleInputChange(31, e.target.value)} />.</li>
                    <li>His <strong>32.</strong> <input type="text" className="blank-input" value={getVal(32)} onChange={(e)=>handleInputChange(32, e.target.value)} /> undertook an investigation.</li>
                    <li>Traditional method used to dig for <strong>33.</strong> <input type="text" className="blank-input" value={getVal(33)} onChange={(e)=>handleInputChange(33, e.target.value)} /> was used to find stones.</li>
                    <li>Items well preserved because of a lack of <strong>34.</strong> <input type="text" className="blank-input" value={getVal(34)} onChange={(e)=>handleInputChange(34, e.target.value)} />.</li>
                </ul>
                <h3>Neolithic farmers</h3>
                <ul>
                    <li>Houses were <strong>35.</strong> <input type="text" className="blank-input" value={getVal(35)} onChange={(e)=>handleInputChange(35, e.target.value)} /> in shape.</li>
                    <li>Pots were used to make <strong>36.</strong> <input type="text" className="blank-input" value={getVal(36)} onChange={(e)=>handleInputChange(36, e.target.value)} />.</li>
                    <li>Each field supported a big <strong>37.</strong> <input type="text" className="blank-input" value={getVal(37)} onChange={(e)=>handleInputChange(37, e.target.value)} />.</li>
                    <li>No structures to house animals during <strong>38.</strong> <input type="text" className="blank-input" value={getVal(38)} onChange={(e)=>handleInputChange(38, e.target.value)} />.</li>
                </ul>
                <h3>Decline in farming</h3>
                <ul>
                    <li>A decline in <strong>39.</strong> <input type="text" className="blank-input" value={getVal(39)} onChange={(e)=>handleInputChange(39, e.target.value)} /> quality.</li>
                    <li>An increase in <strong>40.</strong> <input type="text" className="blank-input" value={getVal(40)} onChange={(e)=>handleInputChange(40, e.target.value)} />.</li>
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

export default Listening33;
