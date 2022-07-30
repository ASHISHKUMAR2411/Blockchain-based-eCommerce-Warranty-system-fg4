import React from 'react'
import WheelComponent from "react-wheel-of-prizes";
// import "react-wheel-of-prizes/dist/index.css";

function GamePage() {
    const segments = [
      "better luck next time",
      "won 10 flipkart super coin",
      "won 1 month prime subscription of flipkart",
      "better luck next time",
      "won 2 flipkart super coin",
      "won 20% cashback on next order from flipkart grocerry",
      "better luck next time",
      "won a 10% cashback on next purchase from flipkart",
    ];
    const segColors = [
      "#EE4040",
      "#F0CF50",
      "#815CD1",
      "#3DA5E0",
      "#34A24F",
      "#F9AA1F",
      "#EC3F3F",
      "#FF9000",
    ];
    const onFinished = (winner) => {
    //   alert(winner);
    };
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          marginTop:"200px",
          marginLeft:"400px"
        }}
      >
        <WheelComponent
          segments={segments}
          segColors={segColors}
          winningSegment="won 2"
          onFinished={(winner) => onFinished(winner)}
          primaryColor="black"
          contrastColor="white"
          buttonText="Spin"
          isOnlyOnce={false}
          size={290}
          upDuration={1000}
          downDuration={1000}
          fontFamily="Arial"
        />
      </div>
    );
}

export default GamePage
