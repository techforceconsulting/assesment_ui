import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Aptitude.css";

const q = [
    {
        que: "What is 5 + 3?",
        opt: ["6", "7", "8", "9"],
        ans: "8"
    },
    {
        que: "What is 10 - 4?",
        opt: ["5", "6", "7", "8"],
        ans: "6"
    }
];

function Aptitude() {
    const [i, seti] = useState(0);
    const [score, setscore] = useState(0);
    const [show, setshow] = useState(false);

    const check = (o) => {
        if (o === q[i].ans) {
            setscore(score + 1);
        }

        const n = i + 1;
        if (n < q.length) {
            seti(n);
        } else {
            setshow(true);
        }
    };

    return (
        <div className="apt">
            {show ? (
                <h2>Your Score: {score}/{q.length}</h2>
            ) : (
                <>
                    <h2>{q[i].que}</h2>
                    {q[i].opt.map((o, ind) => (
                        <button key={ind} onClick={() => check(o)}>
                            {o}
                        </button>
                    ))}
                </>
            )}
        </div>
    );
}

export default Aptitude;