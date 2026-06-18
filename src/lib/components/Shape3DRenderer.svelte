<script lang="ts">
  import Zdog from 'zdog'

  interface Props {
    shapeId: string
    isSelected?: boolean
  }

  const { shapeId, isSelected = false }: Props = $props()

  const SIZE = 120
  let canvas: HTMLCanvasElement | undefined = $state()

  $effect(() => {
    if (!canvas) return

    canvas.width = SIZE
    canvas.height = SIZE
    const ctx = canvas.getContext('2d')
    ctx?.setTransform(1, 0, 0, 1, 0, 0)
    ctx?.clearRect(0, 0, SIZE, SIZE)

    const illo = new Zdog.Illustration({
      element: canvas,
      zoom: 1.2,
      dragRotate: false
    })

    const warmPalette = {
      dark: '#b45309',
      base: '#f97316',
      light: '#fb923c',
      highlight: '#fdba74'
    }
    const coolPalette = {
      dark: '#0369a1',
      base: '#0ea5e9',
      light: '#38bdf8',
      highlight: '#7dd3fc'
    }
    const group = new Zdog.Group({
      addTo: illo,
      rotate: { x: -0.35, y: 0.65, z: 0.05 }
    })

    switch (shapeId) {
      case 'cube':
        new Zdog.Box({
          addTo: group,
          width: 50,
          height: 50,
          depth: 50,
          stroke: false,
          color: coolPalette.base,
          frontFace: coolPalette.light,
          rearFace: coolPalette.dark,
          leftFace: '#0284c7',
          rightFace: '#0c4a6e',
          topFace: coolPalette.highlight,
          bottomFace: '#075985'
        })
        break
      case 'sphere':
        new Zdog.Hemisphere({
          addTo: group,
          diameter: 70,
          stroke: false,
          color: '#10b981'
        })
        new Zdog.Hemisphere({
          addTo: group,
          diameter: 70,
          stroke: false,
          color: '#34d399',
          rotate: { x: Math.PI }
        })
        break
      case 'cylinder':
        new Zdog.Cylinder({
          addTo: group,
          diameter: 46,
          length: 62,
          stroke: false,
          color: warmPalette.base,
          frontFace: warmPalette.highlight,
          backface: warmPalette.dark,
          rotate: { x: Math.PI / 2 }
        })
        break
      case 'cone':
        new Zdog.Cone({
          addTo: group,
          diameter: 60,
          length: 66,
          stroke: false,
          color: '#8b5cf6',
          backface: '#6d28d9',
          translate: { y: 22 },
          rotate: { x: Math.PI / 2 }
        })
        break
      case 'pyramid':
        {
          const apex = { x: 0, y: -36, z: 0 }
          const b1 = { x: -25, y: 24, z: -25 }
          const b2 = { x: 25, y: 24, z: -25 }
          const b3 = { x: 25, y: 24, z: 25 }
          const b4 = { x: -25, y: 24, z: 25 }

          new Zdog.Shape({
            addTo: group,
            path: [apex, b1, b2],
            closed: true,
            fill: true,
            stroke: 1,
            color: '#ef4444'
          })
          new Zdog.Shape({
            addTo: group,
            path: [apex, b2, b3],
            closed: true,
            fill: true,
            stroke: 1,
            color: '#f97316'
          })
          new Zdog.Shape({
            addTo: group,
            path: [apex, b3, b4],
            closed: true,
            fill: true,
            stroke: 1,
            color: '#eab308'
          })
          new Zdog.Shape({
            addTo: group,
            path: [apex, b4, b1],
            closed: true,
            fill: true,
            stroke: 1,
            color: '#22c55e'
          })
          new Zdog.Shape({
            addTo: group,
            path: [b1, b2, b3, b4],
            closed: true,
            fill: true,
            stroke: 1,
            color: '#0ea5e9'
          })
        }
        break
    }

    let frameId = 0
    let isDisposed = false
    const baseRotateX = -0.35
    const baseRotateY = 0.65
    const animate = (timestamp = 0) => {
      if (isDisposed) return
      const t = timestamp * 0.001
      group.rotate.x = baseRotateX + Math.sin(t * 0.9) * 0.08
      group.rotate.y = baseRotateY + Math.sin(t * 1.1) * 0.35
      illo.updateRenderGraph()
      frameId = requestAnimationFrame((nextTimestamp) => animate(nextTimestamp))
    }

    animate()

    return () => {
      isDisposed = true
      cancelAnimationFrame(frameId)
    }
  })
</script>

<canvas bind:this={canvas} width={SIZE} height={SIZE} class="shape-canvas"></canvas>

<style>
  .shape-canvas {
    width: 100%;
    height: auto;
    max-width: 120px;
  }
</style>
