import { useState, useCallback, useLayoutEffect, useRef, useMemo } from "react";

export interface PointChange {
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
  handleBatchDraw: (points: PointChange[]) => void;
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

const MAX_HISTORY_STEPS = 50;

const useHistory = (
  canvasWidth: number,
  canvasHeight: number,
  defaultHistory?: PointChange[][],
  onHistoryChange?: (newHistory: PointChange[][]) => void
): useHistoryState => {
  const [history, setHistory] = useState<PointChange[][]>(
    () => defaultHistory || []
  );

  const historyRef = useRef<PointChange[][]>(defaultHistory || []);

  const [currentMoveIndex, setCurrentMoveIndex] = useState<number>(() =>
    defaultHistory && defaultHistory.length > 0 ? defaultHistory.length - 1 : -1
  );

  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  const flattenedGrid = useRef<Map<string, string>>(new Map());
  const indexRef = useRef<number>(
    defaultHistory && defaultHistory.length > 0 ? defaultHistory.length - 1 : -1
  );
  const hasDrawnInStrokeRef = useRef(false);
  const backupHistoryRef = useRef<PointChange[][]>([]);

  const rebuildGrid = useCallback(
    (hist: PointChange[][], targetIndex: number) => {
      const newGrid = new Map<string, string>();
      for (let i = 0; i <= targetIndex; i++) {
        const move = hist[i];
        if (!move || !Array.isArray(move)) continue;
        move.forEach((p) => {
          if (p.color === "transparent") newGrid.delete(`${p.x},${p.y}`);
          else newGrid.set(`${p.x},${p.y}`, p.color);
        });
      }
      flattenedGrid.current = newGrid;
    },
    []
  );

  useLayoutEffect(() => {
    if (defaultHistory && defaultHistory.length > 0) {
      setHistory(defaultHistory);
      historyRef.current = defaultHistory;
      const idx = defaultHistory.length - 1;
      indexRef.current = idx;
      setCurrentMoveIndex(idx);
      rebuildGrid(defaultHistory, idx);
    }
  }, [defaultHistory, rebuildGrid]);

  const startDrawing = useCallback(() => {
    setIsDrawing(true);
    hasDrawnInStrokeRef.current = false;
    backupHistoryRef.current = historyRef.current;

    const baseHistory = historyRef.current.slice(0, indexRef.current + 1);
    const newHistory = [...baseHistory, []];

    historyRef.current = newHistory;
    indexRef.current = newHistory.length - 1;

    setHistory(newHistory);
    setCurrentMoveIndex(indexRef.current);

    if (baseHistory.length !== historyRef.current.length) {
      rebuildGrid(baseHistory, indexRef.current - 1);
    }
  }, [rebuildGrid]);

  const stopDrawing = useCallback(() => {
    setIsDrawing(false);
    const currentHist = historyRef.current;

    if (!hasDrawnInStrokeRef.current) {
      const backup = backupHistoryRef.current;
      historyRef.current = backup;
      indexRef.current = backup.length - 1;

      setHistory(backup);
      setCurrentMoveIndex(indexRef.current);
    } else {
      if (currentHist.length > MAX_HISTORY_STEPS) {
        const trimmed = currentHist.slice(
          currentHist.length - MAX_HISTORY_STEPS
        );

        historyRef.current = trimmed;
        indexRef.current = trimmed.length - 1;

        setHistory(trimmed);
        setCurrentMoveIndex(indexRef.current);

        if (onHistoryChange) onHistoryChange(trimmed);
      } else {
        if (onHistoryChange)
          onHistoryChange(currentHist.slice(0, indexRef.current + 1));
      }
    }
  }, [onHistoryChange]);

  const handleDraw = useCallback((newPoint?: PointChange) => {
    if (!newPoint || indexRef.current < 0) return;

    const key = `${newPoint.x},${newPoint.y}`;
    const currentVal = flattenedGrid.current.get(key) || "transparent";

    if (currentVal === newPoint.color) return;

    hasDrawnInStrokeRef.current = true;

    if (newPoint.color === "transparent") flattenedGrid.current.delete(key);
    else flattenedGrid.current.set(key, newPoint.color);

    const currentHist = historyRef.current;
    const idx = indexRef.current;
    const newHistoryList = [...currentHist];
    const currentStep = newHistoryList[idx] ? [...newHistoryList[idx]] : [];
    currentStep.push(newPoint);
    newHistoryList[idx] = currentStep;

    historyRef.current = newHistoryList;

    setHistory(newHistoryList);
  }, []);

  const handleBatchDraw = useCallback((points: PointChange[]) => {
    if (points.length === 0 || indexRef.current < 0) return;

    const validPoints = points.filter((p) => {
      const key = `${p.x},${p.y}`;
      const currentVal = flattenedGrid.current.get(key) || "transparent";
      return currentVal !== p.color;
    });

    if (validPoints.length === 0) return;

    hasDrawnInStrokeRef.current = true;

    validPoints.forEach((p) => {
      const key = `${p.x},${p.y}`;
      if (p.color === "transparent") flattenedGrid.current.delete(key);
      else flattenedGrid.current.set(key, p.color);
    });

    const currentHist = historyRef.current;
    const idx = indexRef.current;
    const newHistoryList = [...currentHist];
    const currentStep = newHistoryList[idx] ? [...newHistoryList[idx]] : [];

    const nextStep = currentStep.concat(validPoints);
    newHistoryList[idx] = nextStep;

    historyRef.current = newHistoryList;

    setHistory(newHistoryList);
  }, []);

  const handleFill = useCallback(
    (
      startX: number,
      startY: number,
      _targetColor: string,
      newColor: string
    ) => {
      const startKey = `${startX},${startY}`;
      const actualStartColor =
        flattenedGrid.current.get(startKey) || "transparent";

      if (actualStartColor === newColor) return;

      const visited = new Set<string>();
      const stack = [{ x: startX, y: startY }];
      const newPoints: PointChange[] = [];

      const baseHistory = historyRef.current.slice(0, indexRef.current + 1);

      visited.add(startKey);

      while (stack.length) {
        const { x, y } = stack.pop()!;
        const key = `${x},${y}`;

        newPoints.push({ x, y, color: newColor });

        if (newColor === "transparent") flattenedGrid.current.delete(key);
        else flattenedGrid.current.set(key, newColor);

        const neighbors = [
          { x: x + 1, y },
          { x: x - 1, y },
          { x, y: y + 1 },
          { x, y: y - 1 },
        ];
        for (const n of neighbors) {
          const nKey = `${n.x},${n.y}`;
          if (n.x < 0 || n.x >= canvasWidth || n.y < 0 || n.y >= canvasHeight)
            continue;
          if (visited.has(nKey)) continue;

          const nColor = flattenedGrid.current.get(nKey) || "transparent";
          if (nColor === actualStartColor) {
            visited.add(nKey);
            stack.push(n);
          }
        }
      }

      if (newPoints.length > 0) {
        const finalHistory = [...baseHistory, newPoints];
        const newIdx = finalHistory.length - 1;

        historyRef.current = finalHistory;
        indexRef.current = newIdx;

        setHistory(finalHistory);
        setCurrentMoveIndex(newIdx);

        if (onHistoryChange) onHistoryChange(finalHistory);
      }
    },
    [canvasWidth, canvasHeight, onHistoryChange]
  );

  const undo = useCallback(() => {
    if (indexRef.current >= 0) {
      const newIdx = indexRef.current - 1;
      indexRef.current = newIdx;
      setCurrentMoveIndex(newIdx);
      rebuildGrid(historyRef.current, newIdx);
      if (onHistoryChange)
        onHistoryChange(historyRef.current.slice(0, newIdx + 1));
    }
  }, [rebuildGrid, onHistoryChange]);

  const redo = useCallback(() => {
    if (indexRef.current < historyRef.current.length - 1) {
      const newIdx = indexRef.current + 1;
      indexRef.current = newIdx;
      setCurrentMoveIndex(newIdx);
      rebuildGrid(historyRef.current, newIdx);
      if (onHistoryChange)
        onHistoryChange(historyRef.current.slice(0, newIdx + 1));
    }
  }, [rebuildGrid, onHistoryChange]);

  const clearHistory = useCallback(() => {
    const empty: PointChange[][] = [];
    setHistory(empty);
    historyRef.current = empty;
    indexRef.current = -1;
    setCurrentMoveIndex(-1);
    flattenedGrid.current.clear();
    if (onHistoryChange) onHistoryChange(empty);
  }, [onHistoryChange]);

  const currentState = useMemo(
    () => history.slice(0, currentMoveIndex + 1),
    [history, currentMoveIndex]
  );

  return {
    currentState,
    startDrawing,
    stopDrawing,
    isDrawing,
    handleDraw,
    handleBatchDraw,
    handleFill,
    undo,
    redo,
    isUndoPossible: currentMoveIndex >= 0,
    isRedoPossible: currentMoveIndex < history.length - 1,
    clearHistory,
  };
};

export default useHistory;
