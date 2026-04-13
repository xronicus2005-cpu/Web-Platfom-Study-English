import { useState, useEffect, useRef } from "react";
import "../../../styles/listening-style/Listening4.css"; 
import AnswersPage from "../../answer-page/AnswerPage";

// --- ASSET IMPORTS ---
import photo from "../../../assets/testPhotos/C11T4.png"; 
import fullAudio from "../../../assets/audio/E11T4.mp3"; 

const Listening4 = () => {
  const [activePart, setActivePart] = useState(1);
  const [time, setTime] = useState(0); 
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [highlightPopup, setHighlightPopup] = useState({ visible: false, x: 0, y: 0, range: null });
  
  const audioRef = useRef(null);
  const title = "E11T4";

  const correctAnswers = {
    1: "Secondary", 2: "flute", 3: "cinema", 4: "concert", 5: "market", 6: "Bythwaite", 7: "actor",
    8: "A", 9: "B", 10: "C",
    11: "E", 12: "D", 13: "G", 14: "B", 15: "C", 16: "A",
    17: "F", 18: "H", 19: "C", 20: "B",
    21: ["B", "D"], 22: ["B", "D"], 
    23: ["A", "B"], 24: ["A", "B"], 
    25: ["B", "E"], 26: ["B", "E"],
    27: "C", 28: "A", 29: "A", 30: "C",
    31: "dry", 32: "hard", 33: "sugar", 34: "roots", 35: "moist", 
    36: "variety", 37: "cattle", 38: "gardens", 39: "grasses", 40: "payment"
  };

    const handleMetadata = () => {
    if (audioRef.current) {
      // Sets the countdown to exactly the length of the audio file
      setTime(Math.floor(audioRef.current.duration));
    }
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

  // Logic for Multi-select (21-26)
  const handleMultiSelect = (q1, q2, val) => {
    if (isFinished) return;
    const current = [answers[q1], answers[q2]];
    if (current.includes(val)) {
        if (answers[q1] === val) setAnswers(prev => ({ ...prev, [q1]: "" }));
        else setAnswers(prev => ({ ...prev, [q2]: "" }));
    } else {
        if (!answers[q1]) setAnswers(prev => ({ ...prev, [q1]: val }));
        else if (!answers[q2]) setAnswers(prev => ({ ...prev, [q2]: val }));
    }
  };

  const isSelected = (q1, q2, val) => answers[q1] === val || answers[q2] === val;

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
              <div className="ins-header">Questions 1-7</div>
              <div className="ins-body">Complete the table below. Write <strong>ONE WORD AND/OR A NUMBER</strong> for each answer.</div>
            </div>
            <table className="listening-table">
                <thead>
                    <tr><th>Event</th><th>Cost</th><th>Venue</th><th>Notes</th></tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Jazz band</td>
                        <td>Tickets available for £ <input type="text" disabled className="blank-input" placeholder="15"/></td>
                        <td>The <input type="text" className="blank-input" placeholder="1" value={getVal(1)} onChange={(e)=>handleInputChange(1, e.target.value)} />school</td>
                        <td>Also appearing:Carolyn Hart (plays the <input type="text" placeholder="2" className="blank-input" value={getVal(2)} onChange={(e)=>handleInputChange(2, e.target.value)} />)</td>
                    </tr>
                    <tr>
                        <td>Duck races</td>
                        <td>£1 per duck</td>
                        <td>Start behind the <input type="text" placeholder="3" className="blank-input" value={getVal(3)} onChange={(e)=>handleInputChange(3, e.target.value)} /></td>
                        <td>
                          <li className="inner-li">Prize: tickets for <input type="text" className="blank-input" value={getVal(4)} placeholder="4" onChange={(e)=>handleInputChange(4, e.target.value)} />held at the end of the festival.</li>
                          <li className="inner-li">Ducks can be bought in the <input type="text" placeholder="5" className="blank-input" value={getVal(5)} onChange={(e)=>handleInputChange(5, e.target.value)} /></li>
                        </td>
                    </tr>
                    <tr>
                        <td>Flower show</td>
                        <td>Free</td>
                        <td><input type="text" className="blank-input" value={getVal(6)} placeholder="6" onChange={(e)=>handleInputChange(6, e.target.value)} /> Hall</td>
                        <td>Prizes presented at 5 pm by a well-known <input type="text" placeholder="7" className="blank-input" value={getVal(7)} onChange={(e)=>handleInputChange(7, e.target.value)} /></td>
                    </tr>
                </tbody>
            </table>

            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 8-10</div>
              <div className="ins-body">Who is each play suitable for? Choose <strong>A-C</strong>.</div>
            </div>

            <div className="wrap-grid">
                <div className="options-grid">
                <p className="opt-label">A. mainly for children</p>
                <p className="opt-label">B. mainly for adults</p>
                <p className="opt-label">C. suitable for people of all ages</p>
                
              </div>
            </div>

            <div className="matching-container">
               
                {[8,9,10].map(q => (
                    <div key={q} className="map-q-row">
                        <span>{q}. {q===8 ? "The Mystery of Muldoon" : q===9 ? "Fire and Flood" : "Silly Sailor"}</span>
                        <input type="text" placeholder={q} className="blank-input small" maxLength="1" value={getVal(q)} onChange={(e)=>handleInputChange(q, e.target.value.toUpperCase())} />
                    </div>
                ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="test-section">
            <div className="instructions-box">
              <div className="ins-header">Questions 11-16</div>
              <div className="ins-body">Choose correct letter, <strong>A-G</strong>.</div>
            </div>

            <div className="wrap-grid">
                <div className="options-grid">
                    {["A. was given by one person", "B. was recently publicised in the media", "C. includes some items given by members of the public", "D. includes some items given by the artists", "E. includes the most popular exhibits in the museum", "F. is the largest of its kind in the country", "G. has had some of its contents relocated"].map(opt => <div key={opt} className="opt-label">{opt}</div>)}
                </div>
            </div>


            <div className="matching-container">

                {[11,12,13,14,15,16].map(q => {
                    const n = {11:"20th-and 21st-century paintings", 12:"19th-century paintings", 13:"Sculptures", 14:"'Around world' exhibition", 15:"Coins", 16:"Porcelain and glass"}[q];
                    return (
                        <div key={q} className="map-q-row">
                            <span>{q}. {n}</span>
                            <input type="text" placeholder={q} className="blank-input small" maxLength="1" value={getVal(q)} onChange={(e)=>handleInputChange(q, e.target.value.toUpperCase())} />
                        </div>
                    );
                })}
            </div>

            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 17-20</div>
              <div className="ins-body">Label the plan. Choose <strong>A-H</strong>.</div>
            </div>
            <div className="map-container">
                <img src={photo} alt="Museum Plan" className="map-placeholder" />
                
                {[17,18,19,20].map(q => (
                    <div key={q} className="map-q-row">
                        <span>{q}. {q===17?"restaurant":q===18?"café":q===19?"baby-changing":"cloakroom"}</span>
                        <input type="text" placeholder={q} className="blank-input small" maxLength="1" value={getVal(q)} onChange={(e)=>handleInputChange(q, e.target.value.toUpperCase())} />
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
              <div className="ins-body">Choose <strong>TWO</strong> letters, A-E.</div>
            </div>
            
            <div className="mcq-item">
                <p>21-22. Which TWO characteristics were shared by the subjects of Joanna's psychology study?</p>
                {['A. They had all won prizes for their music.', 'B. They had all made music recordings.', 'C. They were all under 27 years old.', 'D. They had all toured internationally.', 'E. They all played a string instrument.'].map(opt => (
                    <label key={opt}><input type="checkbox" checked={isSelected(21, 22, opt[0])} onChange={()=>handleMultiSelect(21, 22, opt[0])} /> {opt}</label>
                ))}
            </div>

            <div className="mcq-item">
                <p>23-24. Which TWO points does Joanna make about her use of telephone interviews?</p>
                {['A. It meant rich data could be collected.', 'B. It allowed the involvement of top performers.', 'C. It led to a stressful atmosphere at times.', 'D. It meant interview times had to be limited.', 'E. It caused some technical problems.'].map(opt => (
                    <label key={opt}><input type="checkbox" checked={isSelected(23, 24, opt[0])} onChange={()=>handleMultiSelect(23, 24, opt[0])} /> {opt}</label>
                ))}
            </div>

            <div className="mcq-item">
                <p>25-26. Which TWO topics did Joanna originally intend to investigate in her research?</p>
                {['A. regulations concerning concert dress', 'B. audience reactions to the dress of performers', 'C. changes in performer attitudes to concert dress', 'D. how choice of dress relates to performer roles', 'E. links between musical instrument and dress choice'].map(opt => (
                    <label key={opt}><input type="checkbox" checked={isSelected(25, 26, opt[0])} onChange={()=>handleMultiSelect(25, 26, opt[0])} /> {opt}</label>
                ))}
            </div>

            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 27-30</div>
              <div className="ins-body">Choose correct letter, <strong>A, B or C</strong>.</div>
            </div>
            {[
                {q:27, t:"Joanna concentrated on women because", opts:["A. women are more influenced by fashion..", "B.  women's dress has led to more controversy..", "C. women's code of dress is less strict than men's."]},
                {q:28, t:"Mike Frost's article suggests that in popular music, women's dress is affected by", opts:["A. their wish to be taken seriously.", "B. their tendency to copy each other.", "C.  their reaction to the masculine nature of the music."]},
                {q:29, t:"What did Joanna's subjects say about the audience at a performance?", opts:["A. The musicians' choice of clothing is linked to respect for the audience.", "B. The clothing should not distract the audience from the music.", "C.  The audience should make the effort to dress appropriately."]},
                {q:30, t:"According to the speakers, musicians could learn from sports scientists about", opts:["A. the importance of clothing for physical freedom.", "B. the part played by clothing in improving performance.", "C.  the way clothing may protect against physical injury."]}
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
      case 4:
        return (
          <div className="test-section">
            <div className="instructions-box">
              <div className="ins-header">Questions 31-40</div>
              <div className="ins-body">Write <strong>ONE WORD ONLY</strong> for each answer.</div>
            </div>
            <h2 className="section-title">The use of soil to reduce carbon dioxide (CO₂) in the atmosphere</h2>
            <div className="notes-container">

              <h4>Rattan Lal:</h4>
              <ul>
                <li>Claims that 13% of CO₂ in the atmosphere could be absorbed by agricultural soils</li>
                <li>Erosion is more likely in soil that is <input type="text" placeholder="31" className="blank-input" value={getVal(31)} onChange={(e)=>handleInputChange(31, e.target.value)} /></li>
                <li>Lal found soil in Africa was very <input placeholder="32" type="text" className="blank-input" value={getVal(32)} onChange={(e)=>handleInputChange(32, e.target.value)} /></li>
                <li>It was suggested that carbon from soil was entering the atmosphere</li>
              </ul>

              <h4>Soil and carbon:</h4>
              <ul>
                <li>plants turn CO₂ from the air into carbon-based substances such as <input type="text" placeholder="33" className="blank-input" value={getVal(33)} onChange={(e)=>handleInputChange(33, e.target.value)} /></li>
                <li>some CO₂ moves from the <input type="text" placeholder="34" className="blank-input" value={getVal(34)} onChange={(e)=>handleInputChange(34, e.target.value)} /> of plants to microbes in the soil</li>
                <li>carbon was lost from the soil when agriculture was invented</li>
              </ul>

              <h4>Regenerative agriculture:</h4>
              <ul>
                  <li>uses established practices to make sure soil remains fertile and <input placeholder="35" type="text" className="blank-input" value={getVal(35)} onChange={(e)=>handleInputChange(35, e.target.value)} /></li>
                  <li>e.g. through year-round planting and increasing the <input type="text" placeholder="36" className="blank-input" value={getVal(36)} onChange={(e)=>handleInputChange(36, e.target.value)} /> of plants that are grown</li>
              </ul>

              <h4>California study:</h4>
              <ul>
                <li>taking place on a big <input type="text" placeholder="37" className="blank-input" value={getVal(37)} onChange={(e)=>handleInputChange(37, e.target.value)} /> farm.</li>
                <li>uses compost made from waste from agriculture and <input placeholder="38" type="text" className="blank-input" value={getVal(38)} onChange={(e)=>handleInputChange(38, e.target.value)} /></li>
              </ul>

              <h4>Australia study:</h4>
              <ul>
                <li>aims to increase soil carbon by using <input placeholder="39" type="text" className="blank-input" value={getVal(39)} onChange={(e)=>handleInputChange(39, e.target.value)} /> that are always green.</li>
              </ul>
                
                <h4>Future developments may include:</h4>
                <ul>
                  <li>reducing the amount of fertilizer used in farming</li>
                    <li>giving farmers <input placeholder="40" type="text" className="blank-input" value={getVal(40)} onChange={(e)=>handleInputChange(40, e.target.value)} /> for carbon storage, as well as their produce</li>
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
            <audio ref={audioRef} onLoadedMetadata={handleMetadata} autoPlay className="custom-compact-player" controls src={fullAudio}></audio>
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

export default Listening4;