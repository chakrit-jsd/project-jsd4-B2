import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} className='container-slide-img'>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="src\assets\img\Yoga-card.jpg"
          alt="yoga slide"
        />
        <Carousel.Caption>
          <h3>Yoga</h3>
          <p>Yoga is a mind-body practice that combines physical postures, breathing techniques, and meditation to help you reduce stress, improve flexibility, and build strength</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="src\assets\img\HIIT-card.jpg"
          alt="hitt slide"
        />

        <Carousel.Caption>
          <h3>HIIT</h3>
          <p>High-Intensity Interval Training (HIIT) is a type of workout that alternates between intense bursts of activity and brief rest periods. </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="src\assets\img\Weight training-card.jpg"
          alt="weight slide"
        />

        <Carousel.Caption>
          <h3>Weight Training</h3>
          <p>
          Weight training involves using resistance to build strength, increase muscle mass, and improve overall fitness
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="src\assets\img\Strangth training-card.jpg"
          alt="strength slide"
        />

        <Carousel.Caption>
          <h3>Strength Training</h3>
          <p>
          Strength training is a type of exercise that focuses on building muscular strength and endurance, improving bone density, and boosting metabolism
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="src\assets\img\Pilates-card.jpg"
          alt="pilates slide"
        />

        <Carousel.Caption>
          <h3>Pilates</h3>
          <p>
          Pilates is a low-impact form of exercise that focuses on strengthening and lengthening your muscles, improving flexibility, and enhancing your mind-body connection
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default ControlledCarousel
