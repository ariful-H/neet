"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

interface ModelViewerProps {
  modelUrl: string
}

export default function ModelViewer({ modelUrl }: ModelViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Create scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xf5f5f5)

    // Create camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    )
    camera.position.z = 5

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    containerRef.current.appendChild(renderer.domElement)

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(1, 1, 1)
    scene.add(directionalLight)

    // Add controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.25

    // Load 3D model
    const loader = new GLTFLoader()

    // For demo purposes, we'll create a placeholder model if the URL is not available
    if (modelUrl === "/models/cell.glb") {
      // Create a simple cell-like structure
      const cellGeometry = new THREE.SphereGeometry(2, 32, 32)
      const cellMaterial = new THREE.MeshPhongMaterial({
        color: 0x88ccff,
        transparent: true,
        opacity: 0.7,
      })
      const cell = new THREE.Mesh(cellGeometry, cellMaterial)

      // Add nucleus
      const nucleusGeometry = new THREE.SphereGeometry(0.8, 32, 32)
      const nucleusMaterial = new THREE.MeshPhongMaterial({ color: 0x6644aa })
      const nucleus = new THREE.Mesh(nucleusGeometry, nucleusMaterial)
      cell.add(nucleus)

      // Add some organelles
      for (let i = 0; i < 10; i++) {
        const organelleGeometry = new THREE.SphereGeometry(0.2, 16, 16)
        const organelleMaterial = new THREE.MeshPhongMaterial({
          color: Math.random() * 0xffffff,
        })
        const organelle = new THREE.Mesh(organelleGeometry, organelleMaterial)

        // Position randomly within the cell
        const theta = Math.random() * Math.PI * 2
        const phi = Math.random() * Math.PI
        const r = 1 + Math.random() * 0.5

        organelle.position.x = r * Math.sin(phi) * Math.cos(theta)
        organelle.position.y = r * Math.sin(phi) * Math.sin(theta)
        organelle.position.z = r * Math.cos(phi)

        cell.add(organelle)
      }

      scene.add(cell)
    } else if (modelUrl === "/models/dna.glb") {
      // Create a simple DNA helix
      const group = new THREE.Group()

      // Create the two strands
      const curve = new THREE.CatmullRomCurve3([new THREE.Vector3(0, -3, 0), new THREE.Vector3(0, 3, 0)])

      const points = curve.getPoints(50)
      const geometry = new THREE.BufferGeometry().setFromPoints(points)

      // Create the helix strands
      for (let strand = 0; strand < 2; strand++) {
        const material = new THREE.LineBasicMaterial({
          color: strand === 0 ? 0x0088ff : 0xff8800,
          linewidth: 3,
        })

        const helix = new THREE.Line(geometry, material)

        // Position the strands
        for (let i = 0; i < helix.geometry.attributes.position.count; i++) {
          const t = i / (helix.geometry.attributes.position.count - 1)
          const pos = helix.geometry.attributes.position

          // Create helix shape
          const radius = 1
          const angle = t * Math.PI * 10 + strand * Math.PI

          pos.setXYZ(i, pos.getX(i) + radius * Math.cos(angle), pos.getY(i), pos.getZ(i) + radius * Math.sin(angle))
        }

        // Add base pairs
        for (let i = 0; i < 10; i++) {
          const t = i / 9
          const baseGeometry = new THREE.BoxGeometry(2, 0.1, 0.1)
          const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x22cc22 })
          const base = new THREE.Mesh(baseGeometry, baseMaterial)

          const y = t * 6 - 3
          const angle = t * Math.PI * 10

          base.position.set(0, y, 0)
          base.rotation.y = angle

          group.add(base)
        }

        group.add(helix)
      }

      scene.add(group)
    } else {
      // Create a placeholder model
      const geometry = new THREE.BoxGeometry(2, 2, 2)
      const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 })
      const cube = new THREE.Mesh(geometry, material)
      scene.add(cube)

      // Animate the cube
      const animate = () => {
        cube.rotation.x += 0.01
        cube.rotation.y += 0.01
      }

      // Add animation to the render loop
      renderer.setAnimationLoop(() => {
        animate()
        controls.update()
        renderer.render(scene, camera)
      })
    }

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return

      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    }

    window.addEventListener("resize", handleResize)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
      window.removeEventListener("resize", handleResize)
    }
  }, [modelUrl])

  return <div ref={containerRef} className="h-[300px] w-full rounded-md" aria-label="3D model viewer" role="img" />
}
