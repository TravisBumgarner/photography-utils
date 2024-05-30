import React from 'react';
import ScrollableWindow from './ScrollableWindow.js';


const items = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
]

export default function App() {

  return <ScrollableWindow items={items} windowSize={5} />
}

