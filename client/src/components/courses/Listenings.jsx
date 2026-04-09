import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlayCircle, Award, ChevronDown, Headphones } from "lucide-react";
import "./Listenings.css";
import api from "../../api/axios";

const courses = [
  {
    id: 1,
    title: "IELTS 11",
    type: "Academic",
    tests: [
      { id: 1, title: "Test 1", code: "E11T1" },
      { id: 2, title: "Test 2", code: "E11T2" },
      { id: 3, title: "Test 3", code: "E11T3" },
      { id: 4, title: "Test 4", code: "E11T4" },
    ],
    description: "Full IELTS listening simulation with 40 questions.",
  },
  {
    id: 2,
    title: "IELTS 12",
    type: "Academic",
    tests: [
      { id: 1, title: "Test 1", code: "E12T1" },
      { id: 2, title: "Test 2", code: "E12T2" },
      { id: 3, title: "Test 3", code: "E12T3" },
      { id: 4, title: "Test 4", code: "E12T4" },
    ],
    description: "Full IELTS listening simulation with 40 questions.",
  },

  {
    id: 3,
    title: "IELTS 13",
    type: "Academic",
    tests: [
      { id: 1, title: "Test 1", code: "E13T1" },
      { id: 2, title: "Test 2", code: "E13T2" },
      { id: 3, title: "Test 3", code: "E13T3" },
      { id: 4, title: "Test 4", code: "E13T4" },
    ],
    description: "Full IELTS listening simulation with 40 questions.",
  }
];

const Listenings = () => {
  const [openCourseId, setOpenCourseId] = useState(null);
  const [resultsMap, setResultsMap] = useState({});
  const navigate = useNavigate();

  
  

    const getResults = async () => {
    try {
      const res = await api.get("/my-results");

      const map = {};

      res.data.results.forEach(item => {
        map[item.code] = {
          score: item.score,
          band: item.band
        };
      });

      setResultsMap(map);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getResults();
  }, []);

  const toggleCourse = (id) => {
    setOpenCourseId(openCourseId === id ? null : id);
  };

  const startPractice = (courseId, testId) => {
    navigate(`/profile/listening/${courseId}/${testId}`);
  };

  console.log(resultsMap)

  return (
    <div className="courses-container">
      <div className="list-header">
        <h2>Listening Modules</h2>
        <p>Enhance your scores with targeted practice.</p>
      </div>

      {courses.map((course) => {
        const courseOpen = openCourseId === course.id;

        return (
          <div key={course.id} className={`course-card ${courseOpen ? "open" : ""}`}>
            
            {/* Course Header */}
            <div className="course-header" onClick={() => toggleCourse(course.id)}>
              <div className="course-info-group">
                <div className="type-badge">{course.type}</div>
                <div className="title-wrapper">
                  <Headphones size={18} color="white"/>
                  <h4>{course.title}</h4>
                  <p>{course.description}</p>
                </div>
              </div>
              <ChevronDown size={20} className={courseOpen ? "up" : ""} color="white"/>
            </div>

            {/* Tests */}
            {courseOpen && (
              <div className="dropdown-wrapper">
                {course.tests.map((test) => {

                const result = resultsMap[test.code]; // 🔥 DIRECT MATCH

                return (
                  <div key={test.id} className="course-dropdown">
                    <div className="desc-box">
                      <h5>{test.title}</h5>
                    </div>

                    <div className="right-score-type">
                      {result ? (
                        <>
                          <div className="score-tag">
                            <Award size={14} />
                            <span>{result.score}</span>
                          </div>
                          <div className="band-tag">
                            Band {result.band}
                          </div>
                        </>
                      ) : (
                        <div className="score-tag empty">
                          <span>No result</span>
                        </div>
                      )}

                      <button
                        className="start-neon-btn"
                        onClick={() => startPractice(course.id, test.id)}
                      >
                        <PlayCircle size={18} />
                        <span>Start Practice</span>
                      </button>
                    </div>
                  </div>
                );
              })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Listenings;