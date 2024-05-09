import { useState, useCallback, useMemo, useEffect } from "react";

interface PointChange {
  x: number;
  y: number;
  color: string;
}

interface useHistoryState {
  currentState: PointChange[][];
  startDrawing: () => void;
  stopDrawing: () => void;
  isDrawing: boolean;
  handleDraw: (newPoint?: PointChange) => void;
  handleFill: (
    x: number,
    y: number,
    targetColor: string,
    newColor: string
  ) => void;
  undo: () => void;
  redo: () => void;
  isUndoPossible: boolean;
  isRedoPossible: boolean;
  clearHistory: () => void;
}

const useHistory = (
  canvasWidth: number,
  canvasHeight: number
): useHistoryState => {
  const [history, setHistory] = useState<PointChange[][]>([[]]);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [currentMoveIndex, setCurrentMoveIndex] = useState<number>(0);

  useEffect(() => {
    setHistory((prevHistory) =>
      prevHistory.map((move) =>
        move.filter(
          (change) => change.x < canvasWidth && change.y < canvasHeight
        )
      )
    );

    return () => {};
  }, [canvasHeight, canvasWidth]);

  const memoizedFindLastChangeOfPoint = useMemo(() => {
    return (arr: PointChange[] | PointChange[][], point: PointChange) => {
      const { x, y } = point;

      if (Array.isArray(arr)) {
        for (let i = arr.length - 1; i >= 0; i--) {
          const move = arr[i];
          if (Array.isArray(move)) {
            for (let j = move.length - 1; j >= 0; j--) {
              const currentPoint = move[j];
              if (currentPoint.x === x && currentPoint.y === y) {
                return currentPoint;
              }
            }
          } else {
            if (move.x === x && move.y === y) {
              return move;
            }
          }
        }
      }
      return null;
    };
  }, []);

  const isDuplicate = useMemo(() => {
    return (arr: PointChange[] | PointChange[][], newPoint: PointChange) => {
      const { color } = newPoint;
      const samePosPoint = memoizedFindLastChangeOfPoint(arr, newPoint);

      const pointIsAlreadyErased =
        (!samePosPoint && color === "transparent") ||
        (samePosPoint?.color === "transparent" && color === "transparent");

      return samePosPoint?.color === color || pointIsAlreadyErased;
    };
  }, [memoizedFindLastChangeOfPoint]);

  const startDrawing = useCallback(() => {
    setIsDrawing(true);

    // if you're drawing after an "undo", remove all the next moves first
    if (currentMoveIndex !== history.length - 1) {
      setHistory((prevHistory) => [...prevHistory.slice(0, currentMoveIndex)]);
    }
  }, [history.length, currentMoveIndex]);

  const stopDrawing = useCallback(() => {
    setIsDrawing(false);

    const previousMove = history[history.length - 1];

    if (!previousMove || (previousMove && previousMove.length)) {
      setHistory((prevHistory) => [...prevHistory, []]);
    }
  }, [history]);

  const undo = useCallback(() => {
    if (currentMoveIndex === 0) return;

    setCurrentMoveIndex((prevIndex) => prevIndex - 1);
  }, [currentMoveIndex]);

  const redo = useCallback(() => {
    if (currentMoveIndex === history.length - 1) return;

    setCurrentMoveIndex((prevIndex) => prevIndex + 1);
  }, [currentMoveIndex, history.length]);

  const handleDraw = useCallback(
    (newPoint?: PointChange) => {
      if (newPoint) {
        const { x, y, color } = newPoint;

        const previousMove = history[history.length - 1];

        if (isDuplicate(history, { x, y, color })) return;

        previousMove.push({ x, y, color });

        setHistory((prevHistory) => [
          ...prevHistory.slice(0, history.length - 1),
          previousMove,
        ]);
        setCurrentMoveIndex(history.length);
      }
    },
    [history, isDuplicate]
  );

  const handleFill = useCallback(
    (startX: number, startY: number, targetColor: string, newColor: string) => {
      const visited = new Set();
      const directions = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ];

      const stack = [{ x: startX, y: startY }];
      const newMove = [];

      while (stack.length > 0) {
        const { x, y } = stack.pop()!;
        if (
          x < 0 ||
          x >= canvasWidth ||
          y < 0 ||
          y >= canvasHeight ||
          visited.has(`${x},${y}`) ||
          isDuplicate(history, { x, y, color: newColor }) ||
          !isDuplicate(history, { x, y, color: targetColor })
        ) {
          continue;
        }

        visited.add(`${x},${y}`);
        newMove.push({ x, y, color: newColor });

        for (const [dx, dy] of directions) {
          stack.push({ x: x + dx, y: y + dy });
        }
      }

      if (newMove.length > 0) newMove.forEach((point) => handleDraw(point));
    },
    [history, handleDraw, canvasWidth, canvasHeight, isDuplicate]
  );

  const clearHistory = () => {
    setHistory([[]]);
    setCurrentMoveIndex(0);
  };

  return {
    currentState: history.slice(0, currentMoveIndex),
    startDrawing,
    stopDrawing,
    isDrawing,
    handleDraw,
    handleFill,
    undo,
    redo,
    isUndoPossible: currentMoveIndex !== 0,
    isRedoPossible: currentMoveIndex !== history.length - 1,
    clearHistory,
  };
};

export default useHistory;
