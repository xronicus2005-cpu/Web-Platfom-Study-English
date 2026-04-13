import { useState, useEffect } from "react";
import "./Reading1.css";

const Reading1 = () => {
  const [time, setTime] = useState(3600);
  const [part, setPart] = useState(1);
  const [highlightPopup, setHighlightPopup] = useState({ visible: false, x: 0, y: 0, range: null });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  const handleMouseUp = (e) => {
    if (["INPUT", "BUTTON", "LABEL"].includes(e.target.tagName)) return;
    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 0) {
      const range = selection.getRangeAt(0);
      setHighlightPopup({
        visible: true,
        x: e.pageX,
        y: e.pageY - 60,
        range: range,
      });
    } else {
      setHighlightPopup({ visible: false, x: 0, y: 0, range: null });
    }
  };

  const applyHighlight = (color) => {
    if (highlightPopup.range) {
      const span = document.createElement("span");
      span.style.backgroundColor = color;
      span.className = "highlighted-text";
      try {
        highlightPopup.range.surroundContents(span);
      } catch (e) {
        console.warn("Highlight error");
      }
    }
    setHighlightPopup({ visible: false, x: 0, y: 0, range: null });
    window.getSelection().removeAllRanges();
  };

  return (
    <div className="reading-light-theme" onMouseUp={handleMouseUp}>
      <div className="full-viewport-wrapper">
        
        {/* HIGHLIGHT TOOLTIP */}
        {highlightPopup.visible && (
          <div 
            className="highlight-tooltip" 
            style={{ top: `${highlightPopup.y}px`, left: `${highlightPopup.x}px`, position: 'absolute' }}
          >
            <button className="h-btn red" onClick={() => applyHighlight("#ff4d4d")}></button>
            <button className="h-btn yel" onClick={() => applyHighlight("#ffd43b")}></button>
            <button className="h-btn blu" onClick={() => applyHighlight("#339af0")}></button>
          </div>
        )}

        {/* HEADER: FULL WIDTH */}
        <header className="test-header">
          <div className="header-flex-container">
            <div className="timer-section">
              <div className="timer-badge">
                <span className="timer-icon">⏱</span>
                <span className="time-text">{formatTime()}</span>
              </div>
            </div>
            
            <div className="passage-navigation">
              {[1, 2, 3].map((n) => (
                <button
                  key={n}
                  className={`part-link ${part === n ? "active" : ""}`}
                  onClick={() => setPart(n)}
                >
                  Passage {n}
                </button>
              ))}
            </div>

            <div className="action-section">
              <button className="finish-btn">Check Test</button>
            </div>
          </div>
        </header>

        {/* MAIN LAYOUT: SPLIT SCREEN */}
        <main className="reading-layout">
          {/* LEFT SIDE: PASSAGE */}
          <section className="passage-container">
            <div className="paper-card">
              {part === 1 && (
                <article>
                  <h2 className="section-title">Green roofs</h2>
                  <p>Rooftops covered with grass, vegetable gardens and lush foliage are now a common sight in many cities around the world...</p>
                  <p>Among the benefits are saving on energy costs, mitigating the risk of floods, making habitats for urban wildlife...</p>
                  <div className="paragraph-block">
                    <h3>A</h3>
                    <p>The UK is relatively new to developing green roofs...</p>
                  </div>
                  <div className="paragraph-block">
                    <h3>B</h3>
                    <p>Ongoing research is showcasing how green roofs in cities can integrate with living walls.</p>
                  </div>
                  {/* Boshqa paragraflar... */}
                </article>
              )}
              {part === 2 && (
                <article>
                  <h2 className="section-title">The growth mindset</h2>
                  <p>Over the past century, a powerful idea has taken root in the educational landscape...</p>
                </article>
              )}
              {part === 3 && (
                <article>
                  <h2 className="section-title">Alfred Wegener: Continental Drift</h2>
                  <p>This book is about the life and scientific work of Alfred Wegener...</p>
                </article>
              )}
            </div>
          </section>

          {/* RIGHT SIDE: QUESTIONS */}
          <section className="questions-container">
            <div className="paper-card">
              {part === 1 && (
                <div className="test-section">
                  <div className="instructions-box">
                    <div className="ins-header">Questions 1-5</div>
                    <div className="ins-body">
                      Look at the following statements. Write the correct letter, <strong>A-E</strong>, in boxes 1-5.
                    </div>
                  </div>
                  
                  {[1,2,3,4,5].map(q => (
                    <div className="question-row" key={q}>
                      <span className="q-num">{q}</span>
                      <p className="q-text">Sample question text for matching {q}?</p>
                      <input type="text" className="blank-input-sm" maxLength="1" />
                    </div>
                  ))}

                  <div className="instructions-box mt-30">
                    <div className="ins-header">Questions 6-9</div>
                    <div className="ins-body">Complete the sentences. Write <strong>NO MORE THAN TWO WORDS</strong>.</div>
                  </div>
                  <p className="q-text">6. reducing how much money is spent on <input className="blank-input" /></p>
                  <p className="q-text">7. producing <input className="blank-input" /></p>
                </div>
              )}

              {part === 2 && (
                 <div className="test-section">
                    <div className="instructions-box">
                        <div className="ins-header">Questions 14-16</div>
                        <div className="ins-body">Choose the correct letter, <strong>A, B, C or D</strong>.</div>
                    </div>
                    {/* Radio questions */}
                 </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Reading1;