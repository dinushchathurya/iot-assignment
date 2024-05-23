import "./App.scss";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

firebase.initializeApp(firebaseConfig);

function App() {
  //Toggle Class Function
  const [slot, setSlot] = useState([0, 0, 0, 0]);

  const toggleClass = (data) => {
    const output = Object.keys(data).map((x) => {
      return data[x].availability;
    });

    setSlot(output);
  };

  //Firebase Function

  useEffect(() => {
    const fetchData = () => {
      const dbRef = firebase.database().ref("/slots");
      dbRef.on("value", (snapshot) => {
        toggleClass(snapshot.val());
      });
    };

    fetchData();

    // Clean up the event listener on unmount
    return () => {
      const dbRef = firebase.database().ref("/slots");
      dbRef.off();
    };
  }, []);

  return (

    <div className="view01">
      <div className="sideBarParent">
        <div className="slotsWrapper">
          <div className="slots" id="container_slots">
            <div className="slot01Parent">
              {slot.map((s, index) => (
                <div className="slot01" id={`slot_0${index + 1}`} key={index}>
                  <b className="t">{index + 1}</b>
                  <img
                    id={`slot_0${index + 1}`}
                    className={
                      "carcolored1Icon animate__animated " +
                      (s === 0 ? "animate__fadeOutDown" : "animate__fadeInUp")
                    }
                    alt=""
                    src="/images/dashboard/carColored.png"
                  />
                  <div className="slot01Child" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default App;
