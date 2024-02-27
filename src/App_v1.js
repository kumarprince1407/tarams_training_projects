import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];
export default function App_v1() {
  return (
    <div>
      <Steps />
      {/* <Steps /> */}
    </div>
  );
}

function Steps() {
  const [step, setStep] = useState(1); //1. Define the state variable using useState hook
  //console.log(arr);
  // const step = 1;

  // const [test] = useState({ name: "Jonas" });
  //const [test, setTest] = useState({ name: "Jonas" });
  const [isOpen, setIsOpen] = useState(true);
  function handlePrevious() {
    // alert("Previous");
    if (step > 1) {
      setStep((s) => s - 1);
    }
  }

  function handleNext() {
    // alert("Next");
    if (step < 3) {
      // setStep(step + 1);
      setStep((s) => s + 1); //3. Update the 'step' state

      //test.name = "Fred"; //Mutating the object directly - BAD PRACTICE
      // setTest({ name: "Fred" }); //Correct approach
    }
  }

  return (
    <div>
      <button className="close" onClick={() => setIsOpen((open) => !open)}>
        &times;
        {/* &times basically writes 'X' in the UI */}
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            {/* 2. Use the state variable */}
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>

          <p className="message">
            Step {step}: {messages[step - 1]}
            {/* {test.name} */}
          </p>
          <div className="buttons">
            <Button
              bgColor={"#7950f2"}
              textColor={"#fff"}
              onClick={handlePrevious}
              text="Previous"
            />
            <Button
              bgColor={"#7950f2"}
              textColor={"#fff"}
              onClick={handleNext}
              text={"Next"}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function Button({ textColor, bgColor, text, onClick }) {
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
