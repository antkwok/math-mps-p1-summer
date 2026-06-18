declare module 'zdog' {
  export interface Point3D {
    x?: number
    y?: number
    z?: number
  }

  export interface IllustrationOptions {
    element?: HTMLCanvasElement | string
    zoom?: number
    dragRotate?: boolean
  }

  export interface ShapeOptions {
    addTo?: Illustration | Group
    width?: number
    height?: number
    depth?: number
    diameter?: number
    color?: string
    stroke?: number | boolean
    translate?: Point3D
    rotate?: Point3D
  }

  export class Illustration {
    canvas: HTMLCanvasElement
    zoom: number
    dragRotate: boolean
    children: (Illustration | Group | Shape)[]

    constructor(options: IllustrationOptions)
    render(): void
  }

  export class Group {
    addTo: Illustration | Group
    children: Shape[]
    rotate: Point3D
    translate: Point3D

    constructor(options?: ShapeOptions)
  }

  export class Shape {
    addTo: Illustration | Group
    rotate: Point3D
    translate: Point3D
    color: string
    stroke: number | boolean

    constructor(options?: ShapeOptions)
    addPath(points: Point3D[]): void
  }

  export class Box extends Shape {
    constructor(options?: ShapeOptions)
  }

  export class Cylinder extends Shape {
    constructor(options?: ShapeOptions)
  }

  export class Cone extends Shape {
    constructor(options?: ShapeOptions)
  }

  export class Hemisphere extends Shape {
    constructor(options?: ShapeOptions)
  }

  export default {
    Illustration,
    Group,
    Shape,
    Box,
    Cylinder,
    Cone,
    Hemisphere
  }
}
