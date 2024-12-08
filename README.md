# Three.js Portfolio Board

An interactive 3D visualization project that displays a portfolio in a unique pyramid structure using Three.js and CSS3D rendering.

## Features

- **3D Pyramid Structure**: Interactive pyramid with 5 rows of elements on each face
- **Dynamic Layout**: Elements are arranged in an arithmetic progression (1-3-5-7-9) on each side
- **Base Platform**: Additional elements displayed on a base platform below the pyramid
- **Smooth Transitions**: Animated transitions between different view states using TWEEN.js
- **Interactive Controls**: 
  - Trackball controls for 3D navigation
  - Button controls for different view states (Pyramid, Grid, Table)

## Technology Stack

- **Three.js**: Core 3D rendering engine
- **CSS3DRenderer**: For rendering HTML elements in 3D space
- **TWEEN.js**: For smooth animations and transitions
- **HTML/CSS**: For element styling and layout
- **JavaScript**: For interaction and animation logic

## Installation

1. Clone the repository:
```bash
git clone https://github.com/TTomas65/three.js-Portfolio-Board.git
```

2. Open the project directory:
```bash
cd three.js-Portfolio-Board
```

3. Serve the files using a local web server (due to CORS policy requirements)

## Usage

The visualization offers three different views:

1. **Pyramid View**: Elements arranged in a 3D pyramid structure
2. **Table View**: Traditional table layout
3. **Grid View**: Grid-based arrangement of elements

Use the buttons at the top to switch between views. Navigate the 3D space using:
- Left mouse button: Rotate
- Middle mouse button: Zoom
- Right mouse button: Pan

## Structure

- `css3d_periodictable.html`: Main application file
- `js/`: Directory containing JavaScript dependencies
  - `CSS3DRenderer.js`: Three.js CSS3D renderer
  - `TrackballControls.js`: Camera controls
  - `main.js`: Core application logic
- `main.css`: Styling for HTML elements

## Credits

This project is built using:
- [Three.js](https://threejs.org/)
- [Tween.js](https://github.com/tweenjs/tween.js/)

## License

This project is open source and available under the MIT License.
