import { createContext, useState } from "react";
import { ColorResult } from "react-color";

const data = [
  {
    id: "0",
    name: "palette 1",
    colors: [
      {
        hex: "#FF5733",
        rgb: { r: 255, g: 87, b: 51, a: 1 },
        hsl: { h: 12, s: 100, l: 58, a: 1 },
      },
      {
        hex: "#FFC300",
        rgb: { r: 255, g: 195, b: 0, a: 1 },
        hsl: { h: 45, s: 100, l: 50, a: 1 },
      },
      {
        hex: "#36A2EB",
        rgb: { r: 54, g: 162, b: 235, a: 1 },
        hsl: { h: 205, s: 79, l: 55, a: 1 },
      },
      {
        hex: "#4BC0C0",
        rgb: { r: 75, g: 192, b: 192, a: 1 },
        hsl: { h: 180, s: 50, l: 53, a: 1 },
      },
      {
        hex: "#9966FF",
        rgb: { r: 153, g: 102, b: 255, a: 1 },
        hsl: { h: 255, s: 100, l: 70, a: 1 },
      },
      {
        hex: "#FF6363",
        rgb: { r: 255, g: 99, b: 99, a: 1 },
        hsl: { h: 0, s: 100, l: 71, a: 1 },
      },
      {
        hex: "#FF9933",
        rgb: { r: 255, g: 153, b: 51, a: 1 },
        hsl: { h: 30, s: 100, l: 59, a: 1 },
      },
      {
        hex: "#8A2BE2",
        rgb: { r: 138, g: 43, b: 226, a: 1 },
        hsl: { h: 271, s: 75, l: 53, a: 1 },
      },
      {
        hex: "#20B2AA",
        rgb: { r: 32, g: 178, b: 170, a: 1 },
        hsl: { h: 176, s: 70, l: 41, a: 1 },
      },
      {
        hex: "#FF1493",
        rgb: { r: 255, g: 20, b: 147, a: 1 },
        hsl: { h: 328, s: 100, l: 54, a: 1 },
      },
      {
        hex: "#5398D9",
        rgb: { r: 83, g: 152, b: 217, a: 1 },
        hsl: { h: 209, s: 62, l: 60, a: 1 },
      },
      {
        hex: "#E0E0E0",
        rgb: { r: 224, g: 224, b: 224, a: 1 },
        hsl: { h: 0, s: 0, l: 88, a: 1 },
      },
      {
        hex: "#A9A9A9",
        rgb: { r: 169, g: 169, b: 169, a: 1 },
        hsl: { h: 0, s: 0, l: 66, a: 1 },
      },
      {
        hex: "#6EBB61",
        rgb: { r: 110, g: 187, b: 97, a: 1 },
        hsl: { h: 113, s: 40, l: 55, a: 1 },
      },
      {
        hex: "#F5F5F5",
        rgb: { r: 245, g: 245, b: 245, a: 1 },
        hsl: { h: 0, s: 0, l: 96, a: 1 },
      },
      {
        hex: "#8A96A0",
        rgb: { r: 138, g: 150, b: 160, a: 1 },
        hsl: { h: 212, s: 10, l: 57, a: 1 },
      },
    ],
  },
  {
    id: "9",
    name: "palette 1",
    colors: [
      {
        hex: "#FF5733",
        rgb: { r: 255, g: 87, b: 51, a: 1 },
        hsl: { h: 12, s: 100, l: 58, a: 1 },
      },
      {
        hex: "#FFC300",
        rgb: { r: 255, g: 195, b: 0, a: 1 },
        hsl: { h: 45, s: 100, l: 50, a: 1 },
      },
      {
        hex: "#36A2EB",
        rgb: { r: 54, g: 162, b: 235, a: 1 },
        hsl: { h: 205, s: 79, l: 55, a: 1 },
      },
      {
        hex: "#4BC0C0",
        rgb: { r: 75, g: 192, b: 192, a: 1 },
        hsl: { h: 180, s: 50, l: 53, a: 1 },
      },
      {
        hex: "#9966FF",
        rgb: { r: 153, g: 102, b: 255, a: 1 },
        hsl: { h: 255, s: 100, l: 70, a: 1 },
      },
      {
        hex: "#FF6363",
        rgb: { r: 255, g: 99, b: 99, a: 1 },
        hsl: { h: 0, s: 100, l: 71, a: 1 },
      },
      {
        hex: "#FF9933",
        rgb: { r: 255, g: 153, b: 51, a: 1 },
        hsl: { h: 30, s: 100, l: 59, a: 1 },
      },
      {
        hex: "#8A2BE2",
        rgb: { r: 138, g: 43, b: 226, a: 1 },
        hsl: { h: 271, s: 75, l: 53, a: 1 },
      },
      {
        hex: "#20B2AA",
        rgb: { r: 32, g: 178, b: 170, a: 1 },
        hsl: { h: 176, s: 70, l: 41, a: 1 },
      },
      {
        hex: "#FF1493",
        rgb: { r: 255, g: 20, b: 147, a: 1 },
        hsl: { h: 328, s: 100, l: 54, a: 1 },
      },
      {
        hex: "#5398D9",
        rgb: { r: 83, g: 152, b: 217, a: 1 },
        hsl: { h: 209, s: 62, l: 60, a: 1 },
      },
      {
        hex: "#E0E0E0",
        rgb: { r: 224, g: 224, b: 224, a: 1 },
        hsl: { h: 0, s: 0, l: 88, a: 1 },
      },
      {
        hex: "#A9A9A9",
        rgb: { r: 169, g: 169, b: 169, a: 1 },
        hsl: { h: 0, s: 0, l: 66, a: 1 },
      },
      {
        hex: "#6EBB61",
        rgb: { r: 110, g: 187, b: 97, a: 1 },
        hsl: { h: 113, s: 40, l: 55, a: 1 },
      },
      {
        hex: "#F5F5F5",
        rgb: { r: 245, g: 245, b: 245, a: 1 },
        hsl: { h: 0, s: 0, l: 96, a: 1 },
      },
      {
        hex: "#8A96A0",
        rgb: { r: 138, g: 150, b: 160, a: 1 },
        hsl: { h: 212, s: 10, l: 57, a: 1 },
      },
    ],
  },
  {
    id: "8",
    name: "palette 1",
    colors: [
      {
        hex: "#FF5733",
        rgb: { r: 255, g: 87, b: 51, a: 1 },
        hsl: { h: 12, s: 100, l: 58, a: 1 },
      },
      {
        hex: "#FFC300",
        rgb: { r: 255, g: 195, b: 0, a: 1 },
        hsl: { h: 45, s: 100, l: 50, a: 1 },
      },
      {
        hex: "#36A2EB",
        rgb: { r: 54, g: 162, b: 235, a: 1 },
        hsl: { h: 205, s: 79, l: 55, a: 1 },
      },
      {
        hex: "#4BC0C0",
        rgb: { r: 75, g: 192, b: 192, a: 1 },
        hsl: { h: 180, s: 50, l: 53, a: 1 },
      },
      {
        hex: "#9966FF",
        rgb: { r: 153, g: 102, b: 255, a: 1 },
        hsl: { h: 255, s: 100, l: 70, a: 1 },
      },
      {
        hex: "#FF6363",
        rgb: { r: 255, g: 99, b: 99, a: 1 },
        hsl: { h: 0, s: 100, l: 71, a: 1 },
      },
      {
        hex: "#FF9933",
        rgb: { r: 255, g: 153, b: 51, a: 1 },
        hsl: { h: 30, s: 100, l: 59, a: 1 },
      },
      {
        hex: "#8A2BE2",
        rgb: { r: 138, g: 43, b: 226, a: 1 },
        hsl: { h: 271, s: 75, l: 53, a: 1 },
      },
      {
        hex: "#20B2AA",
        rgb: { r: 32, g: 178, b: 170, a: 1 },
        hsl: { h: 176, s: 70, l: 41, a: 1 },
      },
      {
        hex: "#FF1493",
        rgb: { r: 255, g: 20, b: 147, a: 1 },
        hsl: { h: 328, s: 100, l: 54, a: 1 },
      },
      {
        hex: "#5398D9",
        rgb: { r: 83, g: 152, b: 217, a: 1 },
        hsl: { h: 209, s: 62, l: 60, a: 1 },
      },
      {
        hex: "#E0E0E0",
        rgb: { r: 224, g: 224, b: 224, a: 1 },
        hsl: { h: 0, s: 0, l: 88, a: 1 },
      },
      {
        hex: "#A9A9A9",
        rgb: { r: 169, g: 169, b: 169, a: 1 },
        hsl: { h: 0, s: 0, l: 66, a: 1 },
      },
      {
        hex: "#6EBB61",
        rgb: { r: 110, g: 187, b: 97, a: 1 },
        hsl: { h: 113, s: 40, l: 55, a: 1 },
      },
      {
        hex: "#F5F5F5",
        rgb: { r: 245, g: 245, b: 245, a: 1 },
        hsl: { h: 0, s: 0, l: 96, a: 1 },
      },
      {
        hex: "#8A96A0",
        rgb: { r: 138, g: 150, b: 160, a: 1 },
        hsl: { h: 212, s: 10, l: 57, a: 1 },
      },
    ],
  },
  {
    id: "7",
    name: "palette 1",
    colors: [
      {
        hex: "#FF5733",
        rgb: { r: 255, g: 87, b: 51, a: 1 },
        hsl: { h: 12, s: 100, l: 58, a: 1 },
      },
      {
        hex: "#FFC300",
        rgb: { r: 255, g: 195, b: 0, a: 1 },
        hsl: { h: 45, s: 100, l: 50, a: 1 },
      },
      {
        hex: "#36A2EB",
        rgb: { r: 54, g: 162, b: 235, a: 1 },
        hsl: { h: 205, s: 79, l: 55, a: 1 },
      },
      {
        hex: "#4BC0C0",
        rgb: { r: 75, g: 192, b: 192, a: 1 },
        hsl: { h: 180, s: 50, l: 53, a: 1 },
      },
      {
        hex: "#9966FF",
        rgb: { r: 153, g: 102, b: 255, a: 1 },
        hsl: { h: 255, s: 100, l: 70, a: 1 },
      },
      {
        hex: "#FF6363",
        rgb: { r: 255, g: 99, b: 99, a: 1 },
        hsl: { h: 0, s: 100, l: 71, a: 1 },
      },
      {
        hex: "#FF9933",
        rgb: { r: 255, g: 153, b: 51, a: 1 },
        hsl: { h: 30, s: 100, l: 59, a: 1 },
      },
      {
        hex: "#8A2BE2",
        rgb: { r: 138, g: 43, b: 226, a: 1 },
        hsl: { h: 271, s: 75, l: 53, a: 1 },
      },
      {
        hex: "#20B2AA",
        rgb: { r: 32, g: 178, b: 170, a: 1 },
        hsl: { h: 176, s: 70, l: 41, a: 1 },
      },
      {
        hex: "#FF1493",
        rgb: { r: 255, g: 20, b: 147, a: 1 },
        hsl: { h: 328, s: 100, l: 54, a: 1 },
      },
      {
        hex: "#5398D9",
        rgb: { r: 83, g: 152, b: 217, a: 1 },
        hsl: { h: 209, s: 62, l: 60, a: 1 },
      },
      {
        hex: "#E0E0E0",
        rgb: { r: 224, g: 224, b: 224, a: 1 },
        hsl: { h: 0, s: 0, l: 88, a: 1 },
      },
      {
        hex: "#A9A9A9",
        rgb: { r: 169, g: 169, b: 169, a: 1 },
        hsl: { h: 0, s: 0, l: 66, a: 1 },
      },
      {
        hex: "#6EBB61",
        rgb: { r: 110, g: 187, b: 97, a: 1 },
        hsl: { h: 113, s: 40, l: 55, a: 1 },
      },
      {
        hex: "#F5F5F5",
        rgb: { r: 245, g: 245, b: 245, a: 1 },
        hsl: { h: 0, s: 0, l: 96, a: 1 },
      },
      {
        hex: "#8A96A0",
        rgb: { r: 138, g: 150, b: 160, a: 1 },
        hsl: { h: 212, s: 10, l: 57, a: 1 },
      },
    ],
  },
  {
    id: "6",
    name: "palette 1",
    colors: [
      {
        hex: "#FF5733",
        rgb: { r: 255, g: 87, b: 51, a: 1 },
        hsl: { h: 12, s: 100, l: 58, a: 1 },
      },
      {
        hex: "#FFC300",
        rgb: { r: 255, g: 195, b: 0, a: 1 },
        hsl: { h: 45, s: 100, l: 50, a: 1 },
      },
      {
        hex: "#36A2EB",
        rgb: { r: 54, g: 162, b: 235, a: 1 },
        hsl: { h: 205, s: 79, l: 55, a: 1 },
      },
      {
        hex: "#4BC0C0",
        rgb: { r: 75, g: 192, b: 192, a: 1 },
        hsl: { h: 180, s: 50, l: 53, a: 1 },
      },
      {
        hex: "#9966FF",
        rgb: { r: 153, g: 102, b: 255, a: 1 },
        hsl: { h: 255, s: 100, l: 70, a: 1 },
      },
      {
        hex: "#FF6363",
        rgb: { r: 255, g: 99, b: 99, a: 1 },
        hsl: { h: 0, s: 100, l: 71, a: 1 },
      },
      {
        hex: "#FF9933",
        rgb: { r: 255, g: 153, b: 51, a: 1 },
        hsl: { h: 30, s: 100, l: 59, a: 1 },
      },
      {
        hex: "#8A2BE2",
        rgb: { r: 138, g: 43, b: 226, a: 1 },
        hsl: { h: 271, s: 75, l: 53, a: 1 },
      },
      {
        hex: "#20B2AA",
        rgb: { r: 32, g: 178, b: 170, a: 1 },
        hsl: { h: 176, s: 70, l: 41, a: 1 },
      },
      {
        hex: "#FF1493",
        rgb: { r: 255, g: 20, b: 147, a: 1 },
        hsl: { h: 328, s: 100, l: 54, a: 1 },
      },
      {
        hex: "#5398D9",
        rgb: { r: 83, g: 152, b: 217, a: 1 },
        hsl: { h: 209, s: 62, l: 60, a: 1 },
      },
      {
        hex: "#E0E0E0",
        rgb: { r: 224, g: 224, b: 224, a: 1 },
        hsl: { h: 0, s: 0, l: 88, a: 1 },
      },
      {
        hex: "#A9A9A9",
        rgb: { r: 169, g: 169, b: 169, a: 1 },
        hsl: { h: 0, s: 0, l: 66, a: 1 },
      },
      {
        hex: "#6EBB61",
        rgb: { r: 110, g: 187, b: 97, a: 1 },
        hsl: { h: 113, s: 40, l: 55, a: 1 },
      },
      {
        hex: "#F5F5F5",
        rgb: { r: 245, g: 245, b: 245, a: 1 },
        hsl: { h: 0, s: 0, l: 96, a: 1 },
      },
      {
        hex: "#8A96A0",
        rgb: { r: 138, g: 150, b: 160, a: 1 },
        hsl: { h: 212, s: 10, l: 57, a: 1 },
      },
    ],
  },
  {
    id: "5",
    name: "palette 1",
    colors: [
      {
        hex: "#FF5733",
        rgb: { r: 255, g: 87, b: 51, a: 1 },
        hsl: { h: 12, s: 100, l: 58, a: 1 },
      },
      {
        hex: "#FFC300",
        rgb: { r: 255, g: 195, b: 0, a: 1 },
        hsl: { h: 45, s: 100, l: 50, a: 1 },
      },
      {
        hex: "#36A2EB",
        rgb: { r: 54, g: 162, b: 235, a: 1 },
        hsl: { h: 205, s: 79, l: 55, a: 1 },
      },
      {
        hex: "#4BC0C0",
        rgb: { r: 75, g: 192, b: 192, a: 1 },
        hsl: { h: 180, s: 50, l: 53, a: 1 },
      },
      {
        hex: "#9966FF",
        rgb: { r: 153, g: 102, b: 255, a: 1 },
        hsl: { h: 255, s: 100, l: 70, a: 1 },
      },
      {
        hex: "#FF6363",
        rgb: { r: 255, g: 99, b: 99, a: 1 },
        hsl: { h: 0, s: 100, l: 71, a: 1 },
      },
      {
        hex: "#FF9933",
        rgb: { r: 255, g: 153, b: 51, a: 1 },
        hsl: { h: 30, s: 100, l: 59, a: 1 },
      },
      {
        hex: "#8A2BE2",
        rgb: { r: 138, g: 43, b: 226, a: 1 },
        hsl: { h: 271, s: 75, l: 53, a: 1 },
      },
      {
        hex: "#20B2AA",
        rgb: { r: 32, g: 178, b: 170, a: 1 },
        hsl: { h: 176, s: 70, l: 41, a: 1 },
      },
      {
        hex: "#FF1493",
        rgb: { r: 255, g: 20, b: 147, a: 1 },
        hsl: { h: 328, s: 100, l: 54, a: 1 },
      },
      {
        hex: "#5398D9",
        rgb: { r: 83, g: 152, b: 217, a: 1 },
        hsl: { h: 209, s: 62, l: 60, a: 1 },
      },
      {
        hex: "#E0E0E0",
        rgb: { r: 224, g: 224, b: 224, a: 1 },
        hsl: { h: 0, s: 0, l: 88, a: 1 },
      },
      {
        hex: "#A9A9A9",
        rgb: { r: 169, g: 169, b: 169, a: 1 },
        hsl: { h: 0, s: 0, l: 66, a: 1 },
      },
      {
        hex: "#6EBB61",
        rgb: { r: 110, g: 187, b: 97, a: 1 },
        hsl: { h: 113, s: 40, l: 55, a: 1 },
      },
      {
        hex: "#F5F5F5",
        rgb: { r: 245, g: 245, b: 245, a: 1 },
        hsl: { h: 0, s: 0, l: 96, a: 1 },
      },
      {
        hex: "#8A96A0",
        rgb: { r: 138, g: 150, b: 160, a: 1 },
        hsl: { h: 212, s: 10, l: 57, a: 1 },
      },
    ],
  },
  {
    id: "4",
    name: "palette 1",
    colors: [
      {
        hex: "#FF5733",
        rgb: { r: 255, g: 87, b: 51, a: 1 },
        hsl: { h: 12, s: 100, l: 58, a: 1 },
      },
      {
        hex: "#FFC300",
        rgb: { r: 255, g: 195, b: 0, a: 1 },
        hsl: { h: 45, s: 100, l: 50, a: 1 },
      },
      {
        hex: "#36A2EB",
        rgb: { r: 54, g: 162, b: 235, a: 1 },
        hsl: { h: 205, s: 79, l: 55, a: 1 },
      },
      {
        hex: "#4BC0C0",
        rgb: { r: 75, g: 192, b: 192, a: 1 },
        hsl: { h: 180, s: 50, l: 53, a: 1 },
      },
      {
        hex: "#9966FF",
        rgb: { r: 153, g: 102, b: 255, a: 1 },
        hsl: { h: 255, s: 100, l: 70, a: 1 },
      },
      {
        hex: "#FF6363",
        rgb: { r: 255, g: 99, b: 99, a: 1 },
        hsl: { h: 0, s: 100, l: 71, a: 1 },
      },
      {
        hex: "#FF9933",
        rgb: { r: 255, g: 153, b: 51, a: 1 },
        hsl: { h: 30, s: 100, l: 59, a: 1 },
      },
      {
        hex: "#8A2BE2",
        rgb: { r: 138, g: 43, b: 226, a: 1 },
        hsl: { h: 271, s: 75, l: 53, a: 1 },
      },
      {
        hex: "#20B2AA",
        rgb: { r: 32, g: 178, b: 170, a: 1 },
        hsl: { h: 176, s: 70, l: 41, a: 1 },
      },
      {
        hex: "#FF1493",
        rgb: { r: 255, g: 20, b: 147, a: 1 },
        hsl: { h: 328, s: 100, l: 54, a: 1 },
      },
      {
        hex: "#5398D9",
        rgb: { r: 83, g: 152, b: 217, a: 1 },
        hsl: { h: 209, s: 62, l: 60, a: 1 },
      },
      {
        hex: "#E0E0E0",
        rgb: { r: 224, g: 224, b: 224, a: 1 },
        hsl: { h: 0, s: 0, l: 88, a: 1 },
      },
      {
        hex: "#A9A9A9",
        rgb: { r: 169, g: 169, b: 169, a: 1 },
        hsl: { h: 0, s: 0, l: 66, a: 1 },
      },
      {
        hex: "#6EBB61",
        rgb: { r: 110, g: 187, b: 97, a: 1 },
        hsl: { h: 113, s: 40, l: 55, a: 1 },
      },
      {
        hex: "#F5F5F5",
        rgb: { r: 245, g: 245, b: 245, a: 1 },
        hsl: { h: 0, s: 0, l: 96, a: 1 },
      },
      {
        hex: "#8A96A0",
        rgb: { r: 138, g: 150, b: 160, a: 1 },
        hsl: { h: 212, s: 10, l: 57, a: 1 },
      },
    ],
  },
  {
    id: "3",
    name: "palette 1",
    colors: [
      {
        hex: "#FF5733",
        rgb: { r: 255, g: 87, b: 51, a: 1 },
        hsl: { h: 12, s: 100, l: 58, a: 1 },
      },
      {
        hex: "#FFC300",
        rgb: { r: 255, g: 195, b: 0, a: 1 },
        hsl: { h: 45, s: 100, l: 50, a: 1 },
      },
      {
        hex: "#36A2EB",
        rgb: { r: 54, g: 162, b: 235, a: 1 },
        hsl: { h: 205, s: 79, l: 55, a: 1 },
      },
      {
        hex: "#4BC0C0",
        rgb: { r: 75, g: 192, b: 192, a: 1 },
        hsl: { h: 180, s: 50, l: 53, a: 1 },
      },
      {
        hex: "#9966FF",
        rgb: { r: 153, g: 102, b: 255, a: 1 },
        hsl: { h: 255, s: 100, l: 70, a: 1 },
      },
      {
        hex: "#FF6363",
        rgb: { r: 255, g: 99, b: 99, a: 1 },
        hsl: { h: 0, s: 100, l: 71, a: 1 },
      },
      {
        hex: "#FF9933",
        rgb: { r: 255, g: 153, b: 51, a: 1 },
        hsl: { h: 30, s: 100, l: 59, a: 1 },
      },
      {
        hex: "#8A2BE2",
        rgb: { r: 138, g: 43, b: 226, a: 1 },
        hsl: { h: 271, s: 75, l: 53, a: 1 },
      },
      {
        hex: "#20B2AA",
        rgb: { r: 32, g: 178, b: 170, a: 1 },
        hsl: { h: 176, s: 70, l: 41, a: 1 },
      },
      {
        hex: "#FF1493",
        rgb: { r: 255, g: 20, b: 147, a: 1 },
        hsl: { h: 328, s: 100, l: 54, a: 1 },
      },
      {
        hex: "#5398D9",
        rgb: { r: 83, g: 152, b: 217, a: 1 },
        hsl: { h: 209, s: 62, l: 60, a: 1 },
      },
      {
        hex: "#E0E0E0",
        rgb: { r: 224, g: 224, b: 224, a: 1 },
        hsl: { h: 0, s: 0, l: 88, a: 1 },
      },
      {
        hex: "#A9A9A9",
        rgb: { r: 169, g: 169, b: 169, a: 1 },
        hsl: { h: 0, s: 0, l: 66, a: 1 },
      },
      {
        hex: "#6EBB61",
        rgb: { r: 110, g: 187, b: 97, a: 1 },
        hsl: { h: 113, s: 40, l: 55, a: 1 },
      },
      {
        hex: "#F5F5F5",
        rgb: { r: 245, g: 245, b: 245, a: 1 },
        hsl: { h: 0, s: 0, l: 96, a: 1 },
      },
      {
        hex: "#8A96A0",
        rgb: { r: 138, g: 150, b: 160, a: 1 },
        hsl: { h: 212, s: 10, l: 57, a: 1 },
      },
    ],
  },
  {
    id: "1",
    name: "palette 2",
    colors: [
      {
        hex: "#DC4A24",
        rgb: { r: 220, g: 74, b: 36, a: 1 },
        hsl: { h: 12, s: 73, l: 50, a: 1 },
      },
      {
        hex: "#DC4A24",
        rgb: { r: 220, g: 74, b: 36, a: 1 },
        hsl: { h: 12, s: 73, l: 50, a: 1 },
      },
      {
        hex: "#FF5733",
        rgb: { r: 255, g: 87, b: 51, a: 1 },
        hsl: { h: 12, s: 100, l: 58, a: 1 },
      },
      {
        hex: "#FFC300",
        rgb: { r: 255, g: 195, b: 0, a: 1 },
        hsl: { h: 45, s: 100, l: 50, a: 1 },
      },
      {
        hex: "#36A2EB",
        rgb: { r: 54, g: 162, b: 235, a: 1 },
        hsl: { h: 205, s: 79, l: 55, a: 1 },
      },
      {
        hex: "#4BC0C0",
        rgb: { r: 75, g: 192, b: 192, a: 1 },
        hsl: { h: 180, s: 50, l: 53, a: 1 },
      },
      {
        hex: "#9966FF",
        rgb: { r: 153, g: 102, b: 255, a: 1 },
        hsl: { h: 255, s: 100, l: 70, a: 1 },
      },
      {
        hex: "#FF6363",
        rgb: { r: 255, g: 99, b: 99, a: 1 },
        hsl: { h: 0, s: 100, l: 71, a: 1 },
      },
      {
        hex: "#FF9933",
        rgb: { r: 255, g: 153, b: 51, a: 1 },
        hsl: { h: 30, s: 100, l: 59, a: 1 },
      },
    ],
  },
];

