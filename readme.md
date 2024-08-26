# Three.js Light Playground

This playground focuses on exploring various lighting techniques in Three.js, providing a GUI to interactively modify light properties and visualize their effects using different light helpers.

## Light Tests

In this playground, different types of lights like `AmbientLight`, `HemisphereLight`, `DirectionalLight`, and others are tested. The goal is to experiment with lighting effects, their intensities, and how they interact with basic geometries.

### Lights Included:

- **AmbientLight**
- **HemisphereLight**
- **DirectionalLight**
- **PointLight**
- **RectAreaLight**
- **SpotLight**

Each light is paired with its respective helper to visually understand the light's impact on the scene.

## GUI Controls

The GUI, implemented using `lil-gui`, allows real-time adjustments of the light properties. Lights are categorized by their computational cost:

- **Low Cost:**
  - AmbientLight
  - HemisphereLight
- **Moderate Cost:**
  - DirectionalLight
  - PointLight
- **High Cost:**
  - RectAreaLight
  - SpotLight

### GUI Features:

- **Intensity:** Control the brightness of each light.
- **Helpers Visibility:** Toggle visibility of each light's helper to better understand the light's direction and effect.

## Screenshot

*Below is a preview of the playground setup as well as the GUI showcasing different lights interacting with basic geometries like a sphere, cube, and torus.*

<img src="https://github.com/user-attachments/assets/d8a8d556-e8f2-4086-a948-5f916dbe3ff0">
<img src="https://github.com/user-attachments/assets/5ff235b8-c915-4d70-8c86-28d89558a9ff">


## Code Overview

The code sets up a basic Three.js scene with multiple light sources and geometric objects. A `PerspectiveCamera` and `OrbitControls` allow interactive exploration of the scene. The lights are organized by computational cost, with a GUI to modify their properties.
