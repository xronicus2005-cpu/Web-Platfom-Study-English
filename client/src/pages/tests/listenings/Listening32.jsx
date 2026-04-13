import { useState, useEffect, useRef } from "react";
import "../../../styles/listening-style/Listening32.css";
import AnswersPage from "../../answer-page/AnswerPage";

// --- ASSET IMPORTS ---
import fullAudio from "../../../assets/audio/E18T4.mp3";


const Listening32 = () => {
  const [activePart, setActivePart] = useState(1);
  const [time, setTime] = useState(1800);
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);

  const audioRef = useRef(null);
  const title = "E18T4";

  const correctAnswers = {
    1: "Receptionist", 2: "Medical", 3: "Chastens", 4: "Appointments", 5: "Database", 6: "Experience", 7: "Confidence", 8: "Temporary", 9: "1.15", 10: "Parking",
    11: "B", 12: "A", 13: "A", 14: "C", 15: "F", 16: "G", 17: "E", 18: "A", 19: "C", 20: "B",
    21: ["B", "D"], 22: ["B", "D"], 23: "D", 24: "A", 25: "C", 26: "G", 27: "F", 28: "A", 29: "B", 30: "C",
    31: "Plot", 32: "Poverty", 33: "Europe", 34: "Poetry", 35: "Drawings", 36: "Furniture", 37: "Lamps", 38: "Harbour", 39: "Children", 40: "Relatives"
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
            <h2 className="section-title">Job details from employment agency</h2>
            <div className="notes-container">
                <p><strong>Role:</strong> <strong>1.</strong> <input type="text" className="blank-input" value={getVal(1)} onChange={(e)=>handleInputChange(1, e.target.value)} /></p>
                <h3>Location</h3>
                <ul>
                    <li>Fordham <strong>2.</strong> <input type="text" className="blank-input" value={getVal(2)} onChange={(e)=>handleInputChange(2, e.target.value)} /> Centre</li>
                    <li><strong>3.</strong> <input type="text" className="blank-input" value={getVal(3)} onChange={(e)=>handleInputChange(3, e.target.value)} /> Road, Fordham</li>
                </ul>
                <h3>Work involves</h3>
                <ul>
                    <li>dealing with enquiries</li>
                    <li>making <strong>4.</strong> <input type="text" className="blank-input" value={getVal(4)} onChange={(e)=>handleInputChange(4, e.target.value)} /> and reorganising them</li>
                    <li>maintaining the internal <strong>5.</strong> <input type="text" className="blank-input" value={getVal(5)} onChange={(e)=>handleInputChange(5, e.target.value)} /></li>
                    <li>general administration</li>
                </ul>
                <h3>Requirements</h3>
                <ul>
                    <li><strong>6.</strong> <input type="text" className="blank-input" value={getVal(6)} onChange={(e)=>handleInputChange(6, e.target.value)} /> (essential)</li>
                    <li>a calm and <strong>7.</strong> <input type="text" className="blank-input" value={getVal(7)} onChange={(e)=>handleInputChange(7, e.target.value)} /> manner</li>
                    <li>good IT skills</li>
                </ul>
                <h3>Other information</h3>
                <ul>
                    <li>a <strong>8.</strong> <input type="text" className="blank-input" value={getVal(8)} onChange={(e)=>handleInputChange(8, e.target.value)} /> job - further opportunities may be available</li>
                    <li>hours: 7.45 a.m. to <strong>9.</strong> <input type="text" className="blank-input" value={getVal(9)} onChange={(e)=>handleInputChange(9, e.target.value)} /> p.m. Monday to Friday</li>
                    <li><strong>10.</strong> <input type="text" className="blank-input" value={getVal(10)} onChange={(e)=>handleInputChange(10, e.target.value)} /> is available onsite</li>
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
            {[
              {q: 11, t: "The museum building was originally", opts: ["A. a factory.", "B. a private home.", "C. a hall of residence."]},
              {q: 12, t: "The university uses part of the museum building as", opts: ["A. teaching rooms.", "B. a research library.", "C. administration offices."]},
              {q: 13, t: "What does the guide say about the entrance fee?", opts: ["A. Visitors decide whether or not they wish to pay.", "B. Only children and students receive a discount.", "C. The museum charges extra for special exhibitions."]},
              {q: 14, t: "What are visitors advised to leave in the cloakroom?", opts: ["A. cameras", "B. coats", "C. bags"]}
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
              <div className="ins-body">Choose the correct letter, <strong>A-H</strong>, for each area.</div>
            </div>
            <div className="matching-container">
                <div className="options-grid">
                    {["A. Parents must supervise", "B. New things to see", "C. Closed today", "D. School groups only", "E. Quiz for visitors", "F. Created by students", "G. Expert here today", "H. One-way system"].map(opt => <div key={opt} className="opt-label">{opt}</div>)}
                </div>
                {[
                  {q: 15, l: "Four Seasons"}, {q: 16, l: "Farmhouse Kitchen"}, {q: 17, l: "A Year on the Farm"},
                  {q: 18, l: "Wagon Walk"}, {q: 19, l: "Bees are Magic"}, {q: 20, l: "The Pond"}
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
                <p>21-22. Which TWO educational skills were shown in the video of children doing origami?</p>
                {['A. solving problems', 'B. following instructions', 'C. working cooperatively', 'D. learning through play', 'E. developing hand-eye coordination'].map(opt => (
                    <label key={opt}><input type="checkbox" checked={isSelected(21, 22, opt[0])} onChange={()=>handleMultiSelect(21, 22, opt[0])} /> {opt}</label>
                ))}
            </div>
            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 23-27</div>
              <div className="ins-body">Which comment do the students make about each child? Choose <strong>A-G</strong>.</div>
            </div>


            <div className="matching-container">

                <div className="options-grid">
                    {[ "A. demonstrated independence", "B. asked for teacher support", "C. developed a competitive attitude", "D. seemed to find the activity calming", "E. seemed pleased with the results", "F. seemed confused",  "G. seemed to find the activity easy"].map(opt => <div key={opt} className="opt-label">{opt}</div>)}
                </div>

                {[
                  {q: 23, l: "Sid"}, {q: 24, l: "Jack"}, {q: 25, l: "Naomi"}, {q: 26, l: "Anya"}, {q: 27, l: "Zara"}
                ].map(item => (
                  <div key={item.q} className="map-q-row">
                    <span>{item.q}. {item.l}</span>
                    <input type="text" className="blank-input small" maxLength="1" value={getVal(item.q)} onChange={(e)=>handleInputChange(item.q, e.target.value.toUpperCase())} />
                  </div>
                ))}
            </div>
            <div className="instructions-box" style={{marginTop: '30px'}}>
              <div className="ins-header">Questions 28-30</div>
              <div className="ins-body">Choose the correct letter, <strong>A, B or C</strong>.</div>
            </div>
            {[
              {q: 28, t: "Before starting an origami activity, the students think it is important for the teacher to", opts: ["A. make models demonstrating stages.", "B. check understanding of terminology.", "C. tell children not to worry."]},
              {q: 29, t: "The students agree that some teachers might be unwilling to use origami because", opts: ["A. they don't think crafts are important.", "B. they may not have necessary skills.", "C. they worry it takes too much time."]},
              {q: 30, t: "Why do the students decide to use origami in their maths teaching practice?", opts: ["A. to correct a misunderstanding", "B. to set a challenge", "C. to introduce a new concept"]}
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
              <div className="ins-body">Complete the notes. Write <strong>ONE WORD ONLY</strong> for each answer.</div>
            </div>
            <h2 className="section-title">Victor Hugo</h2>
            <div className="notes-container">
                <p>His novel, <em>Les Miserables</em>: We know more about its overall <strong>31.</strong> <input type="text" className="blank-input" value={getVal(31)} onChange={(e)=>handleInputChange(31, e.target.value)} /> than about its author.</p>
                <h3>His early career</h3>
                <ul>
                    <li>He spoke publicly about social issues, such as <strong>32.</strong> <input type="text" className="blank-input" value={getVal(32)} onChange={(e)=>handleInputChange(32, e.target.value)} /> and education.</li>
                </ul>
                <h3>His exile from France</h3>
                <ul>
                    <li>Victor Hugo had to live elsewhere in <strong>33.</strong> <input type="text" className="blank-input" value={getVal(33)} onChange={(e)=>handleInputChange(33, e.target.value)} />.</li>
                    <li>He used income from some <strong>34.</strong> <input type="text" className="blank-input" value={getVal(34)} onChange={(e)=>handleInputChange(34, e.target.value)} /> he had written to buy a house.</li>
                </ul>
                <h3>His house on Guernsey</h3>
                <ul>
                    <li>The ground floor contains portraits, <strong>35.</strong> <input type="text" className="blank-input" value={getVal(35)} onChange={(e)=>handleInputChange(35, e.target.value)} /> and tapestries.</li>
                    <li>He bought cheap <strong>36.</strong> <input type="text" className="blank-input" value={getVal(36)} onChange={(e)=>handleInputChange(36, e.target.value)} /> made of wood and turned this into wall carvings.</li>
                    <li>The first floor consists of wallpaper and <strong>37.</strong> <input type="text" className="blank-input" value={getVal(37)} onChange={(e)=>handleInputChange(37, e.target.value)} /> with a Chinese design.</li>
                    <li>He wrote in a room at the top with a view of the <strong>38.</strong> <input type="text" className="blank-input" value={getVal(38)} onChange={(e)=>handleInputChange(38, e.target.value)} />.</li>
                    <li>He entertained poor <strong>39.</strong> <input type="text" className="blank-input" value={getVal(39)} onChange={(e)=>handleInputChange(39, e.target.value)} /> in his house.</li>
                    <li>Victor Hugo's <strong>40.</strong> <input type="text" className="blank-input" value={getVal(40)} onChange={(e)=>handleInputChange(40, e.target.value)} /> gave ownership to the city of Paris.</li>
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

export default Listening32;
