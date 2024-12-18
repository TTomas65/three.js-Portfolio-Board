# Three.js Portfolio Board

An evolution of the iconic https://threejs.org/examples/css3d_periodictable.html 3D program into an image and videoportfolio.

An interactive 3D visualization project that displays a portfolio on a 3D surface using Three.js and CSS3D rendering.

## Features

- **NEW 3D Pyramid Structure**: Interactive pyramid with 5 rows of elements on each face
- **Dynamic Layout**: Elements are arranged in an arithmetic progression (1-3-5-7-9) on each side
- **Base Platform**: Additional elements displayed on a base platform below the pyramid
- **Smooth Transitions**: Animated transitions between different view states using TWEEN.js
- **Interactive Controls**: 
  - Trackball controls for 3D navigation
  - Button controls for different view states (Pyramid, Grid, Table)
- **Image Gallery**: Interactive image display with modal view
- **Responsive Design**: Adapts to different screen sizes

## Technology Stack

- **Three.js**: Core 3D rendering engine
- **CSS3DRenderer**: For rendering HTML elements in 3D space
- **TWEEN.js**: For smooth animations and transitions
- **HTML/CSS**: For element styling and layout
- **JavaScript**: For interaction and animation logic
- **Font Awesome**: For icons and UI elements

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

The visualization offers 5 different views:

1. **Table View**: Traditional table layout
2. **Sphere View**: Elements arranged in a 3D sphere structure
3. **Helix View**: Helix arrangement of elements
4. **Grid View**: Grid-based arrangement of elements
5. **Pyramid View**: Elements arranged in a 3D pyramid structure

Use the buttons at the bottom to switch between views. Navigate the 3D space using:
- Left mouse button: Rotate
- Middle mouse button: Zoom
- Right mouse button: Pan

## Structure

- `css3d_gallerytable.html`: Main application file
- `js/`: Directory containing JavaScript dependencies
  - `CSS3DRenderer.js`: Three.js CSS3D renderer
  - `TrackballControls.js`: Camera controls
  - `tween.module.js`: Animation library
- `main.css`: Styling for HTML elements
- `kepek/`: Directory containing image assets
- `build/`: Build-related files
- `jsm/`: Additional JavaScript modules

## Credits

This project is built using:
- [Three.js](https://threejs.org/)
- [Tween.js](https://github.com/tweenjs/tween.js/)
- [Font Awesome](https://fontawesome.com/)

## License

This project is open source and available under the MIT License.