// const data = [];

export interface colorContextState extends ColorResult {
  isLight?: boolean;
}

export type ColorContextType = {
  colorHistory: colorContextState[];
  addToColorHistory: (color: colorContextState) => void;
  palettes: PaletteType[];
  addNewPalette: (name: string, colors: ColorResult[]) => void;
  deletePalette: (id: string) => void;
  selectedPaletteID: string;
  selectPalette: (id: string) => void;
  updatePalette: (id: string, name: string, colors: ColorResult[]) => void;
};

export type PaletteType = { id: string; name: string; colors: ColorResult[] };

const isColorLight = (color: ColorResult) => {
  const { hsl } = color;

  if (hsl) return hsl.l > 0.65 || (hsl.a ?? 1) < 0.65;

  return false;
};

export const ColorContext = createContext<ColorContextType | null>(null);

const ColorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedColorHistory, setSelectedColorHistory] = useState<
    colorContextState[]
  >([
    {
      hex: "#000000",
      rgb: { r: 0, g: 0, b: 0, a: 1 },
      hsl: { h: 0, s: 0, l: 0, a: 1 },
      isLight: false,
    },
  ]);
  const [palettes, setPalettes] = useState<PaletteType[]>(data);
  const [selectedPaletteID, setSelectedPaletteID] = useState(palettes[0]?.id);

  const addToColorHistory = (color: ColorResult) =>
    setSelectedColorHistory((prevHistory) => {
      const lastColor = prevHistory[prevHistory.length - 1];
      if (!lastColor || lastColor.hex !== color.hex) {
        const updatedHistory = [
          ...prevHistory.slice(-5),
          { ...color, isLight: isColorLight(color) },
        ];
        return updatedHistory;
      }
      return prevHistory;
    });

  const addNewPalette = (name: string, colors: ColorResult[]) =>
    setPalettes((prevPalettes) => [
      ...prevPalettes,
      { id: `${prevPalettes.length}_${new Date().getTime()}`, name, colors },
    ]);

  const deletePalette = (id: string) =>
    setPalettes((prevPalettes) => prevPalettes.filter((pal) => pal.id !== id));

  const updatePalette = (id: string, name: string, colors: ColorResult[]) =>
    setPalettes((prevPalettes) => {
      const updatedPalettes = prevPalettes.map((pal) =>
        pal.id === id ? { ...pal, name, colors } : pal
      );

      if (!updatedPalettes.find((pal) => pal.id === id)) {
        updatedPalettes.push({ id, name, colors });
      }

      return updatedPalettes;
    });

  const selectPalette = (id: string) => setSelectedPaletteID(id);

  return (
    <ColorContext.Provider
      value={{
        colorHistory: selectedColorHistory,
        addToColorHistory,
        palettes,
        addNewPalette,
        deletePalette,
        selectedPaletteID,
        selectPalette,
        updatePalette,
      }}
    >
      {children}
    </ColorContext.Provider>
  );
};
export default ColorProvider;
