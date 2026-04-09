import "./AnswerPage.css";
import api from "../../api/axios";
import { useEffect, useCallback } from "react";
import { toast } from "react-toastify";

const AnswersPage = ({ userAnswers, correctAnswers, title }) => {

  // --- UNIVERSAL SCORE CALCULATOR ---
  const calculateScore = useCallback(() => {
    let score = 0;
    
    Object.keys(correctAnswers).forEach((key) => {
      const uAns = (userAnswers[key] || "").trim().toLowerCase();
      const cAnsRaw = correctAnswers[key];

      // 1. Handle "Choose TWO" (Array of possible correct letters)
      if (Array.isArray(cAnsRaw)) {
        const isMatch = cAnsRaw.some(
          (option) => option.toString().toLowerCase() === uAns
        );
        if (isMatch && uAns !== "") score++;
      } 
      // 2. Handle Standard Strings (Gap fill / Single MCQ)
      else if (typeof cAnsRaw === "string") {
        if (uAns === cAnsRaw.toLowerCase()) score++;
      }
      // 3. Handle Numbers (if any are stored as numbers)
      else {
        if (uAns === cAnsRaw.toString().toLowerCase()) score++;
      }
    });
    
    return score;
  }, [userAnswers, correctAnswers]);

  const getIELTSBand = (score) => {
    if (score >= 39) return 9.0;
    if (score >= 37) return 8.5;
    if (score >= 35) return 8.0;
    if (score >= 32) return 7.5;
    if (score >= 30) return 7.0;
    if (score >= 26) return 6.5;
    if (score >= 23) return 6.0;
    if (score >= 18) return 5.5;
    if (score >= 16) return 5.0;
    return 4.0;
  };

  const score = calculateScore();
  const band = getIELTSBand(score);

  const saveUsersResults = useCallback(async () => {
    try {
      const data = {
        test_title: title,
        score,
        band
      };
      const res = await api.post("/results", data);
      if (res.data.success) {
        toast.success("Saved Successfully!");
      }
    } catch (err) {
      console.error(err);
      toast.error("You are not logged in!");
    }
  }, [title, score, band]);

  useEffect(() => {
    saveUsersResults();
  }, [saveUsersResults]);

  return (
    <div className="listening-light-theme results-page">
      <div className="results-hero-listening">
        <div className="hero-content-listening">
          <h1>Test Completed!</h1>
          <p className="paragraph-with-error">Here is your official performance breakdown.</p>
          <div className="stats-grid">
             <div className="stat-card">
               <span className="stat-label">Correct Answers</span>
               <span className="stat-value">{score} / 40</span>
             </div>
             <div className="stat-card featured">
               <span className="stat-label">IELTS Band</span>
               <span className="stat-value">{band.toFixed(1)}</span>
             </div>
             <div className="stat-card">
               <span className="stat-label">Accuracy</span>
               <span className="stat-value">{Math.round((score / 40) * 100)}%</span>
             </div>
          </div>
          <div className="hero-actions-listening">
            <button className="primary-action-btn">Analyze Weak Points ✨</button>
            <button className="secondary-action-btn" onClick={() => window.location.reload()}>Retake Test</button>
          </div>
        </div>
      </div>

      <div className="paper-container results-table-container">
        <h3 className="table-title">Detailed Answer Review</h3>
        <table className="modern-results-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Your Response</th>
              <th>Correct Answer</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(correctAnswers).map((num) => {
              const uAns = (userAnswers[num] || "").trim();
              const cAnsRaw = correctAnswers[num];
              
              // UNIVERSAL STATUS CHECK
              let isCorrect = false;
              let displayCorrect = "";

              if (Array.isArray(cAnsRaw)) {
                isCorrect = cAnsRaw.some(ans => ans.toLowerCase() === uAns.toLowerCase());
                displayCorrect = cAnsRaw.join(" or ");
              } else {
                isCorrect = uAns.toLowerCase() === cAnsRaw.toString().toLowerCase();
                displayCorrect = cAnsRaw;
              }

              return (
                <tr key={num} className={isCorrect ? "row-correct" : "row-incorrect"}>
                  <td className="col-num">{num}</td>
                  <td className="col-user">{uAns || "No Answer"}</td>
                  <td className="col-correct">{displayCorrect}</td>
                  <td className="col-status">
                    <span className={`status-pill ${isCorrect ? "correct" : "incorrect"}`}>
                      {isCorrect ? "Correct" : "Incorrect"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnswersPage;