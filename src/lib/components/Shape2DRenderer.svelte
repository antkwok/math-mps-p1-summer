<script lang="ts">
  interface Props {
    shapeId: string
    isSelected?: boolean
  }

  const { shapeId, isSelected = false }: Props = $props()

  let canvas: HTMLCanvasElement | undefined = $state()
  let ctx: CanvasRenderingContext2D | null = $state(null)
  const SIZE = 120

  function drawCircle() {
    if (!ctx) return
    ctx.clearRect(0, 0, SIZE, SIZE)
    ctx.strokeStyle = isSelected ? '#1d4ed8' : '#374151'
    ctx.lineWidth = isSelected ? 4 : 2
    ctx.beginPath()
    ctx.arc(SIZE / 2, SIZE / 2, 40, 0, Math.PI * 2)
    ctx.stroke()
  }

  function drawSquare() {
    if (!ctx) return
    ctx.clearRect(0, 0, SIZE, SIZE)
    ctx.strokeStyle = isSelected ? '#1d4ed8' : '#374151'
    ctx.lineWidth = isSelected ? 4 : 2
    const offset = 30
    ctx.strokeRect(SIZE / 2 - offset, SIZE / 2 - offset, offset * 2, offset * 2)
  }

  function drawTriangle() {
    if (!ctx) return
    ctx.clearRect(0, 0, SIZE, SIZE)
    ctx.strokeStyle = isSelected ? '#1d4ed8' : '#374151'
    ctx.lineWidth = isSelected ? 4 : 2
    ctx.beginPath()
    ctx.moveTo(SIZE / 2, 20)
    ctx.lineTo(SIZE / 2 + 40, SIZE - 20)
    ctx.lineTo(SIZE / 2 - 40, SIZE - 20)
    ctx.closePath()
    ctx.stroke()
  }

  function drawRectangle() {
    if (!ctx) return
    ctx.clearRect(0, 0, SIZE, SIZE)
    ctx.strokeStyle = isSelected ? '#1d4ed8' : '#374151'
    ctx.lineWidth = isSelected ? 4 : 2
    ctx.strokeRect(SIZE / 2 - 45, SIZE / 2 - 25, 90, 50)
  }

  function drawPentagon() {
    if (!ctx) return
    ctx.clearRect(0, 0, SIZE, SIZE)
    ctx.strokeStyle = isSelected ? '#1d4ed8' : '#374151'
    ctx.lineWidth = isSelected ? 4 : 2
    drawPolygon(5, SIZE / 2, SIZE / 2, 40)
  }

  function drawHexagon() {
    if (!ctx) return
    ctx.clearRect(0, 0, SIZE, SIZE)
    ctx.strokeStyle = isSelected ? '#1d4ed8' : '#374151'
    ctx.lineWidth = isSelected ? 4 : 2
    drawPolygon(6, SIZE / 2, SIZE / 2, 40)
  }

  function drawStar() {
    if (!ctx) return
    ctx.clearRect(0, 0, SIZE, SIZE)
    ctx.strokeStyle = isSelected ? '#1d4ed8' : '#374151'
    ctx.fillStyle = isSelected ? '#1d4ed8' : '#fbbf24'
    ctx.lineWidth = isSelected ? 2 : 1
    drawStar5(SIZE / 2, SIZE / 2, 5, 40, 20)
  }

  function drawHeart() {
    if (!ctx) return
    ctx.clearRect(0, 0, SIZE, SIZE)
    ctx.fillStyle = isSelected ? '#1d4ed8' : '#ef4444'
    ctx.beginPath()
    
    const x = SIZE / 2
    const y = SIZE / 2 - 5
    const size = 25
    
    // Left lobe
    ctx.bezierCurveTo(
      x - size, y - size,
      x - size * 1.5, y - size * 0.5,
      x - size * 0.5, y + size * 0.3
    )
    
    // Dip in middle
    ctx.bezierCurveTo(
      x - size * 0.3, y + size * 0.5,
      x, y + size * 0.8,
      x, y + size * 0.8
    )
    
    // Right lobe
    ctx.bezierCurveTo(
      x, y + size * 0.8,
      x + size * 0.3, y + size * 0.5,
      x + size * 0.5, y + size * 0.3
    )
    
    ctx.bezierCurveTo(
      x + size * 1.5, y - size * 0.5,
      x + size, y - size,
      x, y - size * 0.8
    )
    
    ctx.closePath()
    ctx.fill()
  }

  function drawPolygon(sides: number, x: number, y: number, radius: number) {
    ctx!.beginPath()
    for (let i = 0; i < sides; i++) {
      const angle = (i / sides) * Math.PI * 2 - Math.PI / 2
      const px = x + Math.cos(angle) * radius
      const py = y + Math.sin(angle) * radius
      if (i === 0) ctx!.moveTo(px, py)
      else ctx!.lineTo(px, py)
    }
    ctx!.closePath()
    ctx!.stroke()
  }

  function drawStar5(x: number, y: number, spikes: number, outerRadius: number, innerRadius: number) {
    let step = Math.PI / spikes
    ctx!.beginPath()
    ctx!.moveTo(x, y - outerRadius)
    for (let i = 0; i < spikes * 2; i++) {
      let r = i % 2 == 0 ? outerRadius : innerRadius
      let angle = i * step - Math.PI / 2
      let px = x + Math.cos(angle) * r
      let py = y + Math.sin(angle) * r
      ctx!.lineTo(px, py)
    }
    ctx!.closePath()
    ctx!.fill()
  }

  function render() {
    switch (shapeId) {
      case 'circle':
        drawCircle()
        break
      case 'square':
        drawSquare()
        break
      case 'triangle':
        drawTriangle()
        break
      case 'rectangle':
        drawRectangle()
        break
      case 'pentagon':
        drawPentagon()
        break
      case 'hexagon':
        drawHexagon()
        break
      case 'star':
        drawStar()
        break
      case 'heart':
        drawHeart()
        break
    }
  }

   // Initialize context when canvas is available
   $effect(() => {
     if (!canvas) return
     ctx = canvas.getContext('2d')
     render()
   })

   // Re-render when shapeId or isSelected changes
   $effect(() => {
     if (ctx && canvas) {
       render()
     }
   })
</script>

<canvas bind:this={canvas} width={SIZE} height={SIZE} class="shape-canvas"></canvas>

<style>
  .shape-canvas {
    width: 100%;
    height: auto;
    max-width: 120px;
    image-rendering: crisp-edges;
  }
</style>
