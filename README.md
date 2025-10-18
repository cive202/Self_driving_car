# 🧠 Self-Driving Car — Neural Network from Scratch

A browser-based **Self-Driving Car Simulator** built entirely from scratch — including the **Neural Network**, **Physics**, and **Rendering**.
No external ML or game libraries are used. Everything is implemented with **pure JavaScript**.

---

## 🚗 Demo

* Run the simulation directly in your browser.
* The car learns to navigate using only its sensors and neural network predictions.
* All neural network computations, sensor readings, and car controls are implemented manually.

---

## 🔧 Features

* Neural network implemented **from scratch** (no TensorFlow or PyTorch)
* Physics-based 2D car model (acceleration, friction, steering, collision detection)
* Raycast-based sensors detecting road borders and traffic
* Real-time **network visualizer** showing neuron activations
* Support for both **Player** and **AI** control modes
* Local model save/load functionality

---

## 📁 Project structure

```
Self_driving_car/
├── .vscode/                     # Editor settings
├── Car_test.mp4                 # Demo video
├── Screenshot 2025-10-18 161832.png
├── Screenshot 2025-10-18 161848.png
├── car.js                       # Car class (physics, controls)
├── car.png                      # Car texture
├── control.js                   # Handles user input and control types
├── creating-polygon.png         # Visualization reference
├── index.html                   # Entry point (launch in browser)
├── main.js                      # Game loop, rendering, and setup
├── network.js                   # Neural network implementation (no libs)
├── road.js                      # Road and lane rendering logic
├── segment.js                   # Defines segments for collision and geometry
├── segment-intersection.js      # Handles segment collision logic
├── sensor.js                    # Simulates sensors (raycasts)
├── style.css                    # Styles for UI and layout
├── utils.js                     # Helper functions
├── visualizer.js                # Neural network visualizer
└── README.md
```

---

## 🧭 How it works (high level)

1. The car uses ray-based sensors to detect distances from road borders and obstacles.
2. These sensor readings are normalized and passed into a small neural network.
3. The network outputs two binary values that control **steering** and **acceleration/braking**.
4. The behavior evolves over time by mutating the weights and biases slightly (genetic-style adaptation).

---

## 🧠 Neural network details

* **Architecture:** Custom-built fully-connected network class (`NeuralNetwork`)
* **Computation:** Feed-forward logic across multiple layers (no external libraries)
* **Activation Function:** Step activation (`sum > bias ? 1 : 0`)
* **Mutation:** Random interpolation between current and new random weights/biases
* **Initialization:** Random values between `-1` and `1`

### 🧩 Internal Structure

```js
class NeuralNetwork {
  constructor(neuronCounts) {
    this.levels = [];
    for (let i = 0; i < neuronCounts.length - 1; i++) {
      this.levels.push(new Level(neuronCounts[i], neuronCounts[i + 1]));
    }
  }
}

class Level {
  constructor(inputCount, outputCount) {
    this.inputs = new Array(inputCount);
    this.outputs = new Array(outputCount);
    this.biases = new Array(outputCount);
    this.weights = Array.from({ length: inputCount }, () => new Array(outputCount));
  }
}
```

### 🧮 Feed Forward Logic

Each level computes outputs using the formula:

```
output[i] = (Σ input[j] * weight[j][i]) > bias[i] ? 1 : 0
```

This simple **step activation function** allows the car to make discrete driving decisions like turning or accelerating.

### 🔁 Mutation

The weights and biases are adjusted gradually with:

```
newValue = lerp(oldValue, random(-1, 1), amount)
```

This introduces small random variations that allow new behaviors to emerge during simulation.


## 🛠 Installation

1. Clone the repository:

```bash
git clone https://github.com/cive202/Self_driving_car.git
cd Self_driving_car
```

2. Start a local server (recommended for loading assets):

```bash
python -m http.server 8000
```

3. Open your browser and go to:

```
http://localhost:8000
```

---

## 📈 Training & Tips

* Sensors feed binary data into the neural network for decision making.
* The `mutate()` function introduces genetic-style randomness for exploration.
* Save good performing weights with `K`.
* Visualize neuron activations in real-time via `visualizer.js`.

---

## 🖼 Screenshots

![Screenshot 1](https://github.com/cive202/Self_driving_car/blob/master/Screenshot%202025-10-18%20161832.png)
![Screenshot 2](https://github.com/cive202/Self_driving_car/blob/master/Screenshot%202025-10-18%20161848.png)

---

## 🙌 Contributing

Contributions are welcome! To contribute:

* Open an issue or pull request
* Describe your change clearly
* Include relevant testing info or results

---

## ✉️ Contact

**Your Name** — [your.email@example.com](mailto:your.email@example.com)

> Built with ❤️ and pure JavaScript — Neural Networks from Scratch.
